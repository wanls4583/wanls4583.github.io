---
author: wanls4583
comments: true
date: 2017-04-17
layout: post
title: bfc与margin折叠问题
categories:
- CSS

tags:
- CSS
---

> 在解释BFC之前，先说一下文档流。我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指BFC中的FC。FC是formatting context的首字母缩写，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的 FC 有 BFC、IFC，还有 GFC 和 FFC。BFC 是 block formatting context，也就是块级格式化上下文，是用于布局块级盒子的一块渲染区域。

## BFC

BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。它与普通的块框类似，但不同之处在于:
- 可以阻止元素被浮动元素覆盖
- 可以包含浮动元素
- 属于同一个 BFC 的两个相邻块级子元素的上下 margin 会发生重叠。所以当两个相邻块级子元素分属于不同的BFC时可以阻止 margin 重叠

### BFC 的形成:
- 根元素，即HTML元素
- float的值不为none
- overflow的值不为visible
- display的值为inline-block、table-cell、table-caption
- position的值为absolute或fixed

### 两列布局实现原理：

使左边框浮动（浮动形成 BFC），通过`overflow: hidden`使右边框形成 BFC，由于 BFC 之间不会重叠，迫使右边框宽度缩短，从而形成了两列布局的效果。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .main{
            margin: 0;
            padding: 0;
        }
        .left{
            float: left;
            width: 200px;
            background: blue;
            margin-right: 20px;
        }
        .right{
            height: 100px;
            overflow: hidden;
            background: red;
            word-wrap:break-word
        }
    </style>
</head>
<body>
    <div class="main">
        <div class="left">this is left</div>
        <div class="right">this is right</div>
    </div>
</body>
</html>
```

**结果：**

![](https://wanls4583.github.io/images/posts/CSS/bfc-2.png)

如果将右边框`overflow: hidden`去掉，将会发生重叠：

![](https://wanls4583.github.io/images/posts/CSS/bfc-3.png)

## 边距折叠

- 边距折叠只会发生在上下边距，左右边距是不会发生折叠的
- 边距折叠只发生邻接的上下边距中，也即兄弟节点或者父子节点
- 发生边距折叠的两个节点必须同处于一个bfc布局中
- 发生边距折叠的两个父子节点没有border或者padding隔开
- 只有普通文档流中块框的垂直外边距才会发生外边距合并，行内框、浮动框- 或绝对定位之间的外边距不会合并。

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		body{
			padding: 0;
			margin: 0;
		}
		.d1{
			height: 100px;
			width: 1000px;
			background: red;
			margin: 10px
		}
		.d2{
			height: 100px;
			width: 1000px;
			background: blue;
			margin: 10px;
			display: inline-block;
		}
	</style>
</head>
<body>
	<div class="d1"></div>
	<div class="d2"></div>
</body>
</html>
```

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-17-bfc与margin折叠问题-1.jpg)

将行内块换成浮动块：

```css
.d2{
	height: 100px;
	width: 1000px;
	background: blue;
	margin: 10px;
	float: left;
}
```

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-17-bfc与margin折叠问题-2.jpg)
