/*
	hasOwnProperty 函数
		为了判断一个对象是否包含自定义属性而不是原型链上的属性，它是唯一一个处理属性但是不查找原型链的函数
	isPrototypeOf是用来判断要检查其原型链的对象是否存在于指定对象实例中，是则返回true，否则返回false
	for in 循环
		和 in 操作符一样，for in 循环同样在查找对象属性时遍历原型链上的所有属性
		注意: for in 循环不会遍历那些 enumerable 设置为 false 的属性；比如数组的 length 属性
 */

//hasOwnProperty  for in
Object.prototype.bar = 1;
var foo = {moo:2};
for(var i in foo){
	//console.log(i); //输出两个属性 bar 和moo
	if(foo.hasOwnProperty(i)){  //使用hasOwnPrototype过滤，只循环实例中的属性，不循环原型链上的属性
		console.log(i);   //moo
	}
}