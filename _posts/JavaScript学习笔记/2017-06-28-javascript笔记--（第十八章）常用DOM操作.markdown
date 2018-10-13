---
author: wanls4583
comments: true
date: 2017-06-28 09:01:55+00:00
layout: post
title: javascript笔记--（第十八章）常用DOM操作
wordpress_id: 184
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## DOM
在 HTML DOM 中，所有事物都是节点。DOM 是被视为节点树的 HTML。

### 主要有以下几种DOM类型：

<table class="dataintable " style="margin: 15px 0px 0px; padding: 0px; border: 1px solid rgb(170, 170, 170); border-collapse: collapse; width: 485px; font-family: PingFangSC-Regular, Verdana, Arial, 微软雅黑, 宋体; font-size: 14px; background-color: rgb(253, 252, 248);">
	<tbody style="margin: 0px; padding: 0px; border: 0px;">
		<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
			<th style="margin: 0px; padding: 5px 15px 5px 6px; border: 1px solid rgb(63, 63, 63); vertical-align: baseline; background-color: rgb(63, 63, 63); text-align: left; color: rgb(255, 255, 255);">
				元素类型
			</th>
			<th style="margin: 0px; padding: 5px 15px 5px 6px; border: 1px solid rgb(63, 63, 63); vertical-align: baseline; background-color: rgb(63, 63, 63); text-align: left; color: rgb(255, 255, 255);">
				NodeType
			</th>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(255, 255, 255);">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				元素
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				1
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				属性
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				2
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(255, 255, 255);">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				文本
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				3
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				注释
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				8
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(255, 255, 255);">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				文档
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
				9
			</td>
		</tr>
	</tbody>
</table>

### 常用方法：

<table class="dataintable " style="margin: 15px 0px 0px; padding: 0px; border: 1px solid rgb(170, 170, 170); border-collapse: collapse; width: 809px;">
		<tbody style="margin: 0px; padding: 0px; border: 0px;">
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
				<th style="margin: 0px; padding: 5px 15px 5px 6px; border: 1px solid rgb(63, 63, 63); vertical-align: baseline; background-color: rgb(63, 63, 63); text-align: left; color: rgb(255, 255, 255);">
					方法
				</th>
				<th style="margin: 0px; padding: 5px 15px 5px 6px; border: 1px solid rgb(63, 63, 63); vertical-align: baseline; background-color: rgb(63, 63, 63); text-align: left; color: rgb(255, 255, 255);">
					描述
				</th>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(255, 255, 255);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					getElementById()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					返回带有指定 ID 的元素。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					getElementsByTagName()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					返回包含带有指定标签名称的所有元素的节点列表（集合/节点数组）。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(255, 255, 255);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					getElementsByClassName()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					返回包含带有指定类名的所有元素的节点列表。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					appendChild()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					把新的子节点添加到指定节点。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(255, 255, 255);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					removeChild()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					删除子节点。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					replaceChild()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					替换子节点。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(255, 255, 255);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					insertBefore()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					在指定的子节点前面插入新的子节点。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					createAttribute()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					创建属性节点。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(255, 255, 255);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					createElement()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					创建元素节点。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					createTextNode()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					创建文本节点。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(255, 255, 255);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					getAttribute()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					返回指定的属性值。
				</td>
			</tr>
			<tr style="margin: 0px; padding: 0px; border: 0px; background-color: rgb(245, 245, 245);">
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					setAttribute()
				</td>
				<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top;">
					把指定属性设置或修改为指定的值。
				</td>
			</tr>
		</tbody>
</table>

### 属性操作：
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div style="color:black" id="box" title="mytitle" class="class" bbb="bbb_value">
		hello
	</div>
	<input id="input" type="text" value="123"/>
	<input id="input1" type="radio" checked/>
</body>
<script type="text/javascript">
	document.getElementById('box').id;//获取id
	//document.getElementById('box').id = 'person';//设置id

	document.getElementById('box').title;//获取title
	document.getElementById('box').title = 'new_title';//设置title

	document.getElementById('box').style;//获取CSSStyleDeclaration对象
	document.getElementById('box').style.color;//获取style对象中color的值
	document.getElementById('box').style.color = 'red';//设置style对象中color的值

	document.getElementById('box').className;//获取class
	document.getElementById('box').className = 'box';//设置class	
	document.getElementById('box').getAttribute('className');//非IE不支持
	
	console.log(document.getElementById('box').bbb);//获取自定义属性的值，非IE不支持
	document.getElementById('box').setAttribute("bbb","new_bbb_value");
	console.log(document.getElementById('box').getAttribute("bbb"));//new__bbb_value
	document.getElementById('box').removeAttribute("bbb");//删除属性
	console.log(document.getElementById('box').getAttribute("bbb"));//null

	console.log(document.getElementById('input').value);//1234
	console.log(document.getElementById('input1').checked);//true
