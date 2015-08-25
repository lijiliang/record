/*
命名：
	变量，使用Camel命名法
		var loadingModules = {}
	私有属性、变量和方法，以下划线_开头
		var _privateMethod = {}
	常量，使用全部字母大写，单词间下划线分隔的命名方式
		var HTML_EVITTY = {}
	boolean 类型的变量使用is或has开头
		var isReady = false;
		var hasMoreCommands = false;
 */

/*
检测类型： typeof -> string,number,boolean,undefined,object(null, function, Array, RegExp)
instanceof 可以检测object类型的具体类型

类型检测优先使用 typeof。对象类型检测使用 instanceof。null 或 undefined 的检测使用 == null
 */
person instanceof Object    //变量person是Object吗？
arr instanceof Array  //变量arr是Array吗？


/*
创建Object实例的方法
第一种方法：使用new操作符后跟Object构造函数
第二种方法：使用对象字面量表示法
所有对象都具有toLocalString(),toString(),valueOf()等方法
*/
var person = new Object();
person.name = 'li';

var person = {
	name : 'li',
	age: '20'
}

/*
Array
	join()方法： 合并数组为字符串  arr.join('|')
	杙方法：后进先出   push()向数组后面添加一项； pop()取得数组最后一项，移除
	队列方法：先进先出  shift()取得第一项，删除； unshfit()向数组最前面添加项
	重排序方法：reverse()反转数组  sort()排序数组
	操作方法：concat() 连接两个或多个数组
			 slice()接受一个或者两个参数，即要返回项的起始和结束位置。一个参数，slice()方法将返回从该参数指定位置开始到当前数组未尾的所有项
			 两个参数，该方法返回起始和结束位置之间的项，但不包括结束位置的项，slice()不影响原始数组
			 splice()向数组的中部插入项，最强大的数组方法
			 	删除：可以删除数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数, splice(0,2)会删除数组中的两项
			 	插入：可以向指定位置插入任意数量的项，只需要提供3个参数：起始位置、0(要删除的项数)和要插入的项。如果要插入多个项，可以再传入第四，第五或多个做任意的项 如：splice(2,0,'red','green')
			 	替换：可以向指定位置插入任意的项，且同时删除任意数组的项，只需指定3个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项不必与删除的项数相等。如：arr.splice(2,2,'liang','li')  
 	位置方法： indexOf()从头开始查找,lastIndexOf()从未尾开始查找 两个方法都接收两个参数：要查找的项和（可选的）表示查找起点位置的索引 注：IE9及以上支持
 	迭代方法：every(),filter(),forEach(),map(),some()

 */

/**
 * [compare 数组排序函数]
 * @param  {[type]} value1 [参数一]
 * @param  {[type]} value2 [参数二]
 */
function compare(value1,value2){
	if(value1 < value2){
		return 1;
	}else if(value1 > value2){
		return -1;
	}else{
		return 0
	}
	/*
	  更简单方式代替上面
	  return value2 - value1;
	 */
}

/*
Date
	getTime()  返回日期的毫秒数
	getFullYear()  取得4位数的年份
	getMonth()   月份
	getDate()    月份中的天数
	getDay()     星期中的星期几
	getHours()   日期中的小时数
	getMinutes() 日期中的分钟数
	getSeconds() 日期中的秒数
	getMilliseconds() 日期中的毫秒数
*/


