---
author: wanls4583
comments: true
date: 2017-06-28 09:40:55+00:00
layout: post
title: javascript笔记--（第二十一章）动态加载脚本和样式
wordpress_id: 194
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 动态脚本

### 动态加载js
```
<script type="text/javascript">
	var flag = true;//设置true再加载
	if (flag) {
		loadScript('test.js');//设置加载的js
	}

	function loadScript(url) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		//document.head.appendChild(script);//document.head表示<head>
	        document.getElementsByTagName('head')[0].appendChild(script);
	}
</script>
```
### 动态执行js
```
<script type="text/javascript">
	var script = document.createElement('script');
	script.type = 'text/javascript';
	var text = document.createTextNode("alert('Lee')");
	//script.appendChild(text);//IE浏览器会报错,兼容用下面的语句
	script.text = "alert('hehe')"
	document.getElementsByTagName('head')[0].appendChild(script);
</script>
```
## 动态样式
样式表有两种方式进行加载，一种是&lt;link&gt;标签，一种是&lt;style&gt;标签。

### 动态加载link
```
<script type="text/javascript">
	var flag = true;
	if (flag) {
		loadStyles('basic.css');
	}
	function loadStyles(url) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		document.getElementsByTagName('head')[0].appendChild(link);
	}
</script>
```
### 动态执行style
```
<script type="text/javascript">
	var flag = true;
	if (flag) {
		var style = document.createElement('style');
		style.type = 'text/css';
		//var box= document.createTextNode('#box{background:red}'); IE不支持
		//style.appendChild(box);
		document.getElementsByTagName('head')[0].appendChild(style);
		insertRule(document.styleSheets[0], 'body', 'background:red', 0);
	}

	function insertRule(sheet, selectorText, cssText, position) {
		//如果是非IE
		if (sheet.insertRule) {
			sheet.insertRule(selectorText + "{" + cssText + "}", position);
		//如果是IE
		} else if (sheet.addRule) {
			sheet.addRule(selectorText, cssText, position);
		}
	}
</script>
```


