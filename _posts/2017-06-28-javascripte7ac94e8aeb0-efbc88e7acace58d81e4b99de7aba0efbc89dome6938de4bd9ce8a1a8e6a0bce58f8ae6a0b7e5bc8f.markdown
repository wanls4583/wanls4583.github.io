---
author: wanls4583
comments: true
date: 2017-06-28 09:17:26+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/28/javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%8d%81%e4%b9%9d%e7%ab%a0%ef%bc%89dom%e6%93%8d%e4%bd%9c%e8%a1%a8%e6%a0%bc%e5%8f%8a%e6%a0%b7%e5%bc%8f/
slug: javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%8d%81%e4%b9%9d%e7%ab%a0%ef%bc%89dom%e6%93%8d%e4%bd%9c%e8%a1%a8%e6%a0%bc%e5%8f%8a%e6%a0%b7%e5%bc%8f
title: javascript笔记--（第十九章）DOM操作表格及样式
wordpress_id: 189
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## Table对象
常用集合

<table class="dataintable   " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
			<tbody style="margin:0px; padding:0px; border:0px">
				<tr style="margin:0px; padding:0px; border:0px">
					<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:155px; background-color:rgb(213,213,213)">
						集合
					</th>
					<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
						描述
					</th>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/coll_table_cells.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">cells[]</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						返回包含表格中所有单元格的一个数组。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/coll_table_rows.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">rows[]</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						返回包含表格中所有行的一个数组。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						tBodies[]
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						返回包含表格中所有 tbody 的一个数组。
					</td>
				</tr>
			</tbody>
</table>

常用属性

<table class="dataintable   " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
			<tbody style="margin:0px; padding:0px; border:0px">
				<tr style="margin:0px; padding:0px; border:0px">
					<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:155px; background-color:rgb(213,213,213)">
						属性
					</th>
					<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
						描述
					</th>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_table_caption.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">caption</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						对表格的 &lt;caption&gt; 元素的引用。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						tFoot
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						返回表格的 TFoot 对象。如果不存在该元素，则为 null。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						tHead
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						返回表格的 THead 对象。如果不存在该元素，则为 null。
					</td>
				</tr>
			</tbody>
</table>

常用方法

<table class="dataintable  " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
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
						<a target="_blank" href="http://www.w3school.com.cn/jsref/met_table_createcaption.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">createCaption()</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						为表格创建一个 caption 元素。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/met_table_createtfoot.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">createTFoot()</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						在表格中创建一个空的 tFoot 元素。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/met_table_createthead.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">createTHead()</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						在表格中创建一个空的 tHead 元素。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/met_table_deletecaption.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">deleteCaption()</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						从表格删除 caption 元素以及其内容。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/met_table_deleterow.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">deleteRow()</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						从表格删除一行。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/met_table_deletetfoot.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">deleteTFoot()</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						从表格删除 tFoot 元素及其内容。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/met_table_deletethead.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">deleteTHead()</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						从表格删除 tHead 元素及其内容。
					</td>
				</tr>
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/met_table_insertrow.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">insertRow()</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						在表格中插入一个新行。
					</td>
				</tr>
			</tbody>
</table>

table操作
```
<script type="text/javascript">
	var table = document.createElement('table');
	table.border = 1;
	table.width = 300;
	
	var caption = table.createCaption();
	caption.innerHTML = "人员表"
	table.appendChild(caption);

	var thead = table.createTHead();//crate后就自动添加到table里了
	var tr1 = thead.insertRow(0);//插入tr
	var td1_1 = tr1.insertCell(0);
	var td1_2 = tr1.insertCell(1);
	td1_1.innerHTML = "tr1.insertCell_td1_1";
	td1_2.innerHTML = "tr1.insertCell_td1_2";


	var tr2 = table.insertRow(0);//tr集合的第一个位置,包括thead,tbody,tfoot的tr
	var td2_1 = tr2.insertCell(0);//插入td
	var td2_2 = tr2.insertCell(1);
	td2_1.innerHTML = "tr2.insertCell_td2_1";
	td2_2.innerHTML = "tr2.insertCell_td2_2";
	tr2.deleteCell(1);//删除第二个td

	var tbody = document.createElement("tbody");//table没有createTBody方法
	var tr3 = tbody.insertRow();
	var td3_1 = tr3.insertCell(0);
	var td3_2 = tr3.insertCell(1);
	td3_1.innerHTML = "tr3.insertCell_td3_1";
	td3_2.innerHTML = "tr3.insertCell_td3_2";
	table.appendChild(tbody);//需要手动append,这个tbody会在tfoot之后

	var tfoot = table.createTFoot();//crate后就自动添加到table里了
	var tr4 = tfoot.insertRow();
	var td4_1 = tr4.insertCell(0);
	var td4_2 = tr4.insertCell(1);
	td4_1.innerHTML = "tr4.insertCell_td4_1";
	td4_2.innerHTML = "tr4.insertCell_td4_2";
	tfoot.deleteRow(0);//删除tfoot第一个tr

	table.deleteRow(0);//删除tr集合中的第一行
	table.deleteCaption();//删除caption
	table.deleteTHead();//删除table的thead
	table.deleteTFoot();//删除table的tfoot

	document.body.appendChild(table);
</script>
```
## 样式

