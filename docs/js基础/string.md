# js基础之字符串
<!-- TOC -->

- [前言](#前言)
- [字符串基础](#字符串基础)
  - [简介](#简介)
  - [属性](#属性)
    - [length](#length)
    - [prototype](#prototype)
    - [constructor](#constructor)
  - [基础操作](#基础操作)
    - [创建字符串](#创建字符串)
    - [检测字符串](#检测字符串)
  - [字符串方法](#字符串方法)
    - [String.fromCharCode(num1, ..., numN)](#stringfromcharcodenum1--numn)
    - [String.fromCodePoint(num1[, ...[, numN]])](#stringfromcodepointnum1--numn)
  - [字符串实例方法](#字符串实例方法)
    - [查找方法 <small>charAt, charCodeAt, codePointAt, at, indexOf, lastIndexOf, includes, startsWith, endsWith</small>](#查找方法-smallcharat-charcodeat-codepointat-at-indexof-lastindexof-includes-startswith-endswithsmall)
      - [str.charAt(index)](#strcharatindex)
      - [str.charCodeAt(index)](#strcharcodeatindex)
      - [str.codePointAt(pos)](#strcodepointatpos)
      - [str.at(pos)](#stratpos)
      - [str.indexOf(searchValue[, fromIndex])](#strindexofsearchvalue-fromindex)
      - [str.lastIndexOf(searchValue[, fromIndex])](#strlastindexofsearchvalue-fromindex)
      - [str.includes(searchString[, postion])](#strincludessearchstring-postion)
    - [截取方法 <small>substring, substr, slice</small>](#截取方法-smallsubstring-substr-slicesmall)
      - [str.substring(indexStart[, indexEnd])](#strsubstringindexstart-indexend)
      - [str.slice(beginSlice[, endSlice])](#strslicebeginslice-endslice)
      - [str.substr(start[, length])](#strsubstrstart-length)
    - [操作方法 <small>concat, repeat, padStart, endStart</small>](#操作方法-smallconcat-repeat-padstart-endstartsmall)
      - [str.concat(string2, string3[, ..., stringN])](#strconcatstring2-string3--stringn)
      - [str.repeat(count)](#strrepeatcount)
      - [str.padStart(targetLength [, padString])](#strpadstarttargetlength--padstring)
    - [大小写转换方法 <small>toLowerCase, toLocaleLowerCase, toUpperCase, toLocaleUpperCase</small>](#大小写转换方法-smalltolowercase-tolocalelowercase-touppercase-tolocaleuppercasesmall)
      - [str.toLowerCase()](#strtolowercase)
      - [str.toUpperCase()](#strtouppercase)
    - [模式匹配方法 <small>search, replace, split, match</small>](#模式匹配方法-smallsearch-replace-split-matchsmall)
      - [str.search(regexp|substr)](#strsearchregexpsubstr)
      - [str.replace(regexp|substr, newSubStr|function)](#strreplaceregexpsubstr-newsubstrfunction)
      - [str.split([separator[, limit]])](#strsplitseparator-limit)
      - [str.match(regexp|substr)](#strmatchregexpsubstr)
    - [其它方法 <small>localeCompare, trim, ${}</small>](#其它方法-smalllocalecompare-trim-small)
      - [referenceStr.localeCompare(compareString[, locales[, options]])](#referencestrlocalecomparecomparestring-locales-options)
      - [str.trim()](#strtrim)
      - [${}](#)

<!-- /TOC -->
## 前言
前端新技术铺天盖地，各种框架、工具层出不穷眼花缭乱。最近重温JS基础，夯实的基础才是学习新技术的基石。本文作为读书笔记简单总结下js字符串的基础知识

## 字符串基础
### 简介
String 全局对象是一个用于字符串或一个字符序列的构造函数。 String类型是字符串的对象包装类型。

**==语法版==**

![image](https://raw.githubusercontent.com/lijiliang/record/master/images/jsstr.png)

### 属性
#### length
length属性表示字符串的长度，字符中的length只是可读的。

#### prototype
返回对象类型原型的引用。prototype 属性是 object 共有的。
一般用来给字符实例添加方法。

#### constructor
表示创建对象的函数。
说明：constructor 属性是所有具有 prototype 的对象的成员。constructor 属性保存了对构造特定对象实例的函数的引用。

```js
// 字符串添加了一个去除两边空格的方法
String.prototype.trim = function(){
    return this.replace(/^\s*|\s*$/g, '');
}
```
### 基础操作
#### 创建字符串

```js
// 字符串实例的创建
var str = 'abc'
var str = new String('abc')
```

#### 检测字符串
```js
var str = 'abc'
if(typeof(str) === 'string'){}   // 方法一,这种方法不能用于判断 new String 出来的字符串
if(Object.prototype.toString.call(str) == '[object String]'){}  // 方法二
```

### 字符串方法
#### String.fromCharCode(num1, ..., numN)
通过一串Unicode创建字符串。这个方法接收一或多个字符编码，然后将他们转成一个字符串。它与实例方法 `charCodeAt()` 执行的是相反的操作

这个方法不能识别 32 位的 UTF-16 字符（Unicode 编号大于`0xFFFF`）

```js
String.fromCharCode(104, 101, 108, 108, 111)  // hello
```

#### String.fromCodePoint(num1[, ...[, numN]])
通过一串码点创建字符串, 可以识别大于`OxFFF`的字符，弥补了 `String.fromCharCode` 方法的不足。在作用上，正好与 `codePointAt` 方法相反
```js
String.fromCodePoint(0x20BB7)  // "𠮷"
```

### 字符串实例方法
#### 查找方法 <small>charAt, charCodeAt, codePointAt, at, indexOf, lastIndexOf, includes, startsWith, endsWith</small>
##### str.charAt(index)
charAt()方法可用来获取指定位置的字符串，index为字符串索引值，从0开始到string.leng - 1，若不在这个范围将返回一个空字符串

```js
var str = 'abcde';
str.charAt(2);        //返回c
str.charAt(8);        //返回空字符串
```

##### str.charCodeAt(index)
charCodeAt()方法可返回通过指定位置的字符的Unicode编码，`charCodeAt()` 方法与 `charAt()` 方法类似，都需要传入一个索引值作为参数，区别是前者返回指定位置的字符的编码，而后者返回的是字符子串。

```
var str = 'abcde';
console.log(str.charCodeAt(0));        //返回97
```

##### str.codePointAt(pos)
codePointAt方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点

```js
let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
s.codePointAt(2) // 97
```

##### str.at(pos)
at可以识别 Unicode 编号大于0xFFFF的字符，返回正确的字符，是对 `charAt()`  方法功力的扩展

```js
'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"
```

##### str.indexOf(searchValue[, fromIndex])
indexOf()用来检索指定的字符串值在字符串中首次出现的位置。它可以接收两个参数，searchvalue表示要查找的子字符串，fromindex表示查找的开始位置，省略的话则从开始位置进行检索

##### str.lastIndexOf(searchValue[, fromIndex])
lastIndexOf()语法与indexOf()类似，它返回的是一个指定的子字符串值最后出现的位置，其检索顺序是从后向前。

```js
var str = 'abcdeabcde';
str.lastIndexOf('a');    // 返回5
```

##### str.includes(searchString[, postion])
ES6提供了三种新方法`includes()`, `startsWith()`, `endsWith()`，来确定一个字符串是否包含在另一个字符串中。
- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

第二个参数，表示开始搜索的位置
```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```

#### 截取方法 <small>substring, substr, slice</small>
##### str.substring(indexStart[, indexEnd])
substring()是最常用到的字符串截取方法，它可以接收两个参数(参数不能为负值)，分别是要截取的开始位置和结束位置，它将返回一个新的字符串，其内容是从start处到end-1处的所有字符。若结束参数(end)省略，则表示从start位置一直截取到最后。

```js
var str = 'abcdefg';
str.substring(1, 4);    //返回bcd
str.substring(1);    //返回bcdefg
str.substring(-1);    //返回abcdefg，传入负值时会视为0
```
##### str.slice(beginSlice[, endSlice])
`slice()` 方法与 `substring()` 方法非常类似，它传入的两个参数也分别对应着开始位置和结束位置。而区别在于，`slice()` 中的参数可以为负值，如果参数是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符。

```js
var str = 'abcdefg';
str.slice(1, 4);    //返回bcd
str.slice(-3, -1);    //返回ef
str.slice(1, -1);    //返回bcdef
str.slice(-1, -3);    //返回空字符串，若传入的参数有问题，则返回空
```

##### str.substr(start[, length])
`substr()` 方法可在字符串中抽取从 `start` 下标开始的指定数目的字符。其返回值为一个字符串，包含从 stringObject的start（包括start所指的字符）处开始的length个字符。如果没有指定 length，那么返回的字符串包含从start到stringObject的结尾的字符。另外如果start为负数，则表示从字符串尾部开始算起。

```js
var str = 'abcdefg';
str.substr(1, 3)    //返回bcd
str.substr(2)    //返回cdefg
str.substr(-2, 4)    //返回fg，目标长度较大的话，以实际截取的长度为准
```

#### 操作方法 <small>concat, repeat, padStart, endStart</small>
##### str.concat(string2, string3[, ..., stringN])
concat() 连接字符串。concat 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。 concat 方法并不影响原字符串。

##### str.repeat(count)
repeat方法返回一个新字符串, 将原字符串重复 `n` 次

```js
'hello'.repeat(2) // "hellohello"
```
##### str.padStart(targetLength [, padString])
`padStart()`, `padEnd()`字符串补全长度的功能,如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()` 用于头部补全，`padEnd()` 用于尾部补全。
第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

#### 大小写转换方法 <small>toLowerCase, toLocaleLowerCase, toUpperCase, toLocaleUpperCase</small>
##### str.toLowerCase()
toLowerCase()方法可以把字符串中的大写字母转换为小写

toLocaleLowerCase()方法根据任何特定于语言环境的案例映射，返回调用字符串值转换为小写的值。

##### str.toUpperCase()
toUpperCase()方法可以把字符串中的小写字母转换为大写

toLocaleUpperCase() 使用本地化（locale-specific）的大小写映射规则将输入的字符串转化成大写形式并返回结果字符串

#### 模式匹配方法 <small>search, replace, split, match</small>
##### str.search(regexp|substr)
`search()` 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。它会返回第一个匹配的子字符串的起始位置，如果没有匹配的，则返回-1。

```js
var str = 'abcDEF';
str.search('c');    //返回2
str.search('d');    //返回-1
str.search(/d/i);    //返回3
```

##### str.replace(regexp|substr, newSubStr|function)
`replace()` 方法用来进行字符串替换操作，它可以接受两个参数，前者为被替换的子字符串(可以是正则),后者为用来替换的文本。

如果第一个参数传入的是字符串或者没有进行全局匹配的正则表达式，那么 `replace()` 方法将只进行一次替换(替换第一次找到的)，返回经过一次替换后的结果字符串

```js
var str = 'abcdeabcde';
str.replace('a', 'A');   //Abcdeabcde
str.replace(/a/, 'A');   //Abcdeabcde
```

如果第一个参数传入的是全局匹配的正则表达式，那么`replace()` 将会对符合条件的子字符串进行多次替换，最后返回经过多次替换的结果字符串

```js
var str = 'abcdeabcdeABCDE';
str.replace(/a/g, 'A');    // AbcdeAbcdeABCDE
str.replace(/a/gi, '$');    // $bcde$bcde$BCDE
```

##### str.split([separator[, limit]])
`split()` 方法用于把一个字符串分割成字符串数组。第一个参数separator表示分割位置(参考符), 第二个参数limit表示返回数组的允许最长度(一般不用设置)

```js
var str = 'a|b|c|d|e';
str.split('|');    // ["a", "b", "c", "d", "e"]
str.split('|', 3);    // ["a", "b", "c"]
```
也可以用正则来进行分割

```js
var str = ''
str.split(/\d/)   // ["a", "b", "c", "d", "e"]
```

##### str.match(regexp|substr)
`match()`方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配

如果参数中传入的是子字符串或是没有进行全局匹配的正则表达式，那么`match()`方法会从开始位置执行一次匹配，如果没有匹配到结果，则返回null。否则则会返回一个数组，该数组的第0个元素存放的是匹配文本，除此之外，返回的数组还含有两个对象属性`index`和`input`，分别表示匹配文本的起始字符索引和stringObject 的引用(即原字符串)。

```js
var str = '1q2w3e4r5t'
str.match('o')       // null
str.match('w')       // ["w", index: 3, input: "1q2w3e4r5t"]
str.match(/w/)       // ["w", index: 3, input: "1q2w3e4r5t"]
```
如果参数传入的是具有全局匹配的正则表达式，那么`match()`从开始位置进行多次匹配，直到最后。如果没有匹配到结果，则返回`null`。否则则会返回一个数组，数组中存放所有符合要求的子字符串，并且没有`index`和`input`属性。

```js
var str = '1q2w3e4r5t'
str.match(/o/g)        // null
str.match(/\d/g)       // ["1", "2", "3", "4", "5"]
```


#### 其它方法 <small>localeCompare, trim, ${}</small>
##### referenceStr.localeCompare(compareString[, locales[, options]])
比较字符串对象和另外一个字符串

返回值:
- 0 : 字符串匹配100%
- 1 : 不匹配，参数值来自于语言环境的排序顺序字符串对象的值之前
- -1 : 不匹配，参数值来自于语言环境的排序顺序字符串对象的值之后

##### str.trim()
去掉前后空格

##### ${}
模板字符串
