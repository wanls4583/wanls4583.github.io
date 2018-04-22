---
author: wanls4583
comments: true
date: 2017-06-27 08:37:32+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/27/javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e4%b8%83%e7%ab%a0%ef%bc%89%e5%87%bd%e6%95%b0/
slug: javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e4%b8%83%e7%ab%a0%ef%bc%89%e5%87%bd%e6%95%b0
title: javascript笔记--（第七章）函数
wordpress_id: 127
tags:
- JavaScript学习笔记

categories:
- JavaScript学习笔记

---
## 函数

函数是定义一次但却可以调用或执行任意多次的一段JS代码

## arguments对象

ECMAScript函数不介意传递进来多少参数，也不会因为参数不统一而错误。实际上，函数体内可以通过arguments对象来接收传递进来的参数。

```
<script type="text/javascript">
	function box() {
		var sum = 0;
		if (arguments.length == 0) return sum;		//如果没有参数，退出
		for(var i = 0;i < arguments.length; i++) {	//如果有，就累加
			sum = sum + arguments[i];
		}
		return sum;					//返回累加结果
	}
	console.log(box(5,9,12));
</script>
```

ECMAScript中的函数，没有像其他高级语言那种函数重载功能，在js中后面定义的同名函数会覆盖前面定义的函数
