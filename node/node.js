/**
 * node
 * nodejs,是一个可以让javascript运行在服务器端的平台。它可以让javascript脱离浏览器的束缚运行在一般的服务器环境下。
 */
/**
 * Node.js的优点
 * nodejs作为一个新兴的后台语言，有很多吸引人的地方：
 * RESTful API
 * 单线程
 * Node.js可以在不新增额外线程的情况下，依然可以对任务进行并行处理 —— Node.js是单线程的。它通过事件轮询（event loop）来实现并行操作，对此，我们应该要充分利用这一点 —— 尽可能的避免阻塞操作，取而代之，多使用非阻塞操作。
 * 非阻塞IO
 * V8虚拟机
 * 事件驱动
 */

/**
 * [node 第一个小程序]
 */
var http = require('http');
server = http.createServer(function (req, res) {
	res.writeHeader(200, {"Content-Type": "text/plain"});
	res.end("Hello World\n");
});
server.listen(8000);
console.log("httpd start @8000");

/**
 * CommonJS规范
 * commonjs是服务器模块的规范，node.js采用了这个规范
 * 根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。
 * js文件名前面需要加上路径，可以是相对路径（相对于使用require方法的文件），也可以是绝对路径。如果省略路径，node.js会认为，你要加载一个核心模块，或者已经安装在本地 node_modules 目录中的模块。如果加载的是一个目录，node.js会首先寻找该目录中的 package.json 文件，加载该文件 main 属性提到的模块，否则就寻找该目录下的 index.js 文件。
下面的例子是使用一行语句，定义一个最简单的模块。
 */
//addition.js
exports.do = function(a, b){
	return a + b;
}

var add = require('./addition');
add.do(1,2)  //3

/**
 * 同步与异步
 * 从调用方式上，可以把他们分为三类：同步调用、回调和异步调用。
 * 同步调用是一种阻塞式调用，调用方要等待对方执行完毕才返回，它是一种单向调用；回调是一种双向调用模式，也就是说，被调用方在接口被调用时也会调用对方的接口；
 * 异步调用是一种类似消息或事件的机制，不过它的调用方向刚好相反，接口的服务在收到某种讯息或发生某种事件时，会主动通知客户方（即调用客户方的接口）。
 */

 // readFileSync是同步方法，会阻塞直到得到结果后，才继续执行之后的语句。
var fs = require("fs");
var data = fs.readFileSync("new.txt");
console.log(data.toString());

//会发现 console.log(“first me run”) 先执行。 因为callback是回调函数，等到底层读取完数据后，会调用该函数
var fs = require("fs");
fs.readFile("new.txt", function callback(err, data){
	console.log(data.toString());
})
console.log("first me run");

//node中回调函数的规范是：
function callback(err, args0, args1 ...){}

//模拟一个异步函数，和回调函数，加深理解
function sumAsync(a,b,callback){
    setTimeout(function(){
        if(typeof a === "number" && typeof a === "number"){
            callback(null,a+b);
        }else{
            callback(new Error("must number"));
        }
    },200)
}

sumAsync(2,3,function callback(err,rs){
    console.log(rs);
})

console.log("first run !");
//我们定义一个 sumAsync 异步函数，运行后，会先执行 console.log("first run !");  ，根据这个实例，应对异步函数、回调概念已理解。在Node.js 的实际开发中，I/O操作都应该调用异步函数，这样才能发挥更好的性能，但回调函数的嵌套很丑，为了解决这个问题，之后的几节中，会介绍 Promises 的Q库 和 ES6 generator 及 co 库，通过这几个工具即能发挥Node.js高性能，又可让代码更好维护、更可控和更好的可读性。

/**
 * Promise 模式的Q库
 * Promise是一种让异步代码书写起来更舒服、更可控、优雅的模式，能够让异步操作代码像同步代码那样书写并且阅读。
 * Q库可运行中node.js环境下，它是Promise模式的实现，下面我们来介绍它。
 * 通过 npm i q 安装Q库
 */
