---
author: wanls4583
comments: true
date: 2017-06-27 10:26:31+00:00
layout: post
title: javascript笔记--（第十四章）内置对象
wordpress_id: 148
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 内置对象
ECMA-262对内置对象的定义是：“由ECMAScript实现提供的、不依赖宿主环境的对象，这些对象在ECMAScript程序执行之前就已经存在了。”意思就是说，开发人员不必显示地实例化内置对象；因为它们已经实例化了。ECMA-262只定义了两个内置对象：Global和Math。

### Global
Global(全局)对象是ECMAScript中一个特别的对象，因为这个对象是不存在的。在ECMAScript中不属于任何其他对象的属性和方法，都属于它的属性和方法。所以，事实上，并不存在全局变量和全局函数；所有在全局作用域定义的变量和函数，都是Global对象的属性和方法。Web浏览器将Global作为window对象的一部分加以实现。

### URI编码方法
```
<script type="text/javascript">
	var  str = "http://www.baidu.com/李";
	var en1 = encodeURI(str);
	console.log(en1);//http://www.baidu.com/%E6%9D%8E
	console.log(decodeURI(en1));//http://www.baidu.com/李

	var en2 = encodeURIComponent(str);
	console.log(en2);//http%3A%2F%2Fwww.baidu.com%2F%E6%9D%8E
	console.log(decodeURIComponent(en2));//http://www.baidu.com/李

	var en3 = escape(str);
	console.log(en3);//http%3A//www.baidu.com/%u674E
	console.log(unescape(en3));//http://www.baidu.com/李
</script>
```
注意：
URI方法如上所述的四种，用于代替已经被ECMA-262第3版废弃的escape()和unescape()方法。URI方法能够编码所有的Unicode字符，而原来的只能正确地编码ASCII字符。所以建议不要再使用escape()和unescape()方法；

escape、unescape函数采用ISO Latin字符集对指定字符串进行编码。所有的空格符、标点符号、特殊字符以及其他非ASCII字符都将被转化成%xx格式的字符编码（xx等于该字符在字符集表里面的编码的16进制数字）；

encodeURI、decodeURI将指定字符串采用UTF-8编码格式转化成escape格式的字符串（或把escape格式的字符串转化为UTF-8编码）。不会被此方法编码的字符有：! @ # $& * ( ) = : / ; ? + '；

encodeURIComponent函数把URI字符串采用UTF-8编码格式转化成escape格式的字符串。与encodeURI()相比，这个方法将对更多的字符进行编码；

encodeURIComponent()主要用来编码url某个部件，列入参数中含有#等特殊符号。encodeURI()主要用来对整个url编码，列入参数含有中文。

### eval()方法
```
<script type="text/javascript">
	eval("var name='lisong'");
	console.log(name);//lisong
	eval('function test() {return 123}');
	console.log(test());//123
</script>
```
### Global对象属性
Global对象包含了一些属性：undefined、NaN、Object、Array、Function等等。

### Math对象
min()和max()方法
```
<script type="text/javascript">
	console.log(Math.min(5,3,4,2,1));//1
	console.log(Math.max(5,3,4,2,1));//5
</script>
```
*舍入方法*

- Math.ceil()：执行向上舍入，即它总是将数值向上舍入为最接近的整数
- Math.floor()：执行向下舍入，即它总是将数值向下舍入为最接近的整数
- Math.round()：执行标准舍入，即它总是将数值四舍五入为最接近的整数

```
<script type="text/javascript">
	console.log(Math.ceil(5.1));//6
	console.log(Math.ceil(-5.9));//-5
	console.log(Math.floor(5.9));//5
	console.log(Math.floor(-5.1));//-6
	console.log(Math.round(5.9));//6
	console.log(Math.round(-5.4));//-5
	console.log(Math.round(-5.6));//-6
</script>
```
*其他常用方法*

- random()：返回介于0到1之间一个随机数，不包括0和1。
- Math.abs(num) ：返回num的绝对值
- Math.pow(num,power) ：返回num的power次幂
- Math.sqrt(num) ：返回num的平方根


