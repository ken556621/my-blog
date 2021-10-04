# [Design Pattern]工廠模式 Factory

## 目錄

* 何謂 Factory?
* 為何需要 Factory ?
* 結論

## 何謂 Factory?

> 工廠模式通常為一個裡面有許多方法的 class，但在 js 中，工廠模式為一個函式，它回傳一個物件

## 為何需要 Factory ?

假設今天我們要用物件創建一個員工

```jsx
const employee1 = {
  name: "Ken",
  category: "Developer",
  work: () => console.log("Working")
};
```

如果又要新增一個員工

```jsx
const employee2 = {
  name: "John",
  category: "Designer",
  work: () => console.log("Working")
};
```

每次新增一個員工都要增加一個物件

但如果使用工廠方法，使用一個 function 回傳一個物件

```jsx
function employeeFactory(name, category) {
  const workingMessage = "Working...";
  return {
    name: name,
    category: category,
    work: () => console.log(workingMessage)
  };
}
```

之後要新增員工只要

```jsx
const employee1 = employeeFactory("Ken", "Developer");
const employee2 = employeeFactory("John", "Designer");
```

## 結論

我們可以看到使用工廠模式的好處有

1. 共同擁有的東西不用一寫再寫，像是每個員工都有 work 這個功能
2. 差異點可以用參數傳入，像是名字和職業別
3. 回傳出來的 function 可以使用閉包的特性保內部的值並且不會被外面更改，像是 work 這個方法
4. 我們使用工廠方法時，不需要知道內部是如何運作的

```jsx
const employee1 = employeeFactory("Ken", "Developer");
```

我們只需要知道 employeeFactory 會回傳什麼出來就好，裡面怎麼辦到的我們不需要知道

tags:design-pattern-factory

date:2021/10/2
