/**
 * js面向对象程序（Object-Oriented, OO）
 * 对象：无序属性的集合，其属性可以包含基本值、对象或者函数
 *
 * Object prototype
 * 	constructor
 * 	hasOwnProperty
 * 	isPrototypeOf
 * 	propertyIsEnumerable
 * 	toString
 * 	valueOf
 */

/**
 * 理解对象
 */

//简单
var person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "soft";

person.sayName = function(){
	alert(this.name)
}

//对象字面量写法
var person = {
	name : "Nicholas",
	age: 29,
	job: "soft",
	sayName: function(){
		alert(this.name)
	}
}

/**
 * 创建对象
 */

// 1、工厂模式
//工厂模式虽然解决了创建多个相似想象的问题，但却没有解决对象识别的问题
function createPerson(name, age, job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name)
	}
	return o;
}
var person1 = createPerson("Nicholas", 29, "soft")
	
// 2、构造函数模式
/**
 * 构造函数与工厂模式不同之处：
 * 	没有显式地创建对象
 * 	直接将属性和方法赋给了this对象
 * 	没有return语句
 *
 * 调用构造函数的步骤：
 * 	创建一个对象
 * 	将构造函数的作用域赋给新对象（因此this就指向了这个对象）
 * 	执行构造函数中的代码（为这个新对象添加属性）
 * 	返回新对象
 *
 * 构造函数模式虽然好用，但也并非没有缺点。使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。
 */
function Person(name, age, job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		alert(this.name);
	}
}
var person1 = new Person("Nicholas", 29, "soft")

//将构造函数当作函数

//当作构造函数使用
var person = new Person("Nicholas", 29, "soft");
person.sayName();  //Nicholas

//作为普遍函数调用
Person("Nicholas", 29, "soft") //添加到window
window.sayName(); //Nicholas

//在另一个对象的作为域中调用
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");  //可以使用call()或apply()改变使用域
o.sayName();  //Kristen

// 3、原型模式
/**
 * 每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法
 */
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "soft";
Person.prototype.sayName = function(){
	alert(this.name);
}

var person1 = new Person();
person1.sayName(); //Nicholas

var person2 = new Person();
person2.sayName(); //Nicholas

alert(person1.sayName == person2.sayName); //true

/**
 * 理解原型对象
 * 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。
 * 在默认情况下，所有原型对象都会自动获取一个constructor(构造函数)属性，这个属性包含一个指向prototype属性所在函数的指针
 *
 * 使用delete操作符可以完全删除实例属性
 *
 * hasOwnProperty 函数
 *	 为了判断一个对象是否包含自定义属性而不是原型链上的属性，它是唯一一个处理属性但是不查找原型链的函数
 * isPrototypeOf是用来判断要检查其原型链的对象是否存在于指定对象实例中，是则返回true，否则返回false
 * 原型与in操作符
 * 	in操作符会在通过对象能够访问给定属性时返回true,无论该属性存在于实例中还是原型中
 *
 * 注意：实例中的指针仅指向原型，而不指向构造函数
 */
//可以通过 isPrototyoeOf()方法确实对象之间是否存在关系
alert(Person.prototype.isPrototypeOf(person1));  //true

alert("name" in person1);  //true

/**
 * [hasPrototypeProperty 确定该属性到底是存在于对象中，还是存在于原型中; 属性存于原型中就返回true,属性存在于实例中就返回false]
 * @param  {[type]}  object [对象]
 * @param  {[type]}  name   [属性]
 * @return {Boolean}        [true, false]
 */
function hasPrototypeProperty(object, name){
	return !object.hasOwnProperty(name) && (name in object);
}

var person = new Person();
alert(hasPrototypeProperty(person, "name"));  //true

person.name = "Greg";
alert(hasPrototypeProperty(person, "name"))  //false

//更简单的原型语法
//以字面量的形式创建对象
function Person(){
}
Person.prototype = {
	constructor: Person,  //如果constructor的值真的很重要，可以设置适当的值。这个是可写可不写
	name: "Nicholas",
	age: 29,
	job: "soft",
	sayName: function(){
		alert(this.name);
	}
}

//原生对象的原型
String.prototype.startsWith = function(text){
	return this.indexOf(text) == 0;
}

// 4、组合使用构造函数模式和原型模式
// 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方的引用，最大限度地节省了内存
function Person(name, age, job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["Shelby","Court"];
}
Person.prototype = {
	constructor: Person, 
	sayName: function(){
		alert(this.name);
	}
}

var person = new Person("Nicholas", 29, "soft");
person.friends.push("Van");
alert((person.friends));  //"Shelby,Court,Van"

