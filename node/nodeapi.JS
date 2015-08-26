/**
 * Buffer
 * 	  Buffer类是一个全局的直接处理二进制数据类型。它可以以各种方式构造。
 *    纯Javascript对于Unicode的处理是友好的，而对二进制并不友好。但处理TCP数据流和文件系统，必须要处理字节流，所以node.js提供一套策略来创建和操作字节流。 
 *    数据储存在一个Buffer实例中，一个Buffer的大小是固定的，类似于不可变的整数数组。
 *    Buffer与字符串之间的转换需要指定明确的编码。
 * Buffer支持的编码：
 * 	 'ascii'编码，只为7位的ASCII的数据。这个编码方法非常快！
 * 	 'utf8' 编码，支持Unicode字符。
 * 	 'utf16le' 编码，小端编码的Unicode字符。对（u10000 ~ u10FFFF）的支持。
 * 	 'ucs2' 是 'utf16le' 编码的别名。
 * 	 'base64' 是 Base64字符串编码。
 * 	 'hex' 表示十六进制编码，每个byte编码为两个十六进制字符。
 * 一个Buffer对象也可以使用一个类型数组。Buffer对象克隆到一个ArrayBuffer，用作类型数组存储支持。node.js提供的Buffer和标准类型化数组是两套不同的系统，所以Buffer和ArrayBuffer的内存不共享。
 * 注意：虽然V8提供了标准化的类型化数组，但node.js自身定义的Buffer提供了更灵活强大的API，在之后的章节会详细讲解两者的转换与使用方法。
 * 什么是类型化数组
 * 可以使用类型化数组处理网络协议、二进制文件图片等二进制数据，这个在之前是无法做到的，这也是HTML5标准化支持。
 * 类型化数组包括以下类，ArrayBuffer、DataView、Int8Array、Uint8Array、Int16Array、Uint16Array、Int32Array、Uint32Array、Float32Array、Float64Array。
 * ArrayBuffer 对象
 * 表示原始数据的缓冲区，用于存储不同类型化数组的数据。 无法从 ArrayBuffer 读取或向其写入，但是，可将其传递给类型化数组或 DataView 对象 以解释原始缓冲区。
 * DataView 对象
 * 可以使用DataView对象来将不同类型的二进制数据读取和写入ArrayBuffer中的任何位置
 */

/**
 * 创建Buffer实例
 * node.js 提供了几种方式来创建Buffer实例。
 */
/**
 * 第一种：new Buffer(size)
 * 参数size定义了数组大小，Buffer长度是不可变的。
 * 注意：new Buffer(size) 时，并非“一定会”创建一个内容为“空”的对象，可以借助 buf.fill()测底清空。
 */
var buf1 = new Buffer(3);

/**
 * 第二种：new Buffer(array)
 * 要求是octet数组，也就是btye数组。
 * 一个btye是八位bit，简单的说就是 从 0 ~ 255
 */
var buf1 =  new Buffer([12,257,258]);
console.log(buf1[1])

/**
 * 第三种：new Buffer(str,[encodeing])
 * 可以通过字符串创建一个Buffer实例，第二个参数表示字符编码方式（可选）。
 * Buffer支持的编码：
 * 'ascii'编码，只为7位的ASCII的数据。这个编码方法非常快！
 * 'utf8' 编码，支持Unicode字符。
 * 'utf16le' 编码，小端编码的Unicode字符。对（u10000 ~ u10FFFF）的支持。
 * 'ucs2' 是 'utf16le' 编码的别名。
 * 'base64' 是 Base64字符串编码。
 * 'hex' 表示十六进制编码，每个byte编码为两个十六进制字符。
 */
var buf = new Buffer("你好")
console.log(buf.toString());  //你好

 var buf = new Buffer("你好","utf16le"); // 使用utf16le编码
 console.log(buf.toString("ucs2"));  // 打印“你好”
 console.log(buf.length)    // 打印出 4
 var buf2 = new Buffer("ab","utf16le"); // 使用utf16le编码
 console.log(buf2.toString("ucs2"));  // 打印“ab”
 console.log(buf2.length)    // 打印出 4

/**
 * 划出新对象：buf.slice([start],[end])
 * 创建Buffer对象，还可以slice方法从已有Buffer对象划分出新的Buffer对象。
 * start[可选]参数，表示截取的起始位置,默认 0。
 * end[可选]参数，表示截取的结束位置，默认buf.length 。
 */
 var buf1 = new Buffer("你好"); 
 var buf2 = buf1.slice(3);     // 从buf1的3位置开始截取
 console.log(buf2.toString())  // 打印“好”，说明截取了全部buf1 3~6的字节。

 var buf3 = new Buffer("世界你好"); 
 var buf4 = buf3.slice(3,9);
 console.log(buf4.toString())  // 打印“界你”，截取了全部buf3 3~9 的字节。
