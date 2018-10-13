---
author: wanls4583
comments: true
date: 2017-06-27 09:30:41+00:00
layout: post
title: javascript笔记--（第十章）正则表达式
wordpress_id: 138
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 正则表达式

正则表达式(regular expression)是一个描述字符模式的对象。ECMAScript的RegExp类表示正则表达式，而String和RegExp都定义了使用正则表达式进行强大的模式匹配和文本检索与替换的函数。

<table class="dataintable       " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:119px; background-color:rgb(213,213,213)">
					修饰符
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					描述
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_regexp_i.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">i</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					执行对大小写不敏感的匹配。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_regexp_g.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">g</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					m
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					执行多行匹配。
				</td>
			</tr>
		</tbody>
</table>

```
<script type="text/javascript">
	var reg1 = new RegExp("lisong",'ig');
	var reg2 = new RegExp("lisong");
	var reg3 = /lisong/ig;
	var reg4 = /lisong/;
</script>
```
### RegExp 对象的方法

<table class="dataintable       " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:120px; background-color:rgb(213,213,213)">
					方法
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:446px; background-color:rgb(213,213,213)">
					描述
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:28px; background-color:rgb(213,213,213)">
					FF
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:27px; background-color:rgb(213,213,213)">
					IE
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_regexp_compile.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">compile</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					编译正则表达式。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_exec_regexp.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">exec</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					检索字符串中指定的值。返回找到的值，并确定其位置。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_test_regexp.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">test</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					检索字符串中指定的值。返回 true 或 false。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
		</tbody>
</table>

*test方法：*
```
<script type="text/javascript">
	var reg = /lisong/;

	console.log(reg.test("i am lisong"));//true

	console.log(reg.test("i am lison"));//false
</script>
```
*exec方法：*

如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。index 属性声明的是匹配文本的第一个字符的位置。input 属性则存放的是被检索的字符串 string。
```
<script type="text/javascript">
	var reg = /(\d+)lisong((\d+)[a-z])(\d)/;

	console.log(reg.exec("i am 5lisong26a1df"));//["5lisong26a1", "5", "26a", "26", "1", index: 5, input: "i am 5lisong26a1df"]

	console.log(reg.exec("i am 12lisong18t2easdst"));//["12lisong18t2", "12", "18t", "18", "2", index: 5, input: "i am 12lisong18t2easdst"]
</script>
```
如果一个子表达式中还有字表达式，则先返回外层字表达式所匹配的文本。

*exec全局匹配：*
```
<script type="text/javascript">
	var reg = /lisong/;//非全局匹配
	console.log(reg.exec("i am lisong"));//["lisong", index: 5, input: "i am lisong"]
	console.log(reg.lastIndex);//0
	console.log(reg.exec("i am lisong"));//["lisong", index: 5, input: "i am lisong"]

	reg = /lisong/g;//重新赋值
	console.log(reg.exec("i am lisong"));//["lisong", index: 5, input: "i am lisong"]
	console.log(reg.lastIndex);//11
	console.log(reg.exec("i am lisong"));//null,从下标11开始，后面已经没有字符了

	reg = /lisong/g;//重新赋值
	console.log(reg.exec("i am lisong"));//["lisong", index: 5, input: "i am lisong"]
	console.log(reg.lastIndex);//11
	console.log(reg.exec("i am lisong i am lisong"));//["lisong", index: 17, input: "i am lisong i am lisong"]
</script>
```
全局匹配下，exec会记录上一次匹配到的文本结尾的位置的下一个下标（lastIndex），即再次调用exec会从上一次匹配的文本之后开始搜索，非全局下lastIndex为0。
```
<script type="text/javascript">
	var reg = /lisong/;
	console.log(reg.exec("i am lisong"));//["lisong", index: 5, input: "i am lisong"]
	console.log(reg.lastIndex);//0
	reg.lastIndex = 6;//手动设置为6
	console.log(reg.lastIndex);//6
	console.log(reg.exec("i am lisong"));//["lisong", index: 5, input: "i am lisong"],非全局下lastIndex对exec没有影响

	var reg = /lisong/g;
	console.log(reg.exec("i am lisong"));//["lisong", index: 5, input: "i am lisong"]
	console.log(reg.lastIndex);//0
	reg.lastIndex = 0;//手动设置为0
	console.log(reg.lastIndex);//0
	console.log(reg.exec("i am lisong"));//["lisong", index: 5, input: "i am lisong"],全局下，exec是从lastIndex开始匹配的
</script>
```
全局和非全局模式下都可以手动修改lastIndex，非全局模式下修改lastIndex对exec的匹配没有影响。

