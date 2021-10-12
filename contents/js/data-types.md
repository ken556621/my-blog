# [筆記]關於 JavaScript 中的型別

## 目錄

* JavaScript 中的型別
* 令人混淆的型別
* 使用 typeof 作為安全性檢查
* 結論

## JavaScript 中的型別

我們都知道 JavaScript 中內建的型別有

1. Boolean (布林值)
2. Null
3. Undefined
4. Number(數字)
5. String(字串)
6. Symbol(ES6 才加入)
7. Object

但事實上 JavaScript 相對其他強型別語言是一種弱型別語言，亦即在 JavaScript 中，每種型別都有可能被轉換的，他不能保證定義好一個型別就可以一直維持下去

所以理論上來說，JavaScript 中變數是沒有型別的(因為他有可能被轉換)，是變數的值才有型別

```jsx
let a = 1

console.log(typeof(a)) // "number"

a = "1"

console.log(typeof(a)) // "string"
```

a 本身沒有型別，是它的值才有型別

有人常說這種弱型別語言是一種問題，特別是在做邏輯運算的時候會造成一些無預期的錯誤，但我認為這種特性是一種彈性，他讓我們在操作上可以針對不同的型別做不同的操作

舉例來說

```jsx
let a = 1

console.log(a + 10) // 11

a = "1"

console.log(a + 30) // "130"
```

因不同型別造成不同結果，但這也提醒我們，不同型別做不同事情，數字就做加減乘除的運算，字串就做字串串接的動作

## 令人混淆的型別

### 萬劫不復的 null

```jsx
typeof(null) === "obejct" // true
```

null 的型別不是 null 這是 JavaScript 中的一個錯誤，但由於現在許多網頁都會使用這個作為判斷，所以修正會讓許多現行的網頁掛掉，就不修正了

### Undefined vs Undeclared

```jsx
let a

console.log(a) // undefined
console.log(b) // "Uncaught ReferenceError: b is not defined"

console.log(typeof(a)) // undefined
console.log(typeof(b)) // undefined
```

a 的值跟型別都是 undefined，若直接取用 b 的值會噴錯，因為 b 沒有被宣告過，但由於瀏覽器回傳的錯誤是 "Uncaught ReferenceError: b is not defined"，所以容易讓人以為 b 也是 undefined，但事實上是 Undeclared 才對

Undefined 跟 Undeclared 是完全不一樣的東西

Undefined 是一種值

Undeclared 是在可取用的範疇中，沒有該變數宣告

那爲什麼 typeof(a) 跟 typeof(b) 都是 undefined?

是因為 typeof 這個方法有做安全防護機制，讓錯誤不會噴出導致程式碼中斷，但這邊 typeof(b) 如果能回傳 undeclared 就比較不會讓人混淆

### Array 的型別是 Object

```jsx
typeof([]) // "object"
```

在 JavaScript 中，分為兩種資料型態原始型別(primitive type)和物件型別(derived data types/special Objects)，物件型別包含函式、陣列和正正規表達式型別都是 object

所以要區分陣列的時候，需要用

```jsx
console.log(Array.isArray([])) // true
```

### NaN 不等於任何值

```jsx
console.log(NaN == NaN) // false
console.log(typeof(NaN)) // "number"
```

除了 NaN 本身不等於任何值以外，他本身型別是 number，即便他的意思 not a number

## 使用 typeof 作為安全性檢查

對於一些未宣告的變數，若使用到的話，瀏覽器會直接噴錯別且終止程式，但如果使用 typeof 檢查該變數是否已經宣告就可以避免這個問題

```jsx
if(a){
	console.log(a)
} // 此時會噴錯 "ReferenceError: a is not defined"

if(typeof a !== "undefined"){
	console.log(a)
} // 不會噴錯
```

## 結論

- 在 JavaScript 中變數本身沒有型別，裡面裝載的值才有
- 不同型別有著不同的邏輯運算，要加減乘除時就使用 number 的型別
- 特殊容易混淆的狀況，像是 null, NaN, array...等等
- Undeclared 跟 Undefined 的差異
- 實務上可以使用 typeof 作為變數的檢查，避免瀏覽器噴錯導致白畫面

tags:data-types

date:2021/10/12