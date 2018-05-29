---
author: wanls4583
comments: true
date: 2017-06-29 06:46:21+00:00
layout: post
title: requirejs与seajs的比较
wordpress_id: 206
categories:
- 模块化

tags:
- 模块化

---

相信大家都知道seaJs与requireJs这两个框架的作用，它们都是用来帮助前端程序员进行模块化开发的的框架，在讲seaJs与requireJs之前，我们先来说一下为什么我们的项目需要模块化。

如果项目比较小，我们是不需要用到模块化的，但是一旦项目大起来，你会发现代码越来越难以进行维护，这些问题主要包括命名冲突和js依赖问题，下面举例来说明这些问题。

*（1）命名冲突*

A程序员开发的代码：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="B.js"></script>
	<script type="text/javascript">
		function tab(){};
	</script>
</head>
<body>
	
</body>
</html>
```
B程序员开发的代码：B.js
```javascript
function tab(){};
```
本来A程序员是想引用B程序员所开发的功能tab()，结果因为自己不重命名了tab()，导致引入的功能不能用了，这就是命名冲突

*（2）js依赖问题*
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="B.js"></script>
	<script type="text/javascript" src="C.js"></script>
</head>
<body>
</body>
</html>
```
其中C.js依赖B.js的功能，要使用C.js，js必须先加载B.js，假如我们以及开发了很多页面，这些页面中都使用了C.js，突然有一天，来了新需求，C.js升级了功能，不在需要B.js里的功能，这时我们就需要把每个页面中的B.js移除掉，这种工作效率是及其低效的。

好了，出现了问题，自然就会有解决的方法出现，seaJs和requireJs框架主要就是用来解决这两个问题的。

### seaJs示例1
sea1.html：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="sea-debug.js"></script>
	<script type="text/javascript">
		seajs.use("main.js",function(){
			console.log("执行入口模块回调函数");
		})
	</script>
</head>
<body>
</body>
</html>
```
main.js：
```javascript
define(function(require,exports,module){
	console.log("执行main.js");
});
```
测试结果:
<img src="http://img.blog.csdn.net/20170120225212082?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

### requireJs示例1
req1.html：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="require2.1.11.js" data-main="main"></script>
</head>
<body>
</body>
</html>
```
main.js：
```javascript
define(function(require,exports,module){
	console.log("执行main.js");
});
```
测试结果：
<img src="http://img.blog.csdn.net/20170120225840413?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

<font style='background:#eee'>总结1：seaJs加载入口模块是通过sea.use()函数来加载的，requireJs是通过data-main属性来加载的</font>

### seaJs示例2
sea2.html：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="sea-debug.js"></script>
	<script type="text/javascript">
		seajs.use("main.js",function(){
			console.log("执行入口模块回调函数");
		})
	</script>
</head>
<body>
</body>
</html>
```
main.js：
```javascript
define(function(require,exports,module){//require参数固定，seaJs会扫描回调函数的require字符串，预加载模块
	console.log("执行main.js");
	require("test.js");//同步执行
	console.log("main.js执行结束");
});
```
test.js：
```javascript
define(function(require,exports,module){
	console.log("执行test.js");
})
```
测试结果:
<img src="http://img.blog.csdn.net/20170120232110314?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

如果定义模块时一定要把require参数改变，则需要使用异步加载require.async()：

main.js：
```javascript
define(function(require1,exports,module){
	console.log("执行main.js");
	//require1("test.js");//不会加载
	require1.async("test.js",function(){//异步加载模块
		console.log("test.js回调函数");
	})
	console.log("main.js执行结束");
});
```
测试结果：
<img src="http://img.blog.csdn.net/20170120232805380?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

此时，require加载为异步的，test.js在main.js执行完之后才执行。

如果定义模块时声明了依赖，如：
main.js:
```javascript
define("",["a.js"],function(require,exports,module){//不会再扫描require字符串进行预加载
	console.log("执行main.js");
	require("a.js");
	require("test.js");//不加载
});
```
a.js：
```javascript
define(function(require,exports,module){
	console.log("执行a.js");
})
```
测试结果：
<img src="http://img.blog.csdn.net/20170120233747904?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

此时，不会在扫描回调函数中的require字符串来加载模块

### requireJs示例2
req2.html：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="require2.1.11.js" data-main="main"></script>
</head>
<body>
</body>
</html>
```
main.js：
```javascript
define(function(require,exports,module){//原理和seaJs一样，也是扫描require字符串加载模块，只不过在加载完后会立即执行该模块的回调函数
	console.log("执行main.js");
	require("test.js");//同步执行
	console.log("main.js执行完成");
});
```
a.js：
```javascript
define(function(require,exports,module){
	console.log("执行test.js");
})
```
测试结果：
<img src="http://img.blog.csdn.net/20170121004758979?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

如果定义模块时一定要把require参数改变，则需要使用异步加载require([],function(){})：
```javascript
define(function(require1,exports,module){//不会再扫描require字符串进行预加载
	console.log("执行main.js");
	//require1("test.js");//会报错
	require1(["test.js"],function(){
		console.log("加载完test.js");
	});
	console.log("main.js执行完成");
});
```
测试结果：
<img src="http://img.blog.csdn.net/20170121010133438?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

如果定义模块时声明了函数依赖，如：
main.js：
```javascript
define("",["test.js"],function(test){//不会再扫描require字符串进行预加载
	require("test.js");//重复加载将忽略
	//require("a.js");//报错
	console.log("执行main.js");
});
```
测试结果：
<img src="http://img.blog.csdn.net/20170121010625263?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

此时不可以在回调函数里用require再加载未声明的模块，因为没有进行require字符串扫描进行预加载

<font style='background:#eee'>总结2：seaJs和requireJs对模块的加载原理基本一样，只是seaJs遵循CMD规范，加载完模块后并不会立即执行，而是等待执行require函数时候才执行模块的回调函数，而requireJs遵循AMD规范，加载完模块后会立即执行模块的回调函数。</font>

