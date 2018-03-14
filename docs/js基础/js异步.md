<!-- TOC -->

- [前言](#前言)
- [图例](#图例)
- [回调](#回调)
  - [回调的一般使用形式](#回调的一般使用形式)
  - [回调的问题](#回调的问题)
- [Promise](#promise)
  - [Promise的一般使用形式](#promise的一般使用形式)
  - [Promise 与回调的区别](#promise-与回调的区别)
  - [静态方法](#静态方法)
    - [Promise.all()](#promiseall)
    - [Promise.race()](#promiserace)
    - [Promise.reject()](#promisereject)
    - [Promise.reslove()](#promisereslove)
  - [原型方法](#原型方法)
    - [Promise.prototype.then()](#promiseprototypethen)
    - [Promise.prototype.catch()](#promiseprototypecatch)
  - [promise 的局限](#promise-的局限)
- [生成器](#生成器)
  - [名词解释](#名词解释)
  - [生成器一般使用形式](#生成器一般使用形式)
  - [使用生成器创建可迭代对象](#使用生成器创建可迭代对象)
  - [异步迭代生成器](#异步迭代生成器)
  - [生成器 + Promise](#生成器--promise)
- [Async/Await](#asyncawait)
  - [async函数的一般使用形式](#async函数的一般使用形式)
  - [async 函数的优点](#async-函数的优点)
  - [async 函数的使用注意点](#async-函数的使用注意点)
- [异步生成器](#异步生成器)
  - [名称解释](#名称解释)
  - [异步生成器的一般使用形式](#异步生成器的一般使用形式)
  - [通过异步生成器创建可异步迭代对象](#通过异步生成器创建可异步迭代对象)
- [异步基础](#异步基础)
  - [JS 中的异步](#js-中的异步)
  - [事件循环<small>(event loop)</small>](#事件循环smallevent-loopsmall)
  - [任务队列 <small>（job queue）</small>](#任务队列-smalljob-queuesmall)
  - [竞态条件、门、门闩<small>（race condition & gate & latch）</small>](#竞态条件门门闩smallrace-condition--gate--latchsmall)
  - [顺序、并发 <small>(sequential & concurrency)</small>](#顺序并发-smallsequential--concurrencysmall)
  - [串行、并行 <small>（Serial & Parallelism）</small>](#串行并行-smallserial--parallelismsmall)
  - [进程、线程 <small>（process & thread）</small>](#进程线程-smallprocess--threadsmall)

<!-- /TOC -->
## 前言
前端新技术铺天盖地，各种框架、工具层出不穷眼花缭乱。最近重温JS基础，夯实的基础才是学习新技术的基石。本文作为读书笔记简单总结下js异步的基础知识

## 图例
![image](https://raw.githubusercontent.com/lijiliang/record/master/images/async.png)

## 回调
回调是编写和处理Javascript程序异步逻辑的最常用方式，无论是setTimeout还是ajax，都是以回调的方式把我们打算做的事情在某一时刻执行。

### 回调的一般使用形式
```js
// request(..) 是个支持回调的请求函数
request('http://my.data', function callback(res) {
    console.log(res)
})

// 或者延时的回调
setTimeout(function callback() {
    console.log('hi')
}, 1000)

```
函数 callback 即为回调函数，它作为参数传进请求函数，并将在合适的时候被调用执行

### 回调的问题
回调主要有以下两点问题

**1. 线性能力缺失，回调地狱**

过深的嵌套，导致回调地狱，难以追踪回调的执行顺序

**2. 控制反信任缺失，错误处理无法保证**

回调函数的调用逻辑是在请求函数内部，我们无法保证回调函数一定会被正确调用。回调本身没有错误处理机制，需要额外设计。可能出现的错误包括：回调返回错误结果、吞掉可能出现的错误与异常、回调没有执行、回调被多次执行、回调被同步执行等等。

## Promise
### Promise的一般使用形式
可以通过构造器 `Promise(...)` 构造 promise 实例：

```js
var p = new Promise(function(resovle, reject){
    if (1 > 0) {
        resovle()  // 通常用于完成
    } else {
        reject()  // 用于拒绝
    }
})

var onFullfilled = function(){}  //用于处理完成
var onRjected = function(){}     //用于处理拒绝

p.then(onFullfilled, onRjected)
```
先理解下几个术语：决议（resolve）、 完成（fulfill）和拒绝（reject）。

fulfill 与 reject 都很好理解，一个完成，一个拒绝。而我上例代码中的 resolve() 注释“通常用于完成”，是由于 resolve 意思是决议，如果给 resolve 传入一个拒绝值，它会返回拒绝，例如 resolve(Promise.reject())

### Promise 与回调的区别
假设 reuqest(..) 是一个请求函数：

```js
// 回调的写法
reuqest('http://my.data', function onResult(res) {
    if(res.error) {
        // 处理错误
    }
    // 处理返回数据
})


// Promise 的写法
var p = reuqest('http://my.data');

p.then(function onFullfill(res) {
    // 处理返回数据
})
.catch(function onRjected() {
    // 处理错误
})
```
Promise 不是对回调的替代。 Promise 在回调代码和将要执行这个任务的异步代码之间提供了一种可靠的中间机制来管理回调。

使用回调的话，通知就是任务 foo(..) 调用的回调。而使用 Promise 的话，我们把这个关系反转了过来，侦听来自 foo(..) 的事件，然后在得到通知的时候，根据情况继续。

你肯定已经注意到 Promise 并没有完全摆脱回调。它们只是改变了传递回调的位置。我们并不是把回调传递给 foo(..)，而是从 foo(..) 得到某个东西（外观上看是一个真正的 Promise），然后把回调传给这个东西。

Promise 归一保证了行为的一致性，Promise 给了确定的值，resolve、reject、pendding。一旦 Promise 决议，它就永远保持在这个状态。此时它就成为了不变值（immutable
value），可以根据需求多次查看。

### 静态方法
#### Promise.all()

Promise.all(iterable) 方法返回一个 Promise。参数 iterable 为数组。当 iterable 参数中所有的 Promise 都返回完成(resolve), 或者当参数不包含 Promise 时,该方法返回完成(resolve),。当有一个 Promise 返回拒绝(reject)时, 该方法返回拒绝(reject)。

对 Promise.all([ .. ]) 来说，只有传入的所有 promise 都完成，返回 promise 才能完成。如果有任何 promise 被拒绝，返回的主 promise 就立即会被拒绝（抛弃任何其他 promise 的结果）。如果完成的话，你会得到一个数组，其中包含传入的所有 promise 的完成值。对于拒绝的情况，你只会得到第一个拒绝 promise 的拒绝理由值。这种模式传统上被称为门：所有人都到齐了才开门。

严格说来，传给Promise.all([..])的数组中的值可以是 Promise、thenable，甚至是立即值。就本质而言，列表中的每个值都会通过 Promise.resolve(..) 过滤，以确保要等待的是一个真正的 Promise，所以立即值会被规范化为为这个值构建的 Promise。如果数组是空的，主 Promise 就会立即完成。

注意：

> 若向 Promise.all([ .. ]) 传入空数组，它会立即完成，但 Promise.race([ .. ]) 会挂住，且永远不会决议。

#### Promise.race()
Promise.race(iterable) 方法返回一个 promise ，并伴随着 promise对象解决的返回值或拒绝的错误原因。参数 iterable 为数组， 只要 iterable 中有一个 promise 对象”解决(resolve)”或”拒绝(reject)”。

对 Promise.race([ .. ]) 来说，只有第一个决议的 promise（完成或拒绝）取胜，并且其决议结果成为返回 promise 的决议。这种模式传统上称为门闩：第一个到达者打开门闩通过。

注意：
> 一项竞赛需要至少一个“参赛者”。所以，如果你传入了一个空数组，主race([..]) Promise 永远不会决议，而不是立即决议。这很容易搬起石头砸自己的脚！ ES6 应该指定它完成或拒绝，抑或只是抛出某种同步错误。遗憾的是，因为 Promise 库在时间上早于 ES6 Promise，它们不得已遗留了这个问题，所以，要注意，永远不要递送空数组。

```js
// all 与 race 的使用示例
var p1 = Promise.resolve( 42 );
var p2 = Promise.resolve( "Hello World" );
var p3 = Promise.reject( "Oops" );

Promise.race( [p1,p2,p3] )
.then( function(msg){
    console.log( msg ); // 42
} );
Promise.all( [p1,p2,p3] )
.catch( function(err){
    console.error( err ); // "Oops"
} );
Promise.all( [p1,p2] )
.then( function(msgs){
    console.log( msgs ); // [42,"Hello World"]
} );
```

#### Promise.reject()
Promise.reject(reason)方法返回一个用reason拒绝的Promise。

以下两个 promise 是等价的：

```js
var p1 = new Promise( function(resolve,reject){
    reject( "Oops" );
});
var p2 = Promise.reject( "Oops" );
```

#### Promise.reslove()
Promise.resolve(value)方法返回一个以给定值解析后的 Promise 对象。但如果这个值是个 thenable（即带有 then 方法），返回的 promise 会“跟随”这个 thenable 的对象，采用它的最终状态（指 resolved/rejected/pending/settled）；否则以该值为成功状态返回 promise 对象。

### 原型方法
#### Promise.prototype.then()
then(..) 接受一个或两个参数：第一个用于完成回调，第二个用于拒绝回调。如果两者中的任何一个被省略或者作为非函数值传入的话，就会替换为相应的默认回调。默认完成回调只是把消息传递下去，而默认拒绝回调则只是重新抛出（传播）其接收到的出错原因。

```js
p.then( fulfilled );
p.then( fulfilled, rejected );
```

#### Promise.prototype.catch()
catch(..) 只接受一个拒绝回调作为参数，并自动替换默认完成回调。换句话说，它等价于 then(null,..)：

```js
p.catch( rejected ); // 或者p.then( null, rejected )
```
then(..) 和 catch(..) 也会创建并返回一个新的 promise，这个 promise 可以用于实现Promise 链式流程控制。如果完成或拒绝回调中抛出异常，返回的 promise 是被拒绝的。如果任意一个回调返回非 Promise、非 thenable 的立即值，这个值会被用作返回 promise 的完成值。如果完成处理函数返回一个 promise 或 thenable，那么这个值会被展开，并作为返回promise 的决议值。

### promise 的局限

**1.顺序错误处理**

Promise 的设计局限性（具体来说，就是它们链接的方式）造成了一个让人很容易中招的陷阱，即 Promise 链中的错误很容易被无意中默默忽略掉。

例如：
```js
// foo(..), STEP2(..)以及STEP3(..)都是支持promise的工具
var p = foo( 42 )
.then( STEP2 )
.then( STEP3 );

p.catch( handleErrors );
```
如果链中的任何一个步骤事实上进行了自身的错误处理（可能以隐藏或抽象的不可见的方式），那你的最后的 catch 就不会得到通知。这可能是你想要的——毕竟这是一个“已处理的拒绝”——但也可能并不是。完全不能得到（对任何“已经处理”的拒绝错误的）错误通知也是一个缺陷，它限制了某些用例的功能。

**2、单一值**
根据定义， Promise 只能有一个完成值或一个拒绝理由。如果希望处理函数接收到多个结果的话只能使用数组或对象封装要传递的结果。就像这样：

```js
function foo (a) {
    var  b= a + 1;
    return new Promise(resolve => {
        resolve([a, b])
    })
}

foo(1).then(function(msg) {
    console.log(msg[0], msg[1])  // 1, 2
})

```
这个解决方案可以起作用，但要在 Promise 链中的每一步都进行封装和解封，就十分丑陋和笨重了。

在封装解封单一值的方法上还有以下两种：

 - [1] 分裂值，即把问题分解为两个或更多 Promise 的信号。

```js
function getB(a) {
    return new Promise(resolve => {
        return resolve(a + 1)
    })
}

function foo(a) {
    return new Promise(resolve => {
        return  [
            Promise.resolve(a)
            getB(a)
        ]
    })
}

Promise.all(
    foo(a)
)
.then(function (msg){
    console.log(msg[0], msg[1])  // 1, 2
})
```
恩，这个看起来相对第一种没什么改进，反而看起来还更麻烦了。但这种方法更符合 Promise 的设计理念。如果以后需要重构代码把对 a 和 b 的计算分开，这种方法就简单得多。由调用代码来决定如何安排这两个 promise，而不是把这种细节放在 foo(..) 内部抽象，这样更整洁也更灵活。

 - [2] 展开/传递参数，使用 apply、或者 es6 的解构，来把单一值解构。

```js
var p = new Promise (resolve => {
    return resolve([1,2])
})

// 使用 apply
p.then(Function.prototype.apply(function(a, b){
    console.log(a, b)  // 1, 2
})

// 使用解构
p.then(function([a, b]) {
    console.log(a, b)  // 1, 2
})
```
总结一下，单一值是 Promise 的局限之一，导致如果我们需要处理有多个参数的结果，只能把结果封装在对象或数组这种集合中，再使用各种方法在处理函数中进行解构。

**3.单决议**

Promise 最本质的一个特征是： Promise 只能被决议一次（完成或拒绝）。

所以下面的代码就是有问题的：

```js
var p = new Promise(function(resolve) {
    $('.mybtn').click(resolve)
})

p.then(function(e) {
    var btnId = evt.currentTarget.id;
    return fetch('http://myurl.url/?id=' + btnId)
})
.then(function(res) {
    console.log(res)
})
```

只有在你的应用只需要响应按钮点击一次的情况下，这种方式才能工作。如果这个按钮被点击了第二次的话， promise p 已经决议，因此第二次的 resolve(..) 调用就会被忽略。

因此，你可能需要转化这个范例，为每个事件的发生创建一整个新的 Promise 链：

```js
$('#mybtn').click(function(e) {
    var btnId = evt.currentTarget.id;

    fetch('http://myurl.url/?id=' + btnId)
    .then(function(res) {
        console.log(res)
    })
});
```
种方法可以工作，因为针对这个按钮上的每个 “click” 事件都会启动一整个新的 Promise 序列。由于需要在事件处理函数中定义整个 Promise 链，这很丑陋。除此之外，这个设计在某种程度上破坏了关注点与功能分离（Separation of concerns, SoC, 或称关注度分离）的思想。你很可能想要把事件处理函数的定义和对事件的响应（那个 Promise 链）的定义放在代码中的不同位置。如果没有辅助机制的话，在这种模式下很难这样实现。

**4. 惯性**

现存的所有代码都还不理解 Promise，你得自己把需要回调的函数封装为支持 Promise 的函数。

**5. 无法取消的 Promise**

一旦创建了一个 Promise 并为其注册了完成和或拒绝处理函数，如果出现某种情况使得这个任务悬而未决的话，你也没有办法从外部停止它的进程。

**6. Promise 的性能**

把基本的基于回调的异步任务链与 Promise 链中需要移动的部分数量进行比较。很显然，Promise 进行的动作要多一些，这自然意味着它也会稍慢一些。

## 生成器

### 名词解释

**生成器**<small>(Generator)</small>

生成器是一种**返回迭代器的函数**，通过 function 关键字后的 * 号来表示。

**迭代器**<small>(lterable)</small>

迭代器是**一种对象**，它具有一些专门为迭代过程设计的专有接口，所有迭代器对象都有一个 next 方法，每次调用都返回一个结果对象。结果对象有两个属性，一个是 value，表示下一个将要返回的值；另一个是 done，它是一个布尔类型的值，当没有更多可返回数据时返回 true。迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每调用一次 next() 方法，都会返回下一个可用的值。

**可迭代对象**<small>lterator</small>

可迭代对象**具有 Symbol.iterator** 属性，是一种与迭代器密切相关的对象。Symbol.iterator 通过指定的函数可以返回一个作用于附属对象的迭代器。 在 ECMCScript 6 中，所有的集合对象（数组、Set、及 Map 集合）和字符串都是可迭代对象，这些对象中都有默认的迭代器。
> 此外，由于生成器会默认为 Symbol.iterator 属性赋值，因此所有通过生成器创建的迭代器都是可迭代对象。


**for-of 循环**

for-of 循环每执行一次都会调用可迭代对象的迭代器接口的 next() 方法，并将迭代器返回的结果对象的 value 属性储存在一个变量中，循环将持续执行这一过程直到返回对象的属性值为 true。

### 生成器一般使用形式

```js
function *foo() {
    var x = yield 2;
    var y = x * (yield x + 1)
    console.log( x, y );
    return x + y
}

var it = foo();

it.next() // {value: 2, done: false}
it.next(3) // {value: 4, done: false}
it.next(3) // 3 9, {value: 12, done: true}
```
yield.. 和 next(..) 这一对组合起来， 在生成器的执行过程中构成了一个双向消息传递系统。

有几点需要注意一下：
 - 一般来说，需要的 next(..) 调用要比 yield 语句多一个，前面的代码片段有两个 yield 和三个 next(..) 调用；
 - 第一个 next(..) 总是启动一个生成器，并运行到第一个 yield 处;
- 每个 yield.. 基本上是提出了一个问题：“这里我应该插入什么值？”，这个问题由下一个 next(..) 回答。 第二个 next(..) 回答第一个 yield.. 的问题，第三个 next(..) 回答第二个 yield 的问题，以此类推；
- yield.. 作为一个表达式可以发出消息响应 next(..) 调用， next(..) 也可以向暂停的 yield 表达式发送值。

### 使用生成器创建可迭代对象

```js
var obj = {
    [Symbol.iterator]: function *() {
        var result = 1
        while(result < 500) {
            result = result * 2
            yield result
        }
    }
}

for(let value of obj) {
    console.log(value)
}
// 2 4 8 16 32 64 128 256 512
```

### 异步迭代生成器
来看一下下面这段代码，我们在生成器里 yeild 请求函数（暂停生成器继续执行，同时并执行请求函数），执行生成器产成可迭代对象后，又在请求函数里通过 next() 方法获取到请求结果、将结果传进生成器并恢复生成器的执行。

```js
function foo() {
     ajax('http://my.data', function(res) {
        if(res.error) {
            // 向*main()抛出一个错误
            it.throw(res.error)
        }

        // 用收到的data恢复*main()
        it.next(res.data)
    })
}

function *main() {
    try {
        var data = yeild foo()；
        console.log(data)
    } catch(e) {
        console.error(e)
    }
}

var it = main();

// 这里启动！
it.next();
```

本例中我们在 *main() 中发起 foo() 请求，之后暂停；又在 foo() 中相应数据恢复 *mian() 继续运行，并将 foo() 的运行结果通过 next() 传递出来。

从本质上而言，我们把异步作为实现细节抽象了出去，使得我们可以以同步顺序的形式追踪流程控制：“发出一个 Ajax 请求，等它完成之后打印出响应结果。”并且，当然，我们只在这个流程控制中表达了两个步骤，而这种表达能力是可以无限扩展的，以便我们无论需要多少步骤都可以表达。

我们在生成器内部有了看似完全同步的代码（除了 yield 关键字本身），但隐藏在背后的是，在 foo(..) 内的运行可以完全异步。并且在异步代码中实现看似同步的错误处理（通过 try..catch）在可读性和合理性方面也都是一个巨大的进步。

### 生成器 + Promise
**Promise 和生成器最大效用的最自然的方法就是 yield 出来一个 Promise，然后通过这个 Promise 来控制生成器的迭代器。**

建议看下面这段代码然后脑海中反复思索上面这段话。

```js
function foo() {
    return fetch('http://my.data')
}

function *main() {
    try {
        var data = yeild foo()；
        console.log(data)
    } catch(e) {
        console.error(e)
    }
}

var it = main();
var p = it.next().value;   // p 的值是 foo()

// 等待 promise p 决议
p.then(
    function(data) {
        it.next(data);  // 将 data 赋值给 yield
    },
    function(err) {
        it.throw(err);
    }
)
```
这样就实现了 promise + 生成器来管理异步流程：*mian() 中执行 foo() 发起请求，使用 *mian() 生成的迭代器获取 foo() 的 promise 决议结果，再根据结果选择继续运行迭代器或抛出错误。

我们可以将等待决议、执行 next()这一过程抽象出来，实现自动等待决议并继续执行，直到结束：

```js
// 定义 run 函数
functiton run(gen) {
    var args = [].slice.call(arguments, 1), it;

    // 在当前上下文中初始化生成器
    it = gen.apply(this, args);

    // 返回一个 promise 用于生成器完成
    return Promise.resolve()
        .then(function handleNext(value) {
            // 对下一个 yield 值出的值运行
            var next = it.next(value);

            return (function handleValue(next){
                // 判断生成器是否运行完毕
                if(next.done) {
                    return next.value;
                }
                // 否则继续运行
                else {
                    return Promise.resolve(next.value)
                        .then(
                            // 成功就恢复异步循环，把决议的值发回生成器
                            handleNext,

                            // 如果 value 是被拒绝的 promise
                            // 就把错误传回生成器进行出错处理
                            function handleErr(err) {
                                return Promise.resolve(
                                    it.throw(err)
                                )
                            }
                        )
                }
            })(next)
        })
}

function foo(p) {
    return fetch('http://my.data?p=' + p)
}

function *main(p) {
    try {
        var data = yeild foo(p)；
        console.log(data)
    } catch(e) {
        console.error(e)
    }
}


// 运行！
run(main, '1')
```
通过上面例子以更好地理解生成器 + Promise 协同运作模式。

run() 函数起到的作用跟我们接下来要讲的 async/await 函数是一样的。

## Async/Await
async函数是什么？一句话，它就是 `Generator` 函数的语法糖。它在形式上类型我们刚刚写的 run(...) 函数。

### async函数的一般使用形式
一个async函数的基本使用形式如下：

```js
function foo(p) {
    return fetch('http://my.data?p=' + p)
}

async function main(p) {
    try {
        var data = await foo(p)；
        return data
    } catch(e) {
        console.error(e)
    }
}

main(1)
.then(data => console.log(data))
```
与 Generator 函数的显著不同是，`*` 变成了`async`、`yeild`变成`了await`，同时我们也不用再定义 run(..) 函数来实现 Promise 与 Generator 的结合。async 函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句，并且最终返回一个 Promise 对象。

正常情况下，await 命令后面是一个 Promise 对象。如果不是，会被转成一个立即 resolve 的 Promise 对象。await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到。

### async 函数的优点
async 函数对 Generator 函数的改进，体现在以下四点。

1. 内置执行器。
> async 函数内置执行器（类似内部已实现我们刚刚的 run(..) 函数），省去了我们手动迭代生成器的麻烦；

2.更好的语义。
> async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

3.更广的适用性。
> co模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

4.返回值是 Promise**
> async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用 then 方法指定下一步的操作。

### async 函数的使用注意点
关于 async 函数的使用有三点需要注意一下：

1. 前面已经说过，await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try…catch 代码块中。

2. 多个 await 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

3. await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。

```js
//getFoo 与 getBar 是两个互相独立、互不依赖的异步操作

// 错误写法，会导致 getBar 在 getFoo 完成后才执行
let foo = await getFoo();
let bar = await getBar();

// 正确写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 正确写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```
*无继发关系的异步操作应当同步触发*

## 异步生成器
### 名称解释

**异步生成器**<small>(Async Generator)</small>

就像生成器函数返回一个同步遍历器对象一样，异步生成器函数的作用，是**返回一个异步迭代器对象**。

在语法上，异步 Generator 函数就是 async 函数与 Generator 函数的结合。


**异步迭代器**<small>(Async Iterator)</small>

异步迭代器与迭代器类似，也是一种对象，也有 next 方法，与迭代器不同的是迭代器的 next 方法每次调用返回的是返回的对象的结构是 `{value, done}` ，其中 `value` 表示当前的数据的值，`done` 是一个布尔值，表示迭代是否结束。。而异步迭代器的 next 方法每次返回的是一个 Promise 对象，等到 Promise 对象 resolve 了，再返回一个 `{value, done}` 结构的对象。这就是说，异步迭代器与同步遍历器最终行为是一致的，只是会先返回 Promise 对象，作为中介。

对于普通迭代器来说，`next` 方法必须是同步的，只要调用就必须立刻返回值。也就是说，一旦执行next方法，就必须同步地得到 `value` 和 `done` 这两个属性。如果我们需要迭代异步数据，同步迭代器就无法工作。例如在下面的代码中，readLinesFromFile() 就无法通过同步迭代器呈现它的异步数据：

```js
// readLinesFromFile 是一个异步返回数据的函数
for (const line of readLinesFromFile(fileName)) {
    console.log(line);
}
```

ES2018 引入了”异步迭代器“（Async Iterator），为异步操作提供原生的迭代器接口，即  `value` 和 `done` 这两个属性都是异步产生。
```js
asyncIterator
  .next()
  .then(
    ({ value, done }) => /* ... */
  );
```

异步迭代器的最大的语法特点，就是调用迭代器的 `next` 方法，返回的是一个 Promise 对象。

下面是一个更具体的异步迭代器的例子。

```js
// createAsyncIterable(..) 是一个创建可异步迭代对象的函数，我们稍后解释它
const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();
asyncIterator.next()
.then(iterResult1 => {
    console.log(iterResult1); // { value: 'a', done: false }
    return asyncIterator.next();
})
.then(iterResult2 => {
    console.log(iterResult2); // { value: 'b', done: false }
    return asyncIterator.next();
})
.then(iterResult3 => {
    console.log(iterResult3); // { value: undefined, done: true }
});
```
由于异步遍历器的 `next` 方法，返回的是一个 Promise 对象。因此，可以把它放在 `await` 命令后面。

```js
async function foo() {
  const asyncIterable = createAsyncIterable(['a', 'b']);
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  console.log(await asyncIterator.next());
  // { value: 'a', done: false }
  console.log(await asyncIterator.next());
  // { value: 'b', done: false }
  console.log(await asyncIterator.next());
  // { value: undefined, done: true }
}
```

**可异步迭代对象**<small>(Async Iterable)</small>
可迭代对象**具有 Symbol.asyncIterator** 属性，我们知道，一个对象的同步迭代器的接口，部署在` Symbol.iterator` 属性上面。同样地，对象的异步迭代器接口，部署在 `Symbol.asyncIterator` 属性上面。不管是什么样的对象，只要它的 `Symbol.asyncIterator` 属性有值，就表示应该对它进行异步遍历。

**for-await-of 循环**
for-of 循环用于遍历同步的 Iterator 接口。新引入的 for-await-of 循环，则是用于遍历异步的 asyncIterator 接口。

```js
// createAsyncIterable 是一个创建可异步迭代对象的函数

async function f() {
    for await (const x of createAsyncIterable(['a', 'b'])) {
        console.log(x);
    }
}
// Output:
// a
// b
```

如果 next 方法返回的 Promise 对象被 reject，for-await-of 就会报错，要用 try…catch 捕捉。

```js
function createRejectingIterable() {
    return {
        [Symbol.asyncIterator]() {
            return this;
        },
        next() {
            return Promise.reject(new Error('Problem!'));
        },
    };
}

(async function () { // (A)
    try {
        for await (const x of createRejectingIterable()) {
            console.log(x);
        }
    } catch (e) {
        console.error(e);
            // Error: Problem!
    }
})(); // (B)
```
另外 for-await-of 也可用于遍历同步的可迭代对象。

```js
(async function () {
    for await (const x of ['a', 'b']) {
        console.log(x);
    }
})();
// Output:
// a
// b
```
for-await-of 会通过 Promise.resolve() 将每个迭代值都转换成 Promise。

### 异步生成器的一般使用形式
在语法上，异步 Generator 函数就是 async 函数与 Generator 函数的结合。

```js
async function *createAsyncIterable() {
    var x = yield 2;
    var y = x * (yield x + 1)
    return x + y
}

var it = createAsyncIterable()
function onFulfilled(obj){
    console.log(obj)
}

it.next().then(onFulfilled) // {value: 2, done: false}
it.next(3).then(onFulfilled) // {value: 4, done: false}
it.next(3).then(onFulfilled) // 3 9, {value: 12, done: true}
```

### 通过异步生成器创建可异步迭代对象

```js
var obj = {
    [Symbol.asyncIterator]: async function *gen() {
        var result = 1
        while(result < 500) {
            result = result * 2
            yield result
        }
    }
};

(async function foo () {
    for await (const x of obj) {
        console.log(x);
    }
})();

// 2 4 8 16 32 64 128 256 512

```
异步 Generator 函数出现以后，JavaScript 就有了四种函数形式：普通函数、async 函数、Generator 函数和异步 Generator 函数。请注意区分每种函数的不同之处。基本上，如果是一系列按照顺序执行的异步操作（比如读取文件，然后写入新内容，再存入硬盘），可以使用 async 函数；如果是一系列产生相同数据结构的异步操作（比如一行一行读取文件），可以使用异步 Generator 函数。

## 异步基础
### JS 中的异步
任何时候，只要把一段代码包装成一个函数，并指定它在响应某个事件(定时器、鼠标点击、Ajax响应等)时执行，你就是在中创建了一个将来执行的块，也由此在这个程序中引入了异步机制

多个异步之间可能存在以下三种关系：
- 非交互
- 交互
- 协作

### 事件循环<small>(event loop)</small>
js 的运行环境都提供了一种机制来处理程序中多个块的执行，且执行每块时调用 JavaScript 引擎，这种机制被称为事件循环。

主线程从”任务队列”中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

![image](https://mdn.mozillademos.org/files/4617/default.svg)

JavaScript运行时概念模型

 - 栈（Stack）：函数调用形成了一个栈帧。
 - 堆（Heap）：对象被分配在一个堆中，一个用以表示一个内存中大的未被组织的区域。
 - 队列（Queue）：一个JavaScript运行时包含了一个待处理的消息队列（又称“事件队列”）。每一个消息都与一个函数（称为“回调函数”）相关联。 当栈为空时，从队列中取出一个消息进行处理。这个处理过程包含了调用与这个消息相关联的函数（以及因而创建了一个初始堆栈帧）。当栈再次为空的时候，也就意味着这个消息处理结束，接着可以处理下一个消息了。这就是“事件循环”的过程。

参考：[并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)


### 任务队列 <small>（job queue）</small>
ES6 中介绍了一种叫 “任务队列（Job Queue）”的新概念。它是事件循环队列之上的一层。遗憾的是，目前为止，这是一个没有公开 API 的机制，因此要展示清楚有些困难。所以我们目前只从概念上进行描述。

我认为对于任务队列最好的理解方式就是，它是挂在事件循环队列的每个 tick 之后的一个队列。在事件循环的每个 tick 中，可能出现的异步动作不会导致一个完整的新事件添加到事件循环队列中，而会在当前 tick 的任务队列末尾添加一个项目（一个任务）。

这就像是在说：“哦，这里还有一件事将来要做，但要确保在其他任何事情发生之前就完成它。”

事件循环队列类似于一个游乐园游戏：玩过了一个游戏之后，你需要重新到队尾排队才能再玩一次。而任务队列类似于玩过了游戏之后，插队接着继续玩。

一个任务可能引起更多任务被添加到同一个队列末尾。所以，理论上说， 任务循环（job loop）可能无限循环（一个任务总是添加另一个任务，以此类推），进而导致程序的饿死，无法转移到下一个事件循环 tick。

任务和 setTimeout(..0) hack 的思路类似，但是其实现方式的定义更加良好，对顺序的保证性更强。

Promise 的异步特性是基于任务的

### 竞态条件、门、门闩<small>（race condition & gate & latch）</small>
来看一段代码：

```js
var a = 1;
var b = 2;
function foo() {
    a++;
    b = b * a;
    a = b + 3;
}
function bar() {
    b--;
    a = 8 + b;
    b = a * 2;
}

// ajax(..)是某个库中提供的某个Ajax函数
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```
我们无法在程序执行前确定 a 和 b 的最后的值，因为它们的值取决于 foo 和 bar 哪个先执行，这段代码里我们无法确定谁会先执行。

**竞态条件**： 在 JavaScript 的特性中，这种函数顺序的不确定性就是通常所说的竞态条件（race condition）， foo() 和 bar() 相互竞争，看谁先运行。具体来说，因为无法可靠预测 a 和 b的最终结果，所以才是竞态条件。

**门：** 它的特性可以描述为“所有都通过后再通过”。形似 if (a && b) 传统上称为门，我们虽然不能确定 a 和 b 到达的顺序，但是会等到它们两个都准备好再进一步打开门。
在经典的编程术语中，门（ gate）是这样一种机制要等待两个或更多并行 / 并发的任务都完成才能继续。它们的完成顺序并不重要，但是必须都要完成，门才能打开并让流程控制继续。

**门闩：** 它的特性可以描述为“只有第一名取胜”。需要“竞争”到终点，且只有唯一的胜利者。

### 顺序、并发 <small>(sequential & concurrency)</small>
顺序和并发是指不相关任务的设计结构。

**顺序** 是指多个任务的执行依次执行。

**并发** 一个并发程序是指能同时执行通常不相关的各种任务。并发是一段时间内某个系统或单元的各个组成部分通过相互配合来处理大量的任务，强调结构和调度。

> 举例，吃饭时同时打电话，这是并发。

### 串行、并行 <small>（Serial & Parallelism）</small>
串行和并行是指单个任务的执行方式

**串行**指单个任务的多个步骤依次执行

**并行**并行是兵分几路干同一个事，即单个任务的多个步骤同时执行
>  举例，吃饭时把饭和菜一块塞嘴里吃掉，这是并行。

参考：
[并发与并行的区别？_zhihu](https://www.zhihu.com/question/33515481)

### 进程、线程 <small>（process & thread）</small>
并行计算最常见的工具就是**进程**和**线程**，进程和线程独立运行，并可能同时运行，多个线程能够共享单个进程的内存。

进程是具有一定独立功能的程序、它是系统进行资源分配和调度的一个独立单位，重点在系统调度和单独的单位，也就是说进程是可以独立运行的一段程序。

线程是进程的一个实体，是 CPU 调度和分派的基本单位，他是比进程更小的能独立运行的基本单位，线程自己基本上不拥有系统资源。在运行时，只是暂用一些计数器、寄存器和栈。

他们之间的关系：
```
1.一个线程只能属于一个进程，而一个进程可以有多个线程，但至少有一个线程（通常说的主线程）。
2.资源分配给进程，同一进程的所有线程共享该进程的所有资源。
3.线程在执行过程中，需要协作同步。不同进程的线程间要利用消息通信的办法实现同步。
4.处理机分给线程，即真正在处理机上运行的是线程。
5.线程是指进程内的一个执行单元，也是进程内的可调度实体。
```
他们之间的区别：
```
1.调度：线程作为调度和分配的基本单位，进程作为拥有资源的基本单位。
2.并发性：不仅进程之间可以并发执行，同一个进程的多个线程之间也可以并发执行。
3.拥有资源：进程是拥有资源的一个独立单位，线程不拥有系统资源，但可以访问隶属于进程的资源。
```

参考：[进程和线程有什么区别？](https://www.zhihu.com/question/21535820)

并行线程的交替执行和异步事件的交替调度，其粒度是完全不同的。
事件循环把自身的工作分成一个个任务并顺序执行，不允许对共享内存的并行访问和修改。通过分立线程中彼此合作的事件循环，并行和顺序执行可以共存。
