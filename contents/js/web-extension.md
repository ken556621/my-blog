# 網頁插件

## 目錄

* 何謂網頁插件？
* 插件種類
* 動手做一個吧

## 何謂網頁插件？

> 所謂網頁插件為一段程式碼安裝於我們的瀏覽器上，進而增加一些客製化的功能

## 插件種類

大致分為

1. 背景執行

   像是 Ad blocker 廣告攔阻器，不用特別去點擊執行，進入每個網頁皆會執行

2. 提示

   偵測在進入特定網址時，該插件會跳出提示

3. 輔助

   許多插件皆是這種類型，像是可以整個頁面截圖、跑出尺標能在螢幕上操作或是反選文字自動翻譯等等，這種是輔助使用著的操作行為

4. 樣式更改

   更改整個網頁樣式，不管是顏色或是亮度等等

## 動手做一個吧

這邊會示範一個提示類型的插件，主要功能非常簡單，就是進入 youtube 網頁的時候會跳出一個輸入匡，使用者必須輸入使用 youtube 網頁的目的後，才會消失，算是阻止我個人太常上 youtube 看廢片的插件

### 第一步

首先我們要先在檔案中加入 manifest.json

檔案裡面加入

```jsx
{
  "manifest_version": 2,
  "name": "Youtube Block Extension",
  "description": "Youtube Block Extension",
  "author": "Ken",
  "version": "1.0.1",
  "permissions": ["<all_urls>"],
  "content_scripts": [
    {
      "matches": ["*://*.youtube.com/*"],
      "js": ["background.js"]
    }
  ]
}
```

permissions 在哪些路徑下有權利去執行這個插件

content_scripts 要執行哪個腳本

matches 當進入哪些 url 的時候，這邊是指含有 [youtube.com](http://youtube.com) url 時

js 執行的 js 檔案為哪一個

### 第二步

加入 background.js 檔案

![](https://i.imgur.com/ZeCt4S1.png)

這隻檔案會在我們每次進入瀏覽器的時候執行，內容用純 js 寫，主要為新增一個 popup 並植入於這個網頁的 body 上

```jsx
document.body.onload = popUp;

function popUp() {
  let inputValue = "";
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.id = "test";
  popup.style = popupStyle;

  const comfirm = document.createElement("div");
  comfirm.className = "comfirm";
  comfirm.innerHTML = "Comfirm";
  comfirm.style = confirmBtnStyle;
  comfirm.onclick = function(e) {
    if (!inputValue) {
      return;
    }
    popup.parentNode.removeChild(popup);
  };

  const inputField = document.createElement("input");
  inputField.onchange = function(e) {
    inputValue = e.target.value;
  };
  inputField.placeholder = "I will watch...";
  inputField.style = inputStyle;

  popup.appendChild(inputField);
  popup.appendChild(comfirm);
  document.body.appendChild(popup);
}
```

再搭配一些簡單的樣式

```jsx
const popupStyle = `
    background-color: #fff;
    position: fixed;
    z-index: 10000000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 30px;
    border-radius: 8px;
`;

const inputStyle = `
    height: 24px;
    font-size: 16px;
`;

const confirmBtnStyle = `
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    cursor: pointer;
`;
```

### 第三步

![](https://i.imgur.com/xJcpEwa.png)

打開瀏覽器，點擊右上角的 ...，選取更多工具，點擊擴充功能

![](https://i.imgur.com/2Y0ldwp.png)

打開右上角的開發人員模式，點擊載入未封裝項目，選取我們剛剛寫好的檔案夾

![](https://i.imgur.com/HDJpRPr.png)

載入後會看到我們的插件成功出現，如果我們 local 這邊的程式碼有什麼更動，只需要按右下角的重新整理的 icon 即可更新這個套件，非常方便

[GitHub Repo](https://github.com/ken556621/habit-extension)

tags:web-extension

date:2021/8/26
