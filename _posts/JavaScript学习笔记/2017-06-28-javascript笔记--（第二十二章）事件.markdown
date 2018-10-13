---
author: wanls4583
comments: true
date: 2017-06-28 09:57:25+00:00
layout: post
title: javascript笔记--（第二十二章）事件
wordpress_id: 198
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## target和currentTarget的区别
currentTarget始终是监听事件者，而target是事件的真正发出者
```
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="outdiv" style="width:300px;margin-left:100px;height:300px;background-color: red">
		<div id="indiv" style="width:100px;height: 100px;background-color: blue;"></div>
	</div>
</body>
<script type="text/javascript">
	document.getElementById("outdiv").onclick = function (evt) {
		var e = evt || window.event;
		console.log(e.currentTarget);
		console.log(e.target);
	};
</script>
</html>
```
<img src="https://wanls4583.github.io/images/posts/JavaScript学习笔记/2017-06-28-javascript笔记--（第二十二章）事件-1.jpg" alt="" />

蓝色框表示点击蓝色区域时的输出，红色框表示点击红色区域时的输出。

## 事件流
事件流是描述的从页面接受事件的顺序，当几个都具有事件的元素层叠在一起的时候，那么你点击其中一个元素，并不是只有当前被点击的元素会触发事件，而层叠在你点击范围的所有元素都会触发事件。事件流包括两种模式：冒泡和捕获。

事件冒泡，是从里往外逐个触发。事件捕获，是从外往里逐个触发。那么现代的浏览器默认情况下都是冒泡模型，而捕获模式则是早期的Netscape默认情况。而现在的浏览器要使用DOM2级模型的事件绑定机制才能手动定义事件流模式。

<img src="https://wanls4583.github.io/images/posts/JavaScript学习笔记/2017-06-28-javascript笔记--（第二十二章）事件-2.jpg" alt="" />

在阻止冒泡的过程中，W3C和IE采用的不同的方法，那么我们必须做一下兼容。
```
<script type="text/javascript">
    function stopPro(evt) {
	var e = evt || window.event;
	window.event ? e.cancelBubble = true : e.stopPropagation(); 
    }
</script>
```
## 事件绑定

### 传统事件绑定的问题
前面定义的事件函数会被后面定义的事件函数覆盖
```
<script type="text/javascript">
   window.onload = function () {//第一组程序项目或第一个JS文件
	alert('Lee');
   };

   window.onload = function () {//第二组程序项目或第二个JS文件,会覆盖上面的函数
	alert('Mr.Lee');
   };
</script>
```
解决覆盖问题
```
<script type="text/javascript">
	function addEvent(obj, type, fn) {//取代传统事件处理函数
		var saved = null;//保存每次触发的事件处理函数
		if (typeof obj['on' + type] == 'function') {//判断是不是事件
			saved = obj['on' + type];//如果有，保存起来
		}
		obj['on' + type] = function () {	
		if (saved) saved();//执行上一个	
			fn.call(this);//执行函数，把this传递过去
		};
	}
	var box = document.getElementById("outdiv");
	addEvent(box,"click",function(){
		console.log("fun1");
	});
	addEvent(box,"click",function(){
		console.log("fun2");
	});
	addEvent(box,"click",function(){
		console.log("fun3");
	});
</script>
```
## W3C事件处理函数
“DOM2级事件”定义了两个方法，用于添加事件和删除事件处理程序的操作：addEventListener()和removeEventListener()。所有DOM节点中都包含这两个方法，并且它们都接受3个参数；事件名、函数、冒泡或捕获的布尔值(true表示捕获，false表示冒泡)。
```
<script type="text/javascript">
    window.addEventListener('load', function () {
	alert('Lee');
    }, false);

    window.addEventListener('load', function () {
	alert('Mr.Lee');
    }, false);
</script>
```
W3C的现代事件绑定比我们自定义的好处就是：1.不需要自定义了；2.可以屏蔽相同的函数；3.可以设置冒泡和捕获。
window.addEventListener('load', init, false);//第一次执行了
window.addEventListener('load', init, false);//第二次被屏蔽了

