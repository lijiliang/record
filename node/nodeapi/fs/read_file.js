var fs = require("fs");

//以同步方式读取文件
var data = fs.readFileSync("nex.txt");
console.log(data.toString());