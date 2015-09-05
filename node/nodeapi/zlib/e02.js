/**
 * [e02 通过流的方式进行解压缩文件]
 * @type {[type]}
 */
var zlib = require("zlib");
var fs = require("fs");
var input = fs.createReadStream("input.txt.gz");
var out = fs.createWriteStream("out.txt");
var gunz = zlib.createGunzip();  //创建解压流

input.pipe(gunz).pipe(out);