</script>
</html>
```
### 节点层次：
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div style="color:black" id="box" title="mytitle" class="class" bbb="bbb_value">
		<span>hello1</span>
		<span>hello2</span>
		<span>hello3</span>
	</div>
</body>
<script type="text/javascript">
	var div = document.getElementById('box')
	console.log(div.innerHTML);
	/*
		<span>hello1</span>
		<span>hello2</span>
		<span>hello3</span>
	*/
	console.log(div.childNodes.length);//得到子节点个数，IE3个，非IE7个，换行会产生空白节点
	console.log(div.childNodes[0].nodeValue);//输出空白
	console.log(div.attributes['bbb'].nodeValue);//bbb_value
	console.log(div.attributes.getNamedItem('bbb').nodeValue);//和上面效果一样

	console.log(div.firstChild.nodeValue);//输出空白
	console.log(div.firstChild.innerHTML);//undefined
	console.log(div.lastChild.nodeValue);//输出空白
	console.log(div.ownerDocument);//#document
	console.log(div.childNodes[0].nextSibling.innerHTML);//hello1
	console.log(div.childNodes[2].previousSibling.innerHTML);//hello2
	console.log(div.parentNode);//body对象
</script> 
</html>
```

注意：在获取到文本节点的时候，是无法使用innerHTML这个属性输出文本内容的。这个非标准的属性必须在获取元素节点的时候，才能输出里面包含的文本；在非IE中，标准的DOM具有识别空白文本节点的功能，所以在火狐浏览器是7个，而IE自动忽略了，如果要保持一致的子元素节点，需要手工忽略掉它。

### 节点操作：
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
</body>
<script type="text/javascript">
	document.write("<div id='box'></div>");
	var span = document.createElement("span");
	var text = document.createTextNode("hello");
	span.appendChild(text);
	document.getElementById("box").appendChild(span);

	var h = document.createElement("h1");
	var text1 = document.createTextNode("h1");
	h.appendChild(text1);
	document.getElementById("box").insertBefore(h,span);

	var input = null;
	input = document.createElement('input');
	input.setAttribute('type', 'radio');
	input.setAttribute('name', 'sex');
	document.getElementById("box").appendChild(input);

	//替换节点
	var text2 = document.createTextNode("new_hello");
	span.replaceChild(text2,span.childNodes[0]);

	//克隆节点
	var span1 = span.cloneNode(true);//true会复制内容，否则只复制结构
	span1.id = "span1";
	document.getElementById("box").appendChild(span1);
	//删除节点
	document.getElementById("box").removeChild(document.getElementById("span1"));
</script>
</html>
```

## DOM扩展

### 呈现模式
从IE6开始开始区分标准模式和混杂模式(怪异模式)，主要是看文档的声明。IE为document对象添加了一个名为compatMode属性，这个属性可以识别IE浏览器的文档处于什么模式如果是标准模式，则返回CSS1Compat，如果是混杂模式则返回BackCompat。
```
<script type="text/javascript">
	if (document.compatMode == 'CSS1Compat') {
		console.log(document.documentElement.clientWidth);
	} else {
		console.log(document.body.clientWidth);
	}
</script>
```
后来Firefox、Opera和Chrome都实现了这个属性。从IE8后，又引入documentMode新属性，因为IE8有3种呈现模式分别为标准模式8，仿真模式7，混杂模式5。所以如果想测试IE8的标准模式，就判断document.documentMode > 7 即可。

### 滚动
scrollIntoView(alignWithTop)  函数用来滚动浏览器窗口或容器元素，以便在当前视窗的可见范围看见当前元素。如果alignWithTop为true，或者省略它，窗口会尽可能滚动到自身顶部与元素顶部平齐
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<a onClick="onc()" hef="#">click here</a>
	<div style="height:400px; background-color:blue"></div>
	<div id="nn" style="background-color: red;height:900px;"></div>
</body>
<script type="text/javascript">
	//作为一个事件的函数来被调用
	function onc () {
		var dd = document.getElementById("nn").scrollIntoView(true);//这个意思其实就是将这个元素滚动到浏览器窗口的顶部来显示
	}
</script>
</html>
```
### children属性
由于子节点空白问题，IE和其他浏览器解释不一致。虽然可以过滤掉，但如果只是想得到有效子节点，可以使用children属性，几乎所有浏览器都支持。
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="div">
		<span>hello1</span>
		<span>hello2</span>
		<span>hello3</span>
	</div>
