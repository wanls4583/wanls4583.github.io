---
author: wanls4583
comments: true
date: 2017-07-09 05:42:36+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/07/09/javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e6%a1%a5%e6%a8%a1%e5%bc%8f/
slug: javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e6%a1%a5%e6%a8%a1%e5%bc%8f
title: Javascript设计模式(桥模式)
wordpress_id: 297
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>桥接模式（Bridge）将抽象部分与它的实现部分分离，使它们都可以独立地变化。这里的抽象部分与实现部分不一定是抽象类与实现类的关系，不必拘泥其实现形式。利用桥接模式可以分离业务逻辑单元。

## 桥接实例
### 事件监听回调机制
```
<!DOCTYPE html>
<html>
<head>
<title>工厂模式</title>
</head>
<body>
<input type="button" name="" id="input1" value="123">
</body>
<script type="text/javascript">
var inp = document.getElementById('input1');
inp.addEventListener('click',function(){
	alert(this.value);
	/*$.ajax('GET','url?value='+this.value,function(){
		console.log('Requested Beer: ' + resp.responseText);}
	)*/
	//其他的业务
})
</script>
</html>
```
可以看到，这里的前台事件绑定和后台请求业务逻辑是紧密结合的，我们如果想单独测试请求业务逻辑则必须点击按钮才能测试，又或者加入之后需要更改后台请求业务逻辑，则必须在回调函数里更改。这种前后台业务逻辑绑定在一起业务划分不够清晰，是不利于后期维护的。

*使用桥接模式*
```javascript
//1.前台业务逻辑
var inp = document.getElementById('input1');
inp.addEventListener('click',brige)
//使用桥模式桥接前后台业务逻辑
function brige(){
	alert(this.value);
	getInfoByValue(this.value)
}
//后台业务逻辑
function getInfoByValue(value){
	/*$.ajax('GET','url?value='+value,function(){
		console.log('Requested Info: ' + resp.responseText);}
	)*/
}
```
利用桥模式很好的将事件回调函数（属于前台业务逻辑）抽象出来，具体的后台业务交给另一个单元去实现，抽象部分代码和实现部分代码可以独立的更改其内部逻辑，又结合在一起。

### 特权函数
特权函数是桥模式的一种实现，它将对外接口抽象出来，使其和内部具体实现分离。
```javascript
function PublicClass(){
	var privateMethod = function(){
		alert('这里处理了很复杂的业务逻辑');
	}
	this.brigeMethod = function(){
		alert('调用了内部函数');
		return privateMethod();
	}
}
new PublicClass().brigeMethod();
```

### 用桥把多个单体组织在一起
假如有两个处理单元，它们之间是没有业务联系的，现在有个新业务需要同时用到这两个处理单元，这是可以使用桥模式将它们组合起来。
```javascript
var Class1 = function(a,b){
	this.a = a;
	this.b = b;
	//处理加法运算业务
	this.run = function(){
		return (a+b);
	}
}
var Class2 = function(c,d){
	this.c = c;
	this.d = d;
	//处理乘法运算业务
	this.run = function(){
		return (c*d);
	}
}
var brigeMethod = function(a,b,c,d){
	return new Class1(a,b).run()+new Class2(c,d).run();
}
alert(brigeMethod(1,2,3,4));
```

