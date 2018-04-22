---
author: wanls4583
comments: true
date: 2017-06-26 11:02:22+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/26/javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%9b%9b%e7%ab%a0%ef%bc%89%e6%95%b0%e6%8d%ae%e7%b1%bb%e5%9e%8b/
slug: javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%9b%9b%e7%ab%a0%ef%bc%89%e6%95%b0%e6%8d%ae%e7%b1%bb%e5%9e%8b
title: javascript笔记--（第四章）数据类型
wordpress_id: 62
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记
---

## 数据类型

ECMAScript中有5种简单数据类型：Undefined、Null、Boolean、Number和String。还有一种复杂数据类型——Object。ECMAScript不支持任何创建自定义类型的机制，所有值都成为以上6中数据类型之一。

## typeof操作符

typeof操作符是用来检测变量的数据类型。对于值或变量使用typeof操作符会返回如下字符串。

- undefined - 如果变量是 Undefined 类型的
- boolean - 如果变量是 Boolean 类型的
- number - 如果变量是 Number 类型的
- string - 如果变量是 String 类型的
- object - 如果变量是一种引用类型或 Null 类型的

function - 如果变量是函数（函数对象，Function是最顶层的构造器，Object也是一个函数对象，Object是被Function构造出来的。）

```
<script type="text/javascript">
	var a;
	console.log(typeof a);//undefined
	var b = false;
	console.log(typeof b);//boolean
	var c = 1;
	console.log(typeof c);//number
	var d = "";
	console.log(typeof d);//string
	var e = {};
	console.log(typeof e);//object
	var f = function(){};
	console.log(typeof f);//function
</script>
```

注意：js只存在5种基本类型和一种引用类型。typeof返回的字符串并不代表类型，而是根据ECMScript标准来返回字符串，以下就是ECMScript对typeof操作符返回值的说明。