### 访问元素的样式
任何HTML元素标签都会有一个通用的属性：style。它会返回CSSStypeDeclaration对象。
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="box" style="color:red;font-size:12px;"></div>
</body>
<script type="text/javascript">
	var box = document.getElementById('box');//获取box
	console.log(box.style);//CSSStyleDeclaration
	console.log(box.style.color);//red
	console.log(box.style.fontSize);//12px

	box.style.setProperty("border","1px");//添加和设置属性
	box.style.removeProperty('color');//移除某个熟悉

	box.style.cssText = "background-color:blue";//设置style属性
	console.log(box.style.backgroundColor);//blue
</script>
</html>
```
getComputedStyle()和currentStyle能获取行内样式，内嵌样式或者外部样式，不过只可以读
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		#box{
			color:red;font-size:12px;
		}
	</style>
</head>
<body>
	<div id="box" style=""></div>
</body>
<script type="text/javascript">
	var box = document.getElementById('box');//获取box
	var style = window.getComputedStyle ?
		window.getComputedStyle(box, null) : null || box.currentStyle;

	console.log(style.color);//rgb(255, 0, 0);
	style.cssText = "background-color:blue";//报错
</script>
</html>
```
### 操作样式表
添加删除className
```
<script type="text/javascript">
	var box = document.getElementById('box');//获取box
	//判断是否存在这个class
	function hasClass(element, className) {  
		return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
	}

	//添加一个class，如果不存在的话
	function addClass(element, className) {
		if (!hasClass(element, className))   {       
			element.className += " "+className;  
		}
	}

	//删除一个class，如果存在的话
	function removeClass(element, className) {   
		if (hasClass(element, className)) {         
			element.className = element.className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');   
		}
	}
	addClass(box,"class1");
	addClass(box,"class2");
	removeClass(box,"class1");
</script>
```
添加删除css规则
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		#box{
			color:red;font-size:12px;
		}
	</style>
</head>
<body>
	<div id="box"></div>
</body>
<script type="text/javascript">
	//为了添加CSS规则，并且兼容所有浏览器，我们必须写一个函数：
	var sheet = document.styleSheets[0];
	
	/*
	//也可以通过以下方式获取相应sheet
	var link = document.getElementsByTagName('link')[0];	//HTMLLinkElement
	var style = document.getElementsByTagName('style')[0];	//HTMLStyleElement
	var sheet = style.sheet || style.styleSheet;	
	var sheet = link.sheet || link.styleSheet;
	*/

	var rules = sheet.cssRules || sheet.rules;

	console.log(rules[0].selectorText);//#box
	console.log(rules[0].style.color);//red
	console.log(rules[0].cssText);//#box { color: red; font-size: 12px; }
	rules[0].cssText = "#box {background-color:red}";//无效

	function insertRule(sheet, selectorText, cssText, position) {
		//如果是非IE
		if (sheet.insertRule) {
			sheet.insertRule(selectorText + "{" + cssText + "}", position);
		//如果是IE
		} else if (sheet.addRule) {
			sheet.addRule(selectorText, cssText, position);
		}
	}
	insertRule(sheet, "#box", "background-color:red;", 0);//在第一个位置新建一个规则
	console.log(rules[0].selectorText);//#box
	console.log(rules[0].style.backgroundColor);//red

	//为了删除CSS规则，并且兼容所有浏览器，我们必须写一个函数：
	function deleteRule(sheet, index) {
		//如果是非IE
		if (sheet.deleteRule) {
			sheet.deleteRule(index);
		//如果是IE
		} else if (sheet.removeRule) {
			sheet.removeRule(index);
		}
	}
	deleteRule(sheet, 0);//删除第一个规则
	console.log(rules[0].selectorText);//#box
	console.log(rules[0].style.color);//red
</script>
</html>
```

总结：三种操作CSS的方法，第一种可操作style行内样式，可读可写；第二种可操作行内、内联和链接，使用getComputedStyle或currentStyle，可读不可写；第三种cssRules或rules，可操作内联和链接，可读可写。
