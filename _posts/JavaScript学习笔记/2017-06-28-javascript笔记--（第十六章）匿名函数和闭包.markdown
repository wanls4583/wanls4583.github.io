---
author: wanls4583
comments: true
date: 2017-06-28 07:53:30+00:00
layout: post
title: javascript笔记--（第十六章）匿名函数和闭包
wordpress_id: 176
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 匿名函数
```html
<script type="text/javascript">  
    //function(){}//会报错
    var fun = function(){};//将匿名函数赋值给变量

    var a = function(arg){console.log(arg)}('test');//声明的时候执行

    (function(){})();//匿名函数自执行
    
    function(){
    	return function(){};//函数里的匿名函数
    }
</script>
```
## 闭包
闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包的常见的方式，就是在一个函数内部创建另一个函数，通过另一个函数访问这个函数的局部变量
```html
<script type="text/javascript">
	//通过闭包可以返回局部变量
	function box() {
		var user = 'Lee';
		return function () {		//通过匿名函数返回box()局部变量
			return user;
		};
	}
	console.log(box()());			//通过box()()来直接调用匿名函数返回值
	var b = box();
	console.log(b());			//另一种调用匿名函数返回值

        //通过闭包可以实现局部变量的累加
	function box() {
		var age = 100;
		return function () {
			age ++;
			return age;
		}
	}
	var b = box();				//获得函数
	console.log(b());			//调用匿名函数
	console.log(b());			//第二次调用匿名函数，实现累加
</script>  
```
使用闭包有一个优点，也是它的缺点：就是可以把局部变量驻留在内存中，可以避免使用全局变量。(全局变量污染导致应用程序不可预测性，每个模块都可调用必将引来灾难，所以推荐使用私有的，封装的局部变量)。由于闭包里作用域返回的局部变量资源不会被立刻销毁回收，所以可能会占用更多的内存。过度使用闭包会导致性能下降，建议在非常有必要的时候才使用闭包。

### 循环里的闭包
```html
<script type="text/javascript">
	function box() {
		var arr = [];

		for (var i = 0; i < 5; i++) {
			arr[i] = function () {
				return i;
			};
		}
		return arr;
	}

	var b = box();							//得到函数数组
	console.log(b.length);						//得到函数集合长度
	for (var i = 0; i < b.length; i++) {
		console.log(b[i]());					//输出每个函数的值，都是最后一个值
	}
</script> 
```
box()已执行完毕，i早已变成5，而返回的函数保存的变量都是i，所以最终的结果就是5个5

### 循环里的闭包--修改
```html
<script type="text/javascript">
	function box() {
		var arr = [];

		for (var i = 0; i < 5; i++) {
			arr[i] = (function (num) {
				return function () {//返回函数
					return num;
				}
			})(i);
			/*
			//相当于:
			arr[i] = (function () {
				var num = i;//定义一个局部变量
				return function () {
					return num;	
				}
			})();
			*/
		}
		return arr;
	}

	var b = box();			//得到函数数组
	for (var i = 0; i < b.length; i++) {
		console.log(b[i]());					//0,1,2,3,4
	}
</script>
```
通过在box作用域里新建块级作用域来是每个返回函数保存的变量都不一样

### 闭包中的this对象
闭包在运行时指向window的，因为闭包并不属于这个对象的属性或方法。
```html
<script type="text/javascript">
	var user = 'The Window';

	var obj = {
		user : 'The Object',
		getUserFunction : function () {
			return function () {		//闭包不属于obj，里面的this指向window
				return this.user;
			};
		}
	};
	console.log(obj.getUserFunction()());		//The window
	//可以强制指向某个对象
	console.log(obj.getUserFunction().call(obj));	//The Object
	/*
	//也可以从上一个作用域中得到对象
	getUserFunction : function () {
		var that = this;			//从对象的方法里得对象
		return function () {
			return that.user;
		};
	}
	*/
</script>  
```
## 模仿块级作用域
JavaScript没有块级语句的作用域，if () {} for () {}等没有作用域
```html
<script type="text/javascript">
	//使用块级作用域(私有作用域)改写
	function box(count) {
		(function () {
			for (var i = 0; i<count; i++) {}
		})();
		console.log(i);	//报错，无法访问
	}
	box(2);
</script>  
```
使用了块级作用域(私有作用域)后，匿名函数中定义的任何变量，都会在执行结束时被销毁。在全局作用域中使用块级作用域可以减少闭包占用的内存问题，因为没有指向匿名函数的引用。只要函数执行完毕，就可以立即销毁其作用域链了。

## 私有变量
JavaScript没有私有属性的概念；所有的对象属性都是公有的。不过，却有一个私有变量的概念。任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量

而通过函数内部创建一个闭包，那么闭包通过自己的作用域链也可以访问这些变量。而利用这一点，可以创建用于访问私有变量的公有方法。
```html
<script type="text/javascript">
	function Box() {
		var age = 100;						//私有变量
		function run() {					//私有函数
			return '运行中...';
		}
		this.get = function () {				//对外公共的特权方法,闭包（函数访问了不属于对象作用域的age和run方法）
			return age + run();
		};
	}

	var box = new Box();
	console.log(box.get());
</script>
```

### 静态私有变量
上面的私有变量在每次实例化对象的时候都会重新初始化，通过块级作用域(私有作用域)中定义私有变量或函数，同样可以创建对外公共的特权方法。
```html
<script type="text/javascript">
	(function () {
		var age = 100;//静态私有变量
		function run() {
			return '运行中...';
		}
		Box = function () {};				//构造方法，没有使用var，全局函数
		Box.prototype.go = function () {		//原型方法
			return age + run();
		};
	})();

	var box = new Box();
	console.log(box.go());
</script>  
```
## 模块模式
```html
<script type="text/javascript">
	var box = function () {				//box是一个模块
		var age = 100;
		function run() {
			return '运行中...';
		}
		return {				//直接返回对象
			go : function () {
				return age + run();
			}
		};
	}();
</script>  
```
