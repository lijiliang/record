var fs = require("fs");
//给文件夹重命名
fs.rename("mydir","mydir2", function(err){
	console.log(err);
})