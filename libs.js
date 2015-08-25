
/*
*  安全检测JS基本数据类型和内置对象
*  参数： o表示检测的值
*  返回值： 返回字符串 "undefined","number","boolean","string","function","regexp","array","date","error","object或null"
 */
function typeOf(o){
	var _toString = Object.prototype.toString;
	//获取对象的toString()方法引用
	//列举基本数据类型和内因对象类型，可以进一步补充该数组的检测数据类型范围
	var _type = {
		"undefined" : "undefined",
		"number" : "number",
		"boolean" : "boolean",
		"string" : "string",
		"[object Function]" : "function",
		"[object RegExp]" : "regexp",
		"[object Array]" : "array",
		"[object Date]" : "date",
		"[object Error]" : "error"
	}
	return _type[typeof o] || _type[_toString.call(o)] || (o ? "object" : "null");
};

/**
 * [isNumber 检测是否为数字]
 * @param  {[type]}  value [表示检测的值]
 * @return {Boolean}     [false,true]
 */
function isNumber(value){
	return typeof value === 'number' && isFinite(value);   /* isFinites可以检测NaN,正负无穷大*/
} ;

/*  一般程序需要处理任务： 合并、分解、重新排列、搜索、遍历、以及其它方法处理字符串*/

/**
 * [isArray 检测是否为数组]
 * @param  {[type]}  arr [表示检测的值]
 * @return {Boolean}     [false,true]
 */
function isArray(value){
	//return value && typeof value === 'object' && value.constructor === Array;
	return Object.prototype.toString.apply(value) === '[object Array]';
};

/**
 * [fibonacci description]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function fibonacci(num){
	return (function(num){
		if(typeof num !== "number")
			return -1;
		num = parseInt(num);
		if(num < 1)
			return -1;
		if(num ==1 || num ==2)
			return 1;
		return arguments.callee(num - 1) + arguments.callee(num -2);
	})(num)
}
//fibonacci(100);

/**
 * [avg  计算任意多个参数的平均值]
 * @return {[type]} [返回平均值]
 */
function avg(){
	var num = 0, l =0;
	for(var i=0; i<arguments.length; i++){
		if(typeof arguments[i] != 'number')
			continue;
		num += arguments[i];
		l ++;
	}
	num /= l;
	return num;
}
//avg(1,2,3)  

/**
 * [isEmail 验证是否为邮箱地址]
 * @return {Boolean} [false,true]
 */
function isEmail(){
	if(arguments.length>1) throw new Error('只能够传递一个参数');
	var regexp = /^\w+((-\w)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if(arguments[0].search(regexp) != -1){
		return true;
	}else{
		return false;
	}
}

/* arguments.callee 获取对当前匿名函数的引用 */
/* call 和 apply 方法能够更改对象的内部指针 */

/*
Person.prototype.constructor === Person  true
p.__proto__ === Person.prototype   true
instanceof 关键词的作用也可以从上图中看出，实际上就是判断 __proto__ （以及 __proto__.__proto__ …）所指向是否父类的原型

我们已经反复提到执行上下文和作用域实际上是通过function创建、分割的，而function中的this与作用域链不同，它是由执行该function时当前所处的Object环境所决定的，这也是this最容易被混淆用错的一点。

有时候为了避免闭包中的this在执行时被替换，可以采取下面的方法：
var _self = this;

判断一个属性是不是在原对象上，而不是原型链(prototype)上的 : obj.hasOwnProperty('z')  //false
 */

/* 几种函数调用的模式 */

/**
 * [objFn1 方法调用模式]
 * @type {Object}
 * 当一个方法被调用时，this被绑定到该对象
 */
var objFn1 = {
	value : 0,
	increment : function(inc){
		this.value = typeof inc === 'number' ? inc : 1;
	}
}
/*
objFn1.increment();
alert(object.value);    //1
objFn1.increment(2)
alert(object.value);    //2
*/

/**
 * [objFn2 函数调用模式]
 * @type {Object}
 * 当函数以此模式调用时，this被绑定到全局对象。解决方法是定义一个变量that并将它赋值为this，那么内部函数就可以通过这个变量访问this
 */
var objFn2 = {
	value : 1,
	doub : function(){
		var that = this;
		var helper = function(){
			that.value = that.value * 2;
		}
		helper();
	}
}

/*
objFn2.doub()
alert(objFn2.value)  //2
*/

/**
 * [F 构造器调用模式]
 * @param {[type]} string [description]
 * 一个函数前面加上new运算符来进行调用，那么将创建一个隐藏链接到该函数的prototype原型对象的新实例对象，同时this将会绑定到这个新实例对象上
 */
var F = function(string){
	return this.status = string;
};
F.prototype.get = function(){
	return this.status;
};
var f = new F("new object");
//alert(f.get(''))    //new object


/**
 * [objFn3 apply调用模式]
 * @return {[type]} [description]
 * apply是函数的一个基本方法，使用这个方法可以调用函数，并修改函数体内的this值
 * apply有两个参数：第一个参数设置绑定给this的值，第二个参数是包含函数参数的数组
 */
var objFn3 = function(){
	var i, sum = 0;
	for(i=0; i<arguments.length; i+=1){
		sum += arguments[i];
	}
	return sum;
}

/*
var array = [5,4];
var sum = objFn3.apply({}, array);
alert(sum)
*/

/*
闭包：闭包是指词法表示包括不必计算的变量的函数，闭包函数能够使用函数外定义的变量
闭包有两个比较鲜明的特性：封闭性，持久性
 */

//this   arguments  作用域    不同调用方式    不同创建方法

/*
高阶函数: 高阶函数是对函数的进一步抽象，至少满足下列条件之一：
   接受函数作为输入
   输出一个函数
*/

/**
 * [loadScript 动态加载js]
 * @param  {[type]}   url      [js链接]
 * @param  {Function} callback [回调函数]
 */
function loadScript(url, callback) {
    setTimeout(function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (callback) {
                        callback()
                    }
                }
            }
        } else {
            script.onload = function () {
                if (callback) {
                    callback()
                }
            }
        }
    },
    0)
};

