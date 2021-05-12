# Continue, Break, Return 的差異

## 目錄
* Continue
* Break
* Return

## Continue

```
for (let index = 0; index < 10; index++) {
        if (index === 5) {
            console.log("continue")
            continue
        }
        console.log(index)
    }

    // log 出 0, 1, 2, 3, 4, continue, 6, 7, 8, 9
```

## Break
```
for (let index = 0; index < 10; index++) {
        if (index === 5) {
            console.log("break")
            break
        }
        console.log(index)
    }

    // log 出 0, 1, 2, 3, 4, break
```

## Return
```
for (let index = 0; index < 10; index++) {
        if (index === 5) {
            console.log("return")
            return
        }
        console.log(index)
    }

    // log 出 0, 1, 2, 3, 4, return
```

## 總結
* 在終止迴圈中，break 跟 return 功能相似，差別在是否要 return 東西而已
* Continue 本身會跳過該迭代繼續下一個迭代


tags:iteration

date:2021/5/12