/**
 * javascript 设计模式
 * Constructor(构造器)模式、Module(模块)模式、Revealing Module(揭示)模式、Singleton(单例)模式、Observer(观察者)模式、Mediator(中介者)模式、Prototype(原型)模式、Command(命令)模式、Factory(工厂)模式、Minix(混入)模式、Decorator(装饰者)模式、Flyweight(享元)模式
 */

/**
 * Constructor(构造器)模式
 * Constructor是一种在内存已分配给该对象的情况下，用于初始化新创建对象的特殊方法。JS中，最感兴趣的是Object构造器
 */
	//下面两种方式都将创建一个新的空的对象
	var newObject = {};
	var newObject = new Object();  // Object构造器的简洁记法

	//有四种方法可以将键值赋给一个对象
	newObject.somekey = "hello world";     //1、“点”语法
	newObject["somekey"] = "Hello world";  //2、中括号语法
	// 3、Object.defineProperty 
	Object.defineProperty(newObject, "somekey", {
		value: "hello world",
		writable: true,
		enumerable: true,
		configurable: true
	});
	// 4、Object.defineProperties
	Object.defineProperties(newObject, {
		"somekey": {
			value: "hello world",
			writable: true
		},
		"anotherKey": {
			value: "Foo bar",
			writable: true
		}
	})

	function Car(model, year, miles){
		this.model = model;
		this.year = year;
		this.miles = miles;
		Car.prototype.toString = function(){
			return this.model + " has done " + this.year + " year " + this.miles + " miles"
		};
	};
	// 用法
	var civic = new Car("liang", 1992, 20000)
	var mondeo = new Car("ji", 1998, 20000)

	console.log(civic.toString());

/**
 * Module(模块)模式
 * Module模式用于进一步模拟类的概念，通过这种方式，能够使一个单独的对象拥有公用/私有方法和变量，从而屏蔽来自全局作用域的特殊部分。
 * 产生的结果是：函数名与在页面上其它脚本定义的函数冲突的可能性降低
 * Module模式在某种程序上是基于对象字面量
 */
 	//用对象字面量表示法定义的模块：
 	// 使用对象字面量有助于封装和组织代码
 	var myModule = {
 		myProperty: "someValue",

 		//对象字面量可以包含属性和方法
 		//例如，可以声明模块的配置对象
 		myConfig: {
 			userCaching: true,
 			language: "en"
 		},

 		//基本方法
 		myMethod: function(){
 			console.log('1234');
 		},
 		//根据当前配置输出信息
 		myMethod2: function(){
 			console.log('Caching is:' + (this.myConfig.userCaching) ? "enabled" : "disabled");
 		},
 		//重写当前配置输出信息
 		myMethod3: function(newConfig){
 			if(typeof newConfig === "object"){
 				this.myConfig = newConfig;
 				console.log(this.myConfig.language);
 			}
 		}
 	};

 	//输出
 	myModule.myMethod();  //1234
 	myModule.myMethod2();  //enabled
 	myModule.myMethod3({
 		language: 'jp'
 	});  //jp

 	/**
 	 * 私有
 	 * 通过该模式，只需返回一个公共的API，而其它的一切则都维持在私有闭包里
 	 * 为我们提供了一个屏蔽处理底层事件逻辑的整体解决方案，同时只暴露一个接口供应用程序的其它部分使用。
 	 */
 	var testModule = (function(){

 		var counter = 0;

 		return {
 			incremmentCounter: function(){
 				return ++counter;
 			},
 			resetCounter: function(){
 				console.log('counter value prior to reset: ' + counter);
 				counter = 0;
 			}
 		}

 	})();

 	//用法：
 	
 	//增加计数器
 	testModule.incremmentCounter()  // 1

 	//检查计数器值并重置
 	testModule.resetCounter()

 	/*
 	* 使用这种Module模式实现购物车例子
 	* 只能我们在模块才能享有私有函数的自由。因为它们不会暴露于页面的其余部分(只要暴露于我们输出的API)，我们认为它们是真正的私有
 	*/
 	var basketModule = (function(){
 		//私有
 		var basket = [];
 		function doSomethingPrivate(){
 			// ...
 		}
 		// 返回一个暴露出的公有对象
 		return {
 			//添加item到购物车
 			addItem: function(values){
 				basket.push(values);
 			},
 			// 获取购物车里的item数
 			getItemCount: function(){
 				return basket.length;
 			},
 			//私有函数的公有形式别名
 			doSomething: doSomethingPrivate,

 			//获取购物车里所有item的价格总数
 			getTotal: function(){
 				var itemCount = this.getItemCount(),
 					total = 0;

 				while (itemCount--){
 					total += basket[itemCount].price;
 				}

 				return total;

 			}
 		};
 	})();

 	// basketModule返回了一个拥有公用API的对象
 	basketModule.addItem({
	    item: "butter",
	    price: 0.3
	})

 	basketModule.getItemCount() //1
 	basketModule.getTotal()  // 0.3

 	/**
 	 *	Module 模式变化
 	 */
 	
 	/**
 	 * 引入混入 如(jquery,Underscore)如何作为参数传递给模块的匿名函数
 	 */
 	
 	//全局模块
 	var myModule = (function(JQ, _){
 		function privateMethod1(){
 			JQ('.content').html('test');
 		}
 		function privateMethod2(){
 			console.log(_.min([10, 5, 100, 2, 100]));
 		}
 		return {
 			publieMethod: function(){
 				privateMethod1();
 			}
 		}
 	// 引入jquery和Underscore
 	})(jquery, _);

 	/**
 	 * 引出
 	 */
 	var myModule = (function(){
 		// 模块对象
 		var module = {},
 			privateVariable = "Hello world";

 		function privateMethod(){
 			// ....
 		}
 		module.publicProperty = "Foobar";
 		module.publicMethod = function(){
 			console.log(privateVariable);
 		};
 		return module;
 	})();

 	myModule.publicMethod()  // Hello world
 	myModule.publicProperty  // Foobar









    //webpack
	var path = require("path");
	var webpack = require('webpack');

	module.exports = {
		entry: ['./index'],
		output: {
			path.join(__dirname, 'dist'),
			publicPath: '/dist/',
			filename: 'bundle.js'
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.optimize.OccurenceOrderPlugin()
		],
		module: {
			loaders: [{
				test: /\.js$/,
				exclude: /node_module/,
				include: __dirname,
				loader: 'babel'
			},{
				test: /\.css$/,
				loaders: ['style', 'raw'],
				include: __dirname
			}]
		}
	};
	

