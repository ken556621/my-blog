# React hook 常見方法介紹

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
* 所謂 useEffect，是指這個方法是用來處理有 side effect 的方法，畢竟 hook 是以 function programming 的方式去設計，希望單純輸入一個值到函式內部就輸出一個值出來，不希望在過程中改變外面的東西，通常會有 side effect 的東西有

    1. 發送 API
    2. 監聽事件，像是針對滑鼠或是螢幕等等


* 針對有 sideEffect 的事情，useEffect 能將其控制好，不管是確保他只執行一次，或是針對某些值有更動時才被觸發，或是在頁面離開時將監聽器移除等等
* useEffect 為 react 生命週期的控制方法
---> 生命週期為每個 Component 出現到結束的一個週期，以 class 寫法來舉例
> ComponentDidMount
Component 剛出現的時候會執行，會在 render 後執行


> ComponentDidUpdate
Component 會監測 state 發生變化時執行


> ComponentWillUnmount
Component 會在結束時執行

* 換成 useEffect 的寫法
> ComponentDidMount
```js
useEffect(() => {
    // Component 剛出現的時候要做的事情
}, [])
```


> ComponentDidUpdate
```js
useEffect(() => {
    // Component 剛出現的時候會執行一次
    // 接下來只要放在 array 中要監測的值發生變化時就會執行
}, [要監測的值])
```


> ComponentWillUnmount
```js
useEffect(() => {
    return () => {
        // Component 結束時執行
    }
})
```
#### useContext
* 將資料放到外層 component，使內層的 component 都能使用到該資料

```js
const user = {
    name: "Ken",
    age: 28
}

const UserContext = useContext(user);

const Counter = () => {
    return (
        <UserContext.Provider value={user.name}>
            // 被 context 包住的 component 都能取得 user 資料
            <Info />
        </UserContext.Provider>
    )
}

const Info = () => {
    // 在這裡可以直接取到 context 內部的資料
    const name = useContext(UserContext);
    return (
        <>
            {name}
        </>
    )
}
```
### 進階
#### useReducer
* 類似於 useState 的方法，但此種方式適用於更複雜 state 的操作
* 簡單說，useReducer 可以匯聚各種要改變狀態的 action，並且依照傳進來的 type 將其分流到對應要怎麼改變狀態
* 之後可能會再補充什麼情境要用 useState 何時要用 useReducer


```js
const initialState = {count: 0};

// 透過 reducer 去定義不同種類的 action 要做什麼事情
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
#### useMemo

* React 在 render 畫面前，會有個虛擬 dom 的東西，會**計算**之前畫面跟現在畫面是否有更動，才決定要不要重新繪製畫面
* **計算**這個動作，有時候如果過於繁雜，我們會先把計算好的值儲存起來，避免重複一直做複雜的計算，useMemo 的 memo 即是 memorize 的意思，去紀錄已經計算好的東西
* 這用於效能的優化，但如果**計算**這個動作本身不是複雜的，可能就不適合使用這個方法，因為紀錄已經計算好的值，本身也是耗效能的

``` js
const MyApp = () => {
    const [count, setCount] = useState(0);

    // 只有 count 發生變化時，才會重新計算
    const computeExpensiveValue = useMemo(() => {
            return count * 2
        }, [count]);

    return <></>
}

```

#### useCallback

* useCallback 類似於 useMemo 也是為了優化效能，差別在它是紀錄整個 function
* 這適用於當我們今天要把一個 function 傳到許多的 component 中，由於這些 function 都是一樣不會改變的，所以不需要在每個 component 中重新 render，所以使用 useCallback 將整個 function 紀錄起來

``` js
const MyApp = () => {
    const [count, setCount] = useState(0);

    // 只有 count 發生變化時，才會重新 render
    const computeExpensiveValue = useCallback(() => {
            return count * 2
        }, [count]);

    return (<>
        <Children doSomeThing={computeExpensiveValue} />
    </>)
}

```
#### useRef

* ref 代表著 reference，也就是當我們今天需要一個值作為參考的時候，而這個值不能隨著生命週期去改變的時候，就可以使用 useRef
* useRef 回傳一個 js 的物件，而這個物件有個值叫 current
* 回傳的物件有可以任意去操作，並且操作過後的值不會隨著該 component 的生命週期去改變，也代表操作過後，該 component 不會再 render 一次
* 這適用於操作 dom 的節點


```js
const Test = () => {
  const ref = useRef();
  const domRef = useRef();

  ref.current = "Ken"

  console.log(ref) // {current: "Ken"}

  console.log(domRef) // {current: <div></div>}

  return <div ref={domRef}></div>;
};
```

#### useLayoutEffect
* 類似於 useEffect，但執行的時間點是在 render 畫面之前，所以會有阻塞畫面 render 的風險
* 使用時機可能會在於再畫面出來之前先計算畫面高度或是一些邏輯是希望在畫面出現之前的
* 用法也類似於 useEffect

```js
 useLayoutEffect(() => {
        // 做一些在畫面繪製之前的事情
    }, []);
```

## 總結

* Hook 讓原本 class 的寫法轉為 function programming
* 另外 useDebugValue 和 useImperativeHandle 就沒有做介紹了，因為我完全沒有機會用到這兩個方法QQ
* 基本上 useState 和 useEffect 算是最常用到的方法，熟悉這兩個大概能解決多數的問題





###### tags:hook