/*
RegExp
	创建一个正则 var re = /pattern/flags;   =>  /[bc]at/i
	或者用构造函数来定义： var re = new RegExp("patter","flags")   =>  new RegExp("[bc]at","i")
	模式(pattern)部分可以是任何或复？的正则表达式，可以包含字符类、限定类、分组、向前查找以及反向引用，每个正则表达式都可带有一个或多个标志(flags),用以标明正则表达式的行为
	标志：g表示全局，i表示不区分大小写，m表示多行
	要匹配字符串中包含元字符，必须得转义，元字符包括： ( [ { \ ^ $ | ? * + . } ] )
	在用构造函数来定义正则时，所有元字符都必须进行双重转义
	注意：正则只是操作字符串的
		 正则默认：正则匹配成功就会结束，不会继续匹配，如果想全部查找，就要加标识（g）
		 当正则需要传参的时候，一定要用全称的写法  var re = new RegExp('\\b'+sClass+'\\b');

	正则表达式常用方法:
		exec() 专门为捕获组而设计的
		test() 正则去匹配字符串，它接收一个字符串参数。在模式与该参数匹配的情况下返回true,否则返回false
			    写法：正则.test(字符串)
		search()  正则去匹配字符串，如果匹配成功，就返回匹配成功的位置，如果匹配失败就返回 -1
				写法：字符串.search(正则)
		match()   正则去匹配字符串，如果匹配成功，就返回匹配成功的数组，如果匹配失败就返回 null
				写法： 字符串.match(正则)
		replace() 正则去匹配字符串，匹配成功的字符去替换成新的字符串，第二个参数：可以是字符串，也可以是一个回调函数
				写法： 字符串.replace(正则，新的字符串或者回调函数)   回调函数的第一个参数：就是匹配成功的字符，第二个参数开始就是正则的第一个子项，依次类推
	
	元字符：
		^ 开始
		$ 结束  /b$/ 以‘b’结束
		？0次或多次
		+ 1次或多次
		* 0次或多次
	
	转义字符：
		\n : 换行
		\r : 制表
		\t
		\s : 空格
		\S : 非空格
		\d : 数字
		\D : 非数字
		\w : 字符（字母，数字，下划线）
		\W : 非字符	
		\b : 独立的部分（起始，结束，空格）
		\B : 非独立的部分
		.  : (点),任意字符
		\. : 真正的点
		\1 : 重复的第一个子项
		\2 : 重复的第二个子项  /(a)(b)(c)\2/

	量词：匹配不确定的位置
		+ : 至少出现一次

	| : 或的意思

	匹配子项：
		小括号()   
		小括号()还有另外一个意思，就是分组操作
		把正则的整体叫做（母亲）
		然后把左边第一个小括号里面的正则，叫做这个第一个子项（母亲的第一个孩子）,第二个小括号就是第二个孩子

	正则表达式的字符类：
		字符类：一组相似的元素 []  
		[]中括号的整体代表一个字符,要想匹配多个字符，只需在[]后面加个量词+即可 -》[]+
		
		任意字符：[abc]  o[abc]d -> oad, obd
		排除：^  如果^写在[]里面的话，就代表排队的意思  -》[^abc]  除了abc以外的其它都符合
		范围：[a-z0-9A-Z] [a-z]   -> id[0-9]


	*/
//test()
var str = 'abcdef';
var re = /bc/;
console.log(re.test(str));  //true

var _value = $(this).val();
var _partten = /^\d+$/;
if (_partten.test(_value)) {
	$(this).val("");
}

//search
var str = 'abcdef';
var re = /c/;
console.log(re.search(str));  //2

//match
var str = '23faksdf;055asdfi132sdf09994';
var re  = /\d/ig;
console.log(str.match(re));

//replace
var str = 'aaa';
var re = 'a';
str = str.replace(re, 'b');
console.log(str);  //baa

//匹配子项
var str = '2015-02-10';
var re = /(\d+)(-)/g;
str.replace(re, function(str,$1,$2){
	//console.log(str);
	return $1 + '.';
})

//正则表达式的字符类：
var str = 'abc';
var re = /a[bde]c/;
console.log(re.test(str));  //true

//匹配HTML标签的正则：
var re = '/[^>]+>/g'; 
var re = '/[\w\W]+>/g'

//重复子项
var str = 'asd;flj2sdfasdfsdddddds;dfkas;dfsssssfpipwersdjfassss';
var arr = str.split('');
str = arr.sort().join('');

var value = '';
var index = 0;
var re = /(\w)\1+/g;
str.replace(re, function($0,$1){
	//console.log($0);
	if(index<$0.length){
		index = $0.length;
		value = $1;
	}
})
console.log('最多的字符：' + value + ',重复的次数：' + index);