*compile函数：*

compile() 方法用于改变和重新编译正则表达式。
```
<script type="text/javascript">
	var str = "abc12456def45646ghi";
	var regExp = new RegExp("[a-z]+");
	console.log( regExp.exec(str) ); // abc

	regExp.compile("\\d+");// 作用相当于regExp = /\d+/;
	console.log( regExp.exec(str) ); // 12456
</script>
```
### RegExp 对象属性

<table class="dataintable       " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:120px; background-color:rgb(213,213,213)">
					属性
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:446px; background-color:rgb(213,213,213)">
					描述
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:28px; background-color:rgb(213,213,213)">
					FF
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:27px; background-color:rgb(213,213,213)">
					IE
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_regexp_global.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">global</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					RegExp 对象是否具有标志 g。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_regexp_ignorecase.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">ignoreCase</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					RegExp 对象是否具有标志 i。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_lastindex_regexp.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">lastIndex</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					一个整数，标示开始下一次匹配的字符位置。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_multiline_regexp.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">multiline</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					RegExp 对象是否具有标志 m。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_source_regexp.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">source</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					正则表达式的源文本。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
		</tbody>
</table>

```
<script type="text/javascript">
	var str = "abc12456def45646ghi";
	var regExp = new RegExp("[a-z]+","g");
	console.log( regExp.exec(str) ); // abc

	console.log(regExp.global);//true
	console.log(regExp.ignoreCase);//false
	console.log(regExp.lastIndex);//3
	console.log(regExp.multiline);//false
	console.log(regExp.source);//Source
</script>
```
### RegExp静态属性
```
<script type="text/javascript">
	var str = "123abc456lisong789hehe";
	var regExp = new RegExp("[a-z]+(\\d+)","g");
	console.log( regExp.exec(str) ); //["abc456", "456", index: 3, input: "123abc456lisong789hehe"]
	console.log(RegExp.input); //123abc456lisong789hehe
	console.log(RegExp.leftContext); //123
	console.log(RegExp.rightContext); //lisong789hehe
	console.log(RegExp.lastMatch); //abc456
	console.log(RegExp.lastParen); //456
	console.log(RegExp.multiline); //false
	console.log("-------------------------------")
	console.log( regExp.exec(str) ); //["lisong789", "789", index: 9, input: "123abc456lisong789hehe"]
	console.log(RegExp.leftContext); //123abc456
	console.log(RegExp.rightContext); //hehe
	console.log(RegExp.lastMatch); //lisong789
	console.log(RegExp.lastParen); //789
	console.log("-------------------------------")
	var regExp2 = /lisong(\d(\d))/;
	regExp2.test("123lisong456");
	console.log( regExp.exec(str) ); //null,如果没匹配到不会改变静态属性
	console.log(RegExp.leftContext); //123
	console.log(RegExp.rightContext); //6
	console.log(RegExp.lastMatch); //lisong45
	console.log(RegExp.lastParen); //5,如果没有子表达式，则返回空字符串
</script>
```
也可以使用短名称，如RegExp.$_，RegExp['$*']

### String对象的正则方法

<table class="dataintable       " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:120px; background-color:rgb(213,213,213)">
					方法
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:446px; background-color:rgb(213,213,213)">
					描述
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:28px; background-color:rgb(213,213,213)">
					FF
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:27px; background-color:rgb(213,213,213)">
					IE
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_search.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">search</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					检索与正则表达式相匹配的值。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_match.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">match</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					找到一个或多个正则表达式的匹配。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_replace.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">replace</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					替换与正则表达式匹配的子串。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/jsref_split.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">split</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					把字符串分割为字符串数组。
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					1
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					4
				</td>
			</tr>
		</tbody>