//采用回调函数方式编写：
var fs = require("fs");
fs.readdir(".",function(err,rs){
    fs.readFile(rs[0],function(err,f1){
        console.log(f1);
        fs.readFile(rs[1],function(err,f2){
            console.log(f2);
            fs.readFile(rs[2],function(err,f3){
                console.log(f3);
            })
        })
    })
})
//这段代码的意思是，查看当前目录下有多少文件，然后逐个读取，把读取的数据打印到终端，可笑的是，你还必须要知道到底有几个文件，如果我知道有3个，就调用三次 readFile异步函数，如果1000个，那就要...... 

//通过Q库改善
// 导入q库
var Q = require("q"),fs = require("fs");

Q.nfcall(fs.readdir, ".").then(function(ns){

    var promises = [];

    ns.forEach(function(filename){
        promises.push(Q.nfcall(fs.readFile, filename,"utf8"));
    })

    Q.all(promises).then(function(results){
        console.log(results);
    })

})
//通过Q.nfcall 方法调用异步函数，返回一个 promise对象，promise对象具有一个方法 then ，可以得到运行结果。
//这里的 var promises = []; 变量用于储存promise数组，把这个参数加入Q.all 方法里，会得到一个promise对象，调用then方法会得到一个数组，这个数组就是所有promises的运行结果。
//一切都围绕promise对象，它有一个then方法用于返回回调函数结果，还有一个 fail  函数，用于返回异常对象，then 和 fail 不会同时被调用，就好比一个普通函数，如果抛出异常就不会有返回值一样。
//修改之前代码
var Q = require("q"),fs = require("fs");
Q.nfcall(fs.readdir, "no path")
.then(function(ns){
    var promises = [];
    ns.forEach(function(filename){
        promises.push(Q.nfcall(fs.readFile, filename,"utf8"));
    })
    Q.all(promises).then(function(results){
        console.log(results);
    })
})
.fail(function(err){
    console.log(err);
})
//说明调用的是 fail函数，而不是then，说明 then 代表无异常情况下的返回值，fail表示抛出的异常，如果过程中有任何异常，promise.then 的函数都不会被调用，而是会调用fail，表示抛出异常。

/**
 * generator
 * 运行generator代码需要Node.js version > 0.11.3，在运行时，使用 node --harmony xx.js  方式运行。*
 * 在 ES6 规范中，定义一个生成器函数，在 function 后跟上
 * 调用生成器函数会产生一个生成器（generator）对象。生成器拥有的最重要的方法是 next()，用来迭代：
 */
function* gf() { };
function *gf() { };
function * gf() { };

/**
 * go库用于优化异步函数调用方式，支持promise和thunks方式。
 * 安装 npm i co thunkify
 * thunkify 库是对异步函数的再次封装，符合co规范。
 * 
 */

/**
 * 下面用co库实现任意文件数：
 */
var fs = require("fs");
var co = require("co");
var thunkify = require("thunkify");


// 包装异步函数，让其符合co规范。
var readdir = thunkify(fs.readdir);
var readFile = thunkify(fs.readFile);

co(function *(){

    // 得到当前目录下的文件名列表
    var fns = yield readdir(".");


    for(var i=0,len = fns.length;i&lt;len;i++){
        var rs= yield readFile(fns[i]);
        console.log(rs);
    }

})();
//我们会发现，co使用很简单， 只要用thunkify转换普通的异步函数，之后和同步调用基本一致。
//下面我们自己编写一个，模拟异步的函数，并用co执行。
var co = require("co");
var thunkify = require("thunkify");

function fun(time,callback){
    setTimeout(function(){
        callback(null,"setTimeout time is - "+time);
    },time)
}

var func = thunkify(fun);

co(function* (){

    console.log(yield func(2000));
    console.log(yield func(1000));
    console.log(yield func(500));

})()


