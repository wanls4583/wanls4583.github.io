---
author: wanls4583
comments: true
date: 2018-06-05 20:15:00
layout: post
title: 前端性能优化之-force reflow
categories:
- 前端优化

tags:
- 前端优化
---

## reflow

一般来说，页面的 reflow（重排）都是异步的，但是如果在 **render 树已经更改的前提下**，我们使用 JavaScript 获取元素的一些特殊属性或者执行了某些方法，将会使 `Recalculate Style`（样式计算）或 `Layout`（布局计算）同步执行。

以下是会触发同步`Recalculate Style` 和 `Layout` 的一些常见的属性和方法。

### 元素

获取元素布局相关的属性及方法：

- elem.offsetLeft
- elem.offsetTop
- elem.offsetWidth
- elem.offsetHeight
- elem.offsetParent
- elem.clientLeft
- elem.clientTop
- elem.clientWidth
- elem.clientHeight
- elem.getClientRects()
- elem.getBoundingClientRect()

### 滚动

- elem.scrollBy()/window.scrollBy()
- elem.scrollTo()/window.scrollTo()
- elem.scrollIntoView()
- elem.scrollIntoViewIfNeeded()
- elem.scrollWidth
- elem.scrollHeight
- elem.scrollLeft
- elem.scrollTop

### getComputedStyle

执行 window.getComputedStyle(dom) 方法，并且获取某个元素的布局相关属性。如果获取的属性和布局无关，则只会触发同步 `Recalculate Style` 操作；如果获取的属性和布局相关，则会触发同步`Recalculate Style` 和 `Layout`。

布局相关属性：

- height
- width
- top
- right, bottom, left
- margin [-top, -right, -bottom, -left]
- padding [-top, -right, -bottom, -left]
- transform
- transform-origin
- perspective-origin
- translate
- rotate
- scale
- perspective-origin

执行 window.getComputedStyle(dom) 方法后，获取媒体查询相关属性也会触发同步 `Recalculate Style` 和 `Layout`

- min-width
- min-height
- max-width
- max-height
- width
- height
- aspect-ratio
- min-aspect-ratio
- max-aspect-ratio
- device-pixel-ratio
- resolution
- orientation 
- min-device-pixel-ratio
- max-device-pixel-ratio

### Window

获取 window 对象布局相关的属性：

- window.scrollX
- window.scrollY
- window.innerHeight
- window.innerWidth

## 测试

这里只对 scroll 和 getComputedStyle 进行简单的测试，其他属性方法的测试同理。

```html
<!DOCTYPE html>
<html>
<head>
	<title>reflow-test</title>
	<style type="text/css">
		.d1{
			width: 100px;
			height: 100px;
			background: red;
		}
		.d2{
			width: 110px;
			height: 110px;
			background: blue;
		}
		.outer{
			height: 400px;
			overflow: hidden;
		}
	</style>
</head>
<body>
	<div class="outer">
		<div class="d1"></div>
	</div>
	<div class="d2"></div>
	<script type="text/javascript">
		var div1 = document.querySelector('.d1');
		var div2 = document.querySelector('.d2');

		function testScr(flag){
			if(flag){
				div1.style.width = '200px';
			}else{
				div1.style.backgroundColor = 'blue';
			}
			window.scrollBy(0,0);
		}

		function testCStyle(divNum,prop,ifGet){
			var div = null;
			switch(divNum){
				case 1: div = div1;break;
				case 2: div = div2;break;
			}
			div1.style.width = '200px';
			var style = getComputedStyle(div);
			if(ifGet){
				style[prop];
			}
		}
	</script>
</body>
</html>
```
[测试代码](https://github.com/wanls4583/wanls4583.github.io/tree/master/code/%E5%89%8D%E7%AB%AF%E4%BC%98%E5%8C%96/force-reflow)

<br>**`testScr(true)` 运行结果：** 

![](http://wanls4583.github.io/images/posts/前端优化/force-reflow-1.png)

<br>**`testScr(false)` 运行结果：** 

![](http://wanls4583.github.io/images/posts/前端优化/force-reflow-2.png)

由上面的两个结果可知，如果 render 树只是普通样式发生了更改，执行 scroll 相关方法后（`window.scrollBy(0,0)` 不会滚动页面），只会触发同步 `Recalculate Style`；而如果 render 树的布局发生改变，则会触发同步 `Recalculate Style` 和 `layout`。

<br>**`testCStyle(2,'height',true)` 运行结果：** 

![](http://wanls4583.github.io/images/posts/前端优化/force-reflow-3.png)

<br>**`testCStyle(1,'backgroundColor',true)` 运行结果：** 

![](http://wanls4583.github.io/images/posts/前端优化/force-reflow-4.png)

上面两图结果说明，用 getComputedStyle 获取元素样式对象后，如果 render 树的布局有更改，此时使用样式对象获取某个元素（div1的布局并为影响到div2）的布局相关的属性，会触发同步 `Recalculate Style` 和 `layout`；而使用样式对象获取该样式对象**相关联的元素**的布局无关样式属性，只会触发同步 `Recalculate Style`。

<br>**`testCStyle(2,'backgroundColor',true)` 运行结果：** 

![](http://wanls4583.github.io/images/posts/前端优化/force-reflow-5.png)

该结果表明用 getComputedStyle 获取元素样式对象后，此时使用样式对象获取与该样式对象**无关联的元素**的布局无关样式属性，即使 render 树的布局有更改，也不会触发同步 `Recalculate Style` 或者 `layout`。

<br>**`testCStyle(1,'height',false)` 运行结果：** 

![](http://wanls4583.github.io/images/posts/前端优化/force-reflow-6.png)

该结果表明用单独的 getComputedStyle 操作并不会触发同步操作，此时必须使用该方法返回的样式对象去真正获取某些属性时候才可能会触发同步 `Recalculate Style` 或者 `layout`。

<br>**参考：**

[https://gist.github.com/paulirish/5d52fb081b3570c81e3a](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
