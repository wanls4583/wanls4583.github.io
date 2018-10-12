---
author: wanls4583
comments: true
date: 2018-10-12 15:45
layout: post
title: 前端性能优化之-setImmediate,setTimeout,process.nextTick的区别
tags:
- 前端优化
---

setImmediate 和 process.nextTick 是 nodejs 中的 api,标准浏览器里是没有这两个函数，不过 ie10+ 浏览器实现了非标准的 setImmediate，其主要用来在事件循环结束后，尽快的执行其回调（延时<=2ms）。在前端开发中，应避免使用 setImmediate。

为了实现异步执行代码，js 引擎使用了观察者来检测相应的队列是否有待执行的任务。setTimeout 采用的是类似IO观察者，setImmediate 采用的是 check 观察者，而 process.nextTick 采用的是 idle 观察者。每个事件循环都会执行一遍检测操作。这三个观察者的优先级为：**idle > IO > check**。

process.nextTick 属于 micro-task ,优先级甚至比 promise 更高。setTimeout 和 setImmediate 属于 macro-task。

在具体实现上，process.nextTick 的回调函数保存在一个数组中，setImmediate 的回调函数保存在普通链表中，setTimeout 的回调则保存在一颗红黑树中。

在行为上，process.nextTick 在每轮循环中会将数组中的回调函数全部执行完，而 setImmediate 和 setTieout  在每轮循环中执行链表中的一个回调函数。

**注意：以下的测试均在 Miscrosoft Edg 上运行**

测试1：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
<script type="text/javascript">
	setImmediate(function(){
		console.log('setImmediate');
	});

	setTimeout(function(){
		console.log('setTimeout');
	},6);
</script>
</body>
</html>
```
之所以 setTimeout 先运行，是因为脚步执行完后，页面需要进行首次渲染（渲染事件的优先级大于 macro-task），渲染完成后，事件循环会检测队列，由于 IO 观察者优先级高于 check观察者，所以先检测到 setTimeout 的回调（渲染花费的时间要大于6ms）。

![](http://wanls4583.github.io/images/posts/前端优化/setImmediate-1.png)

测试2：

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
<script type="text/javascript">
	setTimeout(function(){
		setImmediate(function(){
			console.log('setImmediate');
		});

		setTimeout(function(){
			console.log('setTimeout');
		},0);
	},100);
</script>
</body>
</html>
```
事件循环结束后检查队列，由于 setTimout(0) 的计时器到期时间（>=4ms）大于 setImmediate 的计时器到期时间（<=2ms），所以 setImmediate 的回调将被先检测到。

![](http://wanls4583.github.io/images/posts/前端优化/setImmediate-2.png)

测试3：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
<script type="text/javascript">
	setTimeout(function(){
		setTimeout(function(){
			console.log('setTimeout');
		},0)
		var t = Date.now();
		while(Date.now() - t<100){

		}
		setImmediate(function(){
			console.log('setImmediate');
		})
	},100);
</script>
</body>
</html>
```
由于耗时操作，事件循环结束后，setImmediate 和 setTimeout 的计时器都已过期，由于 IO 观察者优先级较高，setTimeout 回调将被先检测到。

![](http://wanls4583.github.io/images/posts/前端优化/setImmediate-3.png)
