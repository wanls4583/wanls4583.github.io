---
author: wanls4583
comments: true
date: 2017-06-27 08:36:15+00:00
layout: post
title: javascript笔记--（第六章）流程控制语句
wordpress_id: 125
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---
## 语句的定义

在ECMAScript中，所有的代码都是由语句来构成的。语句表明执行过程中的流程、限定与约定，形式上可以是单行语句，或者由一对大括号“｛｝”括起来的复合语句，在语法描述中，复合语句整体可以作为一个单行语句处理。

### switch语句

ECMAScript 和 Java 中的 switch 语句有两点不同。在 ECMAScript 中，switch 语句可以用于字符串，而且能用不是常量的值说明情况：

```
<script type="text/javascript">
	var BLUE = "blue", RED = "red", GREEN  = "green";
	var sColor = "red";
	switch (sColor) {
	  case BLUE: alert("Blue");
	    break;
	  case RED: alert("Red");
	    break;
	  case GREEN: alert("Green");
	    break;
	  default: alert("Other");
	}
</script>
```

### for...in语句

```
<script type="text/javascript">
	var box = {	
		'name' : '李炎恢',  //键值对，左边是属性名，右边是值
		'age' : 28,
		'height' : 178
	};
	for (var p in box) {	//列举出对象的所有属性
		console.log(p);
	}
</script>
```

### with语句

```
<script type="text/javascript">
	var box = {
		'name' : '李松',
		'age' : 26,
	};
	with (box) {		//省略了box对象名
		var n = name;
		var a = age;
	}
	console.log(n);
	console.log(a);
</script>
```


