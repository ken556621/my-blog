# 前端 API 架構分享

## 目錄
* 資料夾切分方式
* 套件選用
* 實作每次換頁面自動 abort 功能
* 心得


## 資料夾切分方式
一般常見 api 檔案放置會有兩種處理方式
1. 按照商業邏輯或是該 api 功能去區分

```
.api
├─── authentication/  ...註冊、登入和登出等等
├─── user/            ...使用者的各種操作
├─── product-list/    ...產品清單
└─── index            ...api 目錄頁
```
* 優：同樣類似功能可以快速查到位置，適用於一個網站有許多地方要發同樣的 api

2. 按照該頁面去分，也就是該頁面發哪些 api 就放在同一個資料夾

```
.api
├─── login/           ...放登入頁會使用到的 api
├─── product/         ...放產品頁會使用到的 api
├─── register/        ...放註冊頁會使用到的 api
└─── index            ...api 目錄頁
```

* 優：該頁面打什麼 api 一目瞭然，一個頁面有哪些功能可以直接看該資料夾就了解，適用於每個頁面比較獨立，api 也都不太會重複使用到時候

## 套件選用
### 前情提要：
  在我們專案中我們一開始是用 fetch 去手刻一個 fucntion 去發送和接收各個 api，但過程中其實來來回回修好幾次，主要是有一些狀況是我們一開始沒有想到的，像是針對各種 status code 的 handle 等等，但這也有個好處是，我們能更客製化去處理每一支 api
  後來我們為了有更一致的 api 寫法和方便管理，加上想加入一些 abort 的功能，我們選用 axios 作為我們的套件

  <img src="https://i.imgur.com/pIGbod3.png" alt="axios" style="width: 300px;" />

### axios 好處有
1. 大量的使用者，許多狀況都被考慮進去，發了 issue 也很快會修正
2. 文件清楚而且有許多大大的 boilerplate
3. 前後端的環境都能使用，這對有自架 server 的前端來說頗為方便
4. 藉由大家提供不同對 axios 的寫法，也可以學到很多


## 實作每次換頁面自動 abort 功能
在 axios v0.15 版本後，加入了 Cancellation 的功能，能夠取消已發送出的 api，這對使用者體驗來說是很大的提升，以往對於 api 的 abort 是用 redux saga 這個 middleware 去實作，看到 axios 支援了這個功能其實內心是蠻開心的

### 簡易的 cancel 實作

1. 簡單的用 get 發送 api
```js
axios.get('/user/12345')
```

2. 加上 cancel token，類似給該 api 一個身份，之後要 cancel 才知道要 cancel 誰

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
    cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
})
```

3. 在發送出 api 到成功接收到回傳之間，才能 cancel

```js
// 呼叫去取消該 api 的發送
cancel();
```

### 實作換頁或使用者重複點擊可以自動 cancel

整個實作概念會像是弄一個 queue 的結構去裝每一隻要發送的 api，並利用 queue first in first out 的概念去管理每個 api

1. 先 new 一個 Map 去儲存每一個 api

```js
// 聲明一個 Map 用於存儲每個請求的標識 和 取消函數
const pending = new Map();
```

2. 每個 request 開始之前先檢查原本 Map 裡面是否就有該 api，若已經有就把它 cancel 掉（使用者若重複點擊發送 api debounce 效果）

```js
const requestStart = (config) => {
    // config 為一個物件，可以在每次 api 呼叫的時候將不同的參數帶入，保持呼叫 api 的彈性
    // loadingCallback 為客製化 loading 結束後可以做的事情
    config.loadingCallback(true);

    // 在請求開始前，對之前的請求做檢查取消操作
    removePending(config);

    // 添加本次請求到 pending 中
    addPending(config);
};
```

補充一下這邊 config 裡面帶的東西

```js
// merge 為 lodash 的方法，可以結合之後要客製化另外傳入的東西
// 若都不傳入任何值，基底的 config 就如以下，也就是每次發送 api 都會有的東西
const config = merge({
        headers: {
            "Authorization": `Bearer ${getJWTToken()}`,
            "X-RequestId": getCookies()["x-request-id"],
            "Content-Type": "application/json"
        },
        errorToast: true,
        successToast: false,
        loadingCallback: () => {}
    }, options);
