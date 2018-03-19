<!-- TOC -->

- [前言](#前言)
- [图例](#图例)
- [创建函数](#创建函数)
  - [函数声明与函数表达式 <small>Function Declaration & Function Expression</small>](#函数声明与函数表达式-smallfunction-declaration--function-expressionsmall)
  - [构造函数与类 <small>Constructor & class</small>](#构造函数与类-smallconstructor--classsmall)
- [属性](#属性)
  - [length](#length)
  - [name](#name)
  - [prototype](#prototype)
  - [元属性 new.target](#元属性-newtarget)
- [实例方法](#实例方法)
  - [apply()、call()](#applycall)
  - [bind()](#bind)
- [基本概念](#基本概念)
  - [函数的多重用途 <small>Call & Construct</small>](#函数的多重用途-smallcall--constructsmall)
  - [默认参数 <small>Default Parameter</small>](#默认参数-smalldefault-parametersmall)
  - [不定参数 <small>（Rest Parameters）</small>](#不定参数-smallrest-parameterssmall)
  - [函数作用域与执行环境 <small>（Function Scope & Excution Context）</small>](#函数作用域与执行环境-smallfunction-scope--excution-contextsmall)
  - [闭包](#闭包)
    - [作用域闭包 <small>（Scope Closures）</small>](#作用域闭包-smallscope-closuressmall)
    - [模块 <small>（Module）</small>](#模块-smallmodulesmall)
  - [调用栈 <small>（Call Stack）</small>](#调用栈-smallcall-stacksmall)
  - [this 词法 <small>（Lexical-this）</small>](#this-词法-smalllexical-thissmall)
- [常用方法](#常用方法)
  - [即时函数 <small>（IIFE）</small>](#即时函数-smalliifesmall)
  - [柯里化 <small>（Curry）</small>](#柯里化-smallcurrysmall)
  - [递归 <small>（Recursion）</small>](#递归-smallrecursionsmall)
  - [迭代 （Iteration）](#迭代-iteration)
  - [记忆 <small>（Memoization）</small>](#记忆-smallmemoizationsmall)
  - [尾调用优化 <small>（Tail Call Optimization）</small>](#尾调用优化-smalltail-call-optimizationsmall)
  - [函数去抖与函数节流 <small>（Debounce & Throttle）</small>](#函数去抖与函数节流-smalldebounce--throttlesmall)
    - [函数去抖 <small>(debounce)</small>](#函数去抖-smalldebouncesmall)
    - [函数节流 <small>（throttle）</small>](#函数节流-smallthrottlesmall)
  - [分时函数 <small>（TimeChunk）</small>](#分时函数-smalltimechunksmall)
  - [惰性载入函数 <small>（Lazy Loading Functions）</small>](#惰性载入函数-smalllazy-loading-functionssmall)

<!-- /TOC -->
## 前言
前端新技术铺天盖地，各种框架、工具层出不穷眼花缭乱。最近重温JS基础，夯实的基础才是学习新技术的基石。本文作为读书笔记简单总结下js函数的基础知识

## 图例
![image](https://raw.githubusercontent.com/lijiliang/record/master/images/jsfunction.png)

## 创建函数
### 函数声明与函数表达式 <small>Function Declaration & Function Expression</small>

定义（创建）函数时可以分为函数表达式与函数声明两种方式：

```js
// 函数表达式
var foo = function(...){}

// 函数表达式
(function(){...})

// 函数表达式
setTimeout(function timer(){...}, 200)

// 函数声明
function(){...}
```
上面的代码中有三个函数表达式（头两个是命名函数表达式，第三个是匿名函数表达式），一个函数声明。我们来区分下函数表达式与函数声明的区别：

 - 区分函数声明与函数表达式最简单的方法是看 `function` 关键字出现在声明中的位置 (不仅仅是一行代码，而是整个声明的位置)。 如果 `function` 是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式
 - 函数表达式可以匿名的，而函数声明则不可以省略函数名 -- 在 Javascript 的语法中这是非法的
 - **函数声明和函数表达式之间最重要的区别是它们的名称标识将会绑定在何处**。函数声明会绑定在自身的作用域中，页函数表达式会绑定在表达自身的函数中，而不是所在的作用域中。举个例子：


```js
// 函数表达式
var foo = function bar(){}
console.log(bar) // ReferenceError: bar is not defined

// 函数表达式
(function bar(){})
console.log(bar) // ReferenceError: bar is not defined
```

```js
//  函数声明
function bar(){}
console.log(bar) // function bar(){}
```
匿名函数表达式书写起来简单快捷，但它也有几个缺点：

 - 匿名函数在栈追踪中不会显示出有意义的函数名，使得调试很困难。
 - 如果没有函数名，当函数需要引用自身时只能使用已过期的 `arguments.callee` 引用，比如在递归中。另一个函数需要引用自身的例子，是在事件触发后事件监听器需要解绑自身。
 - 匿名函数省略了对代码可读性/可理解性很重要的函数名。一个描述性的名称可以让代码不言自明。

 ### 箭头函数 <small>（Arrow Function）</small>
箭头函数是 ES6 中新增的特性，箭头函数是使用箭头（=>）定义函数的新语法，但是它与传统的 JavaScript 函数有些许的不同，主要集中在以下几个方面：
- **没有 this, super, arguments 和 event.target** 绑定，箭头函数内部的这些值直接取自定义时的外围非箭头函数。
- **不能通过 new 关键字调用** 箭头函数没有 `constructor` 方法，所以不能被用作构造函数，如果通过new关键字调用箭头函数，程序会抛出错误
- **没有原型** 由于不可以通过 new 关键字调用箭头函数，因而没有构建原型的需求，所以箭头函数不存在 prototype 这个属性。
- **不可改变 this 的绑定**  函数内部的 this 值不可被改变，在函数声明周期内始终保持一致。
- **不支持arguments 对象** 箭头函数没有 arguments 绑定，所以你必须通过命名参数和不定参数这两种形式访问函数的参数。
- **不支持重复的命名参数** 无论是在严格还是非严格模式下，箭头函数都不支持重复的命名参数；而在传统函数的规定中，只有在严格模式下才不能有重复的命名参数。

**需要注意的是，由于没有 this 的绑定，箭头函数的 this 值不受 call()、apply()、bind() 方法的影响。**

箭头函数的语法简洁，非常适用于数组处理等回调函数，包括回调函数在内的所有使用匿名函数表达式的地方都适合使用箭头函数来改写：

```js
const arr = [4,5,6,1,2,3]
const result = arr.sort((a, b)=> a - b)

console.log(result)     // [1, 2, 3, 4, 5, 6]
```

### 构造函数与类 <small>Constructor & class</small>
构造函数本身就是一个函数，只不过该函数是出于创建新对象的目的而定义的。按照惯例，构造函数始终都应该以一个
大写字母开头，而非构造函数则应该以一个小写字母开头。

例如：

```js
const arr = new Array(2,3,4)
```

这里的 Array 就是个构造函数。

在 ES6 Class 特性出现以前，我们经常使用 构造函数来模拟类的特性。思路基本都是：首先创建一个构造函数，然后定义另一个方法并复制给构造函数的原型。

```js
function Person(name){
    this.name = name
}
Person.prototype.sayName = function(){
    console.log(this.name)
}

const person = new Person('Benson')
person.sayName()  // Benson

console.log(person instance Person)  // true
console.log(person instance Object)  // true
```
上面代码中 Person 是一个构造函数，其执行后创建了一个名为 name 的属性；给 Person 的原型添加一个 sayName() 方法，所以 Person 对象的所有实例都会共享这个方法。由于存在原型继承的特性，person 对象是 Person 的实例，也是 Object 的实例。

> 注意，intanceof 经常被用来检测实例与构造函数之间的关系，但实际上这里 intanceof 回答的问题是：在 person 的整条 [[ProtoType]] 链中是否有指向 Person.prototype 和 Object.prototype 的对象。<br/>
当我们对一个函数使用 new 调用时，实际是生成一个对象，并把这个对象内部的 [[ProtoType]] 链关联到构造函数的 prototype 属性上，同时将函数的 this 绑定到该对象。

许多模拟类的 JavaScript 库都是基于这个模式进行开发，而 ES6 中的类也借鉴了类似的方法。ES6 中的类是对构造函数写法的一种语法糖，它简化了构造函数的写法。我们使用 class 来复写上一段示例：

```js
class PersonClass{
    constructor(name){
        this.name = name
    }

    // 等价于 Person.prototype.sayName()
    sayName () {
        console.log(this.name)
    }
}

const person = new Person('Benson')
person.sayName()  // "Benson"

console.log(person instance PersonClass)  // true
console.log(person instance Object) // true

```
通过类声明语法定义 PersonClass 的行为与之前创建 Person 构造函数的过程相似，只是这里直接在类中通过特殊的 constructor 方法名来定义构造函数，且由于这种类使用简介语法拉定义方法，因而不需要添加 function 关键字。

不过本质上 PersonClass 仍是函数，sayName 也是 PersonClass.prototype 上的方法。PersonClass 声明实际上是创建了一个具有构造函数方法行为的函数。

**需要注意的是，类属性不可被赋予新值，在这个示例中，PersonClass.prototype 就是这样一个只可读的类属性，而 Person.prototype 则可读可写。**

ES6 中的类还具有很多特性，这里不做展开，有兴趣的请自己查阅。

## 属性
### length
length 属性表示函数希望接收的命名参数的个数。如：

```js
function sum (n1, n2) {
    return n1 + n2
}
console.log(sum.length) // 2

```
需要注意的是，length 统计的是函数命名参数的数量，不定参数的加入不会影响 length 属性的值。例如：

```js
function sum (n1, n2, ...rest) {
    return n1 + n2 + rest.reduce((prev, next)=> prev + next)
}
console.log(sum.length) // 2

```
这里加入 不定参数 …rest 后，length 属性的值仍然是 2。

### name
name 属性返回函数实例的名称。例如：

```js
function foo () {}
bar = function(){}

console.log(foo.name) // foo
console.log(bar.name) // bar
```

这段代码中，foo() 函数的 name 属性值为“foo”，对应着声明时的函数名称；匿名函数表达式 bar() 的 name 属性值是“bar”，对应着被赋值为该匿名函数的变量的名称。

- Function.bind() 所创建的函数将会在函数的名称前加上”bound “：

```
function foo() {};
foo.bind({}).name; // "bound foo"
```
- 当通过 get 和 set 访问器来存取属性时, “get” 或 “set” 会出现在函数名称前:

```js
var o = {
    get foo(){},
    set foo(x){}
};
var descriptor = Object.getOwnPropertyDescriptor(o, "foo");
descriptor.get.name; // "get foo"
descriptor.set.name; // "set foo";
```
- 如果 Symbol 被用于函数名称，并且这个 symbol 具有相应的描述符，那么方法的名字就是方括号中的描述符。

```js
var sym1 = Symbol("foo");
var sym2 = Symbol();
var o = {
    [sym1]: function(){},
    [sym2]: function(){}
};

o[sym1].name; // "[foo]"
o[sym2].name; // ""
```
切记，函数的 name 属性值不一定引用同名变量，它只是协助调试用的额外信息，所以不能使用 name 属性的值来获取对于函数的引用。

### prototype
Function.prototype 属性存储了Function的原型对象

一般用来给Function实例添加公共方法和属性


### 元属性 new.target
>元属性是指非对象的属性，其可以提供非对象目标的补充信息（例如 new）。

为了解决判断函数是否通过 new 关键字调用的问题，ECMAScript6 引入了 new.target 这个元属性。当调用函数的 [[Construct]] 方法时，new.target 返回一个指向构造方法或函数的引用；如果调用 [[Call]] 方法，则 new.target 的值为 undefined。

有了这个元属性，可以通过检测 new.target 是否被定义过来安全地检测一个函数是否是通过 new 关键字调用的：


```js
function Person(name) {
    if(typeof new.target !== "undefined") {
        this.name = name
    } else {
        throw new Error("必须通过 new 关键字来调用 Person")
    }
}

const person = new Person("Benson")
const notPerson1 = Person("Benson")  // Uncaught Error: 必须通过 new 关键字来调用 Person
const notPerson2 = Person.call(person, "Benson") // Uncaught Error: 必须通过 new 关键字来调用 Person
```
也可以检查 new.target 是否被某个特定的构造函数所调用：
```js
function Person(name) {
    if(new.target === Person) {
        this.name = name
    } else {
        throw new Error("必须通过 new Person() 生成该实例")
    }
}
function AnotherPerson(name) {
    Person.call(this, name);
}
var person = new Person("Benson");
var anotherPerson = new AnotherPerson("Benson");  // error!
```
在这段代码中，如果要让程序正确运行，new.target 一定要指向 Person，否则就会抛出错误。

## 实例方法
### apply()、call()
使用 apply 与 call 调用函数被称为函数应用。这两个方法的用途都是在特定的作用域下调用函数，实际上等于设置函数体内 `this` 对象的值

apply() 方法调用一个函数，其具有一个指定的this值，以及作为一个**数组**(或类似数组的对象) 提供的参数

call() 方法调用一个函数，其具有一个指定的this值和分别地提供的**参**数(参数的列表)

### bind()
bind()方法会创建一个新的函数，当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列

## 基本概念
### 函数的多重用途 <small>Call & Construct</small>
JavaScript 函数有两种不同的内部方法： [[Call]] 和 [[Construct]]。当通过 new 关键字调用函数时，执行的是 [[Construct]] 函数，它负责创建一个通常被称作实例的新对象，然后再执行函数体，将 this 绑定到实例上；如果不通过 new 关键字调用函数，则执行 [[Call]] 函数，从而直接执行代码中的函数体。具有 [[Construct]] 方法的函数被统称为构造函数。

切记，不是所有函数都有 [[Construct]] 方法，因此不是所有函数都可以通过 new 来调用，例如箭头函数就没有 [[Construct]] 方法。

### 默认参数 <small>Default Parameter</small>
对于函数的命名参数，如果不显式传值，则其默认值为 undefined。ES6 新增特性可以为参数传入值提供一个默认的初始值。例如：

```js
function makeRequest(url, timeout=2000, callback=function(){} {
    // 函数的其余部分
})
```
在这个函数中，只有第一个参数被认为总是要为其传入值的，其他两个参数都是默认值，如果未传入或传入值为 undefined 就会应用默认参数。

**默认参数对 arguments 对象的影响**

如果一个函数使用了默认参数值，则 arguments 对象保持与命名参数分离，改变命名参数不会影响 arguments 对象。例如：

```js
// 无默认参数且非 strict mode 下
function foo(a, b ) {
    console.log(a === arguments[0]) // true
    console.log(b === arguments[1]) // true

    a = "c"
    b = "d"

    onsole.log(a === arguments[0]) // true
    console.log(b === arguments[1]) // true
}

foo("a", "b")

// 有默认参数下
function bar(a, b="b" ) {
    console.log(a === arguments[0]) // true
    console.log(b === arguments[1]) // true

    a = "c"
    b = "d"

    console.log(a === arguments[0]) // false
    console.log(b === arguments[1]) // false
}

bar("a", "b")
```
如以上示例，改变 a 和 b 的值并不会影响 arguments 对象，这样就可以通过 arguments 对象将参数恢复为初始值。此外需要提到的是，无默认参数但是在 strict mode 下也是如此。

**默认参数表达式**
关于默认参数，最有趣的特性就是非原始值传参了。举个例子，你可以通过函数执行来得到默认参数的值

```js
function getValue() {
    return  5
}

function add(num1, num2 = getValue()) {
    return num1 + num2
}

console.log(add(1, 1))  // 2
console.log(add(1))         //6

```

如上面示例，参数 num2 的默认值可以以表达式的形式传入。切记，初次解析函数时不会调用 getValue() 方法，只有当调用 add() 函数且不传入第二个参数时才会调用。

正因为默认参数是在函数调用时求值，所以可以使用先定义的参数作为后定义参数的默认值。就像这样：

```js
fucntion add(num1, num2 = num1) {
    return num1 + num2
}

console.log(add(1))         // 2
```
更进一步，可以将参数 num1 传入一个函数来获取 num2 的值：

```js
function getValue(value) {
    return  value + 5
}

function add(num1, num2 = getValue(num)) {
    return num1 + num2
}

console.log(add(1))         // 7
```
### 不定参数 <small>（Rest Parameters）</small>
在函数的命名参数前添加三个点 （…）就表明这是一个不定参数，该参数为一个数组，包含自它之后传入的所有参数，通过这个数组名即可逐一访问里面的参数。

例如：

```js
function foo(num, …keys) {
console.log(keys)
}

foo(1,2,3,4,5) // [2, 3, 4, 5]
```

如上面示例，不定参数 keys 包含的是 num1 之后传入的所有参数（而 arguments 对象包含的则是所有传入的参数，包括 num1。同时 arguments 是类数组对象，而不定参数 keys 是数组。另外无论是否使用不定参数，arguments 总是包含了所有传入函数的参数）。

另外一定需要注意的是 函数的 length 属性统计的是函数命名参数的数量，不定参数的加入不会影响 length 属性的值。在上面的示例中 foo() 函数的 length 值为 1，因为只会计算 num1。

不定参数还有两条使用限制：

- 每个函数最多只能声明一个不定参数，而且一定要放在所有参数的末尾。
- 不定参数不能用于对象字面量 setter 之中。因为 对象字面量 setter 的参数有且只能有一个，而在不定参数的定义中参数可以无限多。
-
### 函数作用域与执行环境 <small>（Function Scope & Excution Context）</small>
函数作用域是最常见的作用域单元。
> 函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用（事实上在嵌套的作用域中也可以使用）。

每个函数都是对象，它同其他对象一样，拥有可编程访问的属性，和一系列不能通过代码访问的仅供 JavaScript 引擎存取的内部属性。其中一个内部属性是 [[Scope]]，它包含了一个函数被创建的作用域中对象的集合。这个集合被称为函数的作用域链，它决定哪些数据能被函数访问。

一定程度上你可以像理解对象的原型链 [[Prototype]]一样去理解函数的作用域链 [[Scope]]。原型链的尽头是 Object.prototype，作用域链的尽头是全局作用域。

比如有这么一段代码：

```js
function add(n1, n2) {
    var sum = n1 = n2
    return sum
}
```
函数 add 创建时，它的作用域链中插入了一个对象变量，这个全局对象代表着所有在全局范围内定义的变量。该全局对象包括诸如 window、navigator、document 等，如图所示：

函数 add 的作用域将会在执行时用到。假设执行如下代码：

```js
var total = add(5, 10)
```
执行此函数时会创建一个称为执行环境（execution context，也称为执行上下文）的内部对象。一个执行环境定义了一个函数执行时的环境。函数每次执行时对应的执行环境都是独一无二的，所以多次调用同一个函数就会导致创建多个执行环境。当函数执行完毕，执行环境就被销毁。

每个执行环境都有自己的作用域链，用于解析标识符，当执行环境被创建时，他的作用域链初始化为当前运行函数的 [[Scope]] 属性中的对象。这些值按照它们出现的顺序被复制到执行环境的作用域链中。这个过程一旦完成，一个被称为“活动对象（activation object）”的新对象就为执行环境创建好了。活动对象作为函数运行时的变量对象，包含了所有局部变量、命名参数、参数集合以及 this。然后此对象被推入作用域链的最前端。当执行环境被销毁，活动对象也随之销毁。

如图：
![image](https://raw.githubusercontent.com/lijiliang/record/master/images/jsfunction-excution-context.png)

函数作用域也遵循词法作用域的屏蔽规则：

在函数执行过程中，每遇到一个变量，都会经历一次标识符解析过程以决定从哪里获取或储存数据（LHS 查询与 RHS 查询）。该过程搜索执行环境的作用域链，查找同名的标识符。搜索过程从作用域的头部开始，也就是当前运行函数的活动对象。如果找到，就使用这个标识符对应的对象；如果没找到，继续搜索作用域链中的下一个对象。搜索过程会持续进行，直到找到标识符，若无法搜索到匹配的对象，那么标识符将被视为是未定义的。在函数执行过程中，每个标识符都要经历这样的搜索过程。

### 闭包
#### 作用域闭包 <small>（Scope Closures）</small>

闭包是个很常用的概念，我们先看看闭包的定义：
> 当函数可以记住并访问所在的词法作用域时， 就产生了闭包， 即使函数是在当前词法作用域之外执行。<br/>
无论通过何种手段将内部函数传递到所在的词法作用域以外， 它都会持有对原始定义作用域的引用， 无论在何处执行这个函数都会使用闭包。

我来举例三个典型的闭包，先看第一个：

```js
function foo() {
    var id = 'b'
    alert(id)
}

function bar() {
    var id = 'a'
    document.getElementById('my-btn').onclick = function handle() {
        alert(id)
    }
}

foo()
bar()
```
上面代码中，函数 foo 执行完毕后 foo() 的执行环境以及其活动对象(活动对象即其内部作用域)一起被销毁，内部变量 id 也会被垃圾回收机制从内存中回收。而函数 bar 执行完毕后，由于 onclick 事件绑定的函数 handle 保持着对变量 id 的引用，导致 bar() 的活动对象（内部作用域）并未随 bar() 的执行环境的销毁一起被销毁。

**像这样在函数执行完毕后仍能保持对函数内部作用域的引用的行为，就是闭包。**

再来看第二个示例，它是上面示例的变形：

```js
function foo(){
	var id = 'benson'
	return function bar(){
		console.log(id)
	}
}

var baz = foo()
baz()  // benson
```
这里 foo 执行完毕后，我们仍然可以在外部通过 foo() 的返回值 bar 来访问 foo() 的内部作用域，这样就形成了一个闭包。拜 bar 所声明的位置所赐， 它拥有涵盖 foo() 内部作用域的闭包， 使得该作用域能够一直存活， 以供 bar() 在之后任何时间进行引用。

bar() 依然持有对该作用域的引用， 而这个引用就叫作闭包。

本质上无论何时何地， 如果将函数（访问它们各自的词法作用域） 当作第一级的值类型并到处传递， 你就会看到闭包在这些函数中的应用。 在定时器、 事件监听器、Ajax 请求、 跨窗口通信、 Web Workers 或者任何其他的异步（或者同步） 任务中， 只要使用了回调函数， 实际上就是在使用闭包！

我们来看第三个典型闭包的示例：

```js
for(var i = 1;i <= 3; i++) {
    console.log('i:'+i)
    setTimeout(()=>console.log(i), i*1000)
}
```
想一想可能输出什么然后放控制台看一下。
你可以看到这段代码每个1秒输出了一个 4，这是为什么？

可能你期望的代码像会下面这样执行：

```js
setTimeout(()=>console.log(1), 1*1000)
setTimeout(()=>console.log(2), 2*1000)
setTimeout(()=>console.log(3), 3*1000)
```

但实际上，由于 i 跟 setTimeout 在同一作用域内，代码执行起来其实是这样的：

```js
var i
i = 1
setTimeout(()=>console.log(i), i*1000)

i++
setTimeout(()=>console.log(i), i*1000)

i++
setTimeout(()=>console.log(i), i*1000)

// 停止运行
```
看明白了吗，这样写你可能更容易懂些：

```js
var i
i = 1
i++
i++

1秒后执行： console.log(i)
2秒后执行： console.log(i)
3秒后执行： console.log(i)
```
所以代码会连续 3 秒每秒都输出 3，因为当 console.log 执行时，i 已经变成 3 了。
导致这种结果的根本原因是三个 console.log 使用的是同一个作用域内的 i。

我们使用一些方法在 setTimeout 外加一层作用域，让每个包含 setTimeout 的作用域都有自己的 i 就行，例如使用 IIFE 给每次循环创建独立的作用域：

```js
for(var i=1;i<=3;i++){
	(function(i){
		setTimeout(() => console.log(i), i*1000)
	})(i)
}
```
如你所见这里使用了一个 IIFE 给每次迭代都创建了个闭包作用域，每个 `(function(j){..})() `内部的作用域里都有一个属于本作用域的 j，每次迭代时把 i 赋值给 j，这样即使最后 i 变成了 3，每个作用域里的 j 依然不受影响。

也可以使用 es6 的 `let` 的块级作用域来解决这个问题：

```js
for(var i = 1; i <= 3; i++) {
    let j = i
    setTimeout(()=>console.log(j), j*1000)
}
```
`let` 会认为外围的 `{ .. }` 是一个块级作用域，使用 `let` 定义的变量只能在这个块级作用域内访问。

注意，还有一点需要说明下， for 循环头部的 let 声明还会有一个特殊的行为。这个行为指出变量再循环的过程中不止被声明一次，而是每次迭代都会声明。随后每次迭代都会用上一个迭代结束时的初始值来初始化这个变量。所以在 for 循环中使用 let 创建块状作用域时直接这样写即可：

```js
for(let i = 1; i <= 3; i++) {
    setTimeout(()=>console.log(i), i*1000)
}
```

#### 模块 <small>（Module）</small>

模块是一个提供接口却隐藏状态与实现的函数或对象。

我们可以用函数和闭包来构造模块。

模块有两个主要特征：

- 为创建内部作用域而创建了一个包装函数。
- 包装函数的返回值必须至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的装饰。

普通词法查找：

```js
function foo() {
    console.log(a) // 这里会输出 2
}

function bar() {
    var a = 3
    foo()
}

var a = 2

bar()
```

闭包查找：

```js
function bar() {
    var a = 3
    return function foo() {
        console.log(a) // 这里会输出 3
    }()
}

var a = 2

bar()
```

### 调用栈 <small>（Call Stack）</small>
调用栈（Call Stack）是一个基本的计算机概念，可以理解为就是为了到达当前执行位置所调用的所有函数，这里引入一个概念：栈帧。

> 栈帧是指为一个函数调用单独分配的那部分栈空间。

调用栈（就是为了到达当前执行位置所调用的所有函数）。我们关心的调用位置就在当前正在执行的函数的前一个调用中。

![image](https://raw.githubusercontent.com/lijiliang/record/master/images/jsfunction-callstack.png)

*栈帧结构示意图*

当函数被调用时，就会被加入到调用栈顶部，执行结束之后，就会从调用栈顶部移除该函数。并将程序运行权利（帧指针）交给此时栈顶的栈帧。这种后进后出的结构也就是函数的调用栈。

通过调用栈可以

你可以把调用栈想象成一个函数调用链。但是这种方法非常麻烦并且容易出错。你可以使用以下两种方法查看阐述的调用链。

**方法一：**

可以很方便的通过 `console.trace()` 这个方法查看当前函数的调用帧:

![image](https://raw.githubusercontent.com/lijiliang/record/master/images/jsfunction-trace.png)


**方法二：**

绝大多数现代桌面浏览器都内置了开发者工具，其中包含JavaScript 调试器。 就本例来说， 你可以在工具中给 foo() 函数的第一行代码设置一个断点，或者直接在第一行代码之前插入一条 `debugger; `  语句。 运行代码时， 调试器会在那个位置暂停，同时会展示当前位置的函数调用列表， 这就是你的调用栈

栈中第二个元素， 就是函数的调用位置。

### this 词法 <small>（Lexical-this）</small>

为什么要使用this?

this提供了一种更优雅的方式来隐式“传递”一个对象引用，因为可以将 API 设计得更加简洁并且易于复用。

this是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

回想一下我们说函数作用域，当一个函数被执行时会创建一个称为执行环境的对象。每个环境都有自己的作用域链。每个环境也都有自己的this,此外这个执行环境还包含函数在哪里调用(调用栈)、函数的调用方法、传入的参数等信息

this 绑定有以下四种绑定规则

- **默认绑定**， 独立函数调用时在非 strict mode 下默认绑定到全局对象， strict mode 则为 undefined
- **隐式绑定**，当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象，隐式绑定可以发生绑定丢失。
- **显式绑定**，通过 call、apply 或者 bind 绑定
- **new 绑定**，使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：
    - 创建（或者说构造） 一个全新的对象。
    - 这个新对象会被执行 [[ 原型 ]] 连接。（即将新对象的 [[ProtoType]] 链关联至构造函数的 prototype 属性指向的对象，这个对象通常被称为原型）
    - 这个新对象会绑定到函数调用的 this。
    - 如果函数没有返回其他对象， 那么 new 表达式中的函数调用会自动返回这个新对象。

new 绑定会修改显示绑定的 this。

注意一些常被忽略的 this 绑定问题：

- 显式绑定时 传入 null 或 undefined 会使用默认绑定绑定到全局对象，所以最好传入个空对象，例如 `someFunc.call(Object.creat(null))`。
- 间接引用函数（最容易发生在赋值时，尤其注意函数作为参数赋值时），此时使用的是目标函数的引用，没有上下文对象，会应用默认绑定。

举例两个绑定丢失的示例：

```js
var o = {
name: 'Benson',
sayName: function () {
console.log(this.name)
}
}
var bar = o.sayName
var name = 'im global name'
bar() //  'im global name'
```
虽然 bar 是 o.sayName 的一个引用， 但是实际上， 它引用的是 sayName 指向的匿名函数本身， 因此此时的
bar() 其实是一个不带任何修饰的函数调用， 因此应用了默认绑定。

```js
// 示例二
var o = {
    name: 'Benson',
    sayName: function () {
        console.log(this.name)
    }
}

function foo(func) {
    func()
}

var name = 'im global name'

foo(o.sayName)
```
参数传递其实就是一种隐式赋值， 因此我们传入函数时也会被隐式赋值， 所以结果和上一
个例子一样。

**不过箭头函数的 this 会使用词法作用域规则在当前作用域查找 this，不会应用 this 绑定规则。**

## 常用方法
### 即时函数 <small>（IIFE）</small>

```js
(function foo(){})()
```
这里函数会被当作函数表达式而不是一个标准的函数声明来处理。

这里第一个 `( )` 将函数变成表达式，第二个 `( )` 执行了这个函数，这种模式被称为 IIFE(Immediately Invoked Function Expression，立即执行函数表达式)。

IIFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在 IIFE 执行之后当作参数传递进去。尽管这种模式略显冗长，但有些人认为它更容易理解：

```js
(function IIFE(def) {
    def(window)
})(function def(global) {
    console.log(global)
})

```

### 柯里化 <small>（Curry）</small>
柯里化，也常译为局部套用，是把多参函数转换为一系列单参函数并进行调用的技术。

《javascript 精粹》中认为使函数理解并处理部分应用的过程就称为 Curry 过程。

柯里化允许我们把函数与传递给它的参数相结合，产生出一个新的函数。

```js
function curring(fn) {
    var stored_args = Array.prototype.slice.call(arguments, 1)
    return function () {
        var new_args = Array.prototype.slice.call(arguments)
            args = stored_args.concat(new_args)
        return fn.apply(null, args)
    }
}
```

```js
function currying(fn) {
    var args = [].slice.call(arguments, 1)
    return function () {
        var new_args = [].slice.call(arguments)
        args = args.concat(new_args)
        return fn.apply(null, args)
    }

}

var cost = (function(){ var money = 0;
return function(){
    for ( var i = 0, l = arguments.length; i < l; i++ ){
        money += arguments[ i ]; }
        return money; }
    })();
var cost = currying( cost );

cost( 100 );
cost( 200 );
cost( 300 );

cost()
```

### 递归 <small>（Recursion）</small>
递归可以把复杂的算法变的简单。

来看一个递归算法实现的阶乘函数：

```js
function factorial(n){
    return n == 0 ? 1 : n * factorial(n-1)
}
```
递归函数的潜在问题是终止条件不明确或缺少终止条件会导致函数长时间运行，并使用户界面处于假死状态。而且，递归函数还可能遇到浏览器的“调用栈大小限制”（call stack size limites）

### 迭代 （Iteration）
任何递归能实现的算法同样可以用迭代来实现。迭代算法通常包含几个不同的循环，分别对应计算过程的不同方面，这也会引入他们自身的性能问题。然而，使用优化后的循环替代长时间运行的递归函数可以提升性能，因为运行一个循环比反复调用一个函数的开销少得多。

我们看一下把递归改成迭代的例子。

归并排序算法是最常见的用递归实现的归并算法：

```js
function merge(left, right) {
    var result = []
    while(left.length > 0 && right.length > 0) {
        result.push(left[0] < right[0] ? left.shift() : right.shift())
    }

    return result.concat(left).concat(right)
}

function mergeSort(items) {
    if (items.length === 1) {
        return items
    }

    var middle = Math.floor(items.length / 2),
        left = items.slice(0, middle),
        right = items.slice(middle)

    return merge(mergeSort(left), mergeSort(right))
}
```
这段代码的实现简单直观，但是 mergeSort() 函数会导致很频繁的自调用，一个长度为 n 的数组最终会调用 mergeSort() 2*n – 1 次，在一些浏览器上很可能发生栈溢出。

归并排序算法同样可以使用迭代实现：

```js
function megerSort(items) {
    if(items.length == 1) {
        return items
    }
    var work = [], len = items.length
    for (var i = 0; i < len; i++) {
        work.push(items[i])
    }

    works.push([])  // 如果数组长度为奇数

    for (var lim = len; lim > 1; lim = (lim+1)/2) {
        for (var j = 0, k = 0; k < lim; j++, k+=2) {
            work[j] = merge(work[k], work[k+1])
        }
        work[j] = []    // 如果数组长度为奇数
    }

    return work[0]

}
```
这个版本的 megerSort() 函数功能与前例相同却没有使用递归。尽管迭代版本的合并排序算法比递归实现的要慢一些，但它不会像递归版本那样受调用栈限制的影响。把递归算法改用迭代实现是避免栈溢出错误的方法之一。

### 记忆 <small>（Memoization）</small>
Memoization 是一种避免重复工作的方法，它缓存前一个计算结果供后续计算使用，避免了重复工作。它是递归算法中很有用的技术。

例如我们想要一个递归函数来计算斐波那契（Fibonacci）数列，一个 Fibonacci 数字是之前两个 Fibonacci 数字之和。最前面的两个数字是 0 和 1。

```js
var fibonacci = function (n) {
return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}
```
现在我们需要使用这个函数求出斐波那契数列的前 9 个数：

```js
fibonacci(0) // 0
fibonacci(1) // 1
fibonacci(2) // 1
fibonacci(3) // 2
fibonacci(4) // 3
fibonacci(5) // 5
fibonacci(6) // 8
fibonacci(7) // 13
fibonacci(8) // 21
```

fibonacci 函数总共被调用了 167 次，我们直接调用了 9 次，而他自身调用了 158 次去计算可能已经被刚计算过的值，如果我们让该函数具备记忆（Memoization）功能，就可以显著地减少运算量。

我们创建个闭包在一个名为 cache 的私有变量里保存我们的储存结果，该变量可以保存在闭包里或者保存为函数的属性。当函数被调用时，先检查结果是否已经存在，如果已经存在，就立即返回这个结果：

```js
var fibonacci = (function() {
    var cache = [0 ,1]
    var fib = function(n) {
        var result = cache[n]
        if(typeof result !== 'number') {
            result = fib(n-1) + fib(n-2)
            cache[n] = result
        }
        return result
    }
    return fib
})()
```
再一次进行取前 9 个数的运算， fib 函数只被调用了 23 次，我们调用了它 9 次，它自身调用自己 14 次去取得之前储存的结果。

我们可以把这种技术推而广之，编写一个函数来构造带记忆功能的函数：

```js
function memoizer(cache, fn) {
    cache = cache || {}
    isArray = Array.isArray(cache)

    return function recur(arg) {
        var result = cache[arg]
        if( typeof cache[arg] !== 'number') {
            result = cache[arg] = fn(recur, arg)
        }
        return result
    }
}
```
我们可以直接使用 memoizer 函数来定义 fibonacci 函数，使其带有记忆功能：

```js
var fibonacci = memoizer([0,1], function (recur,n) {
    return recur(n-1) + recur(n-2)
})
```

通过设计这种产生另一个函数的函数，极大地减少了我们的工作量。例如，要产生一个可记忆的阶乘函数，我们只需要提供基本的阶乘公式即可：

```js
var factorial = memoizer([1, 1], function(recur, n) {
    return n * recur(n - 1)
})
```
这种通用的 Memoization 函数并不能满足所有情况，当 Memoization 函数存在显著性能问题时，最好有针对性的手工实现它，而不是直接用通用的 Memoization 方案。

### 尾调用优化 <small>（Tail Call Optimization）</small>
ES6 支持尾调用优化，但只在严格模式下开启，正常模式是无效的。

尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果函数内最后一个操作是调用函数，会通过“跳转指令”（jump） 而不是“子程序调用”（subroutine call）来控制。

如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

我们一个斐波那契函数由递归改成尾递归：

```js
// 普通的斐波那契函数
function fibonacci(n) {
    return n < 2 ? n : fibonacci(n-1) + fibonacci(n-2)
}

fibonacci(100) // 堆栈溢出


// 尾递归的斐波那契函数
function fibonacci(n, ac1 = 1, ac2 = 1) {
    if(n < 2){return ac2}
    return fibonacci(n - 1, ac2, ac1 + ac2)
}

fibonacci(100) //573147844013817200000
```
尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。

需要注意的是，在ECMAScript 6中，如果没有停止条件尾递归代码代码可以一直执行下去。所以具有停止递归的边界条件非常重要。

### 函数去抖与函数节流 <small>（Debounce & Throttle）</small>
#### 函数去抖 <small>(debounce)</small>
函数去抖背后的基本思想是指，某些代码不可以在没有间断的情况连续重复执行。第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，它会清除前一次的定时器并设置另一个。如果前一个定时器已经执行过了，这个操作就没有任何意义。然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器。目的是只有在执行函数的请求停止了一段时间之后才执行。

例如给 onscroll 这种短时间连续执行的事件的执行函数加了 100ms 的函数去抖，则只有当用户停止滚动 100ms 后，执行函数才会执行。

函数去抖的应用场景：
- 每次 resize/scroll 触发统计事件
- 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，验证一次就好）

以下是该模式的基本形式：

```js
var processor = {
    timeoutId: null,

    // 实际进行处理的方法
    performProcessing: function() {
        // 实际执行的代码
        console.log('run')
    },

    // 初始处理调用的方法
    process: function() {
        clearTimeout(this.timeoutId);
        var that = this;
        this.timeoutId = setTimeout(function() {
            that.performProcessing()
        }, 100)
    }
}

// 尝试开始执行
processor.process()   // 延迟100ms执行，但 50ms 后被中断，不会执行
setTimeout(processor.process.bind(processor),50)    // run
setTimeout(processor.process.bind(processor),160)   // run

```
这里每 100ms 内 process() 无论调用多少次，都只会执行1次。

这个模式可以使用以下两种 debounce() 函数来简化：

```js
// 将定时器 id 存为函数的一个属性
function debounce(fn, duration, context) {
    clearTimeout(fn.tId);
    fn.tId = setTimeout(function() {
        fn.call(context);
    }, duration)
}


var foo = function() {console.log('run')}
window.onscroll = function() {
    debounce(foo, 150)
}


// 使用闭包将定时器作为私有变量
function debounce(fn, delay) {
    var timer = null;
    return function(...args) {
        var context = this;
        clearTimeout(timer);

        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)

    }
}

var foo = function() {console.log('run')}
window.onscroll = debounce(foo, 150)
```

#### 函数节流 <small>（throttle）</small>
函数节流能使得连续的函数执行，奕为 **固定时间段** 间断地执行

例如给 onscroll 这种短时间连续执行的事件的执行函数加了 100ms 的函数节流，则用户滚动每 100ms，执行函数都会执行1次。

函数节流的应用场景：
- DOM 元素的拖拽功能实现（mousemove）
- 射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
- 计算鼠标移动的距离（mousemove）
- Canvas 模拟画板功能（mousemove）
- 搜索联想（keyup）
- 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次

函数节流一般作为函数去抖的增强功能，以下是函数节流的一般实现：

```js
// 函数节流
function throttle(fn, delay, mustRunDelay) {
    var timer = null, t_start = 0;
    return function(...args) {
        var context = this, t_curr = Date.now()
        clearTimeout(timer)

        if(!t_start) {
            t_start = t_curr
        }

        if(t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args)
            t_start = t_curr
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args)
            }, delay)
        }
    }
}

var foo = function() {console.log('run')}
window.onscroll = throttle(foo, 50, 100)
```
以下是函数去抖与节流的一些参考：

http://www.alloyteam.com/2012/11/javascript-throttle/

https://github.com/hanzichi/underscore-analysis/issues/20

https://github.com/hanzichi/underscore-analysis/issues/21

https://github.com/hanzichi/underscore-analysis/issues/22

https://css-tricks.com/the-difference-between-throttling-and-debouncing/

### 分时函数 <small>（TimeChunk）</small>
与函数节流一样，分时函数也是用来解决函数频繁执行带来的性能问题。
不同的是，函数节流场景为被动调用，分时函数为主动调用。

分时函数是把函数一段一段执行。

例如在短时间内往页面中大量添加 DOM 节点往往就是浏览器的卡顿甚至假死。

```js
var MyArr = [...Array(10000).keys()]  // 这是一个有1万条数据的数组

function renderList(data) {
    data.forEach(v=>{
        var div = document.createElement( 'div' );
        div.innerHTML = v;
        document.body.appendChild( div );
    })
}

renderList(arr)  // 卡了一会才创建完
```
这个问题的解决方案之一就是使用分时函数让创建节点的工作分批进行，比如每隔 100 毫秒创建 500 个节点。

我们创建一个 timeChunk 函数作为分时函数，timeChunk 接受3个参数，分别创建节点所需要的数据、封装了创建节点多加的函数、每一批创建节点的数量。

```js
function timeChunk(data, fn, count) {
    var arr = [], timer;

    var runRender = function() {
        arr = data.splice(0, Math.min(count, data.length))
        fn(arr)
    }

    return function() {
        timer = setInterval(()=>{
            data.length === 0 ? clearInterval(timer) : runRender()
        },100)  
    }   
}

var newRenderList = timeChunk(arr, renderList, 500)

newRenderList() // 每 100ms 创建个节点
```

### 惰性载入函数 <small>（Lazy Loading Functions）</small>
惰性加载函数是指函数里的内容只在首次执行函数时加载执行。常用于一些嗅探函数。

例如我们需要一个在各个浏览器中能够通用的事件ፄ定函数 addEvent，常见的写法如下：

```js
var addEvent = function( elem, type, handler ){
    if ( window.addEventListener ){
        return elem.addEventListener( type, handler, false );
    }
    if ( window.attachEvent ){
        return elem.attachEvent( 'on' + type, handler );
    }
};
```
这个函数的缺点是每次调用时，函数里的条件判断都会执行一遍，虽然开销不大，但有一些方法可以让程序避免重复执行这些内容。

这里有两个方案，方案一是让条件判断在代码刚加载就执行一次，让 addEvent 开始就获得结果:

```js
var addEvent = (function() {
    if ( window.addEventListener ){
        return function(elem, type, handler){
            elem.addEventListener( type, handler, false );
        }
    }
    if ( window.attachEvent ){
        return function(elem, type, handler){
            elem.attachEvent( 'on' + type, handler );
        }
    }
})()
```
目前的 addEvent 函数依然有个缺点，也许我们从头到ࡊ都没有使用过 addEvent 函数，这样看来，前一次的浏览器嗅探就是完全多余的操作，而且这也会稍稍延长页面 ready 的时间。

方案二就是惰性载入函数方案，该方案中 addEvent 开始仍被声明为一个普通的函数，但是在第一次执行时会在执行内部被重新改写，这样下次执行 addEvent 时就不用重复执行条件判断了。

```js
var addEvent = function() {
    if ( window.addEventListener ){
        addEvent = function(elem, type, handler){
            elem.addEventListener( type, handler, false );
        }
    }
    if ( window.attachEvent ){
        addEvent = function(elem, type, handler){
            elem.attachEvent( 'on' + type, handler );
        }
    }
}
```