/**
 * [异步加载第三方内容]
 * 当你无法保证嵌入第三方内容比如 Youtube 视频或者一个 like/tweet 按钮可以正常工作的时候，你需要考虑用异步加载这些代码，避免阻塞整个页面加载
 * @return {[type]} [description]
 */
(function() {
    var script,
        scripts = document.getElementsByTagName('script')[0];

    function load(url) {
      script = document.createElement('script');
      script.async = true;
      script.src = url;
      scripts.parentNode.insertBefore(script, scripts);
    }

    load('//apis.google.com/js/plusone.js');
    load('//platform.twitter.com/widgets.js');
    load('//s.widgetsite.com/widget.js');

}());

/**
* [loadImage 判断图片加载完毕]
* @param  {[type]}   url      [图片地址]
* @param  {Function} callback [回调函数]
*/
function loadImage(url, callback){
	var img = new Image();
	img.src = url;
	if(img.complete){  //如果图片存在浏览器缓存，则调用回调函数
		callback.call(img);
		return;
	}
	img.onload = function(){  //图片下载完毕时调用callback函数
		callback.call(img);
	};
}

/**
 *[urlparse url解析]
 * @param  {string} url [传入一个URL参数]
 * @return {[object]}     [query,params]
 * @URL http://m.shenba.com/product_list.html?special_id=313&t=20150626#adv
 * var locationUrl = parseURL(url);
 * locationUrl 返回一个对象集合
 * 如：
 * locationUrl.query  = '?special_id=313&t=20150626'
 * locationUrl.params = Object {special_id: "313", t: "20150626"}
 */
function urlParse(url){
	var anchor = document.createElement('a'); 
    anchor.href = url; 
    return { 
        source: url, 
        protocol: anchor.protocol.replace(':',''), 
        host: anchor.hostname, 
        port: anchor.port, 
        query: anchor.search, 
        params: (function(){ 
            var ret = {}, 
            seg = anchor.search.replace(/^\?/,'').split('&'), 
            len = seg.length, i = 0, str; 
            for (;i<len;i++) { 
                if (!seg[i]) { continue; } 
                str = seg[i].split('='); 
                ret[str[0]] = str[1]; 
            } 
            return ret; 
        })(), 
        file: (anchor.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1], 
        hash: anchor.hash.replace('#',''), 
        path: anchor.pathname.replace(/^([^\/])/,'/$1'), 
        relative: (anchor.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1], 
        segments: anchor.pathname.replace(/^\//,'').split('/') 
    }; 
}

/**
 * [strIntercept 截取字符串 包含中文处理]
 * @param  {string}  str    [字符串]
 * @param  {Number}  len    [长度值]
 * @param  {Boolean} hasDot [true,false]
 * @return {String}         [返回截取后的字符串]
 */
function strIntercept(str, len, hasDot){
	var newLength = 0，
		newStr = ""，
		chineseRegex = /[^\x00-\xff]/g，
		singleChar = ""，
		strLength = str.replace(chineseRegex,"**").length;  
    for(var i = 0;i < strLength;i++) {
        singleChar = str.charAt(i).toString();  
        if(singleChar.match(chineseRegex) != null) newLength += 2;
        else newLength++;

        if(newLength > len) break;
        newStr += singleChar;  
    }
    if(hasDot && strLength > len) newStr += "...";
    return newStr; 
}







