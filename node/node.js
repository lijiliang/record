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
 *
 * 程序是什么： 程序=数据结构+算法   静态+动态
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

/**
 * 监听文件夹
 * 这个功能很有趣，就是当文件夹内有变化时，会触发事件，比如文件夹内，增加文件、修改文件都会触发事件。
 * 通过fs.watch方法可以监听一个文件或文件夹，这里监听了当前文件夹。这里有几种情况，当创建一个文件夹或文件时，eventname是rename，filename是新创建的文件夹或文件的名称。当删除一个文件夹或文件时，eventname是rename，filename是null。当更改一个文件内容或文件（文件夹）名时，eventname是change，filename是被更改的那个文件的文件名。
 * 
 */
//监听当前目录的代码实现
var fs = require("fs");
fs.watch(".", function(eventname, filename){
	console.log(eventname);
	console.log(filename);
})

/**
 * fs文件操作
 * 写文件
 * 写文件的意思感觉是写一个文件，准确来说，这里的写文件是把数据写入到一个文件中，当文件不存在时会创建一个文件。那么细化来看，过程应该是先打开一个文件，如果文件不存在就创建一个新的文件，然后把数据写入这个文件。
 * 打开文件使用fs.open方法，写入数据使用fs.write方法，先做个例子。
 *
 * fs.open(path, flags, callback)
 * fs.openSync(path,flags) 是同步方法，return fd,如果有错误直接throw抛出错误。
 * fs.open 打开了文件，当然使用后应该关闭close文件，通过fs.close(fd, callback)和fs.closeSync(fd)方法可以关闭打开的文件
 *
 * 其它写入的方法：
 * fs.writeFile(filename, data, [options], callback)
 * fs.writeFileSync(filename, data, [options]) 同步方式
 * filename String类型， 文件名称
 * data String | Buffer类型，要写入的数据
 * options[可选] Objectl 类型，默认值 {encoding:"utf8",flag:"w"}
 * callback(err) 回调函数
 * 
 * fs.appendFile(filename, data, [options], callback)
 * fs.appendFileSync(filename, data, [options]) 同步方式
 * 参看 fs.writeFile 方法，差别就是 [options]的flag默认值是"a"，所以它以追加方式写入数据
 */

//写文件
var fs = require("fs");
fs.open("new.txt","w",function(err,fd){
    var buf = new Buffer("你好啊");
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
})

var fs = require("fs");
fs.writeFile("myfile.txt","Javascript很赞",function(err){
    if(!err)
    console.log("写入成功！")
})

/**
 * fs 读文件
 * fs.read(fd, buffer, offset, length, position, callback)
 * fs.read(fd, buffer, offset, length, position) 方法是同步写入，它返回读取了多少bytes数量。
 * fd参数，文件描述符，通过fs.open得到。
 * buffer参数，是把读取的数据写入这个对象，是个Buffer对象。
 * offset参数，写入buffer的起始位置。
 * length参数，写入buffer的长度。
 * position参数，文件的什么位置开始读。
 * callback(err,bytesRead, buffer)回调方法，当出现异常会抛出err，bytesRead是读取了多少bytes，buffer读取到的数据。
 * 
 * 除了fs.read方式读取文件外，还有一个读取文件的方式。
 * fs.readFile(filename, [options], callback)
 * fs.readFileSync(filename,[options]) 同步方式，retur读取到的数据。
 * filename String类型，表示要读取的文件名
 * options[可选] Object类型，默认值是 {encoding:null,flag:"r"}
 * callback(err,data) 回调函数，data表示读取的数据。
 *
 * 读取和写入都有两种不同方式，一个是先open，然后操作读写，但需要手工调用fs.close关闭文件，这种方式适合于多次写入或读取。还有一次性服务的，writeFile/appendFile/readFile方法只是写入或读取一次，内部自动调用了fs.close方法。
 */

//判断这个文件是png图片
var fs = require("fs");
fs.open("1.png","r",function(err,fd){
    // PNG头部 8 bytes是固定的，来判断文件前8bytes。
    var header = new Buffer([137,80,78,71,13,10,26,10]);
    var buf = new Buffer(8);
    fs.read(fd,buf,0,buf.length,0,function(err,bytesRead,buffer){
        if(header.toString() === buffer.toString()){
            console.log("是PNG格式图片文件");
        }
    })        
})

var fs = require("fs");
var data = fs.readFileSync("myfile.txt");
console.log(data.toString());