</body>
<script type="text/javascript">
	console.log(document.getElementById("div").children.length);//3
	console.log(document.getElementById("div").children[0].innerHTML);//hello1
</script>
</html>
```
### contains()方法
判断一个节点是不是另一个节点的后代，我们可以使用contains()方法。这个方法是IE率先使用的，开发人员无须遍历即可获取此信息
```
<script type="text/javascript">
	var div = document.getElementById("div")
	console.log(div.contains(div.firstChild));//true
</script>
```
早期的Firefox不支持这个方法，新版的支持了，其他浏览器也都支持，Safari2.x浏览器支持的有问题，无法使用。所以，必须做兼容

在Firefox的DOM3级实现中提供了一个替代的方法compareDocumentPosition()方法。这个方法确定两个节点之间的关系。
```
<script type="text/javascript">
	var div = document.getElementById("div")
	console.log(div.compareDocumentPosition(div.firstChild));//20
</script>
```
### innerText属性
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="div">
		<span>hello1</span>
		<span>hello2</span>
		<span>hello3</span>
	</div>
</body>
<script type="text/javascript">
	var div = document.getElementById("div")
	console.log(div.innerText);//获取文本内容(如有html直接过滤掉)
	div.innerText = 'Mr.Lee';//设置文本(如有html转义)

	//DOM3新属性
	console.log(div.textContent)
	div.innerText = '<html>';
</script>
</html>
```
<img src="https://wanls4583.github.io/images/posts/JavaScript学习笔记/2017-06-28-javascript笔记--（第十八章）常用DOM操作-1.jpg" alt="" />

### innerHTML属性
```
<script type="text/javascript">
	document.getElementById('div').innerHTML;//获取文本(不过滤HTML)
	document.getElementById('div').innerHTML = '<b>123</b>';//可解析HTML
</script>
```
虽然innerHTML可以插入HTML，但本身还是有一定的限制，也就是所谓的作用域元素，离开这个作用域就无效了
```
<script type="text/javascript">
	document.getElementById("div").innerHTML = "<script>alert('Lee');</script"+">";//<script>元素不能被执行
</script>
```
### outerText属性
outerText在取值的时候和innerText一样，但是赋值方法相当危险，他不单替换了文本内容，还将元素直接抹去。
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="div">
		<span>hello1</span>
		<span>hello2</span>
		<span>hello3</span>
	</div>
</body>
<script type="text/javascript">
	var div = document.getElementById("div")
	console.log(div.outerText);//获取文本内容(如有html直接过滤掉)
	div.outerText = 'Mr.Lee';//设置文本(如有html转义)
	console.log(document.getElementById("div"));//null
</script>
</html>
```
<img src="https://wanls4583.github.io/images/posts/JavaScript学习笔记/2017-06-28-javascript笔记--（第十八章）常用DOM操作-2.jpg" alt="" />

### outerHTML属性
outerHTML属性在取值和innerHTML一致，但和outerText也一样，很危险，赋值的之后会将元素抹去。
```
<script type="text/javascript">
	var div = document.getElementById("div")
	console.log(div.outerHTML);//获取文本内容(如有html直接过滤掉)
	div.outerHTML = '<b>124</b>';//设置文本(如有html转义)
	console.log(document.getElementById("div"));//null
</script>
```
关于最常用的innerHTML属性和节点操作方法的比较，在插入大量HTML标记时使用innerHTML的效率明显要高很多。因为在设置innerHTML时，会创建一个HTML解析器。这个解析器是浏览器级别的(C++编写)，因此执行JavaScript会快的多。但，创建和销毁HTML解析器也会带来性能损失。最好控制在最合理的范围内，如下：
```javascript
for (var i = 0; i < 10; i ++) {
ul.innerHTML = '<li>item</li>';//避免频繁
}
//改
for (var i = 0; i < 10; i ++) {
a = '<li>item</li>';//临时保存
}
ul.innerHTML = a;
```
