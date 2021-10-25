# [SEO 調整] Chrome Lighthouse 中 Performance 意義和調整

> 若網站載入超過 3 秒鐘，超過 50% 的使用者放棄等待網頁載入

## 目錄

* Performance 代表意義及使用者影響
* Lighthouse 8 Performance 中各項數值介紹
* Performance 的數值調整

在 Chrome 有開源一個網站檢測工具叫 Lighthouse，開發者工具內就可以檢視該網站，其中有五項指標

1. Performance
2. Accessibility
3. Best Practices
4. SEO
5. Progressive Web App

今天會探討 Performance

- 代表意義及對使用者影響？
- Performance 中各項數值介紹
- 如何調整？

## Performance 代表意義及使用者影響

由於以往前端網頁 JavaScript 沒有這麼龐大的時候，網頁下載的影響關鍵常常在於網速，但現今 JavaScript 當道(我大前端時代)加上網速也越來越提升的狀況下，負責跑動網頁的 CPU 漸漸成為前端網頁效能的關鍵，所以目前前端修正效能通常有兩個方向

1. 減少 CPU 的耗能
2. 讓使用者感受不出來網頁慢

網頁 Performance 代表意義通常有兩個，分為

1. 網頁第一次載入的速度，這邊也有在區分成第一次使用者開始跟網頁互動和最大頁面載入時間等
   對使用者來說這常常是主觀且相對性的，因為不同的網速或裝置甚至一些網頁的插件及防毒軟體都會影響

2. 網頁載入後，接下來使用者跟網頁互動的狀況，包含各種點擊和輸入等等操作
   有些網頁接續的互動可能是延遲的，或甚至根本沒有任何的互動

像開頭說的，大部分使用者沒辦法等待網頁第一次載入花太久的時間，所以第一點會是很重要的一塊，也是對使用者影響最多的

雖然網頁載入速度跟許多外在因素也有關，不過今天透過 Lighthouse 能盡量讓測試環境一致並且提供一些指標讓開發者能有所方向

## Lighthouse 8 Performance 中各項數值介紹

### First Contentful Paint(FCP)

加權分數 10%

第一個 dom 出現在畫面的時間，包括圖片和非畫面的 canvas，這當中不包含 iframe 裡面的東西

[http archive](https://httparchive.org/reports/loading-speed#fcp) 有統計目前桌機跟手機 FCP 的中位數，並且依據該數據去計算該網頁 FCP 落在哪個區間

0 - 1.8s 綠色(快)

1.8s - 3s 橘色(中等)

超過 3s 紅色(慢)

**分數低可能原因：**

文字需要等到字體載入後才顯示，Lighthouse 會出現 Ensure text remains visible during webfont load 的提示

**解決辦法：**

在全域 css 中加入

```jsx
font-display: swap;
```

這會讓字體尚未載入時，能以 fallback font face 呈現

若是使用 google font 在 href 後面加上 &display=swap 即可

另外在 header 內加入

```jsx
<link rel="preload" as="font">
```

預先載入字體也是可行辦法

### Speed Index

加權分數 10%

指網頁內容填入速度，這邊不是很確定如果圖片預先用 skelton 顯示算不算內容已經填入了呢？

這邊也是根據 http archive 去評估落在哪個區間

0 – 3.4s 綠色(快)

3.4s – 5.8s 橘色(中等)

超過 5.8s 紅色(慢)

**分數低可能原因：**

通常可能是圖片沒有壓縮或是一些 api 回傳的速度較慢導致內容出不來等等

### Largest Contentful Paint

加權分數 25%

網頁載入到最大圖像或區塊的時後

Web.dev 這邊建議盡量達到 **2.5 秒**內完成，這邊判斷圖像或區塊主要以 html tag 為主，不包含任何 css 的 margin、padding 和 border

值得留意的是，當 LCP 發生時，不一定代表網頁內容都完全載入，意思就是說，版面設計得宜可以讓 LCP 分數高一點即使當下還有許多內容在轉圈圈，像是預留資料會出現的版面像是 skeleton 等等

**分數低可能原因：**

1. 資源下載時間(後端 API 回傳時間)
2. 渲染時間(前端 JS 阻塞問題)

### Time to Interactive

加權分數 10%

在 FCP 後到使用者可以互動的這段時間

那何時是使用者可以互動？

這邊判斷的方式是偵測事件都已完成註冊到網頁元素中並且使用者操作後在 50 毫秒內有反應

[這邊](https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c/edit#)有詳細說明如何判斷網頁可以互動

0 – 3.8s 綠色(快)

3.9s – 7.3s 橘色(中等)

超過 7.3s 紅色(慢)

### Total Blocking Time

加權分數 30%

使用者點擊、輸入或螢幕點擊到實際反應的時間扣掉 50 毫秒所累積的時間

舉例來說，若點擊一個按鈕花了 70 毫秒才反應，則 TBT 為 20 毫秒

### Cumulative Layout Shift

加權分數 15%

畫面佈局突然的改變，這通常發生於圖片加載後畫面會產生移動

![](https://i.imgur.com/MNZnieD.png)

這邊以我部落格圖示一下 FCP LCP 發生時機以及中間發生了 CLS

## Performance 的數值調整

整體來說，不管是哪一項 performance 的數值，以前端來說，主要方向都為減少 JS main thread 的 loading

比較常見的方法有

1. Code Splitting
2. Third-Party Dynamic Import
3. Remove Useless Code
4. 調整執行 JS 時間點
5. 調整載入 JS 時間點
6. 壓縮 JS
7. Lazy Loading Image

這些方法每個都有需多不同的解法或變化，實際在調整也會面臨許多公司專案個別的狀況，最佳解也不一定能套用在每個專案中，之後可能會針對這些方法在另外寫成一篇

tags:seo-performance

date:2021/10/25