# PWA 簡單介紹和實作

## 目錄
* 何謂 PWA，他解決了什麼？
* Service Worker
* Manifest json
* 跨瀏覽器及裝置問題
* 實作
    * 加到 home screen
    * 離線使用

## 何謂 PWA，他解決了什麼？
全名為 Progress Web App，其實就是 web 想要達到 native app 的功能，那究竟哪些功能是它想要達到的呢？我們先比較一下兩者的差異



|          | Web      | App      |
| -------- | -------- | -------- |
| 傳遞性     | 較高，因為不用下載，有瀏覽器就可以使用     | 較低，因為需要下載，我們不太會在下載 50 個 app，但有可能逛了超過 50 個網頁     |
| 黏著度     | 較低，以 google map 來說，比較方便的是點開 app 去使用，而不是用瀏覽器打開     |   較高，手機桌面的 app 通常是我們花最多時間的，而不是在瀏覽器上面   |

PWA 的出現，就是希望帶著 Web 原本的優勢，慢慢將 App 獨有的優勢加到 Web 裡面，那之所以 app 會有高黏著度的優勢，我認為是以下幾點

1. 手機可以下載成一個 icon 放在首頁
2. 離線可以繼續使用
3. 推播通知功能提醒使用者繼續回去使用

Web 若能達到以上三點，我認為就是 PWA 了，那首先要克服的就是離線瀏覽，接下來就會介紹 Service Worker

## Service Worker

<img src="https://i.imgur.com/rx0KaBT.png" alt="service-worker-structure" style="width: 500px;" />

* Service Worker 類似一個中間層，能夠攔截網頁每次的發送和接收
* 它能決定該請求要從 Cache Storage 拿還是 Network




<img src="https://i.imgur.com/I3pgXwQ.png" alt="precaching" style="width: 500px;" />

* Precaching 讓使用者第一次造訪網頁就可以使用離線功能
* 在 build time 就先把資料存入 cache

### Service Worker 生命週期

<img src="https://i.imgur.com/MnYb6Bd.png" alt="lifeCycle" style="width: 500px;" />

* 是為了確保同一個註冊的網頁只有一個版本
* 避免開多個視窗卻有不同的 service worker，導致資料不一致

#### 主要分成三階段

1. Registration

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
```

2. Installation

```js
self.addEventListener('install', function(event) {
  // 連上 cache api
  // 將檔案存入
  // 確認檔案已存入
});
```
3. Activation

```js
self.addEventListener('activate', event => {
  // 開始攔截每次 api 的發送
  // 但如果該頁面已經開啟了，註冊完後要重新整理
});