/**
 * 流
 * 这部分的内容并不实用，这是真的，我们不太可能去自己实现流子类，而是去使用流的子类，比如 fs 、net、http等IO相关的模块就是流的子类，这部分内容又很重要。通过对流理解，在使用具体子类时才能得心应手。
 * 在Node.js中，通过.pipe() 方法连接上下游，把上游数据导入下游。
 * 什么时候应该使用流？
 * 	下面的例子，是当客户请求服务器资源，服务器会读取data.txt文件到内存，然后把数据再推倒客户端，如果文件很大，就会占用很多内存。更糟的是，如果高并发，性能会更差。
 * 	pipe方法，内部通过监听 stream 的data和end时间，把接收到的文件块第一时间到客户端，节省内存。
 * 	流的类别
 * 		在Node.js中，流分4种类别： readable可读流, writable可写流, transform转换流, duplex双工流。
 * 	pipe管道方法：
 * 		无论哪种流，都可通过pipe方法进行连接。pipe只是个函数，它接受一个可读的流作为输入源，和一个输出源的写入流。
 * 		src.pipe(target)
 * 		.pipe(target)返回target，所以可以多次调用pipe方法
 * 		如：a.pipe(b).pipe(c).pipe(d)
 * 		
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        res.end(data);
    });
});
server.listen(3000);

/*
流可以解决这个问题，把文件流和响应流通过pipe连起来，这样上游的数据就会“缓缓的”流道客户端，不会出现大量内存被消耗的情况。在这里，用fs.createReadStream方法代替fs.readFile方法。
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server.listen(3000);

/**
 * 什么是流Stream
 * 流，通俗来说是可读、可写或可读写的对象。比如打开一个文件流，就可以对文件流对象进行读写操作，比如一个request http请求，也是一个流对象，流对象继承了EventEmitter（参看“事件机制”一章）。
 * 流stream这个模块本身提供了抽象类作为扩展基础，之后章节介绍的文件系统、网络系统、加密解密、压缩解压模块中都使用了流，根据自身系统的需要扩展了stream模块的抽象类。
 * node.js 提供了流的抽象类。
 * stream.Readable 可读抽象类
 * stream.Writable 可写抽象类
 * 读取流
 * 通过这种方式我们可以创建一个Readable实例
 * 
 * 写入流
 * Readable相对应的是写入流Writable。
 * 构建Writable实例
 */

// 这样创建不会抛出任何异常
var reader = new Readable();
// 打印一下这个对象有什么吧
console.log(reader);

//构建Writable实例
var Writable = require("stream").Writable;
var writer = new Writable();


/**
 * fs文件系统
 * 文件系统，通俗的理解是对文件和文件夹的操作。
 * 文件系统内部读取与写入部分都实现了Readable和Writable（参看“流”的一章）
 * 文件的操作的方法分为同步和异步，同步方法有sync字样。
 * 本章会详细讲解，但有几个部分不会讲，原因是这部分API不是很好用，也几乎不会用到，还有就是它们并不是跨平台的，每个平台的参数和可用程度都不尽相同。比如fs.chmod（更改权限）、fs.symlink和fs.chown（更改所有者），不会在本书讲解，有兴趣的可以研究一下。
 * 
 * 文件描述符-fd：
 * 内核（kernel）利用文件描述符（file descriptor）来访问文件。文件描述符是非负整数。打开现存文件或新建文件时，内核会返回一个文件描述符。读写文件也需要使用文件描述符来指定待读写的文件。
 * 
 * 文件链接-link
 * 文件链接的是在文件之间创建链接。这种操作实际上是给系统中已有的某个文件指定另外一个可用于访问它的名称。对于这个新的文件名，我们可以为之指定不同的访问权限，以控制对信息的共享和安全性的问题。
 */

/**
 * fs文件夹操作
 * NodeJS通过fs内置模块提供对文件的操作。fs模块提供的API基本上可以分为以下三类：
	文件属性读写。
	其中常用的有fs.stat、fs.chmod、fs.chown等等。

	文件内容读写。
	其中常用的有fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等等。

	底层文件操作。
	其中常用的有fs.open、fs.read、fs.write、fs.close等等。
 */



