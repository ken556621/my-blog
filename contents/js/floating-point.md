# [筆記]浮點數(Floating Point)整理

## 目錄
* 何謂浮點數？
* 為何需要浮點數？
* 最令人困惑的問題 0.1 + 0.2 ≠ 0.3
* 那要怎麼解決這種小數點精算的問題？
* 結論

## 何謂浮點數？

在了解浮點數之前，可以先大概了解一下跟他相對應的**定點數**

### 定點數：

小數點固定，整個數字表示為 整數 + 小數

今天要表示 25.125

那定點數表示法就是 25 125，中間再以小數點作為連接

### 浮點數：

小數點是漂浮不定的，整個數字表示分為 有效數字跟指數，類似於科學記號表示法

今天要表示 25.125

那浮點數表示法就是 2.5125 \* 10^-1

## 為何需要浮點數？

今天若需要儲存那些很大的數字或很小的數字的時候，為了要讓精度提高，我們會需要大量的記憶體去儲存那些數字

像是 150000000 和 0.00000015

若是以浮點數表示就是 1.5*10^7 和 1.5 * 10^-7

電腦只需要儲存 1.5 有效位數跟 7 指數這兩個數字，這樣節省大量記憶體，也讓我們能夠操作很大或是很小的數字

若以圓周率來說

3.14159265359

若要很精確儲存圓周率，需要極大的記憶體才能儲存，儲存越多的位數，代表越精準

在記憶體有限的狀況下，我們會使用約略值去表示，像是 3.14

所以浮點數讓我們能儲存很大或很小的數字，但它本身可能只是一個約略值

## 最令人困惑的問題 0.1 + 0.2 ≠ 0.3

之所以 0.1 + 0.2 ≠ 0.3 是因為我們電腦用二進位浮點數去表示這些數字，然而 1/10 跟 2/10 並不是二進位可以明確表示出來的，導致他最終會以約略值去呈現

0.1 → 0.0011001100110011......

0.2 → 0.001100110011....

後面...為受限於有效位數約為 23 位數(單精度)的情況下，後面的會被省略掉

結果就是兩個相加後不會直接等於 0.3

## 那要怎麼解決這種小數點精算的問題？

在處理像是匯率或是跟錢相關的問題時，我們可以先將有小數點的數字乘於一定的倍數讓其沒有小數點，運算後再將其除回去即可，或是改成十進位制

## 結論

1. 浮點數是類似於科學記號的表示法
2. 浮點數解決了儲存很巨量或很小的數字佔太多記憶體問題
3. 浮點數本身可能只是一個約略值，在做精確的小數點計算可能會有非預期的結果
4. 太大的數字浮點數也有可能會造成溢位

tags:floating-point

date:2021/10/14