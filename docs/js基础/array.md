# js基础之数组
<!-- TOC -->

- [前言](#前言)
- [数组基础](#数组基础)
  - [简介](#简介)
  - [属性](#属性)
    - [length](#length)
    - [prototype](#prototype)
    - [constructor](#constructor)
  - [基础操作](#基础操作)
    - [创建数组](#创建数组)
    - [检测数组](#检测数组)
  - [数组方法](#数组方法)
    - [Array.isArray(obj)](#arrayisarrayobj)
    - [Array.from(arrayLike, mapFn, thisArg)](#arrayfromarraylike-mapfn-thisarg)
  - [数组实例方法](#数组实例方法)
    - [转换方法 <small>join</small>](#转换方法-smalljoinsmall)
      - [arr.join(separator)](#arrjoinseparator)
    - [栈方法 <small>push,pop</small>](#栈方法-smallpushpopsmall)
      - [arr.push(item...)](#arrpushitem)
      - [arr.pop()](#arrpop)
    - [队列方法 <small>unshift,shift</small>](#队列方法-smallunshiftshiftsmall)
      - [arr.unshift(item...)](#arrunshiftitem)
      - [arr.shift()](#arrshift)
    - [重排序方法 <small>reverse,sort</small>](#重排序方法-smallreversesortsmall)
      - [arr.reverse()](#arrreverse)
      - [arr.sort(comparefn)](#arrsortcomparefn)
    - [操作方法  <small>concat, slice, splice, copyWithin, fill</small>](#操作方法--smallconcat-slice-splice-copywithin-fillsmall)
      - [arr.concat(item...)](#arrconcatitem)
      - [arr.slice(start,end)](#arrslicestartend)
      - [arr.splice(start, deleteCount, item...)](#arrsplicestart-deletecount-item)
      - [arr.copyWithin(target, start, end)](#arrcopywithintarget-start-end)
      - [arr.fill(value, start, end)](#arrfillvalue-start-end)
    - [位置方法 <small>indexOf, lastIndexOf, includes</small>](#位置方法-smallindexof-lastindexof-includessmall)
      - [arr.indexOf(searchElement, start)](#arrindexofsearchelement-start)
      - [arr.lastIndexOf(searchElement, start)](#arrlastindexofsearchelement-start)
      - [arr.includes(searchElement, fromIndex)](#arrincludessearchelement-fromindex)
    - [迭代方法 <small>every, some, map, forEach,find,findIndex,entries,keys,values</small>](#迭代方法-smallevery-some-map-foreachfindfindindexentrieskeysvaluessmall)
      - [arr.every(callback，thisArg)](#arreverycallbackthisarg)
      - [arr.some(callback, thisArg)](#arrsomecallback-thisarg)
      - [arr.filter(callback, thisArg)](#arrfiltercallback-thisarg)
      - [arr.forEach(callback)](#arrforeachcallback)
      - [arr.map(callback)](#arrmapcallback)
      - [arr.find(callback, thisArg)](#arrfindcallback-thisarg)
      - [arr.findIndex(callback, thisArg)](#arrfindindexcallback-thisarg)
      - [arr.entries()  arr.keys()  arr.values()](#arrentries--arrkeys--arrvalues)
    - [归并方法 <small>reduce,reduceRight</small>](#归并方法-smallreducereducerightsmall)
      - [arr.reduce(callback, initialValue)](#arrreducecallback-initialvalue)
      - [arr.reduceRight(callback, initialValue)](#arrreducerightcallback-initialvalue)
- [数组常见问题练习](#数组常见问题练习)
  - [数组合并](#数组合并)
    - [多个一维数组合并](#多个一维数组合并)
    - [多维（复合）数组合并成一维数组](#多维复合数组合并成一维数组)
  - [数组去重](#数组去重)
    - [双重循环去重](#双重循环去重)
    - [排序遍历去重](#排序遍历去重)
    - [对象键值对法](#对象键值对法)
    - [使用ES6的 Set 和 Map 方法](#使用es6的-set-和-map-方法)
  - [数组随机排序](#数组随机排序)
    - [递归的方法](#递归的方法)
    - [随机交换数组内的元素 (原理from underscore.js）](#随机交换数组内的元素-原理from-underscorejs)
    - [随机从原数组抽取一个元素,加入到新数组](#随机从原数组抽取一个元素加入到新数组)
  - [取数组中最大值最小值](#取数组中最大值最小值)
    - [遍历比较方法](#遍历比较方法)
      - [归并比较方法](#归并比较方法)
  - [将一个数按大小顺序插入数组并返回索引值](#将一个数按大小顺序插入数组并返回索引值)
    - [使用 push + sort + indexOf 方法](#使用-push--sort--indexof-方法)
    - [使用 sort + findIndex + splice 方法](#使用-sort--findindex--splice-方法)
  - [从数组中寻找元素并删除元素](#从数组中寻找元素并删除元素)
    - [arguments + indexOf + filter 遍历判断法](#arguments--indexof--filter-遍历判断法)
    - [slice(或解构运算符) + es6 set + filter 方法](#slice或解构运算符--es6-set--filter-方法)

<!-- /TOC -->
## 前言
前端新技术铺天盖地，各种框架、工具层出不穷眼花缭乱。最近重温JS基础，夯实的基础才是学习新技术的基石。本文作为读书笔记简单总结下js数组的基础知识

## 数组基础
### 简介
数组是应用最广泛的数据存储结构。它被植入到大部分编程语言中。在 ECMAScript 中数组是非常常用的引用类型。

**==语法版==**

![image](https://raw.githubusercontent.com/lijiliang/record/master/images/array.png)

### 属性
#### length

length属性表示数组的长度，即其中元素的个数。
JavaScript数组的length属性是可变的，当length属性被设置得更大时，整个数组的状态事实上不会发生变化，仅仅是length属性变大；当length属性被设置得比原来小时，则原先数组中索引大于或等于length的元素的值全部被丢失。

#### prototype

返回对象类型原型的引用。prototype 属性是 object 共有的。
一般用来给数组实例添加方法。

#### constructor

表示创建对象的函数。
说明：constructor 属性是所有具有 prototype 的对象的成员。constructor 属性保存了对构造特定对象实例的函数的引用。

### 基础操作
#### 创建数组
```js
// 数组实例的创建
var arr = []
var arr = new Array() //创建一个空数组 []
var arr = new Array(5) //创建一个length为5的数组 [undefined, undefined, undefined, undefined, undefined]
var arr = new Array(1,2,3,4,5) //创建数组并赋值 [1,2,3,4,5]

var arr = Array.of(7);       // 创建数组并赋值 [7]
var arr = Array.of(1, 2, 3); // 创建数组并赋值 [1, 2, 3]
```
#### 检测数组
```js
// 判断一个对象是不是数组
var arr = []
if(arr instanceof Array){}   // 方法一
if(Object.prototype.toString.call(arr) == '[object Array]'){}  // 方法二
if(Array.isArray(arr)){}  //方法三
if(arr.constructor == Array)  // 方法四
```

### 数组方法
#### Array.isArray(obj)
检测对象是否 Array ，是则返回true，否则为false。

#### Array.from(arrayLike, mapFn, thisArg)
该方法从一个类似数组或可迭代对象创建一个新的数组实例。参数 arrayLike 是想要转换成真实数组的类数组对象或可遍历对象。mapFn 是可选参数，如果指定了该参数，则最后生成的数组会经过该函数的加工处理后再返回。thisArg是可选参数，为执行 mapFn 函数时 this 的值。

所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组。

实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的 arguments 对象。
```js
let arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}
let arrayLike2 = {length: 3}
let str = 'abcd'
let newArray = Array.from(arrayLike) //['a', 'b', 'c']
let newArray2 = Array.from(arrayLike, (v) => v+'1') //['a1', 'b1', 'c1']
let newArray3 = Array.from(arrayLike2) // [undefined, undefined, undefined]
let newArray4 = Array.from(str) // ['a', 'b', 'c', 'd']
```

### 数组实例方法
#### 转换方法 <small>join</small>
##### arr.join(separator)
把数组构构造成字符串，它先把数组中的每个元素转换成字符串，然后再用 separator 分隔符把它们链接在一起，separator 分隔符默认是逗号 “,”，要想做到无间隔链接，可以使用空字符串作为 separator：
```js
var arr = [1,2,3,4,5]
arr.join('|') //"1|2|3|4|5"
arr.join("") //12345

//另所有对象有具有的 toLocaleString、toString、valueOf，可以看作是join的特殊用法，不常用
```
#### 栈方法 <small>push,pop</small>
##### arr.push(item...)
将一个或多个新元素添加到数组结尾，并返回数组新长度。

##### arr.pop()
移除最后一个元素并返回该元素值。

#### 队列方法 <small>unshift,shift</small>
##### arr.unshift(item...)
将一个或多个新元素添加到数组开始，数组中的元素自动后移，返回数组新长度。

##### arr.shift()
移除最前一个元素并返回该元素值，数组中元素自动前移.如果这个数组是空的，它会返回 undefined。shift 通常比 pop 慢的多。

#### 重排序方法 <small>reverse,sort</small>
##### arr.reverse()
反转数组的顺序.

##### arr.sort(comparefn)
给数组排序，默认升序。

注意 sort 默认会将数组内容视为字符串来排序，所以对数字排序时默认的排序规则会错的离谱。一般我们给sort带入个比较函数来替代原来的默认的比较方法，比较方法接受两个参数，如果两个参数相等则返回0，如果第一个参数应该排在前面则返回一个负数，如果第二个参数应该排在前面则返回一个正数：
```js
//数组排序
var arr = [2,3,1,5,4]
arr.sort(function(a, b) {
return a - b
}) // [1,2,3,4,5]
```

#### 操作方法  <small>concat, slice, splice, copyWithin, fill</small>
##### arr.concat(item...)
方法产生一份 arr 的潜复制，并将多个数组（也可以是字符串，或者是数组和字符串的混合）附加在其后连接为一个数组，返回连接好的新的数组。

##### arr.slice(start,end)
该方法对数组中的一段做浅复制，首先复制数组 `arr[start]` 至 `arr[end]` 的部分，注意不包括 end 对应的元素，如果省略 end 将复制 start 之后的所有元素（或者理解成 end 的默认值为 arr.length）。字符串也有个同名方法 string.slice。

##### arr.splice(start, deleteCount, item...)
该方法从 arr 中移除一个或多个元素，并将新的 item 插入至移除元素的开始位置， 参数 start 是移除元素的开始位置，deleteCount 是要移除的元素的个数，item 是要被插入的元素。它返回一个包含被移除元素的数组。

##### arr.copyWithin(target, start, end)
该方法复制数组的一部分到同一数组中的另一个位置（会覆盖原成员），并返回修改后的数组。使用这个方法，会修改当前数组。参数 target 为开始替换数据的位置，若 target 大于等于 arr.length，将会不发生拷贝。start 是可选参数，为开始读取数据的位置，默认为0。end 是可选参数，为停止读取数据的位置，默认为 arr.length。
```js
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
// 表示将从3号位直到数组结束的成员（4和5），复制到从0号位开始的位置，结果覆盖了原来的1和2。
```

##### arr.fill(value, start, end)
该方法使用给定值填充一个数组，参数 value 是用来填充数组的值。start 是可选参数，为填充开始位置，默认为 0。end 是可选参数，为填充的结束位置，默认为 arr.length。
```js
[1, 2, 3].fill(4)            // [4, 4, 4]
[1, 2, 3].fill(4, 1 , 2)     // [1, 4, 3]
```
fill 方法是个可变方法, 它会改变调用它的 this 对象本身, 然后返回它, 而并不是返回一个副本

#### 位置方法 <small>indexOf, lastIndexOf, includes</small>
##### arr.indexOf(searchElement, start)
该方法返回要查找的项在数组中的位置，如果没找到返回 -1。接受两个参数，searchElement 是要查找的项，start 是查找起始位置的索引，默认是0。

##### arr.lastIndexOf(searchElement, start)
从 start 位置开始向前查找，start 默认值为 arr.length – 1。

注意该方法在比较查找项与数组中每一项时，会使用全等操作符，也就是要求查找的项必须严格相等。

##### arr.includes(searchElement, fromIndex)
该方法用来判断当前数组是否包含某指定的值，如果是，则返回 true，否则返回 false。参数 searchElement 为需要查找的元素值。参数 fromIndex 是可选参数，从该索引处开始查找 searchElement，如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索，默认为 0。 如果fromIndex 大于等于数组长度 ，则返回 false 。该数组不会被搜索。
该方法属于ES7，但Babel转码器已经支持。

```js
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true]
```
没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。

```js
if(arr.indexOf(el) !== -1){
    // ...
}
```
indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判。includes使用的是不一样的判断算法，就没有这个问题。

```js
[NaN].indexOf(NaN)
// -1
[NaN].includes(NaN)
// true
```
includes() 方法有意设计为通用方法。它不要求this值是数组对象，所以它可以被用于其他类型的对象 (比如类数组对象)。

```js
(function(){
    console.log([].includes.call(arguments, 2)) // true
    console.log([].includes.call(arguments, 4)) // false
})(1,2,3)
```

#### 迭代方法 <small>every, some, map, forEach,find,findIndex,entries,keys,values</small>
##### arr.every(callback，thisArg)
对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。callback 被调用时传入三个参数：元素值，元素的索引，原数组。thisArg 为可选参数，指定执行 callback 时使用的 this 值。

##### arr.some(callback, thisArg)
对数组中的每一项运行给定函数，如果该函数对任意一项返回 true，则返回 true。

##### arr.filter(callback, thisArg)
对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。

##### arr.forEach(callback)
对数组中的每一项运行给定函数，这个方法没有返回值。本质上与使用 for 循环迭代数组一样。

##### arr.map(callback)
对数组中的每一项运行给定函数，返回每次函数调用组成的数组。

##### arr.find(callback, thisArg)
该方法对数组所有成员依次执行 callback 函数，直到找出第一个返回值为 true 的成员，然后返回该成员。如果没有符合条件的成员，则返回 undefined。

find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组
```js
[1,4,-5,10].find(v, i, arr) => v < 0
// -5
```
##### arr.findIndex(callback, thisArg)
该方法与 arr.find() 类似，对数组中的成员依次执行 callback 函数，直至照吃第一个返回值为 true 的成员，然后返回该成员的索引。如果没有符合条件的成员，则返回 -1。

```js
[1, 5, 10, 15].findIndex((v, i , arr)=>{
    return v > 9
})
//2
```

##### arr.entries()  arr.keys()  arr.values()
这三个方法都返回一个新的Array Iterator对象，可以用`for...of`循环进行遍历，区别 `是keys()` 是对键名的遍历、`values()` 是对键值的遍历，`entries()` 是对键值对的遍历。

如果不用`for...of`循环，则需要用 `next()` 调用下一个

```js
for (let index of ['a', 'b'].keys()) { console.log(index); }
// 0
// 1

for (let elem of ['a', 'b'].values()) { console.log(elem) ;}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) { console.log(index, elem);}
// 0 "a"
// 1 "b"

var arr = ["a", "b";
var iterator = arr.entries(); // undefined

console.log(iterator); // Array Iterator {}

console.log(iterator.next().value);  // [0, "a"]
console.log(iterator.next().value);  // [1, "b"]
```

#### 归并方法 <small>reduce,reduceRight</small>
##### arr.reduce(callback, initialValue)
##### arr.reduceRight(callback, initialValue)
这个两个方法都会迭代数组所有的项，然后返回一个最终值。

reduce()方法从数组的第一项开始，逐个遍历到最后，而reduceRight()则从数组的最后一项开始，向前遍历到第一项。它们接受两个参数，callback 每一项上调用的函数，callback 被调用时传入四个参数：上一次调用回调返回的值、正在处理的元素、正在处理的元素的索引值（如果提供了 initialValue ，从0开始；否则从1开始）、原数组。initialValue 是可选项，作为归并基础的初始值，其值用于第一次调用 callback 的第一个参数。

## 数组常见问题练习
### 数组合并
#### 多个一维数组合并
如果有两个一维数组，要将他们合并成一个数组：

```js
var arr1 = [1,2]
var arr2 = [3,4]
```
**Array.prototype.concat方法**

```js
var arr = arr1.concat(arr2)
```
**for循环和Array.prototype.push()**

```js
function flation(arr1, arr2){
	for(var i=0;i<arr2.length;i++){
		arr1.push(arr2[i])
	}
	return arr1
}
```

#### 多维（复合）数组合并成一维数组
例如有这么一组多维数组，要把它拍平成1维数组：

```js
var myArray = [[1, 2], [3, 4, 5], [6, 7, 8, 9], [11,12,[12,13,[14]]], 10, 11];

// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10, 11]
```
Array.prototype.push()方法

```js
function flatten(arr, result) {
    if (!result) {
        result = []
    }
    for (var i = 0; i < arr.length; i++) {
        // 判断是否是数组
        if(arr[i].constructor == Array) {
            // 递归
            flatten(arr[i], result)
        } else {
            result.push(arr[i])
        }
    }
    return result
}

flatten(myArray)
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10, 11]
```
**Array.prototype.concat()方法**

```js
// 只能处理二维数组
function flatten(arr) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
        result = result.concat(arr[i])
    }
    return result
}
flatten([[1, 2],[3, 4, 5], [6, 7, 8, 9]]);//[1, 2, 3, 4, 5, 6, 7, 8, 9]
flatten([[1, 2],[3, 4, 5], [6, 7, 8, 9],10,11]);//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```
可以通过Function.prototype.apply()方法，让其变得更简单:

```js
function flatten(arr) {
    return Array.prototype.concat.apply([], arr)
}

// 更精简
function flatten(arr){
    return [].concat.apply([], arr)
}

// ES6 写法
function flatten(arr){
    return [].concat(...arr)
}

function flatten(arr){
   arr = [].concat(...arr)
   return arr.some(Array.isArray) ? flatten(arr) : arr
}
```
如果要处理三维或更多维数组，则需要加一些判断：

```js
function flatten(arr) {
    arr = [].concat.apply([], arr)
    return arr.some(Array.isArray) ? flatten(arr) : arr
}

// 或者
function flatten(arr){
   var isArray = Object.prototype.toString.call(arr) == '[object Array]'
   if(isArray && arr.length > 0){
       var head = arr[0]
       var tail = arr.slice(1)
       return flatten(head).concat(flatten(tail))
   }else{
       return [].concat(arr)
   }
}

flatten([[1, 2], [3, 4, 5], [6, 7, 8, 9], [11,12,[12,13,[14]]], 10, 11])
//[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10, 11]
```
**使用join()和split()**
利用数组实例的 `join()` 方法和字符串实例的 `split()` 方法，也可以将多维数组拍平

```js
function flatten(arr) {
    return arr.join(',').split(',')
}
flatten([[1, 2], [3, 4, 5], [6, 7, 8, 9], [11,12,[12,13,[14]]], 10, 11])
//["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "12", "12", "13", "14", "10", "11"]
```
这种方法的缺点在于返回的数组内全是字符串，如果不需要校验内容类型的话，可以使用这种方法。


### 数组去重
#### 双重循环去重
思路
- 构建一个空数组来存放去重后的数组
- 对原数组循环遍历，每次从数组中取出一个元素与结果数组做对比
- 如果原数组取出的元素与结果数组元素相同，则跳出循环；反之则将其存放到结果数组

```js
function unique(arr){
    var result = []
    for(var i=0;i<arr.length;i++){
        var repeat = false
        for(var j=0; j < result.length; j++){
            if(arr[i] == result[j]){
                repeat = true
                break
            }
        }
        if(!repeat){
            result.push(arr[i])
        }
    }
    return result
}

unique([1,2,2,4,5,76,'a','b','a']);
//[1, 2, 4, 5, 76, "a", "b"]
```
这种方法也可采用 `forEach()` 方法和 `indexOf()`方法模拟实现：

```js
function unique(arr){
    var result = [arr[0]]
    arr.forEach(function(v){
        if(result.indexOf(v) == -1){  //这里 indexOf()也可替换为es7的includes()
            result.push(v)
        }
    })
    return result
}
```

#### 排序遍历去重
思路：
- 构建一个空数组来存放去重后的数组
- 用 `sort()` 方法对原数组做一个排序，排序后对数组做遍历，检查数组中第 `i` 个元素与结果数组中最后一个元素是否相同，如果不同，则放到结果数组中

```js
function unique(arr){
   var result = []
   arr.sort()
   for(var i=0;i<arr.length;i++){
       if(arr[i] != result[result.length - 1]){
           result.push(arr[i])
       }
   }
   return result
}
```
这种方法有两个特色:
- 去重后的数组会做排序，主要是因为原数在去重前做了排序
- 去重后的数组，与数字相同的数字字符无法区分，比如‘1’和1

#### 对象键值对法
思路：
- 创建一个js对象及新数组
- 遍历原数组，每次取出一个元素与对象的键作对比
- 如果不包含，将存入对象的元素的值推入到结果数组中，并将object对象中访属性名的值设为1

```js
function unique(arr) {
    var result = []
    var object = {}
    for (var i = 0; i < arr.length; i++) {
        if (!object[typeof(arr[i]) + arr[i]]) {  //键名里加入typeof(arr[i])是为了区别不同类型的值，如1和`1`
            result.push(arr[i])
            object[typeof(arr[i]) + arr[i]] = 1
        }
    }
    return result
}
unique([1, 2, 3, 4, 3, 2, '1', 'a', 'b', 'a']);
//[1, 2, 3, 4, "a", "b"]
```
这种方法比较耗内存，但运行下来耗时最少，是较为优秀的方案。

#### 使用ES6的 Set 和 Map 方法

```js
//借助 Map 数据结构
function unique(arr) {
    const seen = new Map()
    return arr.filter((v)=> !seen.has(v) && seen.set(v, 1));
}

//借助 Set 数据结构
function unique(arr) {
    return Array.from(new Set(arr)) //或 return [...new Set(arr)]
}

unique([1, 2, 3, 4, 3, 2, '1', 'a', 'b', 'a']);
//[1, 2, 3, 4, "1", "a", "b"]
```

### 数组随机排序
#### 递归的方法
思路：
- 不断从原数组中随机取一个元素放进新数组，同时删除原数组中该值，递归重复至全部取出。

```js
function randomSort(arr, newArr) {
    var newArr = newArr || []
    if (arr.length == 1) {
        newArr.push(arr[0])
        return newArr; // 相当于递归退出
    }

    var random = Math.ceil(Math.random() * arr.length) - 1
    newArr.push(arr[random])
    arr.splice(random, 1)

    return randomSort(arr, newArr)
}
randomSort([1, 2, 3, 4, 5, 6, 7]); //[2, 3, 1, 5, 6, 7, 4]
randomSort([1, 2, 3, 4, 5, 6, 7]); //[3, 4, 2, 5, 1, 6, 7]
```
#### 随机交换数组内的元素 (原理from underscore.js）
思路：
- 遍历数组，每次从i位置后元素随机挑一个放到i位置，将原i位置元素放至被挑元素原位置

```js
Array.prototype.shuffle = function() {
    var len = this.length,
        arr = this.slice(0),
        temp, index;
    for (var i = 0; i < len; i++) {
        index = i + Math.floor(Math.random() * (len - i))
        temp = arr[i]
        arr[i] = arr[index]
        arr[index] = temp
    }
    return arr.slice(0)
}
```
#### 随机从原数组抽取一个元素,加入到新数组
思路：
- 遍历数组，每次从数组中随机挑一个元素（随机数最大值为原数组剩余长度），将该元素拿出来放入新数组。

```js
Array.prototype.shuffle = function() {
    var len = this.length,
        arr = this.slice(0),
        result = [],
        index;
    for (var i = 0; i < len; i++) {
        index = Math.floor(Math.random() * (len - i))
        console.log(index)
        result.push(arr.splice(index, 1)[0])
    }
    return result
}
[1, 2, 3, 4, 5, 6, 7].shuffle()
//[5, 3, 2, 1, 7, 4, 6]
```

### 取数组中最大值最小值
#### 遍历比较方法
思路：
- 设一个变量存最大值，将数组中第一个值赋值给该变量
- 遍历数组与最大值变量比较，如果大于最大值，则将该值赋值最大值变量
- 遍历结果后，变量里存的就是数组里的最大值

```js
function max(arr){
    var max = arr[0]
    arr.forEach(function(v){
        if(v > max){
            max = v
        }
    })
    return max
}
console.log(max([1,45,23,3,6,2,7,234,56]))   // 234
```

##### 归并比较方法
思路：
- 使用数组实例reduce(function(prev, curv, index, arr))方法
- 依次比较回调函数中参数prev,curv的大小，返回大的那个

```js
function max(arr){
    return arr.reduce(function(prev, curv){
        return prev > curv ? prev : curv
    })
}
console.log(max([1,45,23,3,6,2,7,234,56]))
```

### 将一个数按大小顺序插入数组并返回索引值
任务：

构建一个函数where(arr, num)，函数接受两个参数，一个是数组arr，一个是要插进数组的数字num，函数将num按大小顺序插进arr，并返回num的索引值。例如：

```js
where([1,2,3,4], 1.5) //1
where([20,3,5],19) //2
where([40,60],50) //1
```
#### 使用 push + sort + indexOf 方法
思路：
- 通过 `push()` 或 `unshift()` 方法将 num 插入 arr
- 使用 `sort()` 对 arr 进行排序
- 使用 `indexOf()` 找出 num 在 arr 中的 index（或使用for、forEach、some循环）
- 返回 index

```js
function where(arr, num) {
    arr.push(num)
    arr.sort(function(a,b){
        return a - b
    })

    return arr.indexOf(num)
}

// 或者
function where(arr, num){
    arr.push(num)
    arr.sort(function(a,b){
        return a - b
    })

    var index
    arr.some(function(v, i){
        if(v === num){
            index = i
            return true
        }
    })
    return index
}

var a = [1,2,3,4]
where(a, 1,5) //1, a = [1,1.5,2,3,4]
```
#### 使用 sort + findIndex + splice 方法
思路：
- 使用 `sort()` 对 arr 进行排序
- 使用 `findIndex()` 找出 arr 中第一个大于 num 的元素的位置
- 使用 `splice()` 将 num 插入该元素前

```js
function where(arr, num){
    arr.sort((a,b) => a - b )
    const index = arr.findIndex(v => v > num)
    // 找到位置后利用splice插入到数组
    arr.splice(index, 0, num)
    return index
}

var a = [1,2,3,4]
where(a, 1,5) //1, a = [1,1.5,2,3,4]
```

### 从数组中寻找元素并删除元素
任务：

构建一个函数destroyer(arr, item…)，传入数组与要删除的指定值，返回删除指定值后的数组，例如：
```js
destroyer([1,2,3,4,1,3,2],1,2) //[3,4,3]
```
####  arguments + indexOf + filter 遍历判断法
思路：

- 通过 arguements 对象分别获取到数组 arr 和指定要删除的元素，将指定元素转换成数组 removeArgs
- 使用 `filter()` 筛选出 arr 内与 removeArgs 内不相同的元素，筛选规则通 `indexOf()` 方法判断

```js
function destroyer(para){
    var arr = arguments[0]
    var removeArgs = []  // 找出要删除的元素
    for(var i = 1; i < arguments.length; i++){
        removeArgs.push(arguments[i])
    }
    var isFalse = function(v){
        return removeArgs.indexOf(v) === -1
    }
    return arr.filter(isFalse)
}
var result = destroyer([1,2,3,4,1,3,2],1,2) //[3,4,3]
console.log(result)
```

#### slice(或解构运算符) + es6 set + filter 方法
思路：
- 利用 call() 对 arguments 使用数组的 slice() 分别获取到原数组和指定值
- 将指定值传递进 new Set 对象
- 利用 filter() 筛选出 arr 内与 set 对象内不相同的元素，筛选规则通过 set 对象的 has() 方法判断

```js
function destroyer(para){
    var removeArgs = new Set(Array.prototype.slice.call(arguments, 1))
    return para.filter(v => !removeArgs.has(v))
}

// 或者
function destroyer(arr, ...items){
    var removeArgs = new Set(items)
    return arr.filter(v => !removeArgs.has(v))
}

var result = destroyer([1,2,3,4,1,3,2],1,2) //[3,4,3]
console.log(result)
```

### 参考
[MDN 的 JavaScript 标准库 Array 部分](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
