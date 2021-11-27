# [SEO 調整] 什麼是 robots.txt 和為什麼要設定 sitemap?

## 目錄

* 何謂 robots.txt
* 為何需要 robots.txt
* 如何設定 robots.txt
* 何謂 Sitemap
* 為何需要 Sitemap
* 如何設定 Sitemap
* 將 Sitemap 送至 Google Search Console
* 結論

## 何謂 **robots.txt**

> 一份文件告訴瀏覽器哪些網頁要被檢索，哪些不用

以 Google Chrome 為例，我們能夠在搜尋欄輸入一些關鍵字就能呈現一個個網頁，是因為 Chrome 有預先做好兩件事情

> 檢索 + 建立索引

當我們 Google 任何東西時，並不是真的在這個浩大的網路中搜尋，而是在 Google 的網頁中搜尋，所以會搜尋到的東西必定是：

1. Google 已經檢索過並且建立過索引
2. Google 的演算法所推薦出來的

而今天要講的 robots.txt 和 sitemap 就是針對第一點

## 為何需要 robots.txt

其實我一開始非常好奇，為何有網頁會想要不被 Google 檢索呢？應該大部分都希望能被 Google 檢索畢竟這樣別人才能搜尋到我們的文章

後來才了解到，事實上有些狀況會是網頁不想要被檢索的，像是：

1. 還在施工中的網頁
2. 網頁伺服器可能沒辦法處理太多的流量
3. 或是各種原因不想要被 Google 檢索

但設定 robots.txt 只是讓 Google 不會檢索到某些頁面，他並不會阻止該網頁就不會再出現在 Google Search 結果上

如果要讓該頁面完全不會出現在 Google Search 上，需要在 header 設定

```jsx
<meta name="robots" content="noindex"> 
```

## 如何設定 robots.txt

首先增加一個檔案叫 robots.txt，我這邊專案是放在 public 底下，以我的部落格為例

https://kenyucode.vercel.app

加完 robots.txt 後在

https://kenyucode.vercel.app/robots.txt

就會顯示

```
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: https://kenyucode.vercel.app/sitemap.xml
```

這也正是 robots.txt 裡面打入的東西

User-agent 使用者代理，在這邊瀏覽器就是我們的使用者代理，所以 User-agent 所輸入為瀏覽器的裝置

 整段代表說使用者代理若名為 Googlebot 不能檢索 https://kenyucode.vercel.app/nogooglebot 網頁

另外 Sitemap 會在以下介紹

## 何謂 Sitemap

> 為一個檔案提供網頁資訊

他甚至可以對網頁內部的各種檔案提供不同的資訊，像是影片長度或是圖片類型等等

## 為何需要 Sitemap

官網中提到通常幾種狀況需要使用 Sitemap

1. 網站規模極大(網頁數目超過 500 個)
2. 網頁彼此中缺乏適當的連結(沒有按鈕可以互相連通)
3. 網站剛建立，外部缺乏連結進來
4. 網頁內部有許多多媒體互動題材，像是影片或圖片等

## 如何設定 Sitemap

線上有許多即時轉譯 Sitemap 的網站能自動產出 Sitemap，像是

[https://www.xml-sitemaps.com/](https://www.xml-sitemaps.com/)

將產出的 XML 檔案加入 public 資料夾內部，讓 [https://kenyucode.vercel.app/sitemap.xml](https://kenyucode.vercel.app/sitemap.xml) 網址能連結出現以下的資訊

```jsx
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
        <loc>https://kenyucode.vercel.app/</loc>
        <lastmod>2021-10-28T06:48:36+00:00</lastmod>
    </url>
    <url>
        <loc>https://kenyucode.vercel.app/js</loc>
        <lastmod>2021-10-28T06:48:36+00:00</lastmod>
    </url>
    <url>
        <loc>https://kenyucode.vercel.app/react</loc>
        <lastmod>2021-10-28T06:48:36+00:00</lastmod>
    </url>
</urlset>
```

## 將 Sitemap 送至 Google Search Console

我們完成網頁資訊說明後，就將結果送到 Google 那邊審查

首先進入 [https://search.google.com/search-console/about](https://search.google.com/search-console/about)

點擊立即開始後，他會要求我們驗證，有許多種驗證方式，我選擇 HTML 標記驗證法，主要是 Google 這邊會產出一組亂碼的 meta tag，我們把這組 meta tag 加入我們網頁的 header 中即可

![](https://i.imgur.com/D7Scfvj.png)

![](https://i.imgur.com/fiQBLxH.png)

![](https://i.imgur.com/oi4h2ic.png)


驗證後會進入 Google Search Console 後台，點擊左邊 Sitemap 進入頁面後會出現一個輸入匡，

後面輸入我們 Sitemap 檔案名稱，這邊是 sitemap.xml，然後點擊提交再過幾天回來看即可

![](https://i.imgur.com/p6z4LsO.png)


第一次申請的時候 sitemap 內容有誤就出現這個訊息

![](https://i.imgur.com/aw7At5l.png)


再次申請過個幾天就通過了，後面會說找到網指數三個，也正如我們 sitemap 檔案裡面設定的

## 結論

- robots.txt 告訴 Google 機器人哪些不需要被檢索
- Sitemap 告訴 Google 機器人網頁有哪些頁面和圖片影片等等

tags:seo-sitemap

date:2021/11/2 
