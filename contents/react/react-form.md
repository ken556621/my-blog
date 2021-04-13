# React 處理表單及套件分享

## 目錄
* 常見表單處理問題
* UnControll input vs Controll input
* React Hook Form 套件介紹

## 常見表單問題

基本上，常見表單處理比較麻煩的地方有

### 輸入表單資料處理

```
//針對 Controll Input 會用 state 去紀錄每次 onchange 變動的值

    const [name, setName] = useState("");

    const handleInputChange = (e) => {
        setName(e.target.value)
    };

    <input value={name} onChange={handleInputChange} />

```

* 以簡單表單處理我認為這是直覺簡單的處理方式
* 當表格欄位多起來的時候，會變成很多 state 需要管理
* 每次 setState 都會造成畫面的 render，效能也需要留意


### 針對每個欄位做新增或刪除時，資料處理

使用者若能動態新增表格欄位時，在記錄每個欄位的狀態也會動態新增，對於效能也是一大挑戰



### 表單驗證

針對不同欄位的驗證規則，像是 email, 電話或是特殊需求的驗證規則，都會需要另外紀錄




### 驗證沒過客製化錯誤訊息及自動 auto focus 該欄位

在使用者輸入欄位時，是否自動出現驗證沒過，還是等 submit 才一次做全部的驗證，每個欄位驗證沒過該出現什麼訊息，submit 後自動 focus 到沒驗證過的欄位，這些也是當欄位很多的時候，會比較麻煩的狀況


## UnControll input vs Controll input




|  | UnControll | Controll |
| -------- | -------- | -------- |
| 優點     | 直接抓取 DOM，避免重複 render 畫面| 對於該 Input 有更好的掌控力，使用者在輸入的過程都能夠掌握到資料的任何變動     |
| 情境     | 欄位為動態可變動的或是會有非常多的欄位| 欄位相對簡單且數量不多，也沒有很多欄位需要驗證規則     |


## React Hook Form 套件介紹

這套件的作者是一個我很欣賞的開發者，不只是回答 issue 非常細心，文件的各種功能都有搭配 codesandbox 讓開發者可以直接去玩玩看，從我開始使用這個套件，我記得每幾個禮拜他就會更新一次，有時候是修一些 bug，有時候是減少整個套件的體積或是優化一些效能，而且他官網有做一些淺顯易懂的動畫讓人了解 uncontroll vs controll 在效能上的差異，蠻推薦給大家試試看

<img style="width: 500px;" src="https://i.imgur.com/aUMcP06.png" alt="npm-info">

[官網連結](https://react-hook-form.com/)

* Base on uncontroll component 去實作，但同時也支援 controll
* 容易結合其他 ui library，像是 material ui 的 input
* 支援巢狀表單結構，像是表單內其中一個欄位點開又是一個表單
* 可以統一管理錯誤訊息，除了基本的驗證規則可以直接用，也能客製化使用正規表達式規則去做驗證
* 使用後，程式碼真的減少很多！






tags:react-form

date:2021/3/20