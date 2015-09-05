/**
 * [通过buf方式对文件进行解压]
 * @type {[type]}
 */
var zlib = require("zlib");
var fs = require("fs");
var gz = fs.readFileSync("input.txt.gz");
/*console.log(gz.toString());*/
zlib.gunzip(gz, function(err, res){
	console.log(res.toString());
})