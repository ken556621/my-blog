# [技術分享] 關於 Next.js 的一些點點滴滴

## 目錄
* 網頁渲染方式
* 為何選擇 Next?
* Next 關鍵 api 介紹
* 簡單建立 next 專案


## 網頁渲染方式

假設今天去餐廳點餐


1. SSG(Static Site Generators)
> 廚房(Server Side)已經預備好不同種類的餐點包，客戶(Client Side)點了餐直接拿了那包就可以走人

2. SSR(Server Site Render)
> 廚房(Server Side)有不同的食材，客戶(Client Side)點了餐廚師就開始做，做完拿給客人

3. CSR(Single Page Application)
> 廚房(Server Side)有不同的食材，客戶(Client Side)點了餐直接把那些食材拿回家裡做

|  | SSG | CSR | SSR |
| -------- | -------- | -------- | --- |
|  全名        |  Static Site Generation        |   Client Side Render       | Server Site Render|
| 優點     | 少 api 呼叫、快速產出和較難被攻擊   |  使用者體驗較流暢    | 即時資料    |
| 缺點     | 較不彈性和 Build time 較花時間   |  SEO 較差和第一次載入 JS 的時間    |  切換頁面跳轉會有延遲感   |

## 為何選擇 Next ?
1. 可選擇 CSR, SSR 或 SSG 去 render 頁面
2. 保留未來切換 render 方式的方便性
3. 易讀的官方文件加上有許多結合不同套件的 boilerplate

## SSG API
1. getStaticProps:
* 在伺服器端執行，從伺服器端取得 props 並傳入該 component 內部
* 必須搭配 getStaticPaths 一起使用

``` js
return {
    props:{
        // 傳給 component 的 data
    }
}
```

2. getStaticPaths:
* 在伺服器端執行，優先於 getStaticProps 執行，先取得有哪些路由，用於動態路由的頁面中



``` js
return {
    paths: [
      { params:
          {
              // key 為對應 page 的動態 id
              // value 為網址列後面傳進來的參數
              id: 'tesla'
          }
      },
      // 其他的路由
    ],
    // 若為 false，路由中若沒有定義則會 404
    fallback: Boolean
}
```

## SSR API
1. getServerSideProps

``` js
return {
    props: {}, // will be passed to the page component as props
}
```


## 其他 API
1. getInitialProps:
* 可同時用於 SSG 或 SSR，但官方並不推薦（容易造成混肴？）
* 在頁面第一次載入時運行在 server 端，往後 router change 時運行在 client 端
* 若該頁面有 implement getServerSideProps 則會運行在 server 端
* 可預先 data populated 在把資料 send 給前端
* response 資料有很多，可以做預處理
    * pathname - Current route. That is the path of the page in /pages
    * query - Query string section of URL parsed as an object
    * asPath - String of the actual path (including the query) shown in the browser
    * req - HTTP request object (server only)
    * res - HTTP response object (server only)
    * err - Error object if any error is encountered during the rendering
* 要 return Object，不可以 Map, Set 或其他資料格式
* 不能在 children component 內部做使用

``` js
Page.getInitialProps = async (ctx) => {
  return {
      // 可將資料預先處理或載入，再傳入該 component
      // 像是 i18n json file 或是其他不想要畫面的資料有 delated 的感覺
  }
}
```

## 開始實作簡單的 next.js

``` js
npx create-next-app demo
```

如同 create-react-app 一樣，這次換成是 create-next-app <專案名稱>

執行完後資料夾內會得到以下結構

<img style="width: 500px;" src="https://i.imgur.com/Sla8HNt.png" alt="folder-structure">

### 其中 pages 資料夾算是 next.js 整個專案中的關鍵，內部每個 js 檔案都代表一個 route

* pages 資料夾代表根目錄，預設會找到 index 的檔案

```
http://localhost:3000/
// 會指向 pages 裡的 index.js
```

* 若 pages 內有其他資料夾，則會出現在相對路徑上，假設 pages 底下多了 test 這個資料夾

```
http://localhost:3000/test
// 會指向 pages 裡的 test 裡的 index.js
```

* 若每次路徑是動態的，next.js 也提供 [] 包起來的方式，這讓我們類似的頁面不用寫好幾個路由

<img style="width: 500px;" src="https://i.imgur.com/rEMT9sg.png" alt="folder">

```
http://localhost:3000/[變數1]
// 會指向 pages 裡的 [category] 裡的 index.js
// 如此在 index.js 內可取得變數1
```
更巢狀的動態路由寫法：
```
http://localhost:3000/[變數1]/[變數2]
// 會指向 pages 裡的 [category] 裡的 [slug].js
// 如此在 [slug].js 內可同時取得變數1和變數2
```

### api 資料夾提供我們在裡面寫 api

```
/pages/api/user.js

const users = [{ id: 1 }, { id: 2 }, { id: 3 }]

export default function handler(req, res) {
  res.status(200).json(users)
}

```

```
/pages/index.js

const getUser = async () => {
  const { data } = await axios.get(
    `http://localhost:3000/api/user`
  );
  return data;
};

export async function getServerSideProps() {
  const data = await getUser();

  return {
    props: {
      data: data
    }
  };
}

// 透過 getServerSideProps，讓我們在頁面渲染前，可以先取得 user 的資料

```

## 總結

* 我認為在 CSR 的專案中，若專案一開始用 next.js 去起能讓我們節省未來想轉換成 SSR 或是 SSG 的成本，雖然還是會有一些其他設定要調整，包含 redux 等等，但至少在 routing 的部分可以比較無痛銜接
* next.js 在文件上我認為寫得非常清楚，並且他有許多與其他開源專案整合的 sample code 可以直接參考
* 搭配 vercel，next.js 只要將 code 推上 github 便能輕易deploy，除了成功部署會有信件通知外，往後每次 push 上 github vercel 都會自動跑 CI 的流程，非常方便


tags:next.js

date:2021/1/30