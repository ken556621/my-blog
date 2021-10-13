# [筆記] 處理 JavaScript 非同步

## 目錄

* 何謂非同步?
* Promise 相關方法整理

## 何謂非同步?

在 javaScript 非同步的特性中，程式碼在依序執行若遇到非同步的方法，舉凡像是 setTimeout 或是 setInterval 等等，會跳過他們繼續往下執行

```jsx
console.log("111");

setTimeout(() => {
  console.log("222");
}, 300);

console.log("333");

// Ans: "111" "333" "222"
```

### 解決辦法一，Callback

```jsx
console.log("111");

setTimeout(() => {
  console.log("222");
  console.log("333");
}, 300);

// Ans: "111" "222" "333"
```

直接將 console.log("333") 放入 setTimeout 裡面，我們不管非同步的程式何時會結束，反正他結束的時候再執行 console.log("333") 就好

優點：非常直覺，對於那些要等待非同步的程式碼執行完才執行的程式，我們一律丟在非同步的程式裡面

缺點：若今天非同步的程式裡面又有非同步，然後裡面又有非同步...，就容易寫得變很巢狀，未來會較難維護

### 解決辦法二，Promise

```jsx
console.log("111");

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("222");
  }, 300);
}).then(value => {
  console.log(value);
  console.log("333");
});

// Ans: "111", "222", "333"
```

將非同步包裝在 promise 裡面，等待 promise 結果回傳時再執行接下來的東西

優點：相較於 callback，若非同步裡面還有非同步，就不會寫得太巢狀，並且只要處理好，他可以保證結果會回傳，不論是失敗或成功

缺點：若非同步裡面還有非同步，有可能會一直 .then 的寫下去

```jsx
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("222");
  }, 300);
})
  .then(value => {
    console.log(value);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("333"), 300);
    });
  })
  .then(value => {
    console.log(value);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("444"), 300);
    });
  })
  .then(value => {
    console.log(value);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("555"), 300);
    });
  })
  .then(value => {
    console.log(value);
  });

// Ans "111", "222", "333", "444", "555"
```

### 解決辦法三，Async / Await

```jsx
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("222");
  }, 300);
});

const asyncFunction = async () => {
  console.log("111");
  const result = await promise1;
  console.log(result);
  console.log("333");
};

asyncFunction();

// Ans "111", "222", "333"
```

優點：程式碼逐一執行下去，如果遇到非同步，會等待該非同步程式結束才繼續往下

缺點：若在 async 內部使用些陣列方法像是 forEach 或是 map 等，會吃不到外面的 async，面對這個狀況可以改用 for 迴圈取代一般陣列方法

## Promise 相關方法整理

### Promise.all

應用時機：

常見場景為，當我們今天有發送多隻 api request，我們不想要等第一隻 api 發送完才送第二隻，要執行多隻 api 併發，就可以使用 Promise.all 的方法

實作方法：

```jsx
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("111");
  }, 300);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("222");
  }, 300);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("333");
  }, 300);
});

Promise.all([promise1, promise2, promise3]).then(values => {
  console.log(values);
});

// Ans ["111", "222", "333"]
```

### Promise.race

應用時機：

剛好跟 Promise.all 相比，他只要任一項非同步有達到即可，會回傳最先到達的值

實作方法：

```jsx
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("111");
  }, 300);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("222");
  }, 100);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("333");
  }, 300);
});

Promise.race([promise1, promise2, promise3]).then(values => {
  console.log(values);
});

// Ans "222"，因為 promise2 它所等待的秒數最短，優先回傳
```

### 其他

- promise 後面可以接 finally，亦即不管失敗或成功都會執行 finally 裡面的事情，這可以避免在 then 和 catch 裡面寫一樣的程式碼

```jsx
promise1
  .then(values => {
    console.log(values);
  })
  .finally(item => {
    console.log("123");
  });
```

- Promise.allSettled 它需要帶多個 promise 當參數，並回傳多個 promise 的值和狀態，跟 finally 一樣是不管成功或失敗都會回傳

```jsx
Promise.allSettled([promise2, promise1, promise3]).then(results =>
  results.forEach(result => console.log(result))
);

/* 會回傳 
[object Object] {
  status: "fulfilled",
  value: "222"
}
[object Object] {
  status: "fulfilled",
  value: "111"
}
[object Object] {
  status: "fulfilled",
  value: "333"
} */
```

tags:async

date:2021/10/7