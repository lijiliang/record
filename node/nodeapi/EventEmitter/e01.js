var EE = require("events").EventEmitter,
	inhertis = require("util").inherits;
function MY(){

}

inhertis(MY,EE);

var m = new MY();

m.on("self event", function eventHandle(name,age){
	console.log(name,age);
})
//唯一性监听once
/*m.once("self event", function eventHandle(name,age){
	console.log(name,age);
})*/

setTimeout(function(){
	m.emit("self event","liang",23)
	m.emit("self event","lijiliang",24)
},1000)