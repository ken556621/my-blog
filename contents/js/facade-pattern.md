# 設計模式-外觀模式

## 目錄
* 簡介
* 使用時機
* 範例
* 與其他模式差異
* 參考資料


## 簡介
Facade 一詞源自於法語，意思是門面

假設你每天早上起床後都要：

1. 刷牙洗臉
2. 喝咖啡
3. 讀 Design Pattern

那就會是

```js
function 刷牙() {

}

function 喝咖啡() {

}

function 讀 Design Pattern() {

}
```

外觀模式就是

```js
function 早晨例行工作() {
    刷牙
    喝咖啡
    讀 Design Pattern
}
```

那你每天早上只要呼叫

```js
早晨例行工作()
```

如此我們就有個美麗的外觀了

## 使用時機

* 內部系統過於複雜


優點：不需知道內部系統如何運作
缺點：違反開閉原則，若要客製化修改缺乏彈性

## 範例

常常需要一起呼叫的 function，直接包成一包

```js
const myEvent = {
  stop: function (e) {
    e.preventDefault();
    e.stopPropagation();
  }
}
```

另外適合外觀模式的情境，針對不同瀏覽器的處理

```js
const myEvent = {
  stop: function (e) {
      if(IE 瀏覽器){

      }
      if(Firefox 瀏覽器){

      }
      if(Chrome 瀏覽器){

      }
  }
}
```

[Lodash](https://lodash.com/docs/4.17.15)

> 專門處理 Arrays, numbers, objects, strings

* Iterating arrays, objects, & strings
* Manipulating & testing values
* Creating composite functions

CloneDeep: 深複製

```js
const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4

function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}
```

## 與其他模式差異


Adapter Pattern:
> 轉接頭模式，可以個別轉換介面，方便好用，但容易造成程式碼混亂

* 差異：將個別介面用不同的介面呈現，可以客製化個別介面

> "An Adapter is used when the wrapper must respect a particular interface and must support a polymorphic behavior. On the other hand, a facade is used when one wants an easier or simpler interface to work with."

回到家一鍵打開電燈、投影幕、投影機、煮好一杯咖啡和自動打開 design pattern，這個是**外觀模式**
但今天發現投影機是 type C 接頭，來了轉接頭來弄，這是**轉接頭模式**

Decorator Pattern:
> 不改變其介面的前提下去新增方法，未來增加需求有很高的彈性

* 差異：他是直接加在原物件裡面，而不是新增一個介面

Proxy Pattern:
> 要創立的物件太過肥大，所以創建一個相對小的，用小的去管理那個肥大的物件

* 差異：外觀模式單純創造介面，本身不會去管理原本的系統，Proxy 通常會做所謂的 house keeping 的動作




## 參考資料

https://www.runoob.com/design-pattern/facade-pattern.html

[differences-between-facade-pattern-and-other-patterns](https://stackoverflow.com/questions/2760843/differences-between-facade-pattern-and-other-patterns)

[difference-between-the-facade-and-adapter-pattern](https://stackoverflow.com/questions/2961307/what-is-the-difference-between-the-facade-and-adapter-pattern)


tags:facade-pattern

date:2021/2/18