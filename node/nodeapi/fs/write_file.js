var fs = require("fs");

//写入一个文件nex.txt
fs.open("nex.txt","w",function(err,fd){
	var buf = new Buffer("您好啊！");
	fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){
		console.log(buffer.toString());
	});
})