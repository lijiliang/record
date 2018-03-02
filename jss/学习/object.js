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

/**
 * in运算符: in运算符用于确定某个属性是否包含在对象中。如果某个属性值是undefined，in运算符也返回true。
 */
var o = {P:1}
'p' in o  //true
var o = {p:undefined}
'p' in o
/**
 * 原型继承
 * 继承方面,javascript中的每个对象都有一个内部私有的链接指向另一个对象 (或者为 null),这个对象就是原对象的原型. 这个原型也有自己的原型, 直到对象的原型为null为止. 这种一级一级的链结构就称为原型链.
 * 在Javascript中，只要创建了一个新函数，就会为该函数创建prototype属性，指向函数的原型对象
 * 默认所有原型对象都会有constructor属性，这个属性包含一个指向prototype属性所在函数的指针。通过构造函数创建实例后，每个实例内部都有一个指针指向函数的prototype对象
 * javascript对象有两种不同的属性,一种是对象自身的属性,另外一种是继承于原型链上的属性
 */
[].__proto__ === Array.prototype
// true
[].__proto__.__proto__ === Object.prototype
//true
(new String()).__proto__ === String.prototype
//true

// prototype属性: 由于函数本身也是一个对象，因此它拥有来自构造函数的原型，即javascript的Function object。但是，函数本身的prototype属性仅仅用于函数实例的属性继承，而函数本身不会使用这个关联的prototype。（在prototype中设置的属性将直接作用于所有实例）
function Person(){}
Person.prototype.name = "Thom";
var person1 = new Person();
person1.name; // Thom
Person.name; // Person

// constructor属性: 原型的属性是共享的，因此，constructor属性也是共享的，可以通过实例访问。
console.log(person1.constructor); //function Person(){ }
console.log(person1.constructor == Person.constructor); //false
console.log(person1.constructor == Person.prototype.constructor); //true

// 原型链属性的读取:读取对象属性时，先搜索实例本身，如果找到对应属性则停止搜索，如果没有找到，再搜索原型对象。因此，在实例中添加原型同名属性，不会影响到其他实例。
function Person(){}
Person.prototype.name = "Alan";
var person1 = new Person();
var person2 = new Person();
person1.name = "Nolen";
alert(person1.name); //Nolen
alert(person2.name); //Alan

// 由于原型和实例之间通过指针关联起来，因此对原型做的修改可以从实例上表现出来，
function Person(){}
Person.prototype.name = "Alan";
var person1 = new Person();
Person.prototype.age = 1;
alert(person1.name); //Alan
alert(person1.age); //1

// in 操作符及 hasOwnProperty()方法: in操作符会同时检测原型和实例，而hasOwnProperty方法只会检测实例。
function Person(){}
Person.prototype.name = "Alan";
var person1 = new Person();
alert(person1.hasOwnProperty("name"));//false
alert("name" in person1);//true
person1.name = "Nolen";
alert(person1.hasOwnProperty("name"));//true
alert("name" in person1);//true