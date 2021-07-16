# 網頁爬蟲(Web Crawler)

## 目錄
* 何謂爬蟲？為何需要？
* 常見爬蟲方法
* 反爬蟲
* 範例

## 何謂爬蟲？為何需要？

* 搜尋引擎的根本，從爬蟲開始建立書籤
* 以前端來說，爬蟲解放了我們

## 常見爬蟲方法
1. 直接發一個 Request 即可
2. 從 network 中尋找
3. Puppeteer or Selenium
    * 需要截圖或模擬各種使用者情境(較慢的網速等)
    * CSR render api 中找不到
    * 需要登入操作或是點擊各種 popup 選單時(包含我不是機器人)
    * 網頁是無限滾動設計，滾到底部才發新的 api

#### 常配合 cheerio 套件去處理爬到的資訊
類似 jQuery，處理 html 資料，給 DOM 的 class, id 或 attribute 即可拿到該 DOM 資訊

#### 常見問題
* 中文亂碼問題

## 反爬蟲
### 頻率限制

一段時間內，限制同個 ip 發出的 request 數量

ex: 台灣證券交易所：

![](https://i.imgur.com/yd6HozO.png)

```
Error: read ECONNRESET
```

#### 解決辦法
* 間隔發送 request
* 改變每次間格時間


### 驗證碼(Captcha)

Completely Automated Test to Tell Computers and Humans apart

1. Captcha 1.0

![](https://i.imgur.com/nkVsQ7G.png)

2. Captcha 2.0

![](https://i.imgur.com/3ChpxaH.jpg)

3. Captcha 3.0

![](https://i.imgur.com/JDUW5ER.jpg)

為何點擊我不是機器人，就知道你不是機器人？

## 範例
1. 104 爬取前端工作資訊
    優：速度較快
    缺：無法模擬複雜操作或網頁原始碼抓不到
2. Pupeeteer 模擬使用者登入
    優：可以模擬各種使用者操作，也能做測試
    缺：速度較慢
3. Network api 尋寶
    優：遇到好的 api 直接上天堂
    缺：可能有頻率或是其他限制，或是哪天 api 爆掉
4. 避免頻繁發送 request 解決方法

[Demo link](https://github.com/ken556621/crawler-demo)

tags:web-crawler

date:2021/7/5