/**
 * node.js网络模块
 * 通过网络可以让电脑相互连接，从而相互传递信息。这个过程，就需要知道彼此的地址，这个地址就是IP。数据传输的方式，分为TCP和UDP，TCP可以理解为可靠性交流，确保数据完整性的方式，UDP就比较随意，不和对方打招呼，直接把数据通过IP地址丢给对方。socket是建立在TCP和IP之上的，可以理解为一个空洞和管道，通过它发送数据和接收数据。HTTP协议中的数据是利用TCP协议传输的，所以支持HTTP也就一定支持TCP。好了，不讲太多，下面看一下node.js中对应这些概念的模块有哪些。
 * net模块
 *   通过 var net = require("net"); 方式导入net模块。
 *   net模块可以建立TCP的服务器端和Socket客户端。
 *
 * http模块
 *   通过这个模块是建立http的服务器端和客户端，http模块建立在net模块之上。
 *
 * https模块
 * 	 通过这个模块可以建立https的服务器端和客户端，https模块建立在http模块和tls模块之上（tls模块在“加密解密”一章有详解）
 *
 * gdram模块
 * 	 这个模块对应的就是UDP协议的操作。
 *
 * Socket是什么
 * 	 所谓socket通常也称作"套接字"，应用程序通常通过"套接字"向网络发出请求或者应答网络请求。
 * 	 形象的描述是，socket是一个管道两端的口，当客户端和服务器建立连接后，这个管道就形成了，那么两端可以通过socket（口）写入和读取数据到另一端。
 */
var net = require('net');
var server = net.createServer(function(socket) {
  console.log('有客户进入');

  // 和客户端打招呼
  socket.write('你好啊！');

  // 打印客户端发送来的信息
  socket.on("data",function(data){
    console.log(data.toString());

  })

  // 监听 error 或 end事件
  socket.on("error",function(){
    console.log("客户已断开")
  })
  socket.on("end",function(){
    console.log("客户已断开")
  })

});
// 服务器监听8124端口，等待客户访问
server.listen(8124, function() {
  console.log('服务器已启动！');
});


/**
 * Socket对象
 * net模块有两个类，一个是Socket和Server，下面先讲解Socket。
 * net.Socket实现了stream.Duplex双工接口，具有了读写的能力。
 * 创建Socket实例
 * 第一种方法 new net.Socket()
 * 创建之后也不能做什么，因为没有连接到服务器端，所以需要socket.connect方法建立个连接。
 * socket.connect(port, [host], [connectListener]) 方法是连接服务器的方法，port表示连接到服务器的端口号；host[可选]参数是服务器地址，默认是localhost；connectListener[可选]参数是个'connect'事件监听器，当连接建立后会触发'connect'事件，但当连接建立失败时，会触发‘error’事件。
 *
 * 第二种方法 net.connect / net.createConnection
 * net.connect(port, [host], [connectListener])#
 * net.createConnection(port, [host], [connectListener])
 *
 * 第三种方法 被动创建
 * 其实就是服务器端有一个客户端连进来时，会在服务器端创建一个对应的socket（口）。
 * net.createServer([connectionListener])方法在例子中见过，下面详细讲解。
 * connectionListener(socket)是“connection”事件监听器，当有客户端连接进来时，会触发“connection”事件，而这个监听器的socket参数就是被动创建的，是对应连接进来的客户端，当然这是可选参数。
 * connectionListener是可选参数，如果省略了又如何得到socket呢？答案很简单，看下面代码：
 */

//第一种方法 new net.Socket()
var net = require("net");
var socket = new net.Socket();
socket.connect(8124,function(){
    console.log(socket.address())
})

//第三种方法 被动创建
var server = net.createServer();
server.on("connection",function(socket){
    // 这个的作用和 [connectionListener]的作用一样。
})

/**
 * Socket对象的属性
 * socket.remoteAddress 属性是远程socket的地址。
 * socket.remotePort 远程socket的端口号。
 * socket.localAddress 本地socket地址。
 * socket.localPort 本地socket端口号。
 * socket.bytesRead 接收到的字节数。
 * socket.bytesWritten  发送出去的字节数。
 * socket.setEncoding 流
 * socket.write(data, [encoding], [callback])
 *    data参数，要发送出去的数据，data可以是字符串类型或Buffer类型。
 *    encoding[可选]参数，编码方式，默认utf8，当data是字符串类型时有效。
 *    callback[可选]参数，写入成功后被调用。
 * socket.end([data], [encoding]);
 * 	  socket.end()就是发出FIN，至于FIN信号，可以理解为告诉另一端socket结束了，然后自己也会结束生命周期，而另一端会触发"end"事件。
 * 
 * 
 */
var net = require('net');
var server = net.createServer();
server.on("connection",function(socket) {
    console.log("远程socket端口：" + socket.remotePort);
    console.log("远程socket地址：" + socket.remoteAddress);
    console.log("本地socket端口：" + socket.localPort);
    console.log("本地socket地址：" + socket.localAddress);
    socket.on("data",function(data){
        console.log(data.toString());
        console.log("接受到字节量：" + socket.bytesRead);
        socket.write("send byte ... ")
        console.log("发送的字节量："+ socket.bytesWritten);
    })
})

server.listen(8124, function() {
  console.log('服务器已启动！');
});


















