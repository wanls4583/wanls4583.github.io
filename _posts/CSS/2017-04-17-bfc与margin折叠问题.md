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
![这里写图片描述](http://img.blog.csdn.net/20170417100545035?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

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
![这里写图片描述](http://img.blog.csdn.net/20170417100644771?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## bfc

### bfc的作用:

- 两列布局
- 通过使父元素bfc化，清楚内部浮动
- 通过使元素处于不同的bfc布局中，防止margin合并
- 包裹浮动的元素和margin，使内部元素不影响元素本身的margin和其他的元素的布局

## 两列布局实现原理：

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

![](https://wanls4583.github.io/images/posts/css/bfc-2.png)

如果将右边框`overflow: hidden`去掉，将会发生重叠：

![](https://wanls4583.github.io/images/posts/css/bfc-3.png)

### bfc的形成:
- 根元素，即HTML元素
- float的值不为none
- overflow的值不为visible
- display的值为inline-block、table-cell、table-caption
- position的值为absolute或fixed
