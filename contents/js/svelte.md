# Svelte 的優點及缺點，前端框架新的解決方法

## 目錄
* 怎麼會出現 Svelte ?
* 語法上有什麼不一樣呢？
* 結論

## 怎麼會出現 Svelte ?

> Modern JavaScript frameworks are all about reactivity. Change your application's state, and the view updates automatically.  --- Rich-Harris


Svelte 創始人 Rich-Harris 
[Github](https://github.com/Rich-Harris)

### 一切都從 spreadsheet 開始

<img src="https://i.imgur.com/qNZ5CkE.png" alt="spreadsheet" style="width: 500px;" />

Harris 認為 spreadsheet 有很好的使用者體驗，只更新有需要被更新的數值，並且即時反應

在 NOV 26 2016 Harris realse 了 svelte 1.0.0 版本，那時候模式跟 React 雷同，但直到 APR 22 2019 3.0.0 版本後，開始有了明顯的改變，不過整體上也是以 Component 的方式

### Virtual Dom vs. Real Dom
在 React 中 Virtual Dom 做掉了只更新畫面上需要被更新的東西比照，但這個比對的負擔是連同程式碼整包被打包並且在瀏覽器中執行，雖然在 [reconciliation](https://zh-hant.reactjs.org/docs/reconciliation.html) 中有許多大神的優化，但在 Harris 眼中，最好的優化就是移除他。


但問題來了，Virtual Dom 移除後要如何持續追蹤有被更動的東西呢？
> 那就是把我們寫完的程式碼，先編譯一下

舉個例子
```
<script>
  let src = "/tutorial/image.gif";
  let name = "Rick Astley";
</script>

<img {src} alt="{name} dancing">
```
他會編譯成
```
function create_fragment(ctx) {
	let img;
	let img_src_value;
	let img_alt_value;

	return {
		c() {
        img = element("img");
          if (!src_url_equal(img.src, img_src_value = src)) attr(img, "src", img_src_value);
            attr(img, "alt", img_alt_value = "" + (name + " dancing"));
          },
        m(target, anchor) {
          insert(target, img, anchor);
        },
        p: noop,
        i: noop,
        o: noop,
        d(detaching) {
            if (detaching) detach(img);
        }
	};
}
```

我的感覺就是，把原本 Virtual Dom 這些繁重的比對，移到 build 的階段，把原本直譯式的 JS 搞得好像編譯式一樣

<img src="https://i.imgur.com/oawMIJs.png" alt="tweet" style="width: 500px;" />

這麼做有幾個優點：
1. 在執行的時候，平均較其他框架快 30%
2. 不用一堆有的沒的方法，更貼近原生 JS
    *  像是 setState, useEffect, useMemo 等等      
    *  不會再有學玩 JS 還要再學 React 的感覺
3. React 有許多效能優化的眉眉角角，Svelte 把這些聰明才智留給語言本身，~~再也不用去理解 useMemo 跟 useCallback 差異是什麼~~

## 語法上有什麼不一樣呢？
### 模板
```
<script>
	// logic goes here
</script>

<main>
    Hello World
</main>

<style>
	/* styles go here */
</style>
```
所有頁面會長得類似像這樣，當然也可以分別將 JS 或是 CSS 的部分抽成個別的檔案 import，使用原本的 HTML，而不是 JSX，每個檔案後面是 `.svelte` 結尾
### 條件判斷
```
{#if porridge.temperature > 100}
	    <p>too hot!</p>
    {:else if 80 > porridge.temperature}
        <p>too cold!</p>
    {:else}
        <p>just right!</p>
{/if}
```
類似於 express-handlebars 這種樣板語法

### 迴圈
```
{#each items as item, i}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```
### 事件
前綴加上 `on:`
```
on:click
on:input
on:submit|preventDefault={handleSubmit}
```

### 綁定資料
```
<input bind:value={name}>
<textarea bind:value={text}></textarea>
```

### 怎麼傳遞 props

```
    <ChildComponent title="Ken" />
```

### Styles

Harris 認為，一個框架如果沒有包含 ui framework，就不是一個完整的框架，ui framwork 統一的時代來啦！

```
<p>Styled!</p>

<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
	.ken {
		color: red;
	}
</style>
```

會轉譯成
```
p.svelte-jkyvzs{
    color:purple;
    font-family:'Comic Sans MS', cursive;
    font-size:2em
}
```
像是 ken 這個沒用到的 class name 他會自動過濾掉，並且編譯器還會提醒你這個 class 沒用到，以後刪除沒用的 style 就不用擔心一堆，484 很棒呢？
### 宣告變數
```
let count = 0;
```
要更新變數就直接 `count = count++` 484很直接呢？~~什麼狗屁 setState~~

### 如果變數不管怎樣都要變動呢？
類似於 React Hook 中的 useEffect
```
$: count = 0;
```
用這種方式宣告變數後，之後只要 count 的數值有變動，整個 component 都會再重跑一次

### async/await
```
{#await promise}
        <!-- promise is pending -->
        <p>waiting for the promise to resolve...</p>
    {:then value}
        <!-- promise was fulfilled -->
        <p>The value is {value}</p>
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
{/await}
```
以往可能會透過一個狀態去控制畫面上 promise 成功或失敗所顯示的東西，現在可以把判斷寫在 HTML 裡面

### 動畫效果
Svelte 提供一些現成的動畫可以直接 import 
現成的方法[在這](https://svelte.dev/docs#run-time-svelte-transition)

### 全域變數
```
import { writable } from 'svelte/store';

export const count = writable(0);
```
創建一個 store 儲存變數，在其他檔案可以透過 `subscribe` 監聽，`update` 去修改

## 結論
所以 Svelte 有什麼缺點嗎？我認為有以下幾點
1. 不太會偵測到 array 或是物件裡面的變動，意思說如果要更改物件或是陣列裡面的東西必須整份更動，所以太巢狀的資料結構是比較麻煩的
2. 可能也是因為 Svelte 3.0 到現在為止還算年輕，針對大型專案架構較少範例可以依循

整體上優點還是相當多的
1. 更好的效能及更小的 bundle size
2. 更貼近原生 JS 跟 HTML

<img src="https://i.imgur.com/dXYmIU4.png" alt="github" style="width: 500px;" />

Todo List 中 Github 的分析

3. 不需要額外載入全域變數管理工具像是 redux 等等
4. Harris 希望能有更全面的 ui framework 直接在 Svelte 這個框架裡面
5. 未來可能會推出像是 Sapper(類似像 Next 框架，自動 code splitting 或是 SSR 等等)、Svelte Native 或是 Svelte GL(3D 動畫效果) 等等  


我認為 Svelte 3 的推出非常具有觀念上的創新，有種 0 到 1 的感覺，先不論何種框架的優劣比較，Svelte 開創出另一條解決前端“**即時互動性**”的方向

> Frameworks without the framework: why didn't we think of this sooner? --- Svelte Official Blog Title


## 其他補充

React 中 reconciliation 的演算機制：
> 對於這個「如何用最少操作去將舊的 tree 轉換成新的 tree」的演算法問題有一些通用的解法，但即使是目前最先進的演算法都還需要 O(n3) 的時間複雜度（n 為 tree 中 element 的數量）。 --- React Doc

> 兩個不同類型的 element 會產生出不同的 tree
> 開發者可以通過 key prop 來指出哪些子 element 在不同的 render 下能保持不變。 --- React Doc

Svelte 簡單的 TodoList 實作，[Repo](https://github.com/ken556621/svelte_todo_list)


## 參考資料
* [Svelte doc](https://svelte.dev/docs#template-syntax-if)
* [Rich Harris 演講影片](https://www.youtube.com/watch?v=AdNJ3fydeao&ab_channel=YouGottaLoveFrontend)


tags:svelte

date:2022/2/5