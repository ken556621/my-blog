# 淺談 JavaScript 原型鍊

## 目錄
* 何謂原型鍊？
* 為何需要原型鍊？
* _ _ **proto _ _和** prototype **差異**

由於 JavaScript 並沒有 class 的概念，所以在繼承其他屬性或方法的時候，是透過原型鍊的繼承方式

## 何謂原型鍊？

簡單說就是

> 一個本來沒有該屬性的物件，會向上查找該屬性，直到上面沒有東西為止
>

這邊有個建函式，會生成不同名字跟年齡的人

```jsx
const Person = function(name, age){
	this.name = name
	this.age = age
}

const person1 = new Person("Ken", 20)

console.log(person1.name) // Ken，(有 name 的屬性)
console.log(person1.profession) // undefined，(沒有 profession 的屬性)
```

今天我們可以在建構函示透過 prototype 去讓 person1 可以存取到 profession 的屬性

```jsx
Person.prototype.profession = "Developer"

console.log(person1.profession) // Developer
```

首先我們透過建構函式創建 person1 這個 instance

![](https://i.imgur.com/ulQiGQd.png)


將 profession 這個屬性繼承給 Person 這個建構函示，此時 person1 也可以向上存取到

![](https://i.imgur.com/uHyILob.png)


## 為何需要原型鍊？

剛提到 JavaScript 沒有 class 的特性，所以透過原型鍊的方式去存取其他屬性，那實際上應用的場景又是怎樣呢？

假設今天我們要使用 Array 的方法

```jsx
const arr = []

arr.push("OMG")

console.log(arr) // ["OMG"]
```

我們之所以可以用 arr.push 的方法，就是我們在宣告 const arr = [] 的時候，arr 就繼承了 Array 的全域物件，這邊理解是 Array 可以想成是一個建構函式，他裡面有各式各樣的方法和屬性 

![](https://i.imgur.com/xCQyvk2.png)


打開開發者工具的 console 可以看到 Array 有許多方法

所以原型鍊的好處是，讓我們可以使用許多的方法或屬性，而不用自己一個一個在重寫一次

那既然原型鍊這麼好用，那我們是不是可以寫一大堆方法在最高層，讓所有繼承他的物件都能使用呢？

答案是盡量避免寫入新屬性到最頂層，這邊想到的原因有二

1. 若撞名會導致屬性被覆寫

```jsx
Person.prototype.profession = "Developer"
Person.prototype.profession = "Oh No!"

console.log(person1.profession) // Oh No!
```

1. 發生一些不可預期狀況

```jsx
Array.prototype.push("OMG")

const arr = []

console.log(arr[0]) // OMG
console.log(arr.length) // 0
```

空陣列卻已經有個直在裡面了，長度卻還是 0

## __**proto__和** prototype **差異**

prototype 是建構函式使用 new 時所產生的

_ _ proto _ _ 是該物件的原型

```jsx
const Person = function(name, age){
	this.name = name
	this.age = age
}

const person1 = new Person("Ken", 20)

console.log(Person.prototype === person1.__proto__) // true
console.log(person1.prototype) // undefined
```

tags:prototype

date:2021/10/6