// 5、动态原型模式
// 使用动态原型模式，不能使用对象字面量重写原型。如果在已经创建了实例的情况下重写原型，就会切断现有实例与新原型之间的联系
function Person(name, age ,job){
	//属性
	this.name = name;
	this.age = age;
	this.job = job;
	if(typeof this.sayName != "function"){
		Person.prototype.sayName = function(){
			alert(this.name);
		}
	}
}
var friend = new Person("Nicholas", 29, "soft");
friend.sayName();

// 6、寄生构造函数模式
// 基本思想是创建一个函数，该函数的作用权权是封装创建对象的代码，然后再返回新创建的对象；从表面上看像是典型的构造函数
function Person(name, age, job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	}
	return o;
}
var friend = new Person("Nicholas", 29, "soft");
friend.sayName();  //Nicholas

//例：想创建一个具有额外方法的特殊数组，由于不能直接修改Array构造函数，因此可以使用这个模式
function SpecialArray(){
	//创建数组
	var values = new Array();

	//添加值
	values.push.apply(values, arguments);

	//添加方法
	values.toPipedString = function(){
		return this.join("|")
	}

	//返回数组
	return values;
}

var colors = new SpecialArray("red","blue","green");
alert(colors.toPipedString());  //red|blue|green

// 7、稳妥构造函数模式
// 比较适合在安全执行环境中使用
function Person(name, age, job){
	//创建要返回的对象
	var o = new Object();

	//可以在这里定义私有变量和函数
	
	//添加方法
	o.sayName = function(){
		alert(name;)
	}
	//返回对象
	return o;
}
	
/**
 * 继承
 * 其它oo语言都支持两种继承方式：接口继承与实现继承，js只支持实现继承，而且其实实现继承主要是依靠原型链来实现的
 * 实现继承的主要方法：其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
 * 原型链
 */
//实现原型链的基本模式
function SuperType(){
	this.prototype = true;
}

SuperType.prototype.getSuperValue = function(){
	return this.property;
}

function SubType(){
	this.subproperty = false;
}

//继承了 SuberType
SubType.prototype = new SuberType();

SubType.prototype.getSubValue = function(){
	return this.subproperty;
}

var instance = new SubType();
alert(instance.getSuperValue());

/**
 * 确定原型与实例的关系
 * 第一种方法： instanceof操作符，如果实例与原型链中出现过的构造函数，就返回true
 * 第二种方法： isPrototypeOf() 只要原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，因此isPrototypeOf()方法也会返回true
 */
alert(instance instanceof Object) //true
alert(SuperType.prototype.isPrototypeOf(instance)); //true


//借用构造函数  这种方法很少单独使用
function SuperType(){
	this.colors = ["red","blue","green"];
}
function SubType(){
	//继承了SuperType  可通过apply()和call()方法在（将来）新创建的对象上执行构造函数
	SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("blank");
alert(instance1.colors) //red,blue,green,blank

//借用构造函数 -> 传递参数
function SuperType(name){
	this.name = name;
}
function SubType(){
	//继承了SuperType,同时还传递了参数
	SuperType.call(this, "Nicholas");

	//实例属性
	this.age = 29;
}
var instance1 = new SubType();
alert(instance1.name)  //Nicholas
alert(instance1.age)  //29


//组合继承
function SuperType(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
};
function subType(name, age){
	//继承属性
	SuperType.call(this, name);
	this.age = age;
};
//继承方法
subType.prototype = new SuperType();
subType.prototype.sayAge = function(){
	alert(this.age)
}
var instance1 = new subType("liang", 29);
instance1.colors.push("black");
alert(instance1.colors); //red,blue,green,black
instance1.sayName();  //liang
instance1.sayAge(); //29

//原型式继承
//这种继承方式要求你必须有一个对象可以作为另一个对象的基础
function object(o){
	function F();
	F.prototype = o;
	return new F();
}

var person = {
	name: "liang",
	friends: ["li","res"]
}

var anotherPerson = object(person);
anotherPerson.name = "Greg";

//ECMAScript5 Object.create() 规范化了原型式继承
var person = {
	name: "liang",
	friends: ["li","res"]
}
var anotherPerson = Object.create(person);
anotherPerson.name = 'greg';
anotherPerson.friends.push("Rob")
alert(person.friends)  //li,res,Rob


//寄生式继承
function createAnother(original){
	var clone = object(original);  //通过调用函数创建一个对象
	clone.sayHi = function(){      //以某种方式来增强这个对象
		alert('HI');
	}
	return clone;    // 返回这个对象
}

//寄生组合式继承
//集寄生式继承和组合继承的优点于一身，是实现基于类型继承的最有效方式
function SubperType(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
}
function subType(name, age){
	SubperType.call(this, name);  //第二次调用SubperType()

	this.age = age;
}

subType.prototype = new SubperType();  //第一次调用 SubperType()
subType.prototype.constructor = subType;
subType.prototype.sayAge = function(){
	alert(this.age)
}


