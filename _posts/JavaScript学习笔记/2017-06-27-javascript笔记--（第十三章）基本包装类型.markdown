---
author: wanls4583
comments: true
date: 2017-06-27 10:10:10+00:00
layout: post
title: javascript笔记--（第十三章）基本包装类型
wordpress_id: 146
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 基本包装类型
为了便于操作基本类型值，ECMAScript提供了3个特殊的引用类型：Boolean、Number和String。这些类型与其他引用类型相似，但同时也具有与各自的基本类型相应的特殊行为。实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而能够调用一些方法来操作这些数据。
```
<script type="text/javascript">
	var str = 'my name is lisong';
	str.name = 'lisong';
	console.log(str.name); //undefined,基本类型不可以设置属性
	str = str.substring(3);//基本类型有固有的方法，系统预设的
	console.log(str); //name is lisong

	var str = new String('my name is lisong');
	str.name = 'lisong';
	console.log(str.name);//lisong,对象可以设置属性
	str = str.substring(3);//返回的是字符串，不是String对象
	str.name = 'lisong';
	console.log(str.name);//undefined，返回的str是字符串，不能设置属性
</script>
```
基本包装类型的原理：
```
<script type="text/javascript">  
    var a = '123';
    console.log(a.length);//3
    a.length = 2;
    console.log(a.length);//3
</script>  
```
每当我们使用基本类型的属性的时候，JS引擎内部将为我们隐式地创建一个包装对象，使用完后将会销毁。第三行试图更改a.length的值，但是其只是在这一行有效，当第四行在次读取的时候，第三行构造的引用已经销毁了，会重新构造一个引用类型(new String(a))，所以其读取length仍然是3。（真实实现并不一定是这样，但整个过程看起来是这样）

### Boolean类型
Boolean类型没有特定的属性或者方法。

### Number对象
Number 对象方法

<table class="dataintable      " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px">
			<tbody style="margin:0px; padding:0px; border:0px">
				<tr style="margin:0px; padding:0px; border:0px">
					<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:155px; background-color:rgb(213,213,213)">
						方法
					</th>
					<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
						描述
					</th>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_tostring_number.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">toString</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						把数字转换为字符串，使用指定的基数。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_tolocalestring_number.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">toLocaleString</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						把数字转换为字符串，使用本地数字格式顺序。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_tofixed.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">toFixed</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						把数字转换为字符串，结果的小数点后有指定位数的数字。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_toexponential.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">toExponential</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						把对象的值转换为指数计数法。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_toprecision.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">toPrecision</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						把数字格式化为指定的长度。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_valueof_number.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">valueOf</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						返回一个 Number 对象的基本数字值。
					</td>
				</tr>
			</tbody>
</table>

*toPrecision(num):*

返回 NumberObject 的字符串表示，包含num 个有效数字。如果 num 足够大，能够包括 NumberObject 整数部分的所有数字，那么返回的字符串将采用定点计数法。否则，采用指数计数法，即小数点前有一位数字，小数点后有 num-1 位数字。必要时，该数字会被舍入或用 0 补足。

*toFixed(num):*

返回 NumberObject 的字符串表示，不采用指数计数法，小数点后有固定的 num 位数字。如果必要，该数字会被舍入，也可以用 0 补足，以便它达到指定的长度。如果 num 大于 le+21，则该方法只调用 NumberObject.toString()，返回采用指数计数法表示的字符串。

*toExponential(num):*

返回 NumberObject 的字符串表示，采用指数计数法，即小数点之前有一位数字，小数点之后有 num 位数字。该数字的小数部分将被舍入，必要时用 0 补足，以便它达到指定的长度。

以上三个函数一般只用到toFixed()。
```javascript
var box = 1000.789;  
console.log(box.toString());                //转换为字符串，传参可以转换进制  
console.log(box.toLocaleString());          //本地形式，1,000.789  
console.log(box.toFixed(2));                //小数点保留，1000.79  
console.log(box.toExponential());           //指数形式，传参会保留小数点  
console.log(box.toPrecision(3));            //1.00e+3  
console.log(box.toPrecision(4));            //10001 
```
## String对象常用方法：

- indexOf(str, n) ：从n开始搜索的第一个str，并将搜索的索引值返回
- lastIndexOf(str, n) ：从n开始搜索的最后一个str，并将搜索的索引值返回
- concat(str1...str2) ：将字符串参数串联到调用该方法的字符串
- slice(n,m) ：返回字符串n到m之间位置的字符串
- substring(n,m)： 同上
- substr(n,m) ：返回字符串n开始的m个字符串

### slice与substring的区别：

- slice的start和end都可以为负数，substring的这两个参数为负数时将转换成0；
- slice可以用于数组
