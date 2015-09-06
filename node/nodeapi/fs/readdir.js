var fs = require("fs");
//查看当前目录下的所有文件
fs.readdir('.', function(err,files){
	console.log(files);
})