---
author: wanls4583
comments: true
date: 2017-06-29 11:59:03+00:00
layout: post
title: 详解vertical-algin
categories:
- CSS

tags:
- CSS
---

首先我们来看下官方给出的`line-height`属性的解释:

`line-height`属性会影响行框的布局。在应用到一个块级元素时，它定义了该元素中基线之间的最小距离而不是最大距离。`line-height` 与 `font-size` 的计算值之差（在 CSS 中成为“行间距”）分为两半，分别加到一个文本行内容的顶部和底部。可以包含这些内容的最小框就是行框。

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
</head>
<body style="margin: 0">
<div style="background: black;line-height: 100px;">
<span style="background: red;font-size: 40px">English</span>
</div>
</body>
</html>
```

根据官方的解释，div的的高度应该为100px,然而在浏览器debug模式下的高度确实108px，而且上下的半行距并不一样

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-1.png" alt="" />

这到底是为什么呢？这个问题曾困扰我很长时间，最后查了多方资料，才知道原来在HTML5文档声明下，块状元素内部的内联元素的行为表现，就好像块状元素内部还有一个（更有可能两个-前后）看不见摸不着没有宽度没有实体的空白节点，这个假想又似乎存在的空白节点，我们可以称之为“幽灵空白节点”。这个幽灵空白节点有默认的字体大小和行高，所以上面的例子其实是这样的：

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-2.jpg" alt="" />

左边框为span行内框（行内框即内联元素形成的框，包括了内联元素因为line-height形成的上下间距），右边框为幽灵空白节点的行内框，它们两的高度都是100px(父元素指定了`line-height:100px`)，因为一行内的所有内联元素都要相对父元素的基线(本行内行高最大的第一个内联元素的基线)对齐，而空白幽灵节点的默认字体小于40px，因此空白幽灵节点行内框向下移动了一点。

如果我们同时指定父元素字体的大小：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin: 0">
	<div style="background: black;line-height: 100px;font-size:40px">
		<span style="background: red;font-size:40px">English</span>
	</div>
</body>
</html>
```

此时结果和我们预期的一样了：

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-3.jpg" alt="" />

我们可以看到此时div的高度和指定的行高是一样的，之所以会这样，是因为我们给父元素加上`font-size`的时候就给幽灵空白节点指定了字体大小，只要让其字体大小和以及行高都和内联元素（该例中也就是span元素）一样，那么它们的行内框的顶部以及基线都会在同一条水平线上，也就不会上移或者下移了。（ps：家里好冷，我的双手已经快僵了）

好了，发了下牢骚，现在我们来浓重介绍下`line-height`的好基友，也就是`vertical-align`，之所以叫它们是好基友，是因为`vertical`的表现基本依赖于`line-height`。

同样，我们先来看一下官方给出的`vertial-algin`的解释：`vertial-algin`属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值，这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。

<table class="dataintable       " style="color: rgb(51, 51, 51); font-family: Arial; font-size: 14px; background-color: rgb(255, 255, 255); margin: 10px 0px 0px; padding: 0px; border: 1px solid rgb(170, 170, 170); border-collapse: collapse; width: 709px;">
	<tbody style="margin: 0px; padding: 0px; border: 0px;">
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<th style="margin: 0px; padding: 5px 15px 5px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: baseline; background-color: rgb(213, 213, 213);">
				值
			</th>
			<th style="margin: 0px; padding: 5px 15px 5px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: baseline; background-color: rgb(213, 213, 213);">
				描述
			</th>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				baseline
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				默认。元素放置在父元素的基线上。
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				sub
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				垂直对齐文本的下标。
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				super
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				垂直对齐文本的上标
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				top
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				把元素的顶端与行中最高元素的顶端对齐
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				text-top
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				把元素的顶端与父元素字体的顶端对齐
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				middle
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				把此元素放置在父元素的中部。
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				bottom
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				把元素的顶端与行中最低的元素的顶端对齐。
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				text-bottom
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				把元素的底端与父元素字体的底端对齐。
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				length
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				&nbsp;
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				%
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				使用 &quot;line-height&quot; 属性的百分比值来排列此元素。允许使用负值。
			</td>
		</tr>
		<tr style="margin: 0px; padding: 0px; border: 0px;">
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				inherit
			</td>
			<td style="margin: 0px; padding: 6px 15px 6px 6px; border: 1px solid rgb(170, 170, 170); vertical-align: text-top; background-color: rgb(239, 239, 239);">
				规定应该从父元素继承 vertical-align 属性的值。
			</td>
		</tr>
	</tbody>
</table>

根据官方的解释我们来看一个例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin: 0">
	<div style="background: black;">
		<span style="background: red;font-size:60px;line-height: 60px">English</span>
		<span style="background: #fff;font-size:20px;line-height: 60px;vertical-align: bottom">English</span>
	</div>
</body>
</html>
```
大多数情况下，我们期待的是两个English的底部应该对其，然而结果确实这样的：

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-4.png" alt="" />

两个 English 的底部并没有对其，但细心的同学可能会发现，两个内联元素是上下垂直对齐的，为什么会产生这种情况呢，我们的代码明明是指定`vertical-align:bottom`，别急，我们慢慢来分析。

首先，它们的行高是一样的，都是60px，咦，好像有点感觉了，给内联元素添加`vertical-align`样式，其基准是不是以该元素的行高（也即该元素的行内框）来算呢，没错，你猜对了，给第二个内联元素添加`vertical-align:bottom`后，它们的行内框的底部在同一条水平线上，因为他们的行高都是60px，此时他们的顶部也在同一条水平线上，因为第二个元素的上下间距是一样的，此时就产生了两个元素上下垂直居中的效果，虽然我们指定的`vertical-align:bottom`。

如果代码是这样：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin: 0">
	<div style="background: black;">
		<span style="background: red;font-size:60px;line-height: 60px">English</span>
		<span style="background: #fff;font-size:20px;line-height: 20px;vertical-align: bottom">English</span>
	</div>
</body>
</html>
```