<table summary="typeof Operator" style="font-size: 14px; font-family: Simsun; background-color: rgb(240, 240, 240);">
	<thead style="background-color: silver;">
		<tr style="border: 1px solid black;">
			<th style="border: 1px solid black;">
				Type
			</th>
			<th style="border: 1px solid black;">
				<em>Result</em>
			</th>
		</tr>
	</thead>
	<tbody>
		<tr style="border: 1px solid black;">
			<td style="border: 1px solid black;">
				Undefined
			</td>
			<td style="border: 1px solid black;">
				<strong><tt>&quot;undefined&quot;</tt></strong>
			</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="border: 1px solid black;">
				Null
			</td>
			<td style="border: 1px solid black;">
				<strong><tt>&quot;object&quot;</tt></strong>
			</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="border: 1px solid black;">
				Boolean
			</td>
			<td style="border: 1px solid black;">
				<strong><tt>&quot;boolean&quot;</tt></strong>
			</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="border: 1px solid black;">
				Number
			</td>
			<td style="border: 1px solid black;">
				<strong><tt>&quot;number&quot;</tt></strong>
			</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="border: 1px solid black;">
				String
			</td>
			<td style="border: 1px solid black;">
				<strong><tt>&quot;string&quot;</tt></strong>
			</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="border: 1px solid black;">
				Object (native and doesn't implement&nbsp;<a target="_blank" href="http://interglacial.com/javascript_spec/a-13.html#a-13.2.1" style="color: rgb(51, 102, 153); text-decoration: none;">[[Call]]</a>)
			</td>
			<td style="border: 1px solid black;">
				<strong><tt>&quot;object&quot;</tt></strong>
			</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="border: 1px solid black;">
				Object (native and implements&nbsp;<a target="_blank" href="http://interglacial.com/javascript_spec/a-13.html#a-13.2.1" style="color: rgb(51, 102, 153); text-decoration: none;">[[Call]]</a>)
			</td>
			<td style="border: 1px solid black;">
				<strong><tt>&quot;function&quot;</tt></strong>
			</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="border: 1px solid black;">
				Object (host)
			</td>
			<td style="border: 1px solid black;">
				Implementation-dependent<br />
				
			</td>
		</tr>
	</tbody>
</table>

## Undefined类型

Undefined类型只有一个值，即特殊的undefined。在使用var声明变量，但没有对其初始化时，这个变量的值就是undefined。

```
<script type="text/javascript">
	var a;
	console.log(typeof a);//undefined
	console.log(b);//s报错
</script>
```

注意：未初始化的变量和未定义的变量是不一样的。

## Null类型

Null类型是一个只有一个值的数据类型，即特殊的值null。它表示一个空对象引用(指针)，而typeof操作符检测null会返回object。undefined是派生自null的，因此ECMA-262规定对它们的相等性测试返回true。

```
<script type="text/javascript">
	var a;
	console.log(a==null);//true
	console.log(a===null);//false
</script>
```

## Boolean类型

虽然Boolean类型的字面量只有true和false两种，但ECMAScript中所有类型的值都有与这两个Boolean值等价的值。要将一个值转换为其对应的Boolean值，可以使用转型函数Boolean()。

```javascript
var hello = 'Hello World!';
var hello2 = Boolean(hello);
console.log(typeof hello2);//boolean
```

隐式转换:

```
<script type="text/javascript">
	var hello = 'Hello World!';
	if (hello) {
		console.log('如果条件为true，就执行我这条！');
	} else {
		console.log('如果条件为false，就执行我这条！');
	}
</script>
```

当要转换的值是至少有一个字符的字符串、非 0 数字或对象时，Boolean() 函数将返回 true。如果该值是空字符串、数字 0、NaN、undefined 或 null，它将返回 false。

可以用下面的代码测试 Boolean 型的强制类型转换：

```javascript
var b1 = Boolean("");		//false - 空字符串
var b1 = Boolean("hello");	//true - 非空字符串
var b1 = Boolean(50);		//true - 非零数字
var b1 = Boolean(null);		//false - null
var b1 = Boolean(0);		//false - 零
var b1 = Boolean(new object());	//true - 对象
var b1 = Boolean(undefined);	//false- 未定义
```

## Number类型

```javascript
var box = 100; //十进制整数
var box = 070; //八进制，56
var box = 079; //无效的八进制，自动解析为79
var box = 08; //无效的八进制，自动解析为8
var box = 0xA; //十六进制，10
var box = 0x1f; //十六进制，31
```

浮点类型，就是该数值中必须包含一个小数点，并且小数点后面必须至少有一位数字。

```javascript
var box = 3.8;
var box = 0.8;
var box = .8; //有效，但不推荐此写法
var box = 8.; //小数点后面没有值，转换为8
var box = 12.0; //小数点后面是0，转成为12
var box = 4.12e9; //即4120000000
var box = 0.00000000412; //即4.12e-9
```

虽然浮点数值的最高精度是17位小数，但算术运算中可能会丢失精度。由于这个因素，做判断的时候一定要考虑到这个问题(比如使用整型判断)。

```
<script type="text/javascript">
	var a = 0.1+0.2;
	console.log(a)//0.30000000000000004
	var b = 0.3;
	console.log(a==b);//false
	var c = 0.09999999999999999999999
	console.log(c);//0.1
</script>
```

Number.MIN_VALUE   //最小值
Number.MAX_VALUE  //最大值
Number.POSITIVE_INFINITY  //Infinity(正无穷)
Number.NEGATIVE_INFINITY  //-Infinity(负无穷)

如果超过了浮点数值范围的最大值或最小值，那么就先出现Infinity(正无穷)或者-Infinity(负无穷)。

```javascript
var box = 100e1000; //超出范围，Infinity
var box = -100e1000; //超出范围，-Infinity
```

要想确定一个数值到底是否超过了规定范围，可以使用isFinite()函数。如果没有超过，返回true，超过了返回false。

```
<script type="text/javascript">
	var box = 100e1000;
	console.log(isFinite(box));	//false
</script>
```

### NaN:

```javascript
var box = 0 / 0;	//NaN
var box = 12 / 0;	//Infinity
var box = 12 / 0 * 0;	//NaN
```

任何与NaN进行运算的结果均为NaN，NaN与自身不相等(NaN不与任何值相等)。

```javascript
alert(Number.NaN);	//NaN
alert(NaN+1);		//NaN
alert(NaN == NaN)	//false

alert(isNaN(NaN));		//true
alert(isNaN(25));		//false，25是一个数值
alert(isNaN('25'));		//false，'25'是一个字符串数值，可以转成数值
alert(isNaN('Lee'));		//true，'Lee'不能转换为数值
alert(isNaN(true));		//false	true可以转成成1
```

isNaN()函数也适用于对象。在调用isNaN()函数过程中，首先会调用valueOf()方法，然后确定返回值是否能够转换成数值。如果不能，则调用toString()方法，再测试返回值是否能够转换成数值。

```
<script type="text/javascript">
	var box = {
		toString : function () {
			return '123';
		},
		valueOf:function(){
			return 'lisong';
		}
	};
	console.log(isNaN(box));		//true
	box = {
		toString : function () {
			return '123';			
		},
		/*valueOf:function(){
			return 'lisong';
		}*/
	};
	console.log(isNaN(box));		//false
	box = {
		toString : function () {
			return true;			
		},
	};
	console.log(isNaN(box));		//false
</script>
```

有3个函数可以把非数值转换为数值：Number()、parseInt()和parseFloat()。Number()函数是转型函数，可以用于任何数据类型，而另外两个则专门用于把字符串转成数值。

```javascript
alert(Number(true));//1，Boolean类型的true和false分别转换成1和0
alert(Number(null));//0，空对象返回0
alert(Number(undefined));//NaN，undefined返回NaN
```

1.只包含数值的字符串，会直接转成成十进制数值，如果包含前导0，即自动去掉。

```javascript
alert(Number('456'));//456
alert(Number('070'));//70
```

2.只包含浮点数值的字符串，会直接转成浮点数值，如果包含前导和后导0，即自动去掉。

```javascript
alert(Number('08.90'));//8.9
```

3.如果字符串是空，那么直接转成成0。

```
<script type="text/javascript">
	console.log(Number("")); //0
	console.log(parseInt("")); //NaN
</script>
```

4.如果不是以上三种字符串类型，则返回NaN。

```javascript
alert('Lee123');//NaN
alert('123Lee');//NaN
```

注意:Number转换的字符串中不会自动去掉字母和其他和数字无关的符号

5.如果是对象，首先会调用valueOf()方法，然后确定返回值是否能够转换成数值。如果没有valueOf()方法，会调用toString()，然后确定返回值是否能够转换成数值。

```
<script type="text/javascript">
	var box = {
		toString : function () {
			return '123';
		},
		valueOf:function(){
			return 'lisong';
		}
	};
	console.log(Number(box));		//NaN
	box = {
		toString : function () {
			return '123';			
		},
		/*valueOf:function(){
			return 'lisong';
		}*/
	};
	console.log(Number(box));		//123
	box = {
		toString : function () {
			return true;			
		},
	};
	console.log(Number(box));		//1
</script>
```

### prseInt():

由于Number()函数在转换字符串时比较复杂且不够合理，因此在处理整数的时候更常用的是parseInt()。

```javascript
alert(parsetInt('456Lee'));//456，会返回整数部分
alert(parsetInt('Lee456Lee'));//NaN，如果第一个不是数值，就返回NaN
alert(parseInt('12Lee56Lee'));//12，从第一数值开始取，到最后一个连续数值结束
alert(parseInt('56.12'));//56，小数点不是数值，会被去掉
alert(parseInt(''));//NaN，空返回NaN
```
 
parseInt()除了能够识别十进制数值，也可以识别八进制和十六进制。

```javascript
alert(parseInt('0xA'));//10，十六进制
alert(parseInt('070'));//56，八进制
alert(parseInt('0xALee'));//100，十六进制，Lee被自动过滤掉
```
 
ECMAScript为parseInt()提供了第二个参数，用于解决各种进制的转换。

```javascript
alert(parseInt('0xAF'));//175，十六进制
alert(parseInt('AF',16));//175，第二参数指定十六进制，可以去掉0x前导
alert(parseInt('AF'));//NaN，理所当然
alert(parseInt('101010101',2));//314，二进制转换
alert(parseInt('70',8))//56，八进制转换
```

### parseFloat():

parseFloat()是用于浮点数值转换的，和parseInt()一样，从第一位解析到非浮点数值位置。

```javascript
alert(parseFloat('123Lee'));//123，去掉不是别的部分
alert(parseFloat('0xA'));//0，不认十六进制
alert(parseFloat('123.4.5'));//123.4，只认一个小数点
alert(parseFloat('0123.400'));//123.4，去掉前后导
alert(parseFloat('1.234e7'));//12340000，把科学技术法转成普通数值
```

## String类型

String类型用于表示由于零或多个16位Unicode字符组成的字符序列，即字符串。ECMAScript中的字符串是不可变的，也就是说，字符串一旦创建，它们的值就不能改变。要改变某个变量保存的字符串，首先要销毁原来的字符串，然后再用另一个包含新值的字符串填充该变量。

```javascript
var box = 'Mr.';
box = box + ' Lee';
```
toString()方法可以把值转换成字符串。
```
<script type="text/javascript">
	var a = 1;
	console.log(a.toString()+1);//11
	var b = true;
	console.log(b+1);//2
	console.log(b.toString()+1);//true1
</script>
```

toString()方法一般是不需要传参的，但在数值转成字符串的时候，可以传递进制参数。

```javascript
var box = 10;
alert(box.toString());//10，默认输出
alert(box.toString(2));//1010，二进制输出
alert(box.toString(16));//a，十六进制输出
```

如果值有toString()方法，则调用该方法并返回相应的结果；如果是null或者undefined，则返回"null"或者"undeinfed"。不过可以用String()，这个函数能够将任何类型的值转换为字符串。

```
<script type="text/javascript">
	var a ;
	//console.log(a.toString());//报错
	console.log(String(a));//undefined
	a = null;
	//console.log(a.toString());//报错
	console.log(String(a));//null
</script>
```

## Object类型

ECMAScript中的对象其实就是一组数据和功能的集合。对象可以通过执行new操作符后跟要创建的对象类型的名称来创建。

```javascript
var box = new Object();
```

Object()是对象构造，如果对象初始化时不需要传递参数，可以不用写括号，但这种方式我们是不推荐的。

```javascript
var box = new Object;
```

Object()里可以任意传参，可以传数值、字符串、布尔值等。而且，还可以进行相应的计算。

```
<script type="text/javascript">
	var a = new Object;
	a.toString = function(){
		return 2
	}
	console.log(a+1);//3

	var b = new Object(1);
	b.toString = function(){
		return 2
	}
	console.log(b+1);//2

	var c = new Object(1);
	c.valueOf = function(){
		return 2
	}
	console.log(c+1);//3
</script>
```

注意：如果给对象传递了参数，则相对于给对象定义了valueOf函数，我们可以重新valueOf函数和toString函数，valueOf函数在计算的时候优先级高于toString函数


