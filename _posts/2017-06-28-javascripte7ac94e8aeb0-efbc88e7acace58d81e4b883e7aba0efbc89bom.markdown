---
author: wanls4583
comments: true
date: 2017-06-28 08:05:51+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/28/javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%8d%81%e4%b8%83%e7%ab%a0%ef%bc%89bom/
slug: javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%8d%81%e4%b8%83%e7%ab%a0%ef%bc%89bom
title: javascript笔记--（第十七章）BOM
wordpress_id: 182
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## BOM
BOM也叫浏览器对象模型，它提供了很多对象，用于访问浏览器的功能。BOM缺少规范，每个浏览器提供商又按照自己想法去扩展它，那么浏览器共有对象就成了事实的标准。所以，BOM本身是没有标准的或者还没有哪个组织去标准它。

## window对象
BOM的核心对象是window，它表示浏览器的一个实例。window对象处于JavaScript结构的最顶层，对于每个打开的窗口，系统都会自动为其定义 window 对象。
<img src="http://img.blog.csdn.net/20170206130714202?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

## 新建窗口
open() 方法用于打开一个新的浏览器窗口或查找一个已命名的窗口。
```javascript
//window.open(URL,name,features,replace)//repalce为true将替换历史中的当前条目，否则新建条目
open('http://www.baidu.com');//新建页面并打开百度
open('http://www.baidu.com','baidu');//新建页面并命名窗口并打开百度
open('http://www.baidu.com','_parent');//在本页窗口打开百度,_blank是新建
```
```
<script type="text/javascript">
	//示例1
	function open_win() 
	{
		window.open("child.html","new_win","width=400,height=400",true);
	}
	open_win()


	//示例2
	var myWindow=window.open('','MyName','width=200,height=100')
	myWindow.document.write("This is 'myWindow'")
	console.log(myWindow.closed);//false
	myWindow.focus();
	myWindow.close();
	console.log(myWindow.closed);//true
	myWindow.opener.document.write("This is the parent window")
	console.log(window.closed);//false
</script>
```
注意：只有表示顶层窗口的 Window 对象的 operner 属性才有效，表示框架的 Window 对象的 operner 属性无效

## 浏览器窗口位置和尺寸
IE、Safari、Opera和Chrome都提供了screenLeft和screenTop属性，分别用于表示窗口相对于屏幕左边和上边的位置。Firefox则在screenX和screenY属性中提供相同的窗口位置信息，Safari和Chrome也同时支持这两个属性。
```
<script type="text/javascript">
	console.log(window.screenLeft);
	console.log(window.screenX);
	console.log(window.screenTop);
	console.log(window.screenY);
</script>
```
<img src="http://img.blog.csdn.net/20170206134332439?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

注意：screenX，screenY是以红色区域的左上角为基准，其相对于屏幕左上角的距离

innerWidth和innerHeight，返回浏览器窗口本身的尺寸；outerWidth和outerHeight，返回浏览器窗口本身及边框的尺寸。
```
<!DOCTYPE html>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
<script type="text/javascript">
	console.log(window.innerWidth);
	console.log(window.innerHeight);
	console.log(window.outerWidth);
	console.log(window.outerHeight);
</script>
</script>  
</head>
<body>
	<div style="height:1000px"></div>
</body>
</html>
```
<img src="http://img.blog.csdn.net/20170206140508464?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />


红色区域代表了innerWidth和innerHeight，蓝色区域代表了outerWidth和outerHeight

IE没有提供当前浏览器窗口尺寸的属性；不过，在后面的DOM课程中有提供相关的方法。

## 页面窗口尺寸
在IE以及Firefox、Safari、Opera和Chrome中，document.documentElement.clientWidth和document.documentElement.clientHeight中保存了页面窗口的信息。在IE6中，这些属性必须在标准模式下才有效；如果是怪异模式，就必须通过document.body.clientWidth和document.body.clientHeight取得相同的信息。
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
<script type="text/javascript">
	//如果是Firefox浏览器，直接使用innerWidth和innerHeight
	//var width = window.innerWidth;				//这里要加window，因为IE会无效
	//var height = window.innerHeight;
	if (typeof width != 'number') {				//如果是IE，就使用document		
		if (document.compatMode == 'CSS1Compat') {
			width = document.documentElement.clientWidth;
			height = document.documentElement.clientHeight;
		} else {
			width = document.body.clientWidth;	//非标准模式使用body
			height = document.body.clientHeight;
		}
	}
	console.log(width);
	console.log(height);
