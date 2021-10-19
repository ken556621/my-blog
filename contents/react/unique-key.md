# [筆記]為何 React 會需要 unique key prop?

## 目錄

- 為何會有這個警告？
- React 渲染流程，Virtual Dom 比對的演算法 Reconciliation
- React key prop 的出現
- 結論

在開發中，我們常需要使用 map 去 render 多個列表

```jsx
const App = () => {
  return (
    <div className="App">
      {[1, 2, 3].map(item => (
        <li>Duke</li>
      ))}
    </div>
  );
};

export default App;
```

而這時候，React 便會好意提醒我們需要在每個 child 中面增加一個 unique "key"

![](https://i.imgur.com/gbCrBQY.png)

## 為何會有這個警告？

在提及這個警告之前，我們可以先了解一下 React 是如何去渲染畫面的

## React 渲染流程，Virtual Dom 比對的演算法 Reconciliation

我們都知道 React 有個 virtual dom ，每次 render dom tree 的時候都會比對上次與這次的 dom tree 有什麼差別，並且只針對有變化的部分做 render

Reconciliation 就是如何去比對 virtual dom 與實際 dom 差異的演算法

這讓我們不太需要去了解實際畫面上有哪些東西是有被更新的，也能處理好效能的問題，畢竟操作 dom 是一件算成本蠻高的事情

但也正因為我們不知道 Reconciliation 到底做了什麼比對，這也讓我在 React 跳出某些警告的時候會搞不太清楚狀況，所以今天想要稍微了解一下這個演算法的機制

首先官方說 Reconciliation 是個 O(n) 時間複雜度的演算法，能夠達到這麼好的時間複雜度靠兩個東西

1. 不同的元素就會生成不同的 tree
2. 開發者可以給不同的 child 獨一無二的 key prop 確保 render 過程中是穩定的

### 何謂不同的元素？

像是 a 跟 img 就為不同的元素，或是其他自定義的元素像是 Header 也都是算不同的元素，這些不同的元素都會將原本舊的 dom tree 移除清空原本的 state 並觸發 componentWillUnmount() 然後再觸發 componentDidMount() 將新的元素 render 到 dom tree

所以當

```
<div>
  <Counter />
</div>
```

變為

```jsx
<span>
  <Counter />
</span>
```

因為 div 跟 span 為不同的元素，所以會將原本的 dom tree 移除並重新建立一個新的，這邊可以注意到有個自定義的 <Counter />，雖然前跟後都是一樣，但自定義的 component React 將其視為不同的元素

### 相同元素如何比對？

```jsx
<div className="before" title="stuff" />
```

```jsx
<div className="after" title="stuff" />
```

因為同為相同 div 元素，React 會針對不一樣處 className 去做改變

```jsx
<div style={{ color: "red", fontWeight: "bold" }} />
```

```jsx
<div style={{ color: "green", fontWeight: "bold" }} />
```

若是 style 的改變則會只針對有改變的 style 去做更動，像是 color

### 元素中有多個 child

```
<ul>
  <li>first</li>
  <li>second</li>
</ul>
```

```
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

React 會比對前兩個 li first 跟 second 是一樣的，然後將 third 的 li 插入

```jsx
<ul>
  <li>second</li>
  <li>third</li>
</ul>
```

```jsx
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

但如果今天新增的 li 是第一項的話，效能就會比較差，如同在 Array 中從中間或第一項位置插入會有比較差的時間複雜度應該是一樣的意思

## React key prop 的出現

為了解決剛剛上述從第一項或中間項插入 child 會造成效能比較差的狀況，React 推出 key 屬性，主要目的是要辨識不同的 child，也就是給不同的 child 一個獨一無二的身分證

```
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

```
<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

這樣 React 就知道 key="2014" 是新出現的 li，這樣就只要更新它就好了

### 該選什麼東西當作 child 的 key？

key 需要為獨一無二且穩定，他的獨一無二只需要在這個列表內是就好，不需要到整個專案都是獨一無二的

index 雖然是獨一為二的，但如果列表有新增、刪除或重新排序的話，index 就會跟不同的 child 重複到，官方是說這是最後的策略，若有重新排序效能也會比較差

Math.random() 則為不穩定的 key，會導致許多沒必要的重新建構 dom tree

如果找不到獨一無二的值當作 key，官方這邊有建議可以使用一些 hash function 去產，我通常都用 uuid 的套件去產出一個獨一無二的 key

## 結論

- 在 render child 的時候加 unique key prop 是為了讓 React 能更好辨識每次更新需要更新哪些
- key 在列表內須為獨一無二且穩定的，給 index 作為 key 為下下策

tags:unique-key

date:2021/10/19
