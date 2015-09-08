var fs = require("fs");

//以同步方式读取文件
/*var data = fs.readFileSync("nex.txt");
console.log(data.toString());*/

fs.open("new.txt","r",function(err,fd){
	fs.fstat(fd, function(err,stat){
		var buf = new Buffer(stat.size);
		fs.read(fd,buf,0,buf.length,0,function(err,bytesRead,buffer){
			console.log(buffer.toString());
		})
	})
})