</table>

*search方法：*
```
<script type="text/javascript">
	var str="Visit W3School!"
	console.log(str.search(/W3School/))//6，返回值是第一次出现的位置，search的参数可以是字符串或者正则对象
</script>
```
*match方法：*
```
<script type="text/javascript">
	var str = "1lisong2lisong3lisong";
	var reg = /li(song)/;//非全局模式
	console.log(str.match(reg));//["lisong", "song", index: 1, input: "1lisong2lisong3lisong"]，search的参数可以是字符串或者正则对象

	reg = /li(song)/g;//全局模式
	console.log(str.match(reg));//["lisong", "lisong", "lisong"]
</script>
```
非全局模式下，match只匹配一次，如果匹配到了则返回数组（和正则对象的exec()方法返回的数组一样），否则返回null。
全局模式下，match匹配多次，如果匹配到了，只返回匹配的子串数组，否则返回null。

*replace方法：*

<table class="dataintable       " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					参数
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					描述
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					regexp/substr
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<p style="margin-top:0px; margin-bottom:0px; padding-top:0px; padding-bottom:0px; border:0px; line-height:18px">
						必需。规定子字符串或要替换的模式的 RegExp 对象。
					</p>
					<p style="margin-top:12px; margin-bottom:0px; padding-top:0px; padding-bottom:0px; border:0px; line-height:18px">
						请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。
					</p>
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					replacement
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					必需。一个字符串值。规定了替换文本或生成替换文本的函数。
				</td>
			</tr>
		</tbody>
</table>

<font style='font-size:10px;font-weight:bold'>说明</font>

如果 regexp 具有全局标志 g，那么 replace() 方法将替换所有匹配的子串。否则，它只替换第一个匹配子串。
replacement 可以是字符串，也可以是函数。如果它是字符串，那么每个匹配都将由字符串替换。
但是 replacement 中的 $ 字符具有特定的含义。如下表所示，它说明从模式匹配得到的字符串将用于替换。

<table class="dataintable       " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					字符
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					替换文本
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					$1、$2、...、$99
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					$&amp;
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					与 regexp 相匹配的子串。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					$`
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					位于匹配子串左侧的文本。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					$'
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					位于匹配子串右侧的文本。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					$$
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					直接量符号。
				</td>
			</tr>
		</tbody>
</table>

```
<script type="text/javascript">
	var str = "aLisong123lisong";
	console.log(str.replace("lisong",'hero'));//aLisong123hero

	console.log(str.replace(/lisong/i,'hero'));//ahero123lisong

	console.log(str.replace(/(li)(song)/ig,'$2$1'));//asongLi123songli

	console.log(str.replace(/lisong/ig,'|$&|'));//a|Lisong|123|lisong|

	console.log(str.replace(/lisong/ig,'$$'));//a$123$

	console.log(str.replace(/lisong/i,'$`|'));//aa|123lisong
	console.log(str.replace(/lisong/ig,'$`|'));//aa|123aLisong123|,使用全局替换$`时，会在内容没有改变的基础上替换，而不管前一次替换的内容
	
	str = "aLisong123lisongalisongb"
	console.log(str.replace(/lisong/i,'$\'|'));//a123lisongalisongb|123lisongalisongb
	console.log(str.replace(/lisong/ig,'$\'|'));//a123lisongalisongb|123alisongb|ab|b,替换原理和$`一样
</script>
```
ECMAScript v3 规定，replace() 方法的参数 replacement 可以是函数而不是字符串。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用。该函数的第一个参数是匹配模式的字符串。接下来的参数是与模式中的子表达式匹配的字符串，可以有 0 个或多个这样的参数。接下来的参数是一个整数，声明了匹配在 stringObject 中出现的位置。最后一个参数是 stringObject 本身。
```
<script type="text/javascript">
	var str = "aLisong123lisong";

	console.log(str.replace(/(li)(song)/ig,function(){
		console.log(arguments);
		//["Lisong", "Li", "song", 1, "aLisong123lisong"]
		//["lisong", "li", "song", 10, "aLisong123lisong"]
		return arguments[2]+arguments[1];
	}));//asongLi123songli,效果和str.replace(/(li)(song)/ig,'$2$1')一样
