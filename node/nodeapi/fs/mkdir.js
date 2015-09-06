var fs = require("fs");

//以异步方式创建文件夹
fs.mkdir("mydir", function(err){
	console.log(err);
})

//以同步方式创建
//fs.mkdirSync("mydir")