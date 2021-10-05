# [JS]為何要陣列或物件？陣列及物件常見操作方式

## 目錄

- 為何需要陣列？
- 為何需要物件？
- 陣列常見操作方式
- 物件常見操作方法
- 陣列物件混合

## 為何需要陣列？

陣列的關鍵在於有順序性，並且有其對應的編號

我們今天走到便利商店幫老爸買香菸，每種煙都會有對應的號碼，並且按照順序排列，老爸今天就算講不清楚香菸品牌，我們也能依照對應的號碼買到對的香煙

陣列好處：

- 方便查找

對應的編號，直接對應到該項目

- 方便計算

依據編號最後一項去推算總共有幾種香煙

- 方便新增

今天要新增一種香煙，只要把它放到編號的最後面即可

- 方便檢查

那些編號賣光也能立即補貨

- 方便全部掃過

手指頭對著編號一，一路往右邊移動可以快速遍歷過全部的香煙

```jsx
const cigaretteList = ["金邊臣", "駱駝", "寶馬"];
```

## 為何需要物件？

物件的關鍵在於他是一個 key 對應一個 value，這是什麼意思呢？

就像是線上遊戲每個角色都有自己的名字(key)，每個角色對應一種職業(value)

名字 → 職業

每個人的名字不能重複，但職業可以

所以我們今天只要搜尋這個人名，就可以知道他的職業是什麼

物件的好處：

- 方便查找

相較於陣列，我們只要知道名字就能知道他的職業，不需要知道他的編號

- 方便刪除

由於陣列有順序性，刪除其中一項會導致裡面的編號錯亂，但物件不會有這個問題

- 方便新增

多一個玩家註冊，只要確定他的名字沒人使用過，就可以直接新增

```jsx
const playerList = {
  Ken: "Magician",
  John: "Swordsman",
  Kevin: "Assassin"
};
```

## 陣列常見操作方式

- 讀取

```jsx
const cigaretteList = ["金邊臣", "駱駝", "寶馬"];

console.log(cigaretteList[0]); // 金邊臣
console.log(cigaretteList[1]); // 駱駝
console.log(cigaretteList[2]); // 寶馬
```

陣列開頭編號(index)從 0 開始，欲讀取的項目，將其編號寫在 [] 裡面即可

- 新增

```jsx
const cigaretteList = ["金邊臣", "駱駝", "寶馬"];

// 將新的項目推至陣列最後一項
cigaretteList.push("長壽");

console.log(cigaretteList); // ["金邊臣", "駱駝", "寶馬", "長壽"]
```

通常新增至最後一項而不是插入到其中任一項，是避免陣列的順序性被打亂

- 移除

```jsx
const cigaretteList = ["金邊臣", "駱駝", "寶馬", "長壽"];

// 將陣列最後一項移除
cigaretteList.pop();

console.log(cigaretteList); // ["金邊臣", "駱駝", "寶馬"]
```

- 合併

```jsx
const cigaretteList = ["金邊臣", "駱駝", "寶馬"];
const cigaretteList2 = ["卡七", "長壽"];

// 將兩個陣列合併
const combineList = cigaretteList.concat(cigaretteList2);

console.log(combineList); // ["金邊臣", "駱駝", "寶馬", "卡七", "長壽"]
```

- 遍歷

```jsx
const cigaretteList = ["金邊臣", "駱駝", "寶馬"];

cigaretteList.forEach(item => {
  console.log(item);
}); // "金邊臣", "駱駝", "寶馬"
```

## 物件常見操作方法

- 讀取

```jsx
const playerList = {
  Ken: "Magician",
  John: "Swordsman",
  Kevin: "Assassin"
};

// bracket notation 讀取方法
console.log(playerList["Ken"]); // "Magician"

// dot notation 讀取方法
console.log(playerList.Ken); // "Magician"
```

- 新增

```jsx
const playerList = {
  Ken: "Magician",
  John: "Swordsman",
  Kevin: "Assassin"
};

// dot notation 新增方法
playerList.Ryan = "Developer";

// bracket notation 新增方法
playerList["Sofia"] = "Designer";

console.log(playerList);

/*{
	Ken: "Magician",
	John: "Swordsman",
	Kevin: "Assassin",
	Ryan: "Developer",
	Sofia: "Designer"
}*/
```

- 更新

```jsx
const playerList = {
  Ken: "Magician",
  John: "Swordsman",
  Kevin: "Assassin"
};

// dot notation 新增方法
playerList.Kevin = "Developer";

// bracket notation 新增方法
playerList["John"] = "Designer";

console.log(playerList);

/*{
	Ken: "Magician",
	John: "Designer",
	Kevin: "Developer"
}*/
```

## 陣列物件混合

```jsx
const playerList = {
  Ken: "Magician",
  John: "Swordsman",
  Kevin: "Assassin",
  topLevelPlayer: ["Johnny", "Lillian", "Tom"]
};

console.log(playerList["topLevelPlayer"][0]); // Johnny
```

tags:array-object

date:2021/10/5