/*
Function
	function fn1(){}   函数声明
	var fn2 = function(){}  函数表达式
	var fn3 = new Function('num1',"return num1")  Function 构造函数
	函数没有重载（后面同名的函数会覆盖前面的函数）
	在函数内部，有两个特殊对象：arguments和this  
		arguments的主要用途是保存函数参数，这个对象还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数，使用：arguments.callee  递归常用到此方法
		this引用的函数据以执行的环境对象
		函数的名字仅仅是一个包含指针的变量而已
	函数都包含两个属性：length和prototype
		length属性表示函数希望接收的命名参数的个数
		prototype是保存函数所有实例方法的真正所在。toString()和valueOf()等方法都保存在prototype名下，prototype是不可枚举的，因此使用for-in无法发现
	每个函数都包含两个非继承而来的方法： apply()和call()。用途是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。他们真正强大的地方是能够扩充函数懒以运行的作用域
		apply()接收两个参数，一个是其中运行函数的作用域，另一个是数组，可以是Ayyar实例，也可以是arguments对象
		call() 与apply()使用相同，只是第二个接收参数的方式不同，传递给函数的参数必须逐个列举出来
*/
function factorial(num){
   if(num <= 1){
      return 1;
   }else{
      return num * arguments.callee(num - 1)
   }
}

function sum(num1,num2){
	return num1 + num2;
}
function applyNum(num1, num2){
	return sum.apply(this, arguments)
}
function applyNum2(num1, num2){
	return sum.apply(this, [num1, num2])
}
function callNum(num1, num2){
	return sum.call(this, num1, num2);
}

/*
作用域与命名空间
	
	命名空间
		只有一个全局作用域导致的常见错误是命名冲突。在 JavaScript中，这可以通过 匿名包装器 轻松解决。
		(function(){
			window.foo = function(){}	
		})();
		匿名函数被认为是表达式；因此为了可调用性，它们首先会被执行
		有一些其他的调用函数表达式的方法，比如下面的两种方式语法不同，但是效果一模一样
		+function(){}();
		(function(){}())
		推荐使用匿名包装器（也就是 自执行的匿名函数 ）来创建命名空间。这样不仅可以防止命名冲突， 而且有利于程序的模块化。

 */

/*
基本包装类型
	Boolean   true false
	Number
		toFixed() 按照指定的小数位返回数值的字符串，如num.toFixed(2)  //10.00
		toExponential() 返回以指数表示法(e表示法）
	String
		继承valueOf(),toLocaleString(),toString()方法，返回对象所表示的基本字符串值
		String的每个实例都有一个length属性
		1、字符方法：	
			charAt() 返回给定位置的字符串
			charCodeAt() 返回给定位置字符串的字符编码
		2、字符串操作方法
			concat() 一般用+号代替  =》str.concat("world","!")
			三个基于子字符串创建新字符串的方法：slice(),substr(),substring() 这三个方法都会返回被操作字符串的一个子字符串，接受一个或者两个参数。第一个参数指定子字符串的开始位置，第二个参数（在指定的情况下）表示子字符串到哪里结束
			slice(),substring()的第二个参数指定的是子字符串最后一个字符后面的位置
			substr()的第二个参数指定的则返回的字符串个数
			如果传递的第二个参数为负数，情况就不同了:
				slice()方法会将传入的负值与字符串的长度相加
				substr()方法将负的第一个参数加上字符串的长度，而将负的第二个参数转换为0
				substring()方法会把所有负值参数都转换为0
		3、字符串位置的方法：	
			indexOf()   向前搜索
			lastIndexOf()  向后搜索
			这两个方法都从一个字符串中搜索给定的字符串，然后返回字符串的位置（如没找到，则返回-1）
		4、trim()方法，去除前后空格，IE9以上支持
		5、字符串大小写转换方法
			小写：toLowerCase()   toLocaleLowerCase()
			大写：toUpperCase()   toLocaleUpperCase()
		6、字符串的模式匹配方法
			match()方法返回一个数组，接收一个参数：正则表达式
			search()查找模式，返回字符串中第一个匹配项的索引，没找到则返回-1。接收一个参数：正则表达式。  str.search(/.at/)
			replace()替换字符串，接收两个参数：第一个参数为一个RegExp对象、正则表达式或者是一个字符串，第二个参数可以是一个字符串或者一个函数
			split()分割字符串为数组 将一个字符串分割成多个子字符串，并返回数组。分隔符可以是字符串，也可以是一个RegExp对象
					可接收第二个参数，用于指定数组的大小，以确保返回的数组不会超过既定大小
		7、localeCompare()方法，比较两个字符串
		8、formCharCode()方法，string构造函数的静态方法，接收一或多个字符编码，然后将他们转换在字符串
*/