</script>  
</head>
<body>
	<div style="height:1000px"></div>
</body>
</html>
```
<img src="http://img.blog.csdn.net/20170206141538532?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />
红色区域代表了document.documentElement.clientWidth和document.documentElement.clientHeight，可以看到，document.documentElement.clientWidth和document.documentElement.clientHeight获取的值和innerWidth和innerHeight是一样的

## 定时器
```
<script type="text/javascript">
	var timeId = setTimeout(function(name,age){
		console.log(name+":"+age);//lisong:26
	},100,"lisong",26);
	//clearTimeout(timeId);
	var intervalId = setInterval(function(name,age){
		console.log(name+":"+age);//lisong1:26
	},1000,"lisong1",26);
	//clearTimeout(intervalId);
</script>  
```
## location对象
提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location对象是window对象的属性，也是document对象的属性；所以window.location和document.location等效。

location属性

<table class="dataintable  " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:190px; background-color:rgb(213,213,213)">
					属性
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					描述
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_loc_hash.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">hash</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					设置或返回从井号 (#) 开始的 URL（锚）。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_loc_host.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">host</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					设置或返回主机名和当前 URL 的端口号。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_loc_hostname.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">hostname</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					设置或返回当前 URL 的主机名。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_loc_href.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">href</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					设置或返回完整的 URL。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_loc_pathname.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">pathname</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					设置或返回当前 URL 的路径部分。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_loc_port.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">port</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					设置或返回当前 URL 的端口号。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_loc_protocol.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">protocol</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					设置或返回当前 URL 的协议。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_loc_search.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">search</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					设置或返回从问号 (?) 开始的 URL（查询部分）。
				</td>
			</tr>
		</tbody>
</table>

location方法

<table class="dataintable  " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/met_loc_assign.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">assign()</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					加载新的文档。
				</td>
			</tr>
		</tbody>
</table>

```
<script type="text/javascript">
	location.hash = '#1';					//设置#后的字符串，并跳转
	console.log(location.hash);				//获取#后的字符串

	location.port = 8888;					//设置端口号，并跳转
	console.log(location.port);				//获取当前端口号，

	location.hostname = 'Lee';				//设置主机名，并跳转
	console.log(location.hostname);				//获取当前主机名，

	location.pathname = 'Lee';				//设置当前路径，并跳转
	console.log(location.pathname);				//获取当前路径，

	location.protocal = 'ftp:';				//设置协议，没有跳转
	console.log(location.protocol);				//获取当前协议

	location.search = '?id=5';				//设置?后的字符串，并跳转
	console.log(location.search);				//获取?后的字符串

	location.href = 'http://www.baidu.com';			//设置跳转的URL，并跳转
	console.log(location.href);				//获取当前的URL*/
</script>
```
注意：上面的方法会直接改变地址栏在Web开发中，我们经常需要获取诸如?id=5&search=ok这种类型的URL的键值对，可以先获取search，再获取键值对

页面加载：
```
<script type="text/javascript">
	location.reload();//最有效的重新加载，有可能从缓存加载
	location.reload(true);//强制加载，从服务器源头重新加载
	location.replace('http://www.baidu.com');//可以避免产生跳转前的历史记录
	location.assign('http://www.baidu.com');//跳转到新页面,会产生新的历史
	location.href = 'http://www.baidu.com'//和assign一样
</script> 
```
## history对象
history属性

<table class="dataintable   " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
			<tbody style="margin:0px; padding:0px; border:0px">
				<tr style="margin:0px; padding:0px; border:0px">
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						<a target="_blank" href="http://www.w3school.com.cn/jsref/prop_his_length.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">length</a>
					</td>
					<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
						返回浏览器历史列表中的 URL 数量。
					</td>
				</tr>
			</tbody>
</table>

history方法

<table class="dataintable   " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/met_his_back.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">back()</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					加载 history 列表中的前一个 URL。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/met_his_forward.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">forward()</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					加载 history 列表中的下一个 URL。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					<a target="_blank" href="http://www.w3school.com.cn/jsref/met_his_go.asp" style="margin:0px; padding:0px; border:0px; color:rgb(144,11,9); background:transparent">go()</a>
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					加载 history 列表中的某个具体页面。
				</td>
			</tr>
		</tbody>
</table>


