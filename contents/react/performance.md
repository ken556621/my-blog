# [筆記] useMemo vs. useCallback

## 目錄
* 什麼是 useMemo?
* 為何需要 useMemo?
* 何謂 useCallback?
* 為何需要 useCallback?
* 結論

React Hook 中，提供兩種方法作為效能上的優化，每次對這兩個都有點不知道差異，想藉這個機會理解和分辨一下這兩者差異

## 什麼是 useMemo?

如同字面上意思，他是負責記住值

如同官網說的：

> Returns a memoized value

當我們今天一個 function 需要耗的計算，我們就會希望他算一次就好，並且把回傳值記錄下來，除非某個數值改變，不然我們就不重新呼叫這個 function

## 為何需要 useMemo?

```jsx
import { useState, useCallback, useMemo } from "react";

const App = () => {
  const [dark, setDarkMode] = useState(false);
  const [word, setWord] = useState("John");

  const theme = {
    color: dark ? "black" : "pink"
  };

  const calculateLargeNumber = () => {
    for (let i = 0; i < 1000000000; i++) {}

    return word;
  };

  // const memoizedValue = useMemo(() => calculateLargeNumber(), [word]);

  const handleClickButtton = () => {
    setDarkMode(!dark);
  };

  const handleChangeWord = event => {
    const value = event.target.value;
    setWord(value);
  };

  return (
    <div className="App">
      <div style={{ color: theme.color }}>Ken</div>
      <button onClick={handleClickButtton}>Click</button>
      <input onChange={handleChangeWord} />
      <div>{calculateLargeNumber()}</div>
    </div>
  );
};

export default App;
```

這簡單的程式有兩個功能：

1. 點擊按鈕改變上面字的顏色
2. 輸入文字並且在下方顯示

這邊可以注意到 calculateLargeNumber 是一個比較費時的 function，因為裡面有個 for 迴圈要跑很久

![](https://i.imgur.com/MAmRA4b.gif)

這邊可能看不太出來，但實際操作就會很有感覺，每次輸入一個值，就會有種卡頓感，這可以理解因為我們在顯示的字上面需要等 calculateLargeNumber 這個比較慢的 function 去完成才能顯示

但是今天問題是，我們連點擊按鈕單純切換顏色都會有明顯的延遲感，原因是我們每點擊一次按鈕，也會重新建立那個很慢的 calculateLargeNumber

要改善這問題，就可以使用 useMemo

```jsx
import { useState, useCallback, useMemo } from "react";

const App = () => {
  const [dark, setDarkMode] = useState(false);
  const [word, setWord] = useState("John");

  const theme = {
    color: dark ? "black" : "pink"
  };

  const calculateLargeNumber = () => {
    for (let i = 0; i < 1000000000; i++) {}

    return word;
  };

  const memoizedValue = useMemo(() => calculateLargeNumber(), [word]);
  // 這邊把註解移除掉，下面顯示值換成 memoizedValue

  const handleClickButtton = () => {
    setDarkMode(!dark);
  };

  const handleChangeWord = event => {
    const value = event.target.value;
    setWord(value);
  };

  return (
    <div className="App">
      <div style={{ color: theme.color }}>Ken</div>
      <button onClick={handleClickButtton}>Click</button>
      <input onChange={handleChangeWord} />
      <div>{memoizedValue}</div>
    </div>
  );
};

export default App;
```

我們將 calculateLargeNumber 函式回傳的值用 useMemo 存入變數 memoizedValue 中，後面有個陣列裡面放 word，代表只有 word 值變動的時候才會重新建立 calculateLargeNumber 這個函式

這麼做之後單純切換顏色就不會有延遲的感覺

所以 useMemo 可以保存耗時 function 運算出的結果，並且只有在特定值變動的情況下，才重新建立

## 何謂 useCallback ?

相較於 useMemo，他是記住一個 callback

useCallback 底層也是用 useMemo 製作的

> useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)

## 為何需要 useCallback?

通常會有兩個情境

1. 一個 function 當成 props 傳到多個 component 當中
2. 這個 function 運算比較繁重時

其實我覺得概念跟 useMemo 很類似，差別應該是 useCallback 是 function 為單位，而 useMemo 是值為單位

```jsx
import { useState, useCallback } from "react";
import Child from "./Child";

const App = () => {
  const [dark, setDarkMode] = useState(false);
  const [word, setWord] = useState("John");

  const theme = {
    color: dark ? "black" : "pink"
  };

  const handleClickButtton = () => {
    setDarkMode(!dark);
  };

  const handleChangeWord = event => {
    const value = event.target.value;
    setWord(value);
  };

  const getWord = () => {
    return word;
  };

  return (
    <div className="App">
      <div style={{ color: theme.color }}>Ken</div>
      <button onClick={handleClickButtton}>Click</button>
      <input onChange={handleChangeWord} />
      <Child getWord={getWord} />
    </div>
  );
};

export default App;
```

這簡單的程式有兩個功能：

1. 點擊按鈕改變上面字的顏色
2. 輸入文字並且在下方顯示

與上面 useMemo 範例差異在於它多了 Child 這個 component，並且傳 getWord 這個函式當作 props

```jsx
// ./Child
import { useState, useEffect } from "react";

const Child = ({ getWord }) => {
  const [word, setWord] = useState("Default Word");

  useEffect(() => {
    console.log("Render");
    setWord(getWord());
  }, [getWord]);

  return <div>{word}</div>;
};

export default Child;
```

裡面有 console 一個 "Render 去紀錄傳進來的 getWord 函式是否有變動，如果有變動就會 log 出 "Render"

![](https://i.imgur.com/bcAywwL.gif)

其實跟 useMemo 一樣狀況，改變顏色的時候 Child component 不該 log 出 render，因為改變顏色並有改變到 Child 裡面的字，也就是說改變顏色跟 Child component 是沒有關係的

若要修正這問題，就可以使用 useCallback

```jsx
import { useState, useCallback } from "react";
import Child from "./Child";

const App = () => {
  const [dark, setDarkMode] = useState(false);
  const [word, setWord] = useState("John");

  const theme = {
    color: dark ? "black" : "pink"
  };

  const handleClickButtton = () => {
    setDarkMode(!dark);
  };

  const handleChangeWord = event => {
    const value = event.target.value;
    setWord(value);
  };

  const getWord = useCallback(() => {
    return word;
  }, [word]);
  // 這邊將 getWord 函式包入 useCallback 中

  return (
    <div className="App">
      <div style={{ color: theme.color }}>Ken</div>
      <button onClick={handleClickButtton}>Click</button>
      <input onChange={handleChangeWord} />
      <Child getWord={getWord} />
    </div>
  );
};

export default App;
```

將 getWord 函式包入 useCallback 中，意思跟 useMemo 很像，就是今天只有 word 變動的時候才會重新建立 getWord 這個函式

## 結論

- useMemo 與 useCallback 的差異於一個存值一個存 function
- useMemo 用於繁重計算的 function 中可以把值保存下來
- useCallback 用於一個 function 傳到多個 component 中且建立 function 本身也是比較耗時的
- 個人認為當畫面出現卡頓或有效能問題時，在使用 useMemo 或 useCallback，畢竟使用它們也是需要耗費記憶體去儲存


tags:performance

date:2021/10/23