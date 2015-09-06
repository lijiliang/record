var fs = require("fs");

//以异步方式删除文件夹
fs.rmdir("mydir", function(err){
	console.log(err);
})

//以同步方式删除
//fs.rmdirSync("mydir")