```
完成 activation 之後可以監聽

* Fetch(攔截 API 發送)
* Sync(背景程式執行)
* Push(推播功能)

#### 使用 workbox 註冊（Google 提供的 PWA Libraries）

```js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.routing.registerRoute(
  // 哪些檔案要 cache，也可以是 /.*\.css/ 的 css 檔案
  // 接收字串、regex 和 function
  new RegExp('.*\.js'),
  // 這些檔案要執行什麼策略
  workbox.strategies.networkFirst()
);
```

拿取資料策略

* NetworkFirst
    * 資料常需更新
    * 若沒有網路才用 cache
    * 每次網路請求都把資料放到 cache
* StaleWhileRevalidate
    * 資料不常需要更新
    * 若 cache 找不到才用網路，並且將資料存入 cache
* NetworkOnly
    * offline 完全不能用，像一些非 get api, 需要帶東西的
    * 官網說 StaleWhileRevalidate 有處理好，不太需要用到這種策略
* CacheOnly
    * 只吃 cache 資源
    * precache 要設定好

所有策略參數

* 自定義策略名稱，ex: "image-cache"
* Cache 若過期的限制行為
* 陣列裡面放每個 cache 的生命週期

```js
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    // 自定義名稱
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        // cache 多久
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // 每次最多 cache 多少個 request
        maxEntries: 10,
      }),
    ]
  })
);
```

## Manifest json

* 描述 App 的特性

```js
{
    "short_name": "KB",
    "name": "KenBlog",
    "lang": "en",
    "description": "A blog",
    "start_url": "/",
    "background_color": "#eef5ff",
    "theme_color": "#285a99",
    "dir": "ltr",
    "display": "standalone",
    "orientation": "any",
    "scope": "/",
    "icons": [
         // ...各種大小的 icon
    ],
    "prefer_related_applications": true,
    "related_applications": [
      {
         "platform": "play",
         "id": "com.google.samples.apps.iosched"
      }
    ]
}
```
* start_url 開啟應用程式時的預設網址
* scope 應用程式的使用範圍
* name 應用程式的名稱
* icons 應用程式的圖示
* theme_color 應用程式的主要顏色
* background_color 啟動畫面（splash screen）的背景色
* short_name 應用程式的簡寫
* lang 主要語言
* description 應用程式的描述
* dir 文字書寫方向
* display 應用程式的顯示模式
* orientation 預設顯示的方向是直的或橫的
* prefer_related_applications 是否要推薦一個原生的app
* related_applications 推薦原生app的連結

[自動生成 manifest.json](https://www.dunplab.it/web-app-manifest-generator)

## 跨瀏覽器及裝置問題

* iOS icons 吃不到 manifest json 的，可以再 head 裡面加


```js
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="167x167" href="touch-icon-ipad-retina.png">
```

* iOS lunch screen 是一片白，可以再 head 裡面加

```js
<meta name="apple-mobile-web-app-capable" content="yes" />
<link href="/apple_splash_2048.png" sizes="2048x2732" rel="apple-touch-startup-image" />
<link href="/apple_splash_1668.png" sizes="1668x2224" rel="apple-touch-startup-image" />
<link href="/apple_splash_1536.png" sizes="1536x2048" rel="apple-touch-startup-image" />
<link href="/apple_splash_1125.png" sizes="1125x2436" rel="apple-touch-startup-image" />
<link href="/apple_splash_1242.png" sizes="1242x2208" rel="apple-touch-startup-image" />
<link href="/apple_splash_750.png" sizes="750x1334" rel="apple-touch-startup-image" />
<link href="/apple_splash_640.png" sizes="640x1136" rel="apple-touch-startup-image" />
```

* 進入網頁後，iOS 不會自動跳出 install popup

```js
// 偵測是否為 iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}

// Display 模式是否為 standalone
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
  this.setState({ showInstallMessage: true });
}
```

* 到背景或重新整理，iOS 會把所有資料都清空，可以使用 redux-persist 等套件去留存
* Standalone 模式不會有 navigation bar，要自己做往回按鈕

## 實作

* 加到 home screen

1. 加上 manifest.json 到 public folder 內
    --> 確認 manifest 內的資料都有帶上

2. 將所有需要的 icons 也放到 public folder 內

3. header 裡加入該加入的 meta tag

```js
<Head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />

    <link rel="manifest" href="/manifest.json" />
    <link href="/icons/favicon-16x16-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="16x16" />
    <link href="/icons/favicon-32x32-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="32x32" />
    <link href="/icons/apple-icon-60x60-dunplab-manifest-28429.png" rel="apple-touch-icon" type="image/png" sizes="60x60" />
</Head>
```
相對路徑可能要稍微注意一下

4. 修改 next.config.js(這邊使用 next-pwa 的套件)

```js
const withPWA = require("next-pwa");

module.exports = withPWA(
  {
      pwa: {
        // 在 build 的時候，webpack 會從 public 去找 manifest, 自動產出 workbox-*.js 跟 sw.js 兩個的檔案
        dest: "public"
      }
  }
)
```
在 Next.js 9+ 版本以前，必須自己寫個 server 去 host manifest.json 這個檔案，但現在直接放在 public folder 裡就好了

5. `npm run build` 產生 `sw.js`, `sw.js.map`, `workbox-******.js` 和 `workbox-*******.js.map` 這幾個檔案

6. 接下來去 devtool 的 lighthouse 去產一份報告，看 PWA 那部分有沒有成功，或是還缺什麼，若在 localhost 的話，應該只有 https 會是紅色的

<img src="https://i.imgur.com/MQDKbZ3.png" alt="lighthouse-report" style="width: 500px;" />

7. 接下來從手機去打開網址，打開選單後點擊加入主畫面

<img src="https://i.imgur.com/j8aqgbc.gif" alt="addToScreen" />

## 離線使用

* 可在 devtool 將網路關成 offline 再 refresh 一次

<img src="https://i.imgur.com/feWQZ3l.png" alt="offline" style="width: 500px;" />


之後會再嘗試推播功能和其他偵測裝置的功能，目前先到這裡

tags:pwa

date:2021/2/16