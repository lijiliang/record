<!-- TOC -->

- [前言](#前言)
- [图例](#图例)
- [先谈谈 ECMAScript 中的数据类型](#先谈谈-ecmascript-中的数据类型)
  - [基本类型](#基本类型)
  - [引用类型 <small>（object 子类型）</small>](#引用类型-smallobject-子类型small)
  - [检测变量类型 <small>typeof, toString, instanceof</small>](#检测变量类型-smalltypeof-tostring-instanceofsmall)
- [对象分类](#对象分类)
  - [本地对象<small>（native object）</small>](#本地对象smallnative-objectsmall)
  - [内置对象 <small>(built-in object)</small>](#内置对象-smallbuilt-in-objectsmall)
  - [宿主对象 <small>host object</small>](#宿主对象-smallhost-objectsmall)
  - [用户自定义对象 <small>(user-defined object)</small>](#用户自定义对象-smalluser-defined-objectsmall)
- [属性](#属性)
- [创建对象](#创建对象)
  - [简单做法](#简单做法)
    - [使用 Object 构造函数创建](#使用-object-构造函数创建)
    - [使用对象字面量表示法创建](#使用对象字面量表示法创建)
    - [工厂模式](#工厂模式)
  - [模仿“类”的设计](#模仿类的设计)
    - [构造函数模式](#构造函数模式)
    - [原型模式 <small>（介绍原型链）</small>](#原型模式-small介绍原型链small)
    - [使用 ES6 Class](#使用-es6-class)
  - [面向委托的设计（对象关联风格）](#面向委托的设计对象关联风格)
- [对象的内容](#对象的内容)
  - [getter 与 setter](#getter-与-setter)
    - [getter](#getter)
    - [setter](#setter)
  - [遍历对象属性 <small>for..in, for..of</small>](#遍历对象属性-smallforin-forofsmall)
    - [for..in](#forin)
    - [for..of](#forof)
  - [对象的代理 Proxy](#对象的代理-proxy)
  - [使用 Reflect 操作对象](#使用-reflect-操作对象)
- [对象方法](#对象方法)
  - [原型相关 <small>create, setPrototypeOf, getPrototypeOf</small>](#原型相关-smallcreate-setprototypeof-getprototypeofsmall)
    - [Object.create(proto, [ propertiesObject ])](#objectcreateproto--propertiesobject-)
    - [Object.setPrototypeOf(obj, prototype)](#objectsetprototypeofobj-prototype)
    - [Object.getPrototypeOf(obj)](#objectgetprototypeofobj)
  - [属性描述符相关 <small>getOwnPropertyDescriptor, defineProperty, defineProperties, preventExtensions, seal, freeze, isExtensible, isSealed, isFrozen</small>](#属性描述符相关-smallgetownpropertydescriptor-defineproperty-defineproperties-preventextensions-seal-freeze-isextensible-issealed-isfrozensmall)
    - [Object.getOwnPropertyDescriptor(obj, prop)](#objectgetownpropertydescriptorobj-prop)
    - [Object.defineProperty(obj, prop, descriptor)](#objectdefinepropertyobj-prop-descriptor)
    - [Object.defineProperties(obj, props)](#objectdefinepropertiesobj-props)
    - [Object.preventExtensions(obj)](#objectpreventextensionsobj)
    - [Object.seal(obj)](#objectsealobj)
    - [Object.freeze(obj)](#objectfreezeobj)
    - [Object.isExtensible(obj), Object.isSealed(obj), Object.isFrozen(obj)**](#objectisextensibleobj-objectissealedobj-objectisfrozenobj)
  - [枚举相关 <small>keys, values, entries, getOwnPropertyNames, getOwnPropertySymbols</small>](#枚举相关-smallkeys-values-entries-getownpropertynames-getownpropertysymbolssmall)
    - [Object.keys(obj), Object.values(obj)， Object.entries(obj)](#objectkeysobj-objectvaluesobj-objectentriesobj)
    - [Object.getOwnPropertyNames(obj)](#objectgetownpropertynamesobj)
    - [Object.getOwnPropertySymbols()](#objectgetownpropertysymbols)
  - [其他 <small>assign, is</small>](#其他-smallassign-issmall)
    - [Object.assign(target, …source)](#objectassigntarget-source)
    - [Object.is(value1, value2)](#objectisvalue1-value2)
- [对象实例方法](#对象实例方法)
  - [判断属性是否存在 <small>in, hasOwnProperty</small>](#判断属性是否存在-smallin-hasownpropertysmall)
    - [in 操作符](#in-操作符)
    - [obj.hasOwnProperty(prop)](#objhasownpropertyprop)
  - [判断属性是否可枚举 <small>propertyIsEnumerable</small>](#判断属性是否可枚举-smallpropertyisenumerablesmall)
    - [obj.propertyIsEnumerable(prop)](#objpropertyisenumerableprop)
  - [判断原型 <small>instanceof, isPrototypeOf</small>](#判断原型-smallinstanceof-isprototypeofsmall)
    - [instanceof](#instanceof)
    - [prototypeObj.isPrototypeOf(obj)](#prototypeobjisprototypeofobj)
  - [其他 <small>valueOf, toString, toLocaleString</small>](#其他-smallvalueof-tostring-tolocalestringsmall)
    - [obj.valueOf()](#objvalueof)
    - [obj.toString()](#objtostring)
    - [obj.toLocaleString()](#objtolocalestring)

<!-- /TOC -->
## 前言
前端新技术铺天盖地，各种框架、工具层出不穷眼花缭乱。最近重温JS基础，夯实的基础才是学习新技术的基石。本文作为读书笔记简单总结下js对象的基础知识

## 图例
![image](https://raw.githubusercontent.com/lijiliang/record/master/images/jsobj.png)

## 先谈谈 ECMAScript 中的数据类型

### 基本类型
> ES6 之前 ECMAScript 中有 5 种简单数据类型（也称为基本数据类型）： Undefined、Null、Boolean、Number和String <br>
还有 1 种复杂数据类型——Object，Object 本质上是由一组无序的名值对组成的。<br />
ES6引入了一种新的原始数据类型 Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型。它也是基本数据类型。
<br>
ECMAScript 不支持任何创建自定义类型的机制，而所有值最终都将是上述 7 种数据类型之一。

- string 类型
- number 类型
- boolean 类型
- null 类型
- undefined 类型
- symbol 类型
- object 类型

特点：

- 基本数据类型的值是按值访问的
- 基本类型的值是不可变的
- 基本类型的比较是它们的值的比较
- 基本类型的变量是存放在栈内存（Stack）里的

### 引用类型 <small>（object 子类型）</small>

> 在 ECMAScript 中， 引用类型是一种数据结构，用于将数据和功能组织在一起。
<br />
其中 Boolean、Number、String 三个类型被称为基本包装类型，是对同名基本类型的包装，把它们转化成对象，使它们可以使用对象的方法。实际上，每当读取一个基本类型值时，后台就会创建一个对应的基本包装类型的对象。不过建议永远不要用 Boolean 对象。

- object Object类型
- object Array类型
- object Date类型
- object RegExp类型
- object Function 类型
- object Boolean类型
- object Number类型
- object String类型
- object Set类型
- object Map类型
- 其它各种内置类型及各种自定义类型

特点：

- 引用类型的值是按引用访问的
- 引用类型的值是可变的
- 引用类型的比较是引用的比较
- 引用类型的值是保存在堆内存（Heap）中的对象（Object） 与其他编程语言不同，JavaScript 不能直接操作对象的内存空间（堆内存）

### 检测变量类型 <small>typeof, toString, instanceof</small>

如果你要判断的是基本数据类型或 JavaScript 内置对象，使用 `toString`； 如果要判断的是自定义类型，请使用`instanceof`。

**为什么不用 typeof**

我们知道检测基本数据类型可以用 typeof：

```js
var a = 123

typeof a // 'number'

```
但是 `typeof` 只能用于基本数据类型检测，对于 null 还有 Bug。

Bug：使用 `typeof` 检查 null 时会返回 “object”，这是由于不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型，null 的二进制表示全是 0，自然前三位也是 0，所以执行 `typeof` 时会返回 “object”。

**使用 toString 方法检测**

`toString` 方法是 Object 的实例方法，因为所有对象都是 Object 的实例，所以所有对象都有该方法。如果此方法在自定义对象中未被覆盖，`toString()` 会返回 “[object type]”，其中 type 是对象类型。

不过 Array、Data 会重写从 Object.prototype 继承来的 `toString` 方法，所以检测时应当直接调用 `Object.prototype.toString` 来检测。

从 javascript 1.8.5 开始可以检测 undefined 与 null。

```js
var a = []

Object.prototype.toString.call(a) // "[object Array]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
```

**用 instanceof 判断对象的类型**

`instanceof` 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。我们使用的所有对象都是对象子类型，它们要么是内置构造函数的实例，要么是我们自定义构造函数的实例。因此可以使用 `instanceof` 来判断这些对象的类型。

```js
var a = []

a instanceof Array // true
```

```js
function Mytype(){}
var a = new Mytype()

a instanceof Mytype // true

```
同时也可以使用对象的实例方法 `isPrototypeOf(..)` 来判断，效果与 `instanceof` 相同。本文【对象实例方法】章节有详细说明。

要注意的是一些内置对象本就有检测是否是本类型的方法，如 `Array.isArray(arr)` 可以判断 arr 是否是 Array 类型。

## 对象分类
### 本地对象<small>（native object）</small>
>ECMA-262把本地对象（native object）定义为“独立于宿主环境的 ECMAScript 实现提供的对象”。

常用的本地对象主要包括以下：
- Object
- Function
- Boolean
- Symbol
- Array
- Number
- Date
- String
- RegExp
- Map
- Set
- WeakMap
- Promise
- Generator
- Refleat
- Proxy
- Error
- ...

这些对象都可以在浏览器控制台里打印出来，可以看出它们多数是 function 类型，有一些如 Reflect 是 object 类型。

### 内置对象 <small>(built-in object)</small>
> 由ECMAScript实现提供的，独立与宿主环境的所有对象，在ECMAScript程序开始执行时出现”。这意味着开发者不必明确实例化内置对象，它已经被实例化了。ECMA只定义了两个内置对象，即Global和Math（它们也是本地对象，根据定义，所有内置对象都是本地对象）。

在 JavaScript 中，所有的本地对象、全局属性、全局函数都是 Global 对象的属性。ECMAScript 虽然没有指出如何直接访问 Global 对象，但 Web 浏览器都是将这个全局对象作为 window 对象的一部分加以实现的。

- Global
- Math

### 宿主对象 <small>host object</small>
> 所有非本地对象都是宿主对象，即由ECMAScript实现的宿主环境提供的对象。

所有的 BOM 和 DOM 对象都是宿主对象。JavaScript 中常用的宿主对象主要包括以下：

- BOM对象
    - window
    - location
    - navigator
    - sereen
    - history
- DOM对象
    - Document
    - Body
    - Event
    - Form
    - Image
    - 事件对象 event
    - ...

### 用户自定义对象 <small>(user-defined object)</small>

> 开发者通过 Js 代码创建的自己的对象。

## 属性

prototype

返回对象类型原型的引用。prototype 属性是 object 共有的。

一般用来给实例添加方法和属性。

## 创建对象

### 简单做法

#### 使用 Object 构造函数创建

```js
// 对象实例的创建
var obj = new Object()
obj.key = 'value'   //使用构造函数创建一个空对象，并赋值
```

#### 使用对象字面量表示法创建
```js
//使用字面量创建一个对象
var obj = {
    key1: 'value1',
    key2: 'value2'
}  
```
字面量表示法与 Object 构造函数创建法唯一的区别是，在字面量表示法里你可以给对象添加多个 键/值 对，但是在构造形式中你必须逐个添加属性。

现在 ES6 可以用更简洁的方式创建对象：
```js
var age = 20
var sex = "sexy"

var a = {
    name: 'jack',

    // 简洁表示法，等同于 age: age
    age,

    // 简洁表示法，等同于 sayName: function() {}
    sayName(){},

    // 属性名表达式，等同于 lover: 'rose'
    ['lo' + 'ver']: 'rose',

    // 属性名表达式，等同于 sexy: 'male'
    [sex]: 'male'
}
```

注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串 ‘[object Object]’，这一点要特别小心

#### 工厂模式
即用函数来封装创建对象的细节。多次调用该函数来创建多个相似对象。

```js
function createPerson(name, age) {
    var o = {}
    o.name = name
    o.age = age
    o.sayName = function() {console.log(this)}
    return o
}

var a = createPerson('a', 20)
var b = createPerson('b', 22)
```
工厂模式虽然解决多创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。

### 模仿“类”的设计

#### 构造函数模式
构造函数包括像 Array、Object 这样的原生构造函数，他们在 js 运行时会自动出现在执行环境中。此外，我们可以创建自定义构造函数，从而定义自定义类型的属性和方法。现在使用构造函数重写上个例子：

```js
function Person(name, age) {
    this.name = name
    this.age = age
    this.sayName = function() { alert(this.age) }
}

var a = new Person('a', 20)
var b = new Person('b', 22)

a instanceof Person // true
```
构造函数就是普通的函数，不存在特殊语法。构造函数与其他函数唯一的区别就在于调用他们的方式不同。任何函数只要通过 `new` 操作符来调用，那它就可以作为构造函数。

使用 `new `操作符调用函数，或者说发生构造函数调用时，会自动执行下面操作：

1. 创建一个全新的对象。
2. 这个新对象会被执行 [[Prototype]] 链接。
3. 这个新对象会绑定到函数调用时的 this。
4. 如果函数没有返回其他对象，那么 new 表达式的函数调用会自动返回这个新对象。

由于构造函数调用时会自动执行 [[Prototype]] 链接，也就是把新对象的原型链指向构造函数的 prototype。所以使用 `instanceof` 或 `isPrototypeOf` 方法可以判断他们的类型。

上面这种构造函数解决了对象类型识别的问题，但是每个方法都要在每个实例上重新创建一遍，在上面的例子中，a 和 b 都有个名为 `sayName()` 的方法，这两个方法虽然名字、内容、功能相同，但却分别在 a 和 b 中都重新创建了一次，这是没有必要的。

更好的方法应该是将公用的方法放到他们的原型上，也就是接下来要说的原型模式。

#### 原型模式 <small>（介绍原型链）</small>
所有函数都有一个不可枚举的 prototype（原型）属性，这个属性是一个指针，指向一个对象。

```js
function Foo() {}

Foo.prototype // {}

```
这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法，我们通常称这个对象为 Foo 的原型。

上一节【构造函数模式】里面有说，`new `操作符会新建一个对象，并把该对象的原型链指向构造函数的 prototype 所指向的对象。

这里出现了一个重点词**原型链**，我们先解释下什么叫做原型链。

> 原型链<br/>
原型链也被称为 [[Prototype]]链，是对象的内置属性。原型链是 ECMAScript 中实现继承的主要办法，其基本思想就是让一个引用类型继承另一个引用类型的属性和和方法。

例如我们新建个对象 a，然后给它指定它的原型链的指向：
```js
var a = {}
var b = {x: 2}

Object.setPrototypeOf(a, b)

a.x // 2

```
这个例子中我们通过 `Object.setPrototypeOf()` 方法把 a 的原型链指向 b，然后 a 就继承了 b 的属性，当查询 a 中没有的 x 属性时，会指向到 b.x 的值。

这里原理上说是委托比说是继承更符合真实情况。因为真实情况如上段所说是 a 把自身没有的属性查询委托给 b，如果 b 中也没 x 属性的话，系统会继续循着原型链往上查。所有普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype。如果 Object.prototype 也没有的话就会提示 undefined。

这里提示一下，由于所有普通的对象都”源于“（或者说把 [[Prototype]] 链的顶端设置为）这个 Object.prototype 对象，所以它包含 Javascript 中许多通用的功能。

上面说过，`new` 操作符会新建一个对象，并把该对象的原型链指向构造函数的 prototype 属性所指向的对象（即原型对象）。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。例如：

```js
function Person(){}

Person.prototype = {
    name: 'h',
    sayName: function() {
        alert(this.name)
    }
}

var a = new Person()

a.sayName() // h
```
这种方法因为重写了 Person.prototype ，所以默认的 Person.prototype.constructor 也会丢失，如果需要修复 constructor，可以使用 `Object.defineProperty()`。

```js
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
})
```
不过实例一般都是要有属于自己的全部属性的。所以日常开发中设计对象更常见的做法是构造函数模式跟原型模式组合使用：


```js
function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype.sayName = function() {
    alert(this.name)
}

a = new Person('a', 20)
b = new Person('b', 22)

a.sayName() // a
```
这里很像一些面向“类”的语言的行为，a 和 b 是 Person 类的实例，a 和 b 继承了 Person 类的特性。但实际上 JavaScript 和面向类的语言不同，它并没有类作为对象的抽象模式或者说蓝图。JavaScript 中只有对象。

#### 使用 ES6 Class
上面说的原型是通过构造函数，定义并生成新对象。但这种写法跟传统的面向对象语言（比如C++和Java）差异很大，很容易让新学习这门语言的程序员感到困惑。ES6 提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。

不过需要注意的是， ES6 的 class 语法是并不是向 JavaScript 中引入了一种新的“ 类” 机制。 class 基本上只是现有 [[Prototype]] 机制的一种语法糖。

也就是说， class 并不会像传统面向类的语言一样在声明时静态复制所有行为。 如果你（ 有意或无意） 修改或者替换了父“ 类” 中的一个方法， 那子“ 类” 和所有实例都会受到影响， 因为它们在定义时并没有进行复制， 只是使用基于 [[Prototype]] 的实时委托。

ES6 的类，完全可以看作构造函数的另一种写法。
```js
class Foo {
  // ...
}

typeof Foo // "function"
Foo === Foo.prototype.constructor // true
```
上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用 `new` 命令，跟构造函数的用法完全一致。

```js
class Foo {
    constructor(name) {
        this.name = name
    }
    sayName() {
        alert(this.name)
    }
}

var a = new Foo('a')

a.sayName() // a
```
构造函数的 prototype 属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的 prototype 属性上面。

```js
class Foo {
  constructor(){}

  toString(){}

  toValue(){}
}

// 等同于

Foo.prototype = {
  toString(){},
  toValue(){}
};
```

由于类的方法都定义在 prototype 对象上面，所以类的新方法可以添加在 prototype 对象上面。`Object.assign` 方法可以很方便地一次向类添加多个方法。

```js
class Foo {
  constructor(){}
}

Object.assign(Foo.prototype, {
  toString(){},
  toValue(){}
});
```
prototype 对象的 constructor 属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

ES6 Class 与 普通构造函数的不同点主要有 4 个：

 1. constructor 方法

`constructor` 方法是类的默认方法，`通过 new 命令生成对象实例时，自动调用该方法` 。一个类必须有 `constructor` 方法，如果没有显式定义，一个空的 `constructor` 方法会被默认添加。

```js
constructor() {}
```
constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo    // false

```
上面代码中，`constructor` 函数返回一个全新的对象，结果导致实例对象不是 Foo 类的实例。

类的构造函数，不使用 `new` 是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用 `new` 也可以执行。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'

```

 2. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。这一点与普通构造函数的行为不一致。


```js
// class
class Foo {
    constructor(name) {
        this.name = name
    }
    sayName(){
        this.name
    }
}

Object.keys(Foo.prototype)  // []
Object.getOwnPropertyNames(Foo.prototype)   // ["constructor","sayName"]
```

```js
//构造函数
function Foo(name) {
    this.name = name
}

Foo.prototype.sayName = function() {
    alert(this.name)
}

Object.keys(Foo.prototype)  // ["sayName"]
Object.getOwnPropertyNames(Foo.prototype)   // ["constructor", "sayName"]
```
上面代码中，`sayName` 方法是 Foo 类内部定义的方法，它是不可枚举的。而定义在 Foo.prototype 中的话则是可枚举的。

3. Class不存在变量提升（hoist），这一点与ES5完全不同

```js
new Foo(); // ReferenceError
class Foo {}
```
上面代码中，Foo 类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

4. 子类的继承

Class 之间可以通过 `extends` 关键字实现继承，这比普通构造函数通过修改原型链实现继承，要清晰和方便很多。

```js
class Foo {}
class Bar extends Foo {}
```
上面代码定义了一个 Bar 类，该类通过 `extends` 关键字，继承了 Foo 类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个 Foo 类。下面，我们在 Bar 内部加上代码。

```js
class Foo {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    sayProfile() {
        return `hello, my name is ${this.name}, ${this.age} years old`
    }
}
class Bar extends Foo {
    constructor(name, age, lover) {
        super(name, age) // 调用父类的 constructor(name), 约等于普通构造函数中的 Foo.call(this, name, age)
        this.age = Number(this.age) + 5
        this.lover = lover
    }

    sayIntro() {
        alert(super.sayProfile() + `, my lover is ${this.lover}, again, I am ${this.name}`)
    }
}

var a = new Bar('Jack', '20', 'Rose')

a.sayIntro()    // "hello, my name is Jack, 25 years old, my lover is Rose, again, I am Jack"
```
上面代码中，子类 Bar 的 `constructor` 方法和 `sayIntro` 方法之中，都出现了super关键字，`super` 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况，`super` 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。在上面的代码中 子类 Bar 的构造函数中 `super(name, age)` 相当于 `Foo.prototype.constructor.call(this, name, age)` 。作为函数时，`super()` 只能用在子类的构造函数之中，用在其他地方就会报错。

要注意的是，子类必须在 `constructor` 方法中调用 `super` 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 `super` 方法，子类就得不到 this 对象。在子类的构造函数中，只有调用super之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有 `super` 方法才能返回父类实例。

普通构造函数的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Foo.call(this)）。ES6 Class 的继承机制完全不同，实质是先创造父类的实例对象 this（所以必须先调用 `super` 方法），然后再用子类的构造函数修改 this。

如果子类没有定义 `constructor` 方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有 `constructor` 方法：

```js
constructor(...args) {
    super(...args);
}
```
第二种情况，`super` 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。上面代码代码中的 `super.sayProfile()` 就是将super当作一个对象使用。这时，`super` 在普通方法之中，指向 Foo.prototype，所以 `super.sayProfile()` 就相当于 `Foo.prototype.sayProfile()`。

ES6 规定，通过 `super` 调用父类的方法时，super会绑定子类的 this。所以sayProfile输出的this.age是子类 Bar 的 age 25岁。

刚刚说到在静态方法中super指向父类。

> 静态方法 <br/>
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js
class Foo {
    static sayHi() {
        return 'hello';
    }
}

Foo.sayHi() // hello

var a = new Foo()
a.sayHi() // TypeError: a.sayHi is not a function
```
上面代码中ayHi()就是 Foo 的静态方法，它只能通过 Foo 调用，不能通过 Foo 的实例调用。

如果 `super` 作为对象用在静态方法中，这时 `super` 将指向父类，而不是父类的原型对象。

```js
class Foo {
    static sayHi() {
        return 'hello';
    }
    satHi() {
        return 'oops'
    }
}

class Bar extends Foo {
    static sayBob() {
        return super.sayHi() + ' Bob'
    }
}

Bar.sayBob()  // "hello Bob"
```

### 面向委托的设计（对象关联风格）
有些开发者比较诟病这种模仿“类”的设计模式，因为继承意味着复制，JavaScript（默认）并不会复制对象属性。相反，JavaScript 会在两个对象之间创建一个关联（我们把这种关联成为原型链），这样对象就可以通过委托访问另一个对象的属性和函数。委托这个术语可以更加准确地描述 JavaScript 中的对象关联机制。

即便通过 ES6 class 让 js 看起来更像“类”，也只是一种模仿的假象。在传统的面向类的语言中，类定义之后就不会进行修改，所以类的设计模式就不支持修改，但是 Javascript 最强大的特性就是它的动态性，任何对象的定义都可以修改（除非你把它定义为不可变）。

一些开发者认为 ES6 的 class 想伪装成一种很好的语法问题的解决方案，但实际上却让问题更难解决且让 JavaScript 更难理解。因为它隐藏了 JavaScript 对象最重要的机制——对象之间的实时委托机制。让本来简洁优雅的 [[Prototype]] 机制变的非常别扭。

我们比较下继承与委托设计的区别。

我们先想想类（继承）的设计方法：先定义一个通用的父类 F，在父类 F 中定义所有任务都有的行为，接着定义子类 a 和 b，他们都继承自父类并且会添加一些特殊行为来处理对应的任务。

再用委托的思想来考虑同样的问题：首先先定义一个对象 F，它包含所有任务都可以使用（委托）的具体行为。接着，对于每个任务你都会定义一个对象来储存对应的数据和行为，你会把特定的任务对象都关联到 F 功能对象上面，让他们在需要的时候可以进行委托。基本你可以想象成 a 和 F 之间是兄弟关系，a 完成不了的任务东西都委托给 F完成。

> JavaScript 中原型链实际上是委托的关系而不是继承。委托行为意味着某些对象在找不到属性或方法引用时会把这个请求委托给另一个对象。

我们先看一个使用类设计风格的例子：

```js
function Foo(name) {
    this.name = name
}
Foo.prototype.intro = function() { return 'my name is ' + this.name }  

function Bar(name) {
    Foo.call(this, name) // 这个名词上叫做（丑陋的）显式多态，限于篇幅不多做介绍，各位可以自行搜索
}
Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.speak = function(){ alert(this.intro()) }

var a = new Bar('a')

a.speak() // my name is a
```
这个例子里子类 Bar 继承了父类 Foo，然后生成了 a 这个实例，a 通过 new 构造函数委托了 Bar.prototype，Bar.prototype 通过 `Object.create()` 方法委托了 Foo.prototype()。这种风格很常见，你应该已经熟悉了。

当然我们可以用 class 让这段代码看起来更简洁明了：

```js
class Foo {
    constructor(name) {
        this.name = name
    }
    intro() { return 'my name is ' + this.name }
}

class Bar extends Foo {
    constructor(name) {
        super(name)
    }
    speak() { alert(super.intro()) }
}

var a = new Bar('a')

a.speak()
```
现在再来看看同例的对象关联风格的设计：

```js
Foo = {
    init: function(name) {
        this.name = name
    },
    intro: function() {
        return 'my name is ' + this.name
    }
}

Bar = Object.create(Foo)
Bar.speak = function() {
    alert(this.intro())
}

var a = Object.create(Bar)
a.init('a')

a.speak()
```
这段代码中我们同样利用 [[Prototype]] 把 a 委托给 Bar 并把 Bar 委托给 Foo，和上段代码一样，我们仍然实现了三个对象的关联。

但非常重要的一点是，这段代码简洁了许多，我们只是把对象关联起来，并不需要那些既复杂又令人困惑的模仿类的行为（构造函数、原型以及 new）

## 对象的内容

对象的内容是由一些储存在特定命名位置的（任意类型的）值组成的，我们称之为属性。

### getter 与 setter

#### getter
get 语法将一个对象属性绑定到查询该属性时将被调用的一个函数上。该方法会覆盖单个属性默认的 [[Get]] 操作（获得属性值的操作）。

用法：

> {get prop() { … } } // prop 为要绑定到给定函数的属性名 <br/><br/>
{get [expression]() { … } } //从ECMAScript 2015 (ES6)开始，还可以使用一个计算的属性名的表达式绑定到给定的函数。

```js
var myObj = {
    get a() {
        return 2
    }
}

//也可以通过 defineProperty 创建：
Object.defineProperty(myObj, "b", {
    get: function(){return this.a * 2},
    enumrable: true
})

myObj.a  // 2
myObj.b  // 4

myObj.a = 3
myObj.a  // 2
```
如上面例子，不管是对象文字语法中的 `get a() { .. }`， 还是 `defineProperty(..)` 中的显式定义， 二者都会在对象中创建一个不包含值的属性，对于这个属性的访问会自动调用一个隐藏函数，它的返回值会被当作属性访问的返回值。

同时由于我们只定义了 a 的 getter， 所以对 a 的值进行设置时 set 操作会忽略赋值操作，且不会抛出错误。 为了让属性更合理， 我们还应当定义 setter。

#### setter
set 语法会覆盖单个属性默认的 [[Put]] 操作（赋值操作）。

通常来说 getter 和 setter 是成对出现的（ 只定义一个的话通常会产生意料之外的行为）。

例如：

```js
var myObj = {
    get a() {
        return this._a_;
    },
    set a(val) {
        this._a_ = val * 2
    }
}

myObject.a = 2;
myObject.a; // 4
```
注意，在本例中， 实际上我们把赋值（ [[Put]]） 操作中的值 2 存储到了另一个变量\_a\_中。 名称\_a\_只是一种惯例， 没有任何特殊的行为，和其他普通属性一样。

### 遍历对象属性 <small>for..in, for..of</small>
#### for..in
`for..in` 循环可以遍历对象的可枚举属性列表（包括 [[Prototype]] 原型链）。

使用
`for..in`循环是无法直接获取属性值的，你需要手动获取属性值。

需要注意的是遍历对象属性时的顺序是不确定的，在不同的 JavaScript 引擎中可能不一样。

#### for..of
`for..of` 循环首先会向被访问的对象请求一个迭代器对象，然后通过调用迭代器对象的 `next()` 方法来遍历所有返回值。

我们先看一下迭代器的定义：

> 可迭代协议<br/><br/>
可迭代协议允许 JavaScript 对象去定义或定制它们的迭代行为, 例如（定义）在一个 for..of 结构中什么值可以被循环（得到）。一些内置类型都是内置的可遍历对象并且有默认的迭代行为, 比如 Array、Map, 另一些类型则不是 (比如 Object) 。
<br/><br/>
为了变成可遍历对象， 一个对象必须实现 @@iterator 方法, 意思是这个对象（或者它原型链上的某个对象）必须有一个名字是 Symbol.iterator 的属性:

数组有内置的 @@iterator， 因此 `for..of` 可以直接应用在数组上：
```js
var myArr = [1,2,3]
for(var v of myArr) {
    console.log(v)
}
// 1
// 2
// 3
```

我们再通过数组的 `Symbol.iterator` 属性看看 `@@iterator` 是怎么工作的：

```js

var myArr = [1,2,3]
var it = myArr[Symbol.iterator]()

it.next()   // {value: 1, done: false}
it.next()   // {value: 2, done: false}
it.next()   // {value: 3, done: false}
it.next()   // {value: undefined, done: true}
```
如你所见，调用迭代器的next()方法会返回形式为 `{value: .., done: ..}` 的值，value是当前的遍历值，done是一个布尔值，表示是否还有可以遍历的值。

上面示例中需要注意的一点，我们使用符号 `Symbol.iterator` 来获取对象的 `@@iterator` 内部属性。引用类似 iterator 的特殊属性时要使用符号名，而不是符号包含的值。此外，虽然看起来很像一个对象，但@@iterator本身并不是迭代器对象，而是返回迭代器对象的函数——这点非常精妙并且重要。

可是普通对象没有内置的@@iterator，所以无法完成for..of遍历。制定者之所以这样做，有许多复杂的原因，不过简单来说，这样做是为了避免影响未来的对象类型。

但我们可以给任何想遍历的对象自定义 `@@iterator`，例如：

```js
var myObj = {a:1, b:2}
Object.defineProperty(myObj, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys(o);
        return {
            next: function() {
                return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                }
            }
        }
    }
})

// 手动遍历 myObj
var it = myObj[Symbol.iterator]()

it.next()   // {value: 1, done: false}
it.next()   //{value: 2, done: false}
it.next()   //{value: undefined, done: true}

// 用 for..of 遍历 myObj
for(var v of myObj) {
    console.log(v)
}
// 1
// 2
```
上面示例中我们使用 `Object.defineProperty()` 定义 @@iterator 主要是为了让它不可枚举。不管枚举的话也可以直接在定义对象时进行声明：


```js
var myObj = {
    a: 1,
    b: 2,
    [Symbol.iterator]: function(){...}
}
```

### 对象的代理 Proxy

ES6 中引入的 Proxy 是一个元编程的特性。元编程是指的是开发人员对 “语言本身进行编程”。一般是编程语言暴露了一些 API，供开发人员来操作语言本身的某些特性。

Proxy 对象用于定义基本操作的自定义行为 (例如属性查找，赋值，枚举，函数调用等)。Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。也就说它可以 “代理” 对象的原生行为，替换为执行自定义行为。

Proxy语法如下：

```js
let p = new Proxy(target, handler)
```

其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

举个栗子，我们知道当我们要获取对象的属性值的时候，对象内部会调用 get 方法去获取这个属性，如果该属性不存在在该对象中，则会继续向 [[Prototype]] 原型链向上寻找，一直找到 Object.prototype。

如果我们按上一节的方法给该属性设置了get()方法，则查询该属性值时会返回get() 方法的返回值。Proxy 可以给所有查询不到的属性设置统一的get()方法。

例如：

```js
var a = {x: 2}
var obj = new Proxy(a, {
    get: function(target, name){
        return name in target ? target[name] : 3
    }
})


obj.x // 2
obj.y // 3
obj.z // 3

a.y // undefined
```

需要注意的是，要使得 Proxy 起作用，必须针对 Proxy 实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

如果handler没有设置任何拦截，那就等同于直接通向原对象。

例如：

```js
var a = {x: 2}
var obj = new Proxy(a, {})

obj.y = 3

a.y // 3
```
有一个技巧是把 Proxy 实例作为其他对象的原型对象，这样就可以让其他对象继承（或者说委托？）Proxy 实例的拦截方法。

例如：

```js
var obj = new Proxy({}, {
    get: function(){
        return 233
    }
})

var a = Object.create(obj)

a.someprop // 233
```
此外，Proxy 对象还提供了一个 `revoke` 方法，可以随时注销所有的代理操作。

```js
var p = Proxy.revocable({}, {
    get() {
        return 1
    }
});

var a = p.proxy
a.x // 1
p.revoke()
a.x // Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
```
`Proxy.revocable` 方法返回一个对象，该对象的proxy属性是 Proxy 实例，revoke属性是一个函数，可以取消 Proxy 实例。上面代码中，当执行revoke函数之后，再访问 Proxy 实例，就会抛出一个错误。

Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

包括 `get()`、`set()` 在内，Proxy 支持的拦截操作有十多种，包含了大部分对象的方法操作的拦截。具体请查阅 ECMAScript 6 入门 及 MDN 文档

Proxy 的功能非常类似于设计模式中的代理模式，该模式常用于三个方面：

- 拦截和监视外部对对象的访问
- 降低函数或类的复杂度
- 在复杂操作前对操作进行校验或对所需资源进行管理

### 使用 Reflect 操作对象
ES6 中引入的 Reflect 是另一个元编程的特性，它使得我们可以直接操纵对象的原生行为。

Reflect 不是一个函数对象，因此它不可构造对象。所以 Reflect 跟 Math 有某种程度上的相似，他们都是方法集。

Reflect 对象与 Proxy 对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect 对象的设计目的有这样几个。

（1） 将 Object 对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。

（2） 修改某些 Object 方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)  在无法定义属性时，会抛出一个错误，而     Reflect.defineProperty(obj, name, desc)` 则会返回 false。

（3） 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 `name in obj` 和 `delete obj[name]` ，而 `Reflect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为。

```js
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```
（4）Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

```js
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target,name, value, receiver);
    if (success) {
      log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```
上面代码中，Proxy 方法拦截 target 对象的属性赋值行为。它采用 Reflect.set 方法 将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

有了 Reflect 对象以后，很多操作会更易读。

```js
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```
Reflect 对象一共有 13 个静态方法。

- Reflect.apply(target,thisArg,args)
- Reflect.construct(target,args)
- Reflect.get(target,name,receiver)
- Reflect.set(target,name,value,receiver)
- Reflect.defineProperty(target,name,desc)
- Reflect.deleteProperty(target,name)
- Reflect.has(target,name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

上面这些方法的作用，大部分与 Object 对象的同名方法的作用都是相同的，而且它与 Proxy 对象的方法是一一对应的

## 对象方法

### 原型相关 <small>create, setPrototypeOf, getPrototypeOf</small>

#### Object.create(proto, [ propertiesObject ])
该方法使用指定的原型对象和其属性创建了一个新的对象。可理解为该方法会创建一个对象并把这个对象的 [[Prototype]]关联到指定对象。

需要注意的是， `Object.create(null)` 会创建一个拥有空（或者 null）[[Prototype]] 链的对象，这个对象无法进行委托。由于这个对象没有原型链，所以 `instanceof` 操作符无法进行判断，因此总是返回 false。这些特殊的空 [[Prototype]] 对象通常被称作“字典”，他们完全不会受到原型链的干扰，因此非常适合用来储存数据。

> 委托行为
<br/>
委托行为意味着某些对象在找不到属性或方法引用时会把这个请求委托给另一个对象。

#### Object.setPrototypeOf(obj, prototype)
该方法是 ES6 的新方法，用于设置一个指定的对象的原型 ( 例如,内置的 [[Prototype]] 属性）到另一个对象或 null。可以代替 ES5 的 `Object.create`。

例如有两个对象 a 和 b，我们需要把 b 设为 a 的原型，以便 a 可以继承 b 的属性：

```js
var a = {x:1}
var b = {y:2}

Object.setPrototypeOf(a, b)

a.x // 1
a.y // 2

Object.getOwnPropertyNames(a) // ["x"]
```
上例中把 b 设为 a 的原型，因此当向 a 查询 y 时，由于 a 本身没有 y 属性，所以会循着原型链查询到 b 的 y。

再例如有两个函数（函数也是对象哦！） Bar 和 Foo，我们需要把 Bar.prototype 关联到 Foo.prototype:

```js
// 创建 Foo
function Foo(name) {this.name = name}
Foo.prototype.sayName= function() {return this.name}

// 创建 Bar
function Bar(name){Foo.call(this, name)}

//关联 prototype
// ES6 之前需要抛弃默认的 Bar.prototype
Bar.prototype = Object.create(Foo.prototype)

// ES6 开始可以直接修改现有的 Bar.prototype
Object.setPrototypeOf(Bar.prototype, Foo.prototype)

var a = new Bar('a')
a.sayName()
```
如果不考虑
`Object.create(..)` 方法带来的轻微性能损失（抛弃的对象需要进行垃圾回收），它其实比 ES6 及其之后的方法更短切可读性更高。

#### Object.getPrototypeOf(obj)
该方法返回指定对象的原型（即内部 [[Prototype]] 属性的值）。如果没有继承属性，则返回 null 。

```js
var a = {}
var b = Object.create(a)

Object.getPrototypeOf(b) === a // true
```

### 属性描述符相关 <small>getOwnPropertyDescriptor, defineProperty, defineProperties, preventExtensions, seal, freeze, isExtensible, isSealed, isFrozen</small>

#### Object.getOwnPropertyDescriptor(obj, prop)
返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

例如：

```js
var myObj = {
    a: 2
}

Object.getOwnPropertyDescriptor(myObj, "a")

//{value: 2, writable: true, enumerable: true, configurable: true}
```
在 ES5 之前， JavaScript 语言本身并没有提供可以直接检测属性特性的方法， 比如判断属性是否是只读。

但是从 ES5 开始，所有的属性都具备了属性描述符。

#### Object.defineProperty(obj, prop, descriptor)
该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

我们可以使用
`Object.defineProperty(..)` 来添加一个新属性或者修改一个已有属性（ 如果它是 configurable） 并对特性进行设置。

例如：

```js
var myObj = {}

Object.defineProperty( myObj, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});

myObj.a; // 2
```

#### Object.defineProperties(obj, props)
该方法可以在一个对象上同时添加（定义）多个属性的属性描述符。

```js

var myObj = {}

Object.defineProperties(myObj, {
    a: {
        value: 2,
        writable: true
    },
    b: {
        value: 3,
        writable: true
    }
})

myObj.a; // 2
myObj.b; // 3
```

#### Object.preventExtensions(obj)
阻止对象扩展。

该方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

例如：

```js
var myObj = {
    a:2
};
Object.preventExtensions( myObj );
myObj.b = 3;
myObj.b; // undefined

```

#### Object.seal(obj)
密封对象以防删除。

该方法可以让一个对象密封，并返回被密封后的对象。密封对象是指那些不能添加新的属性，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性，但可能可以修改已有属性的值的对象。

即密封之后不仅不能添加新属性， 也不能重新配置或者删除任何现有属性（ 虽然可以修改属性的值）。

#### Object.freeze(obj)
该方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。

这个方法实际上会在一个现有对象上调用 `Object.seal(..)` 并把所有“ 数据访问” 属性标记为 writable:false， 这样就无法修改它们的值。

这个方法是可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身及其任意直接属性的修改（ 不过这个对象引用的其他对象是不受影响的）。

你可以“ 深度冻结” 一个对象， 具体方法为， 首先在这个对象上调用 `Object.freeze(..)` 然后遍历它引用的所有对象并在这些对象上调用 `Object.freeze(..)`。 但是一定要小心， 因为这样做有可能会在无意中冻结其他（ 共享） 对象。

#### Object.isExtensible(obj), Object.isSealed(obj), Object.isFrozen(obj)**
`Object.isExtensible()` 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

`Object.isSealed()` 方法判断一个对象是否被密封(sealed)。

`Object.isFrozen()` 方法判断一个对象是否被冻结(frozen)。

### 枚举相关 <small>keys, values, entries, getOwnPropertyNames, getOwnPropertySymbols</small>

#### Object.keys(obj), Object.values(obj)， Object.entries(obj)
`Object.keys()` 方法会返回一个数组，包含所有可枚举属性。不查找原型链。

`Object.values()` 方法会返回一个数组，包含所有可枚举属性值。不查找原型链。

`Object.entries()` 方法会返回一个数组，包含所有可枚举 [key，value] 对。不查找原型链。

注意返回的数组中元素的排列顺序和使用 `for...in` 循环遍历该对象时返回的顺序一致 （他们与for-in的主要区别是 `for-in` 循环还会枚举其原型链上的属性）。

```js
var obj = {a: 1, b: 2, c: 3}
Object.defineProperty(obj, "d", {
    value: 4,
    enumerable: false
})

obj.d // 4
Object.keys(obj) // [1, 2, 3]
Object.values(obj) // [1, 2, 3]
Object.entries(obj) // [["a", 1], ["b", 2], ["c", 3]]
```

#### Object.getOwnPropertyNames(obj)
该方法会返回一个数组，包含所有属性，无论它们是否可枚举。不查找原型链。

```js
var obj = {a: 1, b: 2, c: 3}
Object.defineProperty(obj, "d", {
    value: 4,
    enumerable: false
})

Object.getOwnPropertyNames(obj) // ["a", "b", "c", "d"]
```

#### Object.getOwnPropertySymbols()
返回一个数组，包含对象自身的所有 Symbol 属性（符号属性）。

```js
var a = {
    x: 2,
    [Symbol('y')]: 3,
    [Symbol('z')]: 4
}

Object.getOwnPropertySymbols(a)     // [Symbol(y), Symbol(z)]
```
Object 的方法中只有此方法能遍历自身 `Symbol` 属性。另外一个能遍历对象 Symbol 属性的方法是 `Reflect.ownKeys(obj)` ，`Reflect.ownKeys` 返回一个数组，包含对象自身的所有属性，不管是属性名是 Symbol 或字符串，也不管是否可枚举。

### 其他 <small>assign, is</small>

#### Object.assign(target, …source)

该方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

注意：

 - Object.assign 方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
 - Object.assign 会跳过那些值为 null 或 undefined 的源对象

#### Object.is(value1, value2)
该方法用来确定两个值是否是相同的值。
`Object.is()` 会在下面这些情况下认为两个值是相同的：
- 两个值都是 undefined
- 两个值都是 null
- 两个值都是 true 或者都是 false
- 两个值是由相同个数的字符按照相同的顺序组成的字符串
- 两个值指向同一个对象
- 两个值都是数字并且
- 都是正零 +0
- 都是负零 -0
- 都是 NaN
- 都是除零和 NaN 外的其它同一个数字

这种相等性判断逻辑和传统的 == 运算符所用的不同，== 运算符会对它两边的操作数做隐式的类型转换（如果它们是不同类型的值的话），然后才进行相等性比较，（所以才会有类似 “” == false 为 true 的现象），但     `Object.is` 不会做这种类型转换。

当然，严格相等运算符 === 也不会对操作数进行类型转换，但是它会把 -0 和 +0 这两个数值视为相同的，还会把两个 NaN 看成是不相等的。

```js
Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

## 对象实例方法
### 判断属性是否存在 <small>in, hasOwnProperty</small>
#### in 操作符
in操作符会检查属性是否在对象及其 [[Prototype]] 原型链中。

```js
"PI" in Math          // 返回true
```

#### obj.hasOwnProperty(prop)
该方法检查属性是否在 obj 中存在，不会检查 [[Prototype]] 原型链。

需要注意的是有的对象可能没有连接到 `Object.prototype`，也就没有 `hasOwnProperty` 方法，例如通过 `Object.create(null)`创建的空对象，在这种情况下，形如obj.hasOwnProperty(prop)就会失败。

这时可以使用一种更加强硬的方法来进行判断：`Object.prototype.hasOwnProperty.call(obj, "prop")`，它借助基础的 `hasOwnProperty(..)` 方法并把它显示绑定到 obj 上。

### 判断属性是否可枚举 <small>propertyIsEnumerable</small>
#### obj.propertyIsEnumerable(prop)
该方法检查给定的属性名是否直接存在于对象中（而不是原型链上），并满足 enumerable: true （可枚举）。

```js
var mysymbol = Sy
var a = {x: 2}

Object.defineProperty(a, 'y', {
    value: 3,
    enumerable: false
})

Object.defineProperty(a, Symbol('z'), {
    value: 4,
    enumerable: true
})

a.propertyIsEnumerable('y')     // false
a.propertyIsEnumerable('z')     // false
```

### 判断原型 <small>instanceof, isPrototypeOf</small>
#### instanceof
instanceof运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

例如：

```js
function Foo(){}
var a  = new Foo()

a instanceof Foo // true
```
`intanceof` 运算符的左操作数是一个普通的对象，右操作数是一个函数。`instanceof` 回答的问题是： 在 a 的整条 [[Prototype]] 链中是否有指向 Foo.prototype 的对象。

可惜这个方法只能处理对象和函数之间的关系。如果你想判断两个对象之间是否通过 [[Prototype]] 链关联，只用 `instanceof` 无法实现。更好的办法是使用下面的 prototypeObj.isPrototypeOf(obj) 方法。

#### prototypeObj.isPrototypeOf(obj)
该方法用于测试一个对象（prototypeObj）的是否存在于另外一个对象（obj）的原型（[[Prototype]]）链上

例如：

```js
function Foo(){}
var a  = new Foo()

Foo.prototype.isPrototypeOf(a) // true
```

```js
var a = {}
var b = {}

Object.setPrototypeOf(a, b)

b.isPrototypeOf(a) //true
```

### 其他 <small>valueOf, toString, toLocaleString</small>

#### obj.valueOf()

该方法返回值为该对象的原始值。

JavaScript 调用 `valueOf()` 方法用来把对象转换成原始类型的值（数值、字符串和布尔值）。 你很少需要自己调用此函数；当遇到一种需要转换成一个原始值情况时候， JavaScript 会自动调用此函数。例如运算 `obj + 123` 。

```js
var a = {x: 1}

a.valueOf() // Object {x: 1}

a.valueOf = () => 1

console.log(a + 123) // 124
```
如果 `valueOf()` 返回的不是个原始类型的值原始类型值，系统会再尝试 `toString()` 方法：

```js
var a = {
    valueOf() {return {}},
    toString() {return 1}
}

console.log(a + 123) //124
```
默认情况下, `valueOf()` 会被每个对象 Object 继承。每一个内置对象都会覆盖这个方法为了返回一个合理的值，如果对象没有原始值，`valueOf() 就会返回对象自身。

#### obj.toString()
该方法返回一个表示该对象的字符串。

每个对象都有一个 `toString()` 方法，当对象被表示为文本值时或者当以期望字符串的方式引用对象时，该方法被自动调用。比如在 alert 一个对象或其他某个操作或者运算需要字符串的时候的时候，就会自动调用该对象的 `toString()` 方法。

```js
var a = {x: 1}

alert(a) // [object Object]

console.log('hello' + a) // "hello[object Object]"
```
如果 `toString()` 不可用，系统会再尝试 `valueOf()` 方法：

```js
var a = {
    toString() {return {}},
    valueOf() {return "hello"}
}

alert(a) // hello
```
默认情况下，`toString()` 方法被每个继承自 Object 的对象继承。如果此方法在自定义对象中未被覆盖，`toString()` 返回 “[object type]”，其中 type 是对象类型，例如：

```js
var o = new Object();
o.toString();           // 返回了[object Object]
```
所以我们可以利用 `toString` 方法来检测对象类型，为了避免使用到被覆盖的`toString` 方法被覆盖(默认情况下一般都会被覆盖的，如 `Arrary.prototype.toString()` 的行为是把数组转换成字符串)，我们直接调用 `Object.prototype.toString()` 来使用：

```js
Object.prototype.toString.call(new Date()) // "[object Date]"
Object.prototype.toString.call(new Array()) // "[object Array]"
Object.prototype.toString.call(Math) // "[object Math]"

// 从 javascript 1.8.5 开始可以检测 undefined 与 null
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
```

#### obj.toLocaleString()
该方法主要用于被本地化相关对象覆盖。一般返回调用 `toString()` 方法的结果。

覆盖了toLocaleString()方法的对象包括以下这些：

- Array: Array.prototype.toLocaleString()
- Number: Number.prototype.toLocaleString()
- Date: Date.prototype.toLocaleString()

由于在不同地区该方法返回的结果可能不同，因此 `toLocaleString` 只是用来显示结果给用户，最好不要在脚本中用来做基本计算。例如，同样是 3 月 21 日，在美国，`toLocaleString` 可能会返回 “03/21/08 01:02:03”，而在欧洲，返回值则可能是 “21/03/08 01:02:03”，因为欧洲的惯例是将日期放在月份前面。
