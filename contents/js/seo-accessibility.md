# [SEO調整] 為什麼 Accessibility 在網頁 SEO 中會這麼重要？

Accessibility 在網頁中簡單說就是

> 確保網頁能讓每個使用者能閱覽或使用

---

## 目錄

* 為什麼要顧慮 Accessibility？
* 怎麼樣有好的 Accessibility？
* Accessibility 中的評分機制
* 關於 Accessibility 中的調整
* 結論


## 為什麼要顧慮 Accessibility？

先不管會不會影響到 SEO，Accessibility 若沒做好，使用體驗上就蠻有差的

以網站的門面，標題跟描述為例

![](https://i.imgur.com/CzaZXcG.png)


每次搜尋一個關鍵字，Google 給我們的網頁列表包含了網頁的標題(紅色框)跟網頁的描述(藍色框)，這部分也是涵蓋在 accessibility 裡面，若這部分敘述不完全或甚至沒有敘述，可以想像使用者應該是連點也不會點，自然 Google 也不會推薦這些網頁給使用者，所以網頁曝光度也會比較低

另外像是頁籤上面的標題也是一樣的意思

![](https://i.imgur.com/CnzCxRW.png)


我認為最重要的就是要讓網頁有充足的說明，其實就像是第一次跟別人見面要做自我介紹一樣

另外除了門面之外，進入網頁後也是一樣的，這其中包含

- 圖片(圖片若載入不出來會出現什麼)
- 影片(有些裝置沒辦法播放會出現什麼)
- 連結(連結沒有清楚說明會連到哪裡)
- 整體架構(大標小標穿插應用)

## 怎麼樣有好的 Accessibility？

關鍵在於**每個使用者**和**使用**

要滿足**每個使用者**就需要：

1. 要顧慮每個裝置下的情境(桌機、平板和手機)
2. 不同網速下的情境
3. 使用者本身的不同情境(身心障礙者)

→ 基本上就是要能創造一個無障礙的網頁

要能夠**閱覽或使用**，就需要滿足：

1. 使用者需要知道這個網頁是什麼
2. 使用者在不同的情境下都能知道網頁中各個東西(不同情境是指上述三個情境)
3. 圖片或顏色需要符合正常比例大小或對比色

→ 基本上就是讓使用者在不同的情境下都能知道網頁裡面的東西並且能正常閱覽或使用

## Accessibility 中的評分機制

Google Lighthouse 中 Accessibility 比較不像 Performance 中這樣會針對每個數值去做一個評分，他比較像是有許多的測試條件，檢測網頁是否通過這些項目，但最終依然會有個分數，而且每個測試條件所佔的權重也不一樣

由於它的測試條件蠻多的，這邊就不一一介紹，若要看權重文章[在這](https://web.dev/accessibility-scoring/)

## 關於 Accessibility 中的調整

我認為分為三大方向

### Meta Tag

這邊指的是 header 內的所有說明，包含網頁的名稱、描述和裝置相容，這邊可以參考 [meta tag 的屬性設定](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#%E5%B1%9E%E6%80%A7)，需要特別留意是，每個頁面都需要有，包含各個分頁

### HTML Tag 中各個屬性名稱

大致上可以從

1. img
2. video
3. a
4. frame
5. input

這些標籤去著手，可以照著 [web.dev](https://web.dev/accessibility-scoring/) 提供的方向去修正即可，通常是加入 alt 或是 name 等屬性

### 顏色的對比度

可以透過開發者工具的元素去檢視每個區塊的顏色對比度是否合格

![](https://i.imgur.com/DSCbqbE.png)


## 結論

Accessibility 專注在給**每個使用者**好閱讀或使用的網頁，我認為不管是否影響 SEO，都是值得去調整的

tags:seo-accessibility

date:2021/10/27