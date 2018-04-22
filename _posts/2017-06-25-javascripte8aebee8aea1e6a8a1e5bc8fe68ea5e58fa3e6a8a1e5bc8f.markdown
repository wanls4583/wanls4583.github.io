---
author: wanls4583
comments: true
date: 2017-06-25 06:19:51+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/25/javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e6%8e%a5%e5%8f%a3%e6%a8%a1%e5%bc%8f/
slug: javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e6%8e%a5%e5%8f%a3%e6%a8%a1%e5%bc%8f
title: JavaScript设计模式(接口模式)
wordpress_id: 14
tags:
- JavaScript设计模式

categories:
- JavaScript设计模式

---

>Interface是强类型面向对象语言中固有的特性，简单来说就是一个规范和契约，可以用来实现对象与对象之间的解耦。但是JavaScript里本身是没有这一特性的，不过可以利用JavaScript的灵活性模拟接口。

JavaScript模拟接口的方式一共有三种：

1. 文档注释方式
2. 属性检查方式
3. 鸭式辩型法

## 文档注释方式

文档注释方式是最简单的一种方式，只是用注释来说明类应该实现哪些方法。

```javascript
/**
* interface Composite {
* function add(obj);
* function remove(obj);
* function uopdate(obj);
* }
*/

// CompositeImpl implements Composite
var CompositeImpl = function(){

};

CompositeImpl.prototype.add = function(obj){
// do something ...
}
CompositeImpl.prototype.remove = function(obj){
// do something ...
}
CompositeImpl.prototype.update = function(obj){
// do something ...
}
```

## 属性检测法

这种方法较注释法更加严谨一些，可以检测对象是否显示的实现了接口。

```javascript
function checkImpl(obj){
	for(var i=1; i < arguments.length; i++){
		var inter = arguments[i];
		var flag = false;
		for(var j=0; j<obj.implementtInterfaces.length; j++){
			if(obj.implementtInterfaces[j]==inter){
				flag = true;
				break;
			}
		}
		if(!flag)
			return false;
	}
	return true;
}
var ImpObject = function(){
	this.implementtInterfaces = ['Interface1'];
}
console.log(checkImpl(new ImpObject(),'Interface1','Interface2'));
```

## 鸭式辩型法

该方式是最常用也是最经典的一种方式，实现了完全面向对象，可以检测是否实现了接口的方法。

```javascript
var Interface = function(name,methods){
	this.name = name;
	this.methods = methods
}
Interface.checkImplement = function(obj,inter){
	for(var i=0; i<inter.methods.length; i++){
		var method = inter.methods[i]
		if(!obj[method] || typeof obj[method] != 'function')
			return false;
	}
	return true;
}

var interface1 = new Interface('Interface1',['add','remove']);
var interface2 = new Interface('Interface2',['add','remove','update']);

var ImpInterface1 = function(){
	this.add = function(){};
	this.remove = function(){};
}

var obj = new ImpInterface1();
console.log(Interface.checkImplement(obj,interface1));
console.log(Interface.checkImplement(obj,interface2));
```
