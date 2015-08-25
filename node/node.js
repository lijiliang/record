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