</script>
```
*split函数：*

<table class="dataintable       " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					参数
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					描述
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					separator
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					howmany
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
				</td>
			</tr>
		</tbody>
</table>

<font style='font-size:10px;font-weight:bold'>返回值</font>

一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。返回的数组中的字串不包括separator 自身。
但是，如果 separator 是包含子表达式的正则表达式，那么返回的数组中包括与这些子表达式匹配的字串（但不包括与整个正则表达式匹配的文本）。
```
<script type="text/javascript">
	var str = "aLisongblisongc";
	console.log(str.split(/lisong/i));//["a", "b", "c"]
	console.log(str.split(/lisong/i,2));//["a", "b"]，只返回前两个
	console.log(str.split(/li(song)/i));//["a", "song", "b", "song", "c"]
	console.log(str.split(/li(song)/i,2));//["a", "song"]
</script>
```
注意：给split设置第二个参数n，只是简单的返回原数组的前n个元素

### 多行匹配
```
<script type="text/javascript">
	var pattern = /^\d+/mg;//启用了换行和全局模式
	var str = '1.baidu\n2.google\n3.bing';
	var result = str.replace(pattern, '#');
	console.log(result);
	//#.baidu
	//#.google
	//#.bing
	
	var pattern = /^\d+/g;//启用了全局模式
	var str = '1.baidu\n2.google\n3.bing';
	var result = str.replace(pattern, '#');
	console.log(result);
	//#.baidu
	//2.google
	//3.bing
	
	var pattern = /^\d+/m;//启用了多行模式
	var str = '1.baidu\n2.google\n3.bing';
	var result = str.replace(pattern, '#');
	console.log(result);
	//#.baidu
	//2.google
	//3.bing
</script>
```
注意：多行匹配必须和全局模式一起使用才有效，如果是匹配换行符，只需要开启全局模式即可

### 前瞻捕获
```
<script type="text/javascript">
	var pattern = /(goo(?=gle))/;//goo后面必须跟着gle才能捕获,(?=)只能放在后面
	var str = 'google';
	console.log(pattern.exec(str));//["goo", "goo", index: 0, input: "google"]
</script>
```
### 非前瞻捕获
```
<script type="text/javascript">
	var pattern = /(goo(?!gle))/;//goo后面必须不跟着gle才能捕获，(?!)与(?=)正好相反
	console.log(pattern.exec("google"));//null
	console.log(pattern.exec("gooagle"));//["goo", "goo", index: 0, input: "gooagle"]
</script>
```
### 非捕获性分组
```
<script type="text/javascript">
	var pattern = /(\d+)(?:[a-z])/;//非捕获性分组
	var str = '123abc';
	console.log(pattern.exec(str));//["123a", "123", index: 0, input: "123abc"]

	var pattern = /(\d+)(?:(\d)[a-z])/;
	var str = '123abc';
	console.log(pattern.exec(str));//["123a", "12", "3", index: 0, input: "123abc"],外层括号没有捕获

	var pattern = /(\d+)((?:\d)[a-z])/;
	var str = '123abc';
	console.log(pattern.exec(str));//["123a", "12", "3a", index: 0, input: "123abc"],里层括号没有捕获
</script>
```
### 反向引用
```
<script type="text/javascript">
	var pattern = /([a-z]+)(\1)\b/;//\b代表字符的边界
	var str = "ahehe b";
	console.log(pattern.exec(str));//["hehe", "he", "he", index: 1, input: "ahehe b"]

	var pattern = /\b([a-z]+)(\1)\b/;
	var str = "ahehe b";
	console.log(pattern.exec(str));//null
</script>
```


