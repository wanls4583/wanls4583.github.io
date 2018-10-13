---
author: wanls4583
comments: true
date: 2017-06-28 09:26:59+00:00
layout: post
title: javascript笔记--（第二十章）DOM元素尺寸和位置
wordpress_id: 192
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 获取元素CSS大小

### 通过style内联获取元素的大小
style获取只能获取到行内style属性的CSS样式中的宽和高，如果行内样式有宽高则获取；如果没有则返回空。
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="box" style="width:100px;"></div>
</body>
<script type="text/javascript">
	var box = document.getElementById('box');
	console.log(box.style.width);//200px
	console.log(box.style.height);//??
</script>
</html>
```
### 通过计算获取元素的大小
通过计算获取元素的大小，无关你是否是行内、内联或者链接，它经过计算后得到的结果返回出来。如果本身设置大小，它会返回元素的大小，如果本身没有设置，非IE浏览器会返回默认的大小，IE浏览器返回auto。
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		#box{
			height:200px;
		}
	</style>
</head>
<body>
	<div id="box" style="width:100px;"></div>
</body>
<script type="text/javascript">
	var box = document.getElementById("box");
	var style = window.getComputedStyle ? 
		window.getComputedStyle(box, null) : null || box.currentStyle;
	console.log(style.width);//100px
	console.log(style.height);//200px
</script>
</html>
```
### 通过css规则获取元素大小
cssRules(或rules)只能获取到内联和链接样式的宽和高，不能获取到行内和计算后的样式
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		#box{
			height:200px;
		}
	</style>
</head>
<body>
	<div id="box" style="width:100px;"></div>
</body>
<script type="text/javascript">
	var sheet = document.styleSheets[0];//获取link或style
	var rule = (sheet.cssRules || sheet.rules)[0];//获取第一条规则
	console.log(rule.style.width);//空
	console.log(rule.style.height);//200px
</script>
</html>
```
总结：以上的三种CSS获取元素大小的方法，只能获取元素的CSS大小，却无法获取元素本身实际的大小。比如加上了内边距、滚动条、边框之类的。

## 获取元素实际大小

### clientWidth和clientHeight
是对象的可见宽和高，不包括滚动条等边线，会随窗口的显示大小改变。返回元素大小，但没有单位，默认单位是px，如果你强行设置了单位，比如100em之类，它还是会返回px的大小
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="box" style="width:100px;padding:10px;border:5px"></div>
</body>
<script type="text/javascript">
	var box = document.getElementById("box");
	console.log(box.clientWidth);//120
	console.log(box.clientHeight);//20
</script>
</html>
```
如果说没有设置任何CSS的宽和高度，那么非IE浏览器会算上滚动条和内边距的计算后的大小，而IE浏览器则返回0

### scrollWidth和scrollHeight
是对象的实际内容的宽和高，不包边线宽度，会随对象中内容的多少改变
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="box" style="border:5px solid red;box-sizing:border-box;width:100px;overflow-y: auto">
		test test test test test test test test test 
	</div>
</body>
<script type="text/javascript">
	var box = document.getElementById("box");
	console.log(box.scrollWidth);//90
	console.log(box.scrollHeight);//90
</script>
</html>
```
如果没有设置任何CSS的宽和高度，它会得到计算后的宽度和高度。

### offsetWidth和offsetHeight
是对象的可见宽和高，包滚动条等边线，会随窗口的显示大小改变。
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="box" style="width:100px;padding:10px;border:5px solid red;">aa</div>
</body>
<script type="text/javascript">
	var box = document.getElementById("box");
	console.log(box.offsetWidth);//130
	console.log(box.offsetHeight);//48
</script>
</html>
```
如果没有设置任何CSS的宽和高度，他会得到计算后的宽度和高度

## 获取元素周边大小

### clientLeft和clientTop
这组属性可以获取元素设置了左边框和上边框的大小
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin:0">
	<div id="box" style="width:100px;padding:10px;border:5px solid red;border-top-width:10px">aa</div>
</body>
<script type="text/javascript">
	var box = document.getElementById("box");
	console.log(box.clientLeft);//5
	console.log(box.clientTop);//10
</script>
</html>
```
### offsetLeft和offsetTop
这组属性可以获取当前元素相对于父元素的位置
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin:0;padding: 8px 16px;position: relative;">
	<div id="box" style="width:100px;padding:10px;border:5px solid red;border-top-width:10px">aa</div>
	<div id="box1" style="position: absolute;left:40px;top: 30px"></div>
</body>
<script type="text/javascript">
	var box = document.getElementById("box");
	console.log(box.offsetLeft);//16
	console.log(box.offsetTop);//8

	var box1 = document.getElementById("box1");
	console.log(box1.offsetLeft);//40
	console.log(box1.offsetTop);//30
</script>
</html>
```
获取元素当前相对于父元素的位置，最好将它设置为定位position:absolute；否则不同的浏览器会有不同的解释

### scrollTop和scrollLeft
这组属性可以获取滚动条被隐藏的区域大小（即元素中的内容超出元素上边界或者左边界的那部分），也可设置定位到该区域。

## 元素位置
getBoundingClientRect()。这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin:0;padding: 8px 16px;position: relative;">
	<div id="box" style="width:100px;padding:10px;border:5px solid red;border-top-width:10px">aa</div>
	<div id="box1" style="position: absolute;left:40px;top: 30px;width:50px"></div>
</body>
<script type="text/javascript">
	var box = document.getElementById('box');//获取元素
	console.log(box.getBoundingClientRect().top);//8，元素上边距离页面上边的距离
	console.log(box.getBoundingClientRect().right);//146，元素右边距离页面左边的距离
	console.log(box.getBoundingClientRect().bottom);//61，元素下边距离页面上边的距离
	console.log(box.getBoundingClientRect().left);//16，元素左边距离页面左边的距离

	var box1 = document.getElementById('box1');
	console.log(box1.getBoundingClientRect().top);//30
	console.log(box1.getBoundingClientRect().right);//90
	console.log(box1.getBoundingClientRect().bottom);//30
	console.log(box1.getBoundingClientRect().left);//40
</script>
</html>
```
注意：IE、Firefox3+、Opera9.5、Chrome、Safari支持，在IE中，默认坐标从(2,2)开始计算，导致最终距离比其他浏览器多出两个像素
