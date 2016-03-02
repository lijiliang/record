<script src="https://static.jsbin.com/js/vendor/traceur.js"></script>
<script type="text/traceur">
    let a = 10;
	console.log(a)
</script>
/*
Let命令  用来声明变量，但是所声明的变量，只在let命令所在的代码块有作用

	1、局部变量
	2、不存在变量提升
		let不像val那样，会发生”变量提升“现象
	3、暂时性死区
		只要块级作用域内存在let命令，它所声明的变量就”绑定“(binding)这个区域，不再受外部的影响
	4、不允许重复声明
		let不允许相同作用域内，重复声明同一个变量
*/
var a = 100;
let a = 200;

/*
块级作用域
	ES6允许块级作用域的任意嵌套
 */
{{{{{let insane = 'Hello World'}}}}};

// 块级作用域写法
{
  let tmp = ...;
  ...
}

/*
变量的解构赋值
	
 */
