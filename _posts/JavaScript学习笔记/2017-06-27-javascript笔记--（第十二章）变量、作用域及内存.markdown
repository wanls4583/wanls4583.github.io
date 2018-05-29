---
author: wanls4583
comments: true
date: 2017-06-27 09:50:14+00:00
layout: post
title: javascript笔记--（第十二章）变量、作用域及内存
wordpress_id: 144
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 基本类型和引用类型的存储

<img src="http://img.blog.csdn.net/20170203165640241?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

## 复制变量值

基本类型和引用类型的变量复制是不一样的

### 基本类型的变量复制：
```
<script type="text/javascript">
	var box = 'Lee';		//在栈内存生成一个box 'Lee'
	var box2 = box;			//在栈内存再生成一个box2 'Lee'
</script>
```
<img src="http://img.blog.csdn.net/20170203170320886?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

### 引用类型的变量复制：
```
<script type="text/javascript">
	var box = new Object();			//创建一个引用类型
	box.name = 'Lee';				//新增一个属性
	var box2 = box;					//把引用地址赋值给box2
</script>
```
<img src="http://img.blog.csdn.net/20170203170424371?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

## 检测类型
虽然typeof运算符在检查基本数据类型的时候非常好用，但检测引用类型的时候，它就不是那么好用了。通常，我们并不想知道它是不是对象，而是想知道它到底是什么类型的对象。因为数组也是object，null也是Object等等。这时我们可以采用instanceof运算符来查看。
```
<script type="text/javascript">
	var box = [1,2,3];
	console.log(box instanceof Array);		//true
	console.log(box instanceof Object);		//true
	var box2 = {};
	console.log(box2 instanceof Object);		//true
	var box3 = /g/;
	console.log(box3 instanceof RegExp);		//true
	var box4 = new String('Lee');
	console.log(box4 instanceof String);		//true

	var a = "lisong";
	console.log(a instanceof String);		//false
</script>
```
当使用instanceof检查基本类型的值时，它会返回false

## 执行环境及作用域

全局执行环境是最外围的执行环境。在Web浏览器中，全局执行环境被认为是window对象。因此所有的全局变量和函数都是作为window对象的属性和方法创建的。

当执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁。如果是全局环境下，需要程序执行完毕，或者网页被关闭才会销毁。

每个执行环境都有一个与之关联的变量对象，就好比全局的window可以调用变量和属性一样。局部的环境也有一个类似window 的变量对象，环境中定义的所有变量和函数都保存在这个对象中。(我们无法访问这个变量对象，但解析器会处理数据时后台使用它)
```
<script type="text/javascript">
	var box = 'blue';
	function setBox() {
		function setColor() {
			var b = 'orange';
			alert(box);
			alert(b);
		}
		setColor();			//setColor()的执行环境在setBox()内
	}
	setBox();
</script>
```
每个函数被调用时都会创建自己的执行环境。当执行到这个函数时，函数的环境就会被推到环境栈中去执行，而执行后又在环境栈中弹出(退出)，把控制权交给上一级的执行环境。

var关键字在函数里的区别：
```javascript
function box(num1, num2) {
	var sum = num1 + num2;	//如果去掉var就是全局变量了
	return sum;
}
alert(box(10,10));
alert(sum);			//报错
```
变量查询中，访问局部变量要比全局变量更快，因为不需要向上搜索作用域链，先搜索到的优先级高。

块级作用域表示诸如if语句等有花括号封闭的代码块。但是在js中是没有块级作用域的，即使for语句也不存在块级作用域。

## 内存问题
JavaScript具有自动垃圾收集机制，也就是说，执行环境会负责管理代码执行过程中使用的内存。其他语言比如C和C++，必须手工跟踪内存使用情况，适时的释放，否则会造成很多问题。而JavaScript则不需要这样，它会自行管理内存分配及无用内存的回收。

JavaScript最常用的垃圾收集方式是标记清除。垃圾收集器会在运行的时候给存储在内存中的变量加上标记。然后，它会去掉环境中正在使用变量的标记，而没有被去掉标记的变量将被视为准备删除的变量。最后，垃圾收集器完成内存清理工作，销毁那些带标记的值并回收他们所占用的内存空间。

垃圾收集器是周期性运行的，这样会导致整个程序的性能问题。比如IE7以前的版本，它的垃圾收集器是根据内存分配量运行的，比如256个变量就开始运行垃圾收集器，这样，就不得不频繁地运行，从而降低的性能。

一般来说，确保占用最少的内存可以让页面获得更好的性能。那么优化内存的最佳方案，就是一旦数据不再有用，那么将其设置为null来释放引用，这个做法叫做解除引用。这一做法适用于大多数全局变量和全局对象。

