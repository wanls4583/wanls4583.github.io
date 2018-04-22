---
author: wanls4583
comments: true
date: 2017-06-26 09:33:49+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/26/javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e4%b8%89%e7%ab%a0%ef%bc%89javascript%e8%af%ad%e6%b3%95%ef%bc%8c%e5%85%b3%e9%94%ae%e5%ad%97%ef%bc%8c%e4%bf%9d%e7%95%99%e5%ad%97/
slug: javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e4%b8%89%e7%ab%a0%ef%bc%89javascript%e8%af%ad%e6%b3%95%ef%bc%8c%e5%85%b3%e9%94%ae%e5%ad%97%ef%bc%8c%e4%bf%9d%e7%95%99%e5%ad%97
title: javascript笔记--（第三章）javascript语法，关键字，保留字
wordpress_id: 57
tags:
- JavaScript学习笔记

categories:
- JavaScript学习笔记

---

## 语法构成

### 区分大小写

ECMAScript中的一切，包括变量、函数名和操作符都是区分大小写的。例如：text和Text表示两种不同的变量。

### 标识符

所谓标识符，就是指变量、函数、属性的名字，或者函数的参数。标识符可以是下列格式规则组合起来的一或多个字符：

1. 第一字符必须是一个字母、下划线(_)或一个美元符号($)
2. 其他字符可以是字母、下划线、美元符号或数字
3. 不能把关键字、保留字、true、false和null作为标识符

### 注释

ECMAScript使用C风格的注释，包括单行注释和块级注释。

```javascript
// 单行注释
/*
* 这是一个多行
* 注释
*/
```

### 直接量(字面量literal)

所有直接量(字面量)，就是程序中直接显示出来的数据值。

```javascript
100 //数字字面量
'李炎恢' //字符串字面量
false //布尔字面量
/js/gi //正则表达式字面量
null //对象字面量
{x:1, y:2} //对象字面量表达式
[1,2,3,4,5] //数组字面量表达式
```

### 关键字和保留字

ECMAScript-262描述了一组具有特定用途的关键字，一般用于控制语句的开始或结束，或者用于执行特定的操作等。关键字也是语言保留的，不能用作标识符。

*ECMAScript的全部关键字（为第五版新增）：*

break　　do　　instanceof　　typeof　　case　　else　　new　　var　　catch　　finally　　return　　void　　continue　　for　　switch　　while　　　　　　　　debugger*　　  function　　this　　with　　　　default　　if　　throw　　delete　　in　　try　　

*ECMA-262中的全部保留字（第三版）：*

abstract　　enum　　int　　short　　boolean　　export　　interface　　static　　byte　　extends　　long　　super　　char　　final　　native　　class
synchronized　　float　　package　　throws　　const　　goto　　private　　transient　　debugger　　implements　　protected　　volatile　　double　　
import　　public

### 变量

ECMAScript的变量是松散类型的，所谓松散类型就是用来保存任何类型的数据

```javascript
var a;
alert(a);//undefined
如果未对变量初始化，默认将为undefined
alert(a);//报错
```

如果未定义就使用，将报错

重复的使用var声明一个变量，只不过是一个赋值操作，并不会报错。但这样的操作是比较二的，没有任何必要。

```javascript
var box= 'hello';
var box= 'word';
其他的：
box= 'hehe';//和作用域有关
var box= 'hehe',age = 28,height;//可以在一行定义多个变量
```
