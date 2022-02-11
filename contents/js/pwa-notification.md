# PWA 網頁推播實作

## 目錄
* 推播流程架構圖
* 註冊 service worker
* 詢問是否接受推播
* 取得使用者推播的 token 發給 Server
* Server 依照推播的 token 發送推播給註冊者
* 心得

## 推播流程架構圖

<img style="width: 100%;" src="https://i.imgur.com/TerAQ8n.png" alt="client-flow">

1. 使用者進入頁面先判斷是否 service worker 有支援
2. 若有支援就註冊
3. 成功註冊後詢問是否接受推播
4. 使用者接受推播後，將 token 發給 server


<img style="width: 100%;" src="https://i.imgur.com/PwGWY2Q.png" alt="server-flow">



* Server 端需要儲存
    1. 使用者的推播 Token
    2. Web-push 套件產生的 private key 跟 public key
    3. End Point URL(這邊使用 Firebase message 提供)


## 註冊 service worker

```
const registeServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/sw.js", {
            scope: "."
        });

        return true
    } else {
        return false
    }
};
```

* 在註冊前要先在 public 內創個檔案 sw.js，留意相對路徑
* 確認 service worker 存在



## 詢問是否接受推播

```
const reqNotificationPermission = async () => {
    return Notification.requestPermission(status => {
        return status
    });
};
```

* 這邊 status 會回傳三種情況
    1. granted(使用者接受)
    2. denied(使用者拒絕)
    3. default(使用者尚未給予任何權限)

## 取得使用者推播的 token 發給 Server


```
const serviceWorkerRegistration = await navigator.serviceWorker.ready;

const subscription = await serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
});
```

* 使用者若接受推播後，可以做以上的動作去拿到該使用者推播 Token
* userVisibleOnly 代表未來推播資訊使用者都會看到，而不是在背景執行
* applicationServerKey 需要帶入轉換過的公鑰，這個公鑰是 server 那使用 web-push 所產的(他一次會同時產公私鑰各一個)

```
{
  "endpoint": "https://random-push-service.com/some-kind-of-unique-id-1234/v2/",
  "keys": {
    "p256dh" :
"BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlUls0VJXg7A8u-Ts1XbjhazAkj7I99e8QcYP7DkM=",
    "auth"   : "tBHItJI5svbpez7KI4CCXg=="
  }
}
```

* 拿到使用者推播 Token 格式會長以上這樣

```
await fetch("http://localhost:5000/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
        "content-type": "application/json"
    }
});
```
* 將拿到的推播 Token 發給 Server

## Server 依照推播的 token 發送推播給註冊者

* 後端部分使用 express 跟 web-push 套件

```
webpush.setGCMAPIKey(<這邊使用 Firebase Message 提供的 GCM key 必須對應到 manifest.json 裡面設定的 gcm_sender_id>);
webpush.setVapidDetails(
  "http://localhost:3000/",
  publicKey, // web-push 產出的
  privateKey // web-push 產出的
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body; // 使用者推播 Token 資訊

  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Push Test"
  });

  // 使用 web-push 發送推播訊息
  // 參數 Subscription 為欲推播對象的資訊
  // 參數 payload 為欲傳送的訊息
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});
```

## 瀏覽器支援度

<img style="width: 100%;" src="https://i.imgur.com/RgzkhJ5.png" alt="browser-support">

[圖片來源 MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)

* Safari 就你最特別...


## 心得
繼上次 PWA 最重要三元素，剩下的推播訊息總算補上了，推播許多的 api 在 Safari 支援度真的是不堪入目，Firefox 基本上也是，只能說要把推播做得像 app 那樣，可能還是有點差距


tags:pwa-notification

date:2021/4/13