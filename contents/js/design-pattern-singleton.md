# [Design Pattern]單體模式

## 目錄
* 何謂單體模式
* 為何需要單體模式？
* 單體模式可能面臨的問題
* 在 JavaScript 中實踐單體模式

## 何謂單體模式

> 單體模式就是每個 class 只有唯一一個實體，只要用同一個 class 建立新物件，新的物件會跟原本的實體一樣

舉個例子，烤雞蛋糕需要有模具，假設模具是貓掌的形狀，我們可以預期烤出來的雞蛋糕都是貓掌的形狀

模具：一開始的 class

雞蛋糕：從 class 複製出來的物件

## 為何需要單體模式？

1. 確保每次複製出來的物件都會跟原本的相同
2. 避免重複編寫相同的物件

單我們有些資料或方法在多個地方需要共用時，可以考慮單體模式

## 單體模式可能面臨的問題

1. Class 若放到全域有被更改的風險
2. Class 若放到全域會持續佔據記憶體

## 在 JavaScript 中實踐單體模式

如果直接用物件實字去建立新的物件，再直接去複製的話，基於物件是 pass by referrence 的特性，會導致複製出來的物件跟原本是不一樣的

```jsx
const obj = {
  name: "Ken",
  age: 20
};

const obj2 = {
  name: "Ken",
  age: 20
};

console.log(obj === obj2); // false
```

這樣就不符合單體模式的原則，複製出來的物件必須跟原本的相同

由於 JavaScript 並沒有 class 的概念，但在 ES6 中有提供 new 這個語法糖去模擬其他語言中 class 的概念，我們這邊用 new 的概念去複製出一個相同的物件

```jsx
function test() {
  // 若已經被初始化過，直接回傳該初始化的物件
  if (typeof test.instance === "object") {
    return test.instance;
  }

  const instance = this;

  this.name = "Ken";

  // 使用閉包的概念將 instance 只存在這個 function 裡面，避免被他人更改
  test = function() {
    return instance;
  };

  return this;
}

const result = new test();
const result2 = new test();

console.log(result === result2); // true
```

tags:design-pattern-singleton

date:2021/9/30