```

3. 如何在 request 開始之前檢查是否 Map 已經有並取消該 api?

```js
const removePending = (config) => {
    // 該 url 為我們自己給該 api 的 id，用方法跟路徑結合而成
    // 這樣代表同樣的方法跟同樣的路徑在 Map 裡面只會有一個
    const url = [
        config.method,
        config.url
    ].join("&");

    if (pending.has(url)) {
        // 如果在 pending 中存在當前請求 id，需要取消當前請求，並且移除
        const cancel = pending.get(url);
        cancel(url);
        pending.delete(url);
    }
};
```

4. 確認該 Map 裡都沒有重複的 api 後，我們將新的 api 加入

```js
const addPending = (config) => {
    const url = [
        config.method,
        config.url
    ].join("&");

    // 在 config 物件中加入 cancelToken，若原本沒有則 new 一個 CancelToken

    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pending.has(url)) {
            // 如果 pending 中不存在當前請求，則添加 url(id) 和 cancel 的方法
            pending.set(url, cancel);
        }
    });
};
```

5. api 發送成功後，將其從 Map 移除

```js
const requestSuccess = (response, config) => {
    // 在請求結束後，移除本次請求
    removePending(config);

    let resData = Array.isArray(response.data)
        ? response.data
        : response.data.data;

    // 這邊可以做一些成功發送 api 的動作，像是針對 response 資料的預處理或是跳出一些成功的提醒等等...

    return {
        data: resData,
        status: response.status,
        isSuccess: true
    };
};
```

6. 若 api 發送失敗，一樣將其移除

```js
const requestFailed = (error, config) => {
    const { response, message } = error;

    if (axios.isCancel(error)) {
        // 取消請求的錯誤，直接跳過
        return {
            data: [],
            message: "cancel request: " + message,
            isSuccess: true
        };
    }

    // 這邊可以做一些失敗發送 api 的動作，像是失敗的提醒等等...

    if (response) {
        // 在請求結束後，移除本次請求
        removePending(config);

        return {
            data: response.data,
            status: response.status,
            message: message,
            isSuccess: false
        };
    }
    else {
        return {
            data: "Server Error",
            status: 400,
            message: "",
            isSuccess: false
        };
    }
};
```

7. 若頁面跳轉時，將還在發送的 api 通通取消

```js
const clearPending = () => {
    for (const [url, cancel] of pending) {
        // 呼叫每個 canel function
        cancel(url);
    }
    // 清空 Map
    pending.clear();
};

```
以上 clearPending 寫在由 Next.js 提供的[偵測路徑](https://nextjs.org/docs/api-reference/next/router#routerevents)變化的方法中
```js
Router.events.on("routeChangeStart", (url) => {
    clearPending();
});
```

### 整個概觀流程
1. 建立基底 config
2. 開始 request
3. 成功和失敗的 handle
4. 不論失敗或成功都要做的事情
5. 每次換頁執行全部 api 的 cancel function 和清空 Map

```js
const request = (options) => {
    // 建立基底 config
    const config = merge({
        headers: {
            "Authorization": `Bearer ${getJWTToken()}`,
            "X-RequestId": getCookies()["x-request-id"],
            "Content-Type": "application/json"
        },
        errorToast: true,
        successToast: false,
        loadingCallback: () => {}
    }, options);

    // 開始 request
    requestStart(config);

    return instance(config)
        // 成功和失敗的 handle
        .then((response) => requestSuccess(response, config))
        .catch((error) => requestFailed(error, config))
        // 不論失敗或成功都要做的事情
        .finally(() => requestDone(config));
};
```

## 心得
* axios 對於整體一起 handle 所有 api 的成功或失敗，都有很簡潔的寫法，而且又能客製化去調整，從此不在有一堆重複的 code 去做一樣的事情
* 有了換頁和重複發送 api 自動 abort 的機制後，不用擔心不同 api 相互影響不同頁面，或是佔據太多頻寬的問題，使用體驗有更流暢的感覺
* 在 survey 的過程中有看到許多不同的寫法，像是 status code 統一管理的方式，這些也都是未來想嘗試的

###### tags:api-structure

