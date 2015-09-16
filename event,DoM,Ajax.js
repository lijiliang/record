/**
 * EVENT机制
 * 事件模型分为两种：冒泡型事件，捕获型事件
 * 冒泡型事件：指事件按照从最精确的对象到最不精确的对象的顺序逐一触发
 * 捕获型事件：它与冒泡型事件相反，指事件按照从最不精确的对象到最精确的对象的顺序逐一触发
 *
 * 参考网址：http://www.dang-jian.com/labs/#/javascriptclass/4
 * 
 */
// 1. 异步事件:异步回调 http://jsbin.com/Olanede/1/edit
window.onload = loaded;
function loaded() {
    document.getElementById('body').style.border = '1px solid #F00';
}
// 2. 事件阶段，事件流 : http://jsbin.com/OqigigA/1/edit

// 3. 事件绑定：事件绑定主要使用三种
   // 3.1 Dom绑定：只能绑定一次。只支持订阅冒泡阶段事件。
   <a onclick="handle(event)" href="#">link</a>

   // 3.2 IE(IE8-)绑定：同一元素支持多次绑定。事件处理函数内部this关键字引用了window对象。事件名前必须加on。
   document.attachEvent("onload", function () {
       alert("i am load");
   });

   // 3.3 W3C标准绑定：支持冒泡与捕获阶段。 在处理函数内部，this关键字引用当前元素。 可以为同一元素的同一时间绑定多个处理函数，不会覆盖。
   document.getElementById("linkA").addEventListener('click', function (e) {
       alert('i am clicked!');
   }, false);

   // 4. 事件解除
   // 4.1 W3C标准解除：
   removeEventListener(evtype,fn,useCapture);
   // 4.2 IE解除
   detachEvent("on"+evtype,fn);

   // 跨浏览器兼容方案
	function addEvent(obj,evtype,fn,useCapture) {
		if (obj.addEventListener) {
			obj.addEventListener(evtype,fn,useCapture);
		} else {
			obj.attachEvent("on"+evtype,fn);//IE不支持事件捕获
		} else {
			obj["on"+evtype]=fn;//事实上这种情况不会存在
		}
	}
	function delEvent(obj,evtype,fn,useCapture) {
		if (obj.removeEventListener) {
			obj.removeEventListener(evtype,fn,useCapture);
		} else {
			obj.detachEvent("on"+evtype,fn);
		} else {
			obj["on"+evtype]=null;
		}
	}

   // 使用attachEvent时在事件处理函数内部，this指向了window，而不是obj
   function addEvent(obj,evtype,fn,useCapture) {
		if (obj.addEventListener) {
			obj.addEventListener(evtype,fn,useCapture);
		} else {
			obj.attachEvent("on"+evtype,function () {
				fn.call(obj);
			});
		} else {
			obj["on"+evtype]=fn;//事实上这种情况不会存在
		}
	}

   // 同一个函数可以被注册到同一个对象同一个事件上多次，解决方法：抛弃IE的 attachEvent方法
   // http://dean.edwards.name/my/events.js
   
   //5.取消事件冒泡
    function stopBubble(e){
	   	if(e && e.stopPropagation){
	   		e.stopPropagation();   //因为传入了事件对象e,并且支持W3C标准的stopPropagation()
	   	}else{
	   		window.event.cancelBubble = true;  //for IE
	   	}
    }

    //6.重载浏览器默认行为
    function stopDetault(e){
    	if(e && e.preventDefault){
    		e.preventDefault();
    	}else{
    		window.event.returnValue = false;
    	}
    	return false;
    }








