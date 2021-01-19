---
title: My first blog
slug: test3
date: "20-05-2020"
---

# Next.js

## Render Style

假設今天去餐廳點餐

1. SSG(Static Site Generators)
> 廚房(Server Side)已經預備好不同種類的餐點包，客戶(Client Side)點了餐直接拿了那包就可以走人

2. SSR(Server Site Render)
> 廚房(Server Side)有不同的食材，客戶(Client Side)點了餐廚師就開始做，做完拿給客人

3. SPA(Single Page Application)
> 廚房(Server Side)有不同的食材，客戶(Client Side)點了餐直接把那些食材拿回家裡做

|  | SSG | SPA | SSR |
| -------- | -------- | -------- | --- |
|  全名        |  Static Site Generation        |  Single Page Application        | Server Site Render|
| 優點     | 1. 少 api 呼叫 2. 快速產出 3. 較難被攻擊   |      | 即時資料    |
| 缺點     | 1. 較不彈性 2. Build time 較花時間   |      |  First time build slow   |


* Static CDN? Non static CDN?

## SSG API
1. getStaticProps:
* 在伺服器端執行，從伺服器端取得 props 並傳入該 component 內部
* 必須搭配 getStaticPaths 一起使用

```javascript=
return {
    props:{
        // 傳給 component 的 data
    }
}
```

2. getStaticPaths:
* 在伺服器端執行，優先於 getStaticProps 執行，先取得有哪些路由，用於動態路由的頁面中



```javascript=
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

```javascript=
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

```javascript=
Page.getInitialProps = async (ctx) => {
  return {
      // 可將資料預先處理或載入，再傳入該 component
      // 像是 i18n json file 或是其他不想要畫面的資料有 delated 的感覺
  }
}
```
