//replace
/**	
 * [htmlEscape 转义4个字符:小于号，大于号，和号以及双引号]
 * @param  {[type]} text [传入一个带有HTML标签的字符串]
 * @return {[type]}      [description]
 */
function htmlEscape(text){
	return text.replace(/[<>"&]/g, function(match, pos, originalText)){
		switch(match){
			case "<":
				return "&lt;";
				break;
			case ">":
				return "&gt;";
				break;
			case "&":
				return "&amp";
				break;
			case "\"":
				return "&quot;";
		}
	}
}

/*
单体内置对象
	不必显式地实例化内置对象，因为他们已经被实例化过了。如Object,Array,String...
	还定义了两个单体内置对象：Global和Math
	Global对象中的一些方法：isNaN(),isFinite()，parseInt(),parseFloat(),还有如下那些：
	1、URL编码方法
		encodeURI()和encodeURIComponent() 这两个方法是对URL进行编码
			encodeURI()编码后的结果是除了空格之外的其它字符都原封不对
			encodeURIComponent()会对它发现的任何非标准字符进行编码
		decodeURI()和decodeURIComponent() 是对上面两个方法进行解码
	2、eval()方法
		最强大的一个方法:eval(),像一个完整的ECMAScript解析器
	3、Global对象
		特殊的值:undefined,NaN,Infinity,null都属于Global对象，所有原生引用类型的构造函数，像Object,Function...
	4、window对象
		js无法直接访问Global对象，但web浏览器都是将这个全局对象作为window对象的一部分加以实现的。在全局作用域中声明的所有变量和函数，就都成为window对象的属性
*/

var str = 'http://www.biadu.com/index.html?aaa=10';
encodeURIComponent(str);

/*
Math对象
	Math对象，数学公式
	min()和max()方法 用于确定一组数值中的最小值和最大值  //var min = Math.min(10,20,1,20)
	Math.PI  Math.E
	舍入方法：
		Math.ceil()  向上舍入（向上取整）   Math.ceil(25.9)  26
		Math.floor() 向下舍入（向下取整）
		Math.round() 四舍五入
	random()方法  随机数
*/

/*
BOM 浏览器对象模型
	BOM提供了很多对象，用于访问浏览器的功能
	一、window对象
		BOM的核心对象是window，它表示浏览器的一个实例
		1、全局作用域
			window对象扮演着global对象的角色，因此所有在全局作用域中声明的变量、函数都会变成window对象的属性和方法
		2、窗口关系及框架
			window.frames[0] 或者 window.frames['topFrame']
			top对象始终指向最高（最外）层的框架，也就是浏览器窗口。使用它可以确保在一个框架中正确地访问另一个框架 top.frames[0]  top.frames[1] ...
		3、窗口位置 
		   用于确认和修改window对象位置的属性和方法 screenLeft,screenTop分别表示窗口相对于屏幕左边和上边的位置 Firefox则是：screenX,screenY
		4、窗口大小
			innerWidth,innerHeight,outerWidth,outerHeight   IE9,FF,safari,Opera,chrome
			outerWidth,outerHeight   ie9,ff,safari

			innerWidth,innerHeight 容器中页面视图区的大小（减去边框宽度） opera中
			innerWidth,innerHeight,outerWidth,outerHeight  视口（viewport）大小而非浏览器窗口大小  在chrome中

			在IE8及早期其它版本：
			document.documentElement.clientWidth和document.documentElement.clientHeight 才能取得视口信息
			ie6:
			document.body.clientWidth和document.body.clientHeight
		5、导航和打开窗口
			window.open() 可以导航到一个特定的url,也可以打开一个新的浏览器窗口
				接收四个参数：要加载的URL，窗口目标，一个特性字符串及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值
					window.open('http://www.baidu.com','_blank','wroxWindow','height=400,widht=100,top=10,left=10')
		6、间歇调用和超时调用
			setTimeout() clearTimeout()  setInterval()   clearInterval()
		7、系统对话框
			alert()  confirm()  prompt()  
			window.print()  显示“打印”对话框
			window.fine()   显示“查找”对话框

	二、location对象 
		location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息。它是一个很特别的对象，因为它即是window对象的属性，也是document对象的属性
		window.location、document.location
			hash     返回URL中的hash(#号后面的内容)  如："#content"
			host     服务器名和端口号  			“http://www.baidu.com:80”
			hostanme 返回不带商品号和服务器名称   www.baidu.com
			href     返回当前加载页面的完整URL，跟toString()方法返回的值一样     http://www.baidu.com
			pathname 返回URL中的目录和文件名  	/abc/aaa/
			port     返回指定的端口号   		"8080"
			protocol 返回页面使用的协议，通常是http:或者https:
			search   返回URL的查询字符串，以问号开头  "?q=javascript"
		位置操作：
			location对象可以通过很多方式来改变浏览器的位置
			location.assign('http:/www.baidu.com')    assign()方法为其传递一个URL
			window.location = 'http://www.baidu.com'
			location.href = 'http://www.baidu.com'   这两个跟assign的效果是一样的，最常用的是location.href,以上方法都会有浏览器里生成一条新浏览记录
			要禁用浏览记录，可使用replace()方法，只传一个URL作为参数，会导致浏览器位置改变
			location.replace('http://www.baidu.com')
			reload() 重新加载当前页面
			location.reload()  //重新加载(可能从缓存中加载)
			location.reload(true)  //重新加载(从服务器加载)
	
	三、navigator对象
		navigator识别客户端浏览器的事实标准，里面有很多信息，可以以控制台中查看
		appName  完整的浏览器名称
		appVersion 浏览器的版本
		userAgent  浏览器的用户代理字符串
		appCodeName 浏览器的名称，通常是Mozilla
		plugins    浏览器中安装的插件信息的数组

	四、screen对象
		screen对象基本上只用来表明客户端的功能，其中包括浏览器窗口外部的显示器的信息，如像素宽度及高度等
		做移动端的时候可以会用到想着的知识，到时可以详细再看看
		screen.availWidth, screen.availHeight
		显示器的分辨率
		screen.width   screen.height

	五、history对象
		history对象保存着用户上网的历史记录，从窗口被打开的那一刻起。history是window对象的属性
		go()方法可以在用户的历史记录中任意跳转，可以向后也可以向前。接收一个参数，跳转页面的一个整数值。负数表示向后跳转
		history.go(-1)  后退一页
		history.go(1)   前进一页
		history.go(2)	前进两页
		也可以传一个字符串参数，即一个URL
		history.go("www.baidu.com")
		还有两个简写的方法：
		history.back() 后退一页
		history.forward() 前进一页

		history对象还有一个length属性，保存着历史记录的数量

 */	
//窗口大小
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
if(typeof pageWidth != 'number'){
	if(document.compatMode == 'css1Compat'){
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	}else{
		pageWidth = document.body.clientWidth;
		pageHeight = document.body.clientHeight;
	}
}


var num = 0;
var max = 10;
var intervalID = null;
function incrementNumber(){
	num ++;
	//执行次数达到了max设定的值，会清除定时器的调用
	if(num == max){
		clearInterval(intervalID)  
		console.log('a');
	}
}
intervalId = setInterval(incrementNumber, 1000)












