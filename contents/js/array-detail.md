# [筆記] JavaScript 中 Array 的眉眉角角

## 目錄

* 避免建立稀疏陣列
* 字串當鍵值的注意事項
* 類陣列(Array-Likes)
* 字串

Array 在許多語言當中都是非常重要的裝載資料的容器，在 JavaScript 中，它能裝載各種型別的資料

```jsx
const arr = [1, "Ken", true, { age: "20" }, ["ArrayInArray"]];
```

也可以是 Array 中又有 Array 裡面又有 Array ...非常巢狀的結構

整理一下一些我平常在操作陣列時會忽略的東西

## 避免建立稀疏陣列

亦即陣列當中有些值是 undefined

```jsx
const arr = [];

arr[4] = "Ken";

console.log(arr); // [undefined, undefined, undefined, undefined, "Ken"]
```

## 字串當鍵值的注意事項

```jsx
const arr = [];

arr[name] = "Ken";

console.log(arr); // []
console.log(arr.length); // 0
console.log(arr[name]); // "Ken"
```

以字串當鍵值後，不會改變其長度，並且整個陣列印出來也看不到，必須明確選取才能看到

```jsx
const arr = [];

arr["3"] = "Ken";

console.log(arr); // [undefined, undefined, undefined, "Ken"]
console.log(arr.length); // 4
console.log(arr["3"]); // Ken
```

另外如果鍵值是數字，但型別是字串的話，它也會直接轉換為數字的型別

若要使用字串當鍵值的話，可以考慮用 Object 而不是用 Array

## 類陣列(Array-Likes)

> 類陣列是有 length 和 index 的物件，但它並沒有繼承 array 的方法

```jsx
const arrayLikes = {
  0: "Ken",
  length: 1
};

arrayLikes[1] = "John";

console.log(arrayLikes[0]); // "Ken"
console.log(arrayLikes[1]); // "John"
console.log(arrayLikes.length); // 1
```

類陣列具有陣列 length, index 的特性，同時也能修改各個 index 值

```jsx
const arrayLikes = {
  0: "Ken",
  length: 1
};

console.log(arrayLikes instanceof Array); // false

arrayLikes.forEach(item => {
  console.log(item);
}); // arrayLikes.forEach is not a function
```

他沒有繼承於 Array，所以像是 forEach, map, filter 等等方法都不能使用

可以透過 Array 方法中的 slice 將其轉換為真正的陣列

```jsx
const arrayLikes = {
  0: "Ken",
  length: 1
};

const arr = Array.prototype.slice.call(arrayLikes);

console.log(arr); // ["Ken"]
```

什麼狀況會有類陣列出現？

![](https://i.imgur.com/rn1Qdl1.png)

像是在取 dom 元素的時候，getElementByClassName 就會回傳一個類陣列的結構

## 字串

其實我一開始都以為字串就是一種陣列，但事實上卻不是這樣的

```jsx
const str = "Ken";
const arr = ["K", "e", "n"];

console.log(str.length, arr.length); // 3, 3
console.log(str.indexOf("K"), arr.indexOf("K")); // 0, 0
console.log(str[0], arr[0]); // "K", "K"

console.log(str.concat("Boy")); // "KenBoy"
console.log(arr.concat(["B", "o", "y"])); // ["K", "e", "n", "B", "o", "y"]
```

在許多方法字串的確跟陣列很像，甚至一模一樣

但在修改上卻是不太一樣的

```jsx
const str = "Ken";
const arr = ["K", "e", "n"];

str[1] = "B";
arr[1] = "B";

console.log(str, arr); // "Ken", ["K", "B", "n"]
```

由於 String 本身是 immutable，若要更改需要建立一個新的字串並且回傳一個全新的值

相對 Array 是 mutable，所以可以直接更改

若要修改字串，可以透過一些字串的方法去修改並且回傳一個新的字串

```jsx
const str = "Ken";
const newStr = str.toUpperCase();

console.log(newStr); // "KEN"
console.log(str === newStr); // false
```

另外字串與陣列之間的轉換，可以透過 split 和 join

```jsx
const str = "Ken";
const arr = str.split("");
const newStr = arr.join("");

console.log(str); // "Ken"
console.log(arr); // ["K", "e", "n"]
console.log(newStr); // "Ken"
```

參考書籍：你所不知道的 JS 導讀，型別與文法 You Don't Know Js: Up & Going, Types & Grammar

tags:array-detail

date:2021/10/13