## IE事件处理函数
IE实现了与DOM中类似的两个方法：attachEvent()和detachEvent()。这两个方法接受相同的参数：事件名称和函数。

在使用这两组函数的时候，先把区别说一下：

- IE不支持捕获，只支持冒泡；
- IE添加事件不能屏蔽重复的函数；
- IE中的this指向的是window而不是DOM对象。
- 在传统事件上，IE是无法接受到event对象的，但使用了attchEvent()却可以，但有些区别。

函数重复问题
```
<script type="text/javascript">
	var box = document.getElementById("outdiv");
	box.attachEvent('onclick', init);
	box.attachEvent('onclick', init);
	function init(){
		alert("init")
	}
</script>
```
this问题
```
<script type="text/javascript">
	var box = document.getElementById("outdiv");
	box.attachEvent('onclick', function () {
		alert(this === window);//this指向的window
	});
	box.attachEvent('onclick', function () {		
		toBlue.call(box);//可以把this直接call过去
	});
</script>
```
event对象传参
```
<script type="text/javascript">
	var box = document.getElementById("outdiv");
	box.onclick = function (evt) {
		alert(evt);//undefined
	};
	//定义了传统事件后，还可以继续绑定事件，不会覆盖
	box.attachEvent('onclick', function (evt) {
		alert(evt);//object
		alert(evt.type);//click	
	});
</script>
```
PS：IE中的事件绑定函数attachEvent()和detachEvent()可能在实践中不去使用，有几个原因：1.IE9就将全面支持W3C中的事件绑定函数；2.IE的事件绑定函数无法传递this；3.IE的事件绑定函数不支持捕获；4.同一个函数注册绑定后，没有屏蔽掉；5.有内存泄漏的问题。

## 事件对象的其他补充
relatedTarget属性

在W3C提供了一个属性：relatedTarget；这个属性可以在mouseover和mouseout事件中获取从哪里移入和从哪里移出的DOM对象。
```
<script type="text/javascript">
	var box = document.getElementById("indiv");
	box.onmouseover = function (evt) {//鼠标移入box
		console.log(evt.relatedTarget);//获取移入box最近的那个元素对象
	}

	box.onmouseout = function (evt) {//鼠标移出box
		console.log(evt.relatedTarget);//获取移出box最近的那个元素对象
	}
</script>
```
IE提供了两组分别用于移入移出的属性：fromElement和toElement，分别对应mouseover和mouseout。
```
<script type="text/javascript">
	var box = document.getElementById("indiv");
	box.onmouseover = function (evt) {//鼠标移入box
		console.log(window.event.fromElement.tagName);//获取移入box最近的那个元素对象span
	}

	box.onmouseout = function (evt) {//鼠标移入box
		console.log(window.event.toElement.tagName);//获取移入box最近的那个元素对象span
	}
</script>
```
组织浏览器默认行为
```
<script type="text/javascript">
	link.onclick = function () {
		alert('Lee');
		return false;//直接给个假，就不会跳转了。
	};
	link.onclick = function (evt) {
		evt.preventDefault();//W3C，阻止默认行为，放哪里都可以
		alert('Lee');
	};
	link.onclick = function (evt) {	//IE，阻止默认行为
		window.event.returnValue = false;
		alert('Lee');
	};
</script>
```
阻止右键菜单
```
<script type="text/javascript">
	document.addEventListener("contextmenu",function(event){
		event.preventDefault();
		console.log("hehe");
	},false);
</script>
```
卸载前事件：beforeunload

用beforeunload事件，在某些浏览器上（chrome、ie、firefox）可以监听到浏览器关闭操作，能够在关闭之前，弹出一个对话框，让用户选择是否关闭
```
<script type="text/javascript">
	window.addEventListener("beforeunload", function (e) {
  		var confirmationMessage = '确定离开此页吗？本页不需要刷新或后退';
		 (e || window.event).returnValue = confirmationMessage; // Gecko and Trident
		 return confirmationMessage;// Gecko and WebKit
	});
</script>
```


