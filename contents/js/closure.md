# [筆記]為何 Closure 在 JavaScript 中會這麼重要？

## 目錄

* 關於全域變數的優點與缺點
* 語彙範疇(Lexical Scope)的應用
* Closure 讓內部變數被記住
* React Hook 中 Closure 無所不在
* 結論

Closure 是一個光看名詞很難理解他意思的一個概念，一直以來看了很多文章也跟許多人討論，才慢慢理解他的概念及應用

我認為要理解 Closure，需要從一個情境說起

## 關於全域變數的優點與缺點

假設我們今天有個情境是需要有一個計數器，需要計算今天進來我們這家店的人有多少

```jsx
let peopleCount = 0;

const counter = () => {
  peopleCount++;
};

counter(); // 每走進來一個人，就呼叫一次

console.log(peopleCount); // 1
```

如果我們在外面不小心改到 peopleCount

```jsx
let peopleCount = 0;

const counter = () => {
  peopleCount++;
};

counter(); // 每走進來一個人，就呼叫一次

peopleCount = 1000;

console.log(peopleCount); // 1000
```

之前辛苦計算的人數就全毀了，除此之外，往後如果還需要計算進來的寵物、女性、男性或是老人數量，那全域變數的數量會越來越龐大，雖然可以用物件把它全部包起來，但還是難以逃脫不小心被改到的風險

## 語彙範疇(Lexical Scope)的應用

語彙範疇可以解決上述不小心改到全域變數的風險，基本上語彙範疇就是每個區塊程式碼能作用的區域

```jsx
const name = "Ken";

function getName() {
  const name = "John";
  const age = 25;

  console.log(name);
}

getName(); // "John"
console.log(age); // "age is not defined"
```

getName 函式的 name 會優先存取到 { } 內部的 name，所以是 "John"，若裡面存取不到，就會往外存取，進而找到外部的 "Ken"

然而，當我們要存取 age 這個變數時，卻說 age is not defined，因為外部沒有辦法存取到內部的變數，也因為這樣我們可以用這招避免外部去改動到 age 這個變數

所以回到剛剛算人進來的例子

```jsx
const counter = () => {
  let peopleCount = 0;

  peopleCount++;

  console.log(peopleCount);
};

counter(); // 1
counter(); // 1
counter(); // 1
```

這樣就不用擔心會改到 peopleCount 這個變數

但問題來了，不管呼叫幾次，counter 都是 1

原因是每次呼叫 peopleCount 這個變數都會是從零開始，他並不會累加

## Closure 讓內部變數被記住

```jsx
const counter = () => {
  let peopleCount = 0;

  const addPerson = () => peopleCount++;

  return addPerson;
};

const amount = counter();

console.log(amount()); // 0
console.log(amount()); // 1
console.log(amount()); // 2
```

在我們呼叫 counter 的時候，由於 addPerson 這個函式裡面有存取到 peopleCount 這個變數，所以 counter 會幫我們保留這個內部的變數

之後我們在呼叫 counter 裡面的 addPerson 這個函式的時候，就可以把 peopleCount 累加上去了

我們可以稍微改寫成立即呼叫的函式表示式(IIFE)

```jsx
const useCounter = (() => {
  const counter = () => {
    let peopleCount = 0;

    const addPerson = () => peopleCount++;

    return addPerson;
  };
  return counter;
})();

const amount = useCounter();

console.log(amount()); // 0
console.log(amount()); // 1
console.log(amount()); // 2
```

## React Hook 中 Closure 無所不在

其實在許多框架或是套件裡，也有許多 Closure 的應用，舉我們熟悉的 React Hook 為例

今天要製作一個 custom hook

```jsx
const useState = initValue => {
  let _value = initValue;
  const state = () => _value;

  const setState = newValue => {
    _value = newValue;
  };

  return [state, setState];
};
```

用解構陣列，最終回傳兩個 function，第一個值，第二個是改變這個值的方法

接著我們開始使用這個 hook

```jsx
const [counter, setCounter] = useState(1);

console.log(counter()); // 1

setCounter(2);

console.log(counter()); // 2
```

第一個 console 結果：

一開始 initValue 傳進去之後，賦值給 \_value 後，由於 state 這個 function 有存取到 \_value 這個變數，所以 useState 幫我們保留了這變數值，下次呼叫 counter 這個方法的時候，不需要傳入 initValue 這個參數，也能得到 1 這數值

第二個 console 結果：

同理，改變後的 \_value 也同樣被存在 useState 這個 function 中，下次呼叫 counter 這個方法的時候，不需要傳入 initValue 這個參數，也能得到 2 這數值

## 結論

- 語彙範疇解決全域變數容易被更改到的問題
- Closure 讓每個語彙範疇內能保存有被存取到的變數
- 再搭配 IIFE 能讓每個方法簡潔地獨立切割出來，包含裡面的方法和各種變數

tags:closure

date:2021/10/21