结果就和我们预期的一样了：

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-5.png" alt="" />

这里因为第二个元素的行高为20px，和其字体的大小一样，所以其字体内容的底部刚好就是其行内框的底部，也就得到了我们想要的结果了。

好了，解决了这个问题，我们再来看一个例子：
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin: 0">
	<div style="background: black;">
		<span style="background: red;font-size:60px;line-height: 100px">English我</span>
		<span style="background: #fff;font-size:20px;line-height: 20px;vertical-align: text-bottom">English</span>
	</div>
</body>
</html>
```

按照官方表面的解释，我们期待的应该是蓝色 English 行内框的底部应该和红色红内框内容的底部对齐，然而结果是这样的：

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-6.png" alt="" />

我们可以明显的看到蓝色English并没有和红色 English 的内容的底部对齐，读到这里，可能很多同学都在想，就一个属性，咋就这么多坑呢，呵呵，其实不是坑多，而是我们没有仔细的理解css官方的释义：

<table class="dataintable     " style="border-style: solid; border-color: rgb(170, 170, 170); margin: 10px 0px 0px; padding: 0px; border-collapse: collapse; width: 709px; font-family: Verdana, Arial, 宋体; background-color: rgb(249, 249, 249);">
		<tbody style="margin: 0px; padding: 0px; border: 0px;">
			<tr style="margin: 0px; padding: 0px; border: 0px;">
				<td style="border-style: solid; border-color: rgb(170, 170, 170); margin: 0px; padding: 6px 15px 6px 6px; vertical-align: text-top; background-color: rgb(239, 239, 239);">
					text-bottom
				</td>
				<td style="border-style: solid; border-color: rgb(170, 170, 170); margin: 0px; padding: 6px 15px 6px 6px; vertical-align: text-top; background-color: rgb(239, 239, 239);">
					把元素的底端与父元素字体的底端对齐。<br />
					
				</td>
			</tr>
		</tbody>
</table>

注意这句话：父元素字体的底端。这里其实有个陷阱，它这里的对齐是根据父元素内的幽灵空白节点的底端来对齐的，在不给父元素设置字体大小和行高的情况下，幽灵空白节点有个默认的字体大小和行高，这个默认的值和红色English的行高和字体大小是不一样，这也就导致了和我们预期的结果不一样的效果。

如果我们给父元素加上行高和字体大小：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin: 0">
	<div style="background: black;font-size:60px;line-height: 100px">
		<span style="background: red;font-size:60px;line-height: 100px">English我</span>
		<span style="background: #fff;font-size:20px;line-height: 20px;vertical-align: text-bottom">English</span>
	</div>
</body>
</html>
```

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-7.png" alt="" />

此时的结果就和我们预期的一样了，之所以会这样，是因为幽灵空白节点的行高和字体大小与红色English的行高和字体大小一模一样。

属性值`top`和`text-top`，它们刚好和`bottom`以及`text-bottom`相反，我就不赘述了，关于属性值`middle、sub、supper`，我们下次再说，不知不觉以及零点了，该睡觉了，真累

接着上次的来说，我们再来看一个例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin: 0">
	<div style="background: black;font-size:60px;line-height: 100px">
		<span style="background: red;">Englishx</span><span style="background: #fff;font-size:20px;line-height: 20px;vertical-align: middle">English</span>
	</div>
</body>
</html>
```

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-8.png" alt="" />

按照官方的解释，我们可以直观的理解为蓝色 English 应该和红色 English 上下垂直对齐，但其实并没有达到我们想要的结果，因为给内联元素设置`vertical-align:middle`样式，那么其中心位置将相对于父元素基线上x的中线对齐，该x字体的大小为父元素设置的字体大小，以下例子很好的证实了这一点。

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin: 0">
	<div style="background: black;font-size:60px;line-height: 100px">
		<span style="background: red;font-size:80px;">Englishx</span><span style="background: #fff;font-size:20px;line-height: 20px;vertical-align: middle">English</span><span style="background: red;">xEnglish</span>
	</div>
</body>
</html>
```

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-9.png" alt="" />

在该例中，左边红色部分的字体为80px，右边红色部分的字体为父元素的字体大小，我们给蓝色部分设置`vertical-align:middle`，可以明显看到其中心是相对于右边红色部分的x字母的中心对其的，这也很好的说明了前面的一点（给内联元素设置`vertical-align:middle`样式，那么其中心位置将相对于父元素基线上x的中线对齐，该x字体的大小为父元素设置的字体大小）

关于`vertical-align:supper`和`vertical-align:sub`，没什么好说的，直接看例子吧：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="margin: 0">
	<div style="background: black;font-size:60px;line-height: 100px">
		<span style="background: red;">English</span><sup  style="background: red;">Englishx</sup><span style="background: #fff;font-size:20px;line-height: 20px;vertical-align: super">English</span>
	</div>
</body>
</html>
```

<img src="https://wanls4583.github.io/images/posts/CSS/2017-06-29-详解line-height与vertical-algin-10.png" alt="" />

我们可以看到，给内联元素加上`vertical-align:super`样式后，其基线会与该行内上标元素的基线对齐。需要注意的是该行内所有的上标元素的基线都在一条水平线上，就像所有的行内元素都在一条基线上一样；`vertical-align:sub`原理和`vertical-align:super`一样，它与`super`正好相反，其基线会与该行内下标标元素的基线对齐。
好了，到这里基本上算是把`line-height`和`vertical-align`讲完了，有疑问的地方可以联系作者，谢谢