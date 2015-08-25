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