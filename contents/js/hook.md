# 關於 react hook 的常見方法介紹

## 目錄
* 為何使用 hook
* 使用 hook 注意事項
* 方法介紹

## 為何使用 hook ?

使用 class 建立一個 counter
```js
import React, { Component } from "react";
import "./styles.css";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  add = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  subtract = () => {
    this.setState({
      count: this.state.count - 1
    });
  };

  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.add}>Add number</button>
        <button onClick={this.subtract}>Subtract number</button>
      </div>
    );
  }
}

export default Counter;
```

使用 hook 建立一個 counter
```js
iimport React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1)
  }

  const subtract = () => {
    setCount(count - 1)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={add}>Add</button>
      <button onClick={subtract}>Subtract</button>
    </div>
  );
}

export default Counter;

```
#### 優點
* Hook 讓我們以 function 的方式取代以往用 class 的寫法
* 不需要在繼承，代表 constructor 和 super 可以不用在寫
* 不會再有一堆 this 的出現，不需要再去判斷哪個 this 指向哪裡，或是 this 忘記綁定 function 的窘況
* 每個 component 可以切成更小的單位，可以防止過多的包裝，也就是過多 HOC 的情況出現

#### 缺點
* 以往 class 的生命週期是使用以下方法
```js
componentDidMount
componentDidUpdate
componentWillUnmount
```
現在 Hook 整合成一個
```js
useEffect(() => {

}, [])
```
透過 useEffect 的方法，藉由不同的寫法達到不同生命週期的控制，這點會需要習慣一下

## 使用 hook 注意事項
任何 hook 的方法必須要在 function component 中呼叫，所謂 function component 是指該 function 要 return jsx 的 closing tag，舉例
```js
const Counter = () => {
    return (
        <></>  // ---> 必須要有個 closing tag
    )
}
```




## 常用的 Hook 方法

### 基礎

#### useState
* state 是存放資料的地方
* state 的改動需透過類似 class 中 setState 的方式去改變
* 改動後會觸發畫面的重新繪製


```js
const [value, setValue] = useState(defaultValue)
```
* 陣列中第一個是該資料的值，第二個是改變該資料的方法
---> 也就是 value 是值，setValue 是改變 value 的方法
---> 這是透過 ES6 中解構賦值的方式取得 useState 中的資料
* useState()，括號內帶入該值的預設值，若都不帶入則為 undefined，建議可以先定義好該資料的型別，像是
```js
{}, [], "", 0
```












#### useEffect
#### useContext

### 進階
#### useReducer
#### useCallback
#### useMemo
#### useRef
#### useImperativeHandle
#### useLayoutEffect
#### useDebugValue
