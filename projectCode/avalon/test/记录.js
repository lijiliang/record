/*
ms-controller指令（或叫绑定属性）
数据，特指是ViewModel，avalon是通过define方法定义，目的是实现“操作数据即操作DOM”
视图中的绑定属性与{{}}插值表达式抽取出来，转换为求值函数与视图刷新函数
avalon.scan()  扫描
视图模型，ViewModel，也经常被略写成VM，是通过avalon.define方法进行定义。生成的对象会默认放到avalon.vmodels对象上。 每个VM在定义时必须指定$id。如果你有某些属性不想监听，可以直接将此属性名放到$skipArray数组中

绑定：
	avalon的绑定（或指令），拥有以下三种类型
		{{}} 插值表达式
		ms-*绑定属性
		作用域绑定：ms-controlle, ms-important (ms-important就相当于CSS的important语句，强制这个区域使用此ViewModel，不再往上查找同名属性或方法)
        ms-skip 注明这块区域不应用任何viewModel属性，它里面的任何指令（绑定属性）都会失效。包括{{}} 插值表达式

avalon 扫描顺序
	ms-skip -> ms-important -> ms-controller -> ms-if -> ms-repeat -> ms-if-loop -> .. -> ms-each -> ms-duplex


数据填充：
	插值表达式{{prop}}
		{{}}是对某一个文本节点的nodeValue进行修改，不会影响兄弟节点。它不能替换特性节点里的名字，特性节点的名字必须以ms-开头
	插值表达式{{prop|html}}
		{{prop|html}}其实是一个过滤器，也只有文本节点中的插值表达式可以加各种过滤器实现各种功能。html过滤器就是将此字符串转换html节点再插入当前位置
	绑定属性ms-text
		ms-text是文本绑定属性，会清空原元素的内部再进行内部填充。ms-text其实就是{{prop}}的真身。
	绑定属性ms-html
		ms-html是文本绑定属性
	绑定属性ms-value
		通过ms-value指令，数据能通过表单元素的value值显示出来。ms-value为了应对复杂的显示，也支持插值表达式，但里面不能使用过滤器。
	
	过滤器
		avalon从angular中抄来管道符风格的过滤器，但有点不一样。 它只能用于表示数据填空的ms-text, ms-html, {{prop}}, {{prop}}。如果不存在参数， 要求直接跟|filter，如果存在参传，则要用小括号括起，参数要有逗号，这与一般的函数调用差不多，如|truncate(20,"……")
		用法{{w1|html}}


双向绑定与显示隐藏处理
	双工绑定(ms-duplex)  只对表单元素有效
		ms-duplex="prop"   
			当元素为text,password,textarea时，要求prop为一个字符串，当我们改动它的内容时，avalon就会将此元素的value值赋给prop

			当元素为radio时，要求prop为一个布尔，当我们改动它的内容时，avalon就会将此元素的checked值（布尔）赋给prop

			当元素为checkbox时，要求prop为一个数组，当我们改动它的内容是，avalon就会将此元素的value值push进prop

			当元素为select时，要求prop为一个字符串或数组（视multiple的值），当我们选中这经找零 珍上项时，avalon就会将此option元素的value值或text值（没有value时）push进prop
		
		ms-duplex-text="prop"   ms-duplex-boolean
		ms-data-duplex-observe="false" 禁止双向同步

	显示隐藏处理（ms-visible）
		它的效果类拟于jQuery的toggle， 如果它后面跟着的表达式为真值时则显示它所在的元素，为假值时则隐藏。

ms-duplex 2.0	 
	ms-duplex-* 功能 
	ms-deplex-string/ms-duplex : 应用于所有表单元素，通过value属性同步VM
	ms-deplex-number: 应用于表单元素，如果vlaue是数字格式就转换为数值，否则不做转换，然后再同步VM
	ms-duplex-boolean: 应用于所有表单元素，value为“true”时转为true,其它值转为false同步VM
	ms-duplex-checked:只能应用于radio,checkbox，通过checked属性同步VM
	ms-data-duplex-observe: 可以暂停数据的同步
	data-duplex-changed: 当监听的值发生变化时触发一个回调
	data-duplex-focus:设置焦点，让光标位于value的最后
	data-duplex-event: 为元素绑定事件，支付blur,keyup

插入移除处理
	绑定属性 ms-if
		ms-if与ms-each,ms-with,ms-repeat归类为流程绑定，如果表达式为真值那么就将当前元素输出页面，不是就将它移离原位置

数据缓存
	绑定属性ms-data-*
		avalon的数据缓存功能与jquery的data()类似，但不同于jquery的是：avalon是直接将数据保存到元素节点上的data-*属性上
		在从data-*属性还原数据是，它会作简单的数据转换，再返回
		在ms-data绑定属性中，对象与数据是直接保存在元素节点上

属性操作
	dom操作之属性操作
		类名操作   ms-class
		表单value属性操作   ms-duplex
		元素固有属性处理	ms-attr ms-href ms-src
		元素自定义属性管理 	同上
		元素布尔属性的操作	同上

		字符串属性绑定ms-attr-id  ms-attr-name  ms-attr-title  ms-src  ms-href  ms-attr-data-url  用法：ms-attr-id="{{id}}"

类名操作
	绑定属性ms-class
		ms-class="active"   默认写法，为元素添加active样式 
		ms-class="active:isOk"  isOk值为true，添加active，否则删除active
		ms-class="width{{w}}:isOk" 类名中可以使用插值表达式
		ms-class="red:1+1"   根据计算结果决定添加或删除red
		ms-class="aaa bbb ccc"  添加多个样式
		ms-class-1="aaa" ms-class-2="bbb"  添加多个样式，根据ms-class-后的数值的大小，决定决定顺序
		ms-class-2="bbb" ms-class="aaa" ms-class-1="ccc"  添加多个样式，结果aaa ccc bbb

	类名操作
		绑定属性 ms-active ms-hover
		ms-active,ms-hover分别是用来模拟：:active, :hover效果，用法与ms-class一样
		ms-active只在点击的那一瞬间有效果
		ms-hover只在掠过时有效果，失去焦点或离开目标元素就会移除刚才添加的类名

验证插件
	添加一个拦截器
	avalon.duplexHooks.limit = {
		get: function(str, data){
			var limit = parseFloat(data.element,getAttribute("data-duplex-limit"));
			if(str.length > limit){
				
			}
		}
	}

样式操作
	类名操作ms-class
	内联样式操作ms-css   (注意：属性值不能加入CSShask与important!)
		ms-css-样式名 = “样式值”
		ms-css-width="prop"(会自动补px)
		ms-css-height="{{prop}}%"
		ms-css-color="prop"
		ms-css-background-color="prop"
		ms-css-font-size="{{prop}}px"

事件绑定
	事件绑定属性 
		ms-on-eventName
		ms-eventName
			animationend blur change input click dbclick focus keydown keypress keyup mousedown mouseenter mouseleave mouseout mouseover mouseup scan scroll submit

	事件绑定属性的值 
		函数名fn
		函数名fn(arg1,arg2,...) 默认第一个参数为事件对象，如果第一个位置被占了，我们可以在其它位置使用$event引用事件对象。

	多投事件机制
		形式一   ms-click=fn   ms-click-1=fn2  ms-click-2-fn3
		形式二	ms-on-click=fn  ms-on-click-1=fn1 ms-on-click-1=fn2

绑定属性
	遍历数组：ms-repeat  ms-each 

	遍历对象：ms-repeat  ms-with 
	<ul>
		<li ms-repeat="data">{{$key}} - {{$val}}</li>
	</ul>
	<ul ms-with="data">
		<li>{{$key}} - {{$val}}</li>
	</ul>
	
	数据的更新 
		对象数据的更新
		数组数据的更新
	
	回调绑定属性
		data-repeat-rendered 
			当前操作名("add","del","move","append","clear")   
			用ms-repeat绑定，当监管数组发生添加、删除、重排等操作时触发 
		data-with-sorted  
			原对象所有的键名构成的数组   
			用ms-repeat,ms-with绑定，赶在对象渲？之前触发，要求输出一个字符串数组，对象的键值对会根据它依次输出
		data-with-rendered 
			当前操作名（”append“） 
			用ms-with绑定，当目标对象输出页面后触发
		data-each-rendered 
			当前操作名（"add","del","move"） 
			用ms-each绑定，当监管数组发生添加、删除、重排等操作时触发

	数据长度与循环分支判断
		获得数组的长度  size方法
		循环分支判断： ms-if-loop
			当我们在循环显示数组，要根据元素的情况做一些分支判定时，使用ms-if-loop绑定属性，不能使用ms-if,因为ms-if是先于ms-repeat执行的

模板类型
	嵌入到页面的模板  ms-include="expr"
	独立成子页面的模板  ms-include-src="expr"

	模板操作回调与缓存 
		模板操作回调属性  data-includel-loaded  data-includel-rendered
		 				data-includel-repleac
		Avalon模板缓存对象  avalon.templateCache

属性监听与模块通信
	$watch
		监听当前的VM第一层的监控属性与计算属性
		多个属性的监听可以共用一个$watch回调
		通过监听$all这个特殊的属性名来得知所有属性的变动状况
		如果某属性是一个对象，想监控其子孙属性，就需要定位到此对象上使用$watch回调
		对于数组，我们只能监听数组长度的变化，不能监听其内部是否发生变化
			以$开头的属性与$skipArray的内容是不能监控得到
	$unwatch
		如果传入两个参数，第一个为属性名，第二个为回调，那么就会移除此监听函数
		如果只传入此属性名，则移除此属性的所有监听函数
		如果什么也不传，那么就会中断此ViewModel的属性监听功能，所有$watch回调都不会触发，想恢复也很简单，调用$watch方法，也是什么也不传
	$file
		可以打破不能触发非监控属性的回调的藩蓠，但要注意死循环，需要自己比较新旧值是否真的发生改变才触发

	跨模块通信
		通过在$file的第一个参数一些前缀，就能触发其它模块的属性回调
		前缀：“up!”,"down!","all!"
		上与下是根据当前ViewMode所在ms-controller元素在Dom树位置决定的：up!xx,向上冒泡；down!xxx，向下捕获；all!xxx,全局广播
 */

