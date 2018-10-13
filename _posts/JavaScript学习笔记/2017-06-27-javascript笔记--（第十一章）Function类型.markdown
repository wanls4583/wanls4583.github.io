---
author: wanls4583
comments: true
date: 2017-06-27 09:37:03+00:00
layout: post
title: javascript笔记--（第十一章）Function类型
wordpress_id: 141
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---
## Function
在ECMAScript中，Function(函数)实际上是对象。每个函数都是Function类型的实例，而且都与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向函数对象的指针。

### 函数的声明
```
<script type="text/javascript">
	function box(num1, num2) {
		return num1+ num2;
	}
	var box= function(num1, num2) {
		return num1 + num2;
	};
	var box= new Function('num1', 'num2' ,'return num1 + num2');//更加具体的说明了函数是对象,会导致解析两次代码,尽量少用
</script>
```
### 函数内部属性
在函数内部，有两个特殊的对象：arguments和this。arguments是一个类数组对象，包含着传入函数中的所有参数，主要用途是保存函数参数。但这个对象还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。
```javascript
function box(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * arguments.callee(num-1);//使用callee来执行自身,防止如果box函数名称改变时，需要改变内部递归函数的民称
	}
}
```
函数内部另一个特殊对象是this，其行为与Java和C#中的this大致相似。换句话说，this引用的是函数据以执行操作的对象。PS：当在全局作用域中调用函数时，this对象引用的就是window。
```
<script type="text/javascript">
	var name = "person";
	var man = {
		name:"lisong",
		sayName:function(){
			console.log(this.name);
		}
	};
	man.sayName();//lisong
</script>
```
### 函数属性和方法
ECMAScript中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性：length和prototype。其中，length属性表示函数希望接收的命名参数的个数。
```
<script type="text/javascript">
	function box(name, age) {
		alert(name + age);
	}
	console.log(box.length);//2
</script>
```
prototype是原型对象，其下有两个方法：apply()和call()。这两个方法的用途都在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。
```
<script type="text/javascript">
	var name = "person";
	function sayName1(age,addr) {
		console.log(name+":"+age+":"+addr);
	}
	sayName1(26,"耒阳");//person:26:耒阳
	var box={
		name:"lisong",
		sayName2:function(age,addr){
			sayName1.apply(this,[age,addr]);
		}
	}
	box.sayName2(26,"耒阳");//person:26:耒阳

	function sayName3(age,addr) {
		console.log(this.name+":"+age+":"+addr);//this
	}
	sayName3(26,"耒阳");//person:26:耒阳
	var box={
		name:"lisong",
		sayName4:function(age,addr){
			sayName3.apply(this,[age,addr]);
		}
	}
	box.sayName4(26,"耒阳");//lisong:26:耒阳

	var box={
		name:"lisong",
		sayName5:function(age,addr){
			sayName3.call(this,age,addr);//call与apply唯一的不同即传递参数的方式不同，apply传递的是数组
		}
	}
	box.sayName5(26,"耒阳");//lisong:26:耒阳
</script>
```

