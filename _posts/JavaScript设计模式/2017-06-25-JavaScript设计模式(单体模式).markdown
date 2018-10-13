---
author: wanls4583
comments: true
date: 2017-06-25 07:12:22+00:00
layout: post
title: JavaScript设计模式(单体模式)
wordpress_id: 24
tags:
- JavaScript设计模式

categories:
- JavaScript设计模式
---

>所谓的单体模式即单例模式，单体模式是我们最常用到的一种模式。单体模式范围四种：简单单体，闭包单体，惰性单体，分支单体。

## 简单单体

简单单体即对象字面量，在使用中对象字面量只实例化一次。

```javascript
var obj = {
	property:'属性',
	method: function(){}
}
```

## 闭包单体

闭包单体拥有私有作用域，只返回对外接口。

```javascript
var obj = (function(){
	var sum = 0;
	function add(){
		sum++;
	}
	function get(){
		return sum;
	}
	return {
		addSum: add,
		getSum: get
	}
})()
obj.addSum();
console.log(obj.getSum());
```

## 惰性单体

惰性单体和闭包单体有点类似，不过只在要使用时才实例化。

```javascript
var obj = (function(){
	var result = null;
	function init(){
		var sum = 0;
		function add(){
			sum++;
		}
		function get(){
			return sum;
		}
		return {
			addSum: add,
			getSum: get
		}
	}
	return{
		getInstance: function(){
			if(!result)
				result = init();
			return result;
		}
	}
})()

var result = obj.getInstance();
result.addSum();
console.log(result.getSum());
```

## 分支单体

分支单体可以根据条件返回单体对象，可用于浏览器检测，根据不同的浏览器返回不同的对象，来实现浏览器兼容。

```javascript
var obj = (function(){
	var obj1 = {
		run : function(){
			return '您使用的是火狐';
		}
		//statement
	}
	var obj2 = {
		run : function(){
			return '您使用的不是火狐';
		}
		//statement
	}
    if (navigator.userAgent.indexOf("Firefox") > -1) {
        return obj1;
    }else{
    	return obj2;
    }
})()
console.log(obj.run());
```