/*
mvvm三层结构

v:view
vm:viewModel
m:Model

ms-controller,ms-important,ms-include,ms-text,ms-html,ms-class,ms-scan,ms-hover,ms-active,ms-on,ms-visible,ms-if,ms-if-loop,ms-duplex,ms-css,ms-data,ms-checked,ms-selected,ms-readonly,ms-disabled,ms-enabled,ms-title,ms-src,ms-href,ms-attr,ms-repeat,ms-each,ms-with,ms-widget,ms-click,ms-dblclick,ms-mousedown,ms-mouseup,ms-mouseover,ms-mousemove,ms-mouseout,ms-keypress,ms-keydown,ms-keyup,ms-mouseenter,ms-mouseleave,ms-blur,ms-focus,ms-change,ms-hover,ms-css-${1:pname},ms-attr-${1:pname},ms-repeat-${1:data}Item,ms-each-${1:data}Item,ms-on-${1:event}
accordion,at,browser,checkboxlist,colorpicker,cookie,coupledatepicker,datepicker,daterangepicker,dialog,doublelist,draggable=,dropdown,flipswitch,live,miniswitch,notice,pager,position,preview,progressbar,promise,resizable=,scrollbar,scrollspy=,simplegrid,slider,spinner,store,switchdropdown,tab,textbox,tooltip
data-include-rendered,data-include-loaded,data-with-sorted,data-duplex-changed,data-duplex-event,data-event,data-repeat-rendered,data-each-rendered,data-with-rendered

 */

function saveDocument(id){
	var tasks = [openDocument, writeText, closeDocument, updateUI];
	setTimeout(function(){
		var task = tasks.shift();
		task(id)
		if(task.length > 0){
			setTimeout(arguments.callee, 25)
		}
	}, 25)
}