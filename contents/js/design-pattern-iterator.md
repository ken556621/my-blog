# [Design Pattern]迭代器 Iterator

## 目錄

* 何謂迭代器模式?
* JavaScript 中迭代器

## 何謂迭代器模式

> 針對資料儲存的 collection 進行有效的迭代

這是什麼意思呢？

想像我們今天去醫院掛號，看診的方式有以下兩種

1. 排隊在診所間前面，等待一個人一個人進去
2. 抽一張號碼牌，等到呼叫我們號碼的時候在進入診間

在不同的情境適合不同的等待方式，這就是迭代器設計模式

等待看診的人裝在一個 collection

把我們區分好誰是下一位跟誰是正在看診的人就是迭代器在做的事情

這時候醫生只需要呼叫 下一位 就好了

## JavaScript 中迭代器

在 JavaScript 中常見的 collection 有陣列、物件和樹等等

有些內建好的迭代器像是陣列的 forEach 方法就是很好的例子

```jsx
const arr = [1, 2, 3, 4]

arr.forEach(item => {
    console.log(item)
}) // 印出 1, 2, 3, 4
```

物件則是使用像是 for in 的方法

```jsx
const obj = {
	name: "Ken",
	age: 20,
	category: "developer"
}

for(let key in obj){
    console.log(key)
} // 印出 name, age, category

for(let key in obj){
    console.log(obj[key])
} // 印出 Ken, 20, developer
```

JavaScript 內建好的迭代器非常好用，但如果今天我們有一些情境需要客製化，可能就會想要自己製作一個迭代器

什麼樣的情境我們會需要客製化呢？

像是我們今天要檢查 collection 裡面有沒有下一個的時候，或是直接呼叫第一個的時候等等之類的情境

```jsx
class Iterator{
    constructor(elements){
        this.index = 0;
        this.elements = elements;
    }
    next(){
        return this.elements[this.index++];
    }
    hasNextElement() {
        return this.index <= this.elements.length;
    }
    first(){
        this.index = 0;
        return this.next()
    }
}

const items = ["Developer", "Designer", "CEO"]
const iter = new Iterator(items)

console.log(iter.first()) // Developer
console.log(iter.next()) // Designer
console.log(iter.hasNextElement()) // true
```

tags:design-pattern-iterator

date:2021/10/4