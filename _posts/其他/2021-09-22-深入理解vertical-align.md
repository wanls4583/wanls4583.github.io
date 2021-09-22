---
author: wanls4583
comments: true
date: 2021-09-12
layout: post
title: 深入理解vertical-align
categories:
- 其他

tags:
- 其他
---

### 术语

- 非替换元素：如果元素的内容包含在文档中，则称之为非替换元素。

- 替换元素：指作为其他内容占位符的一个元素(`<img>`、`<video>`、`<audio>`等)。但，`inline-block`元素在布局中也当作替换元素处理。所以，又包含大量的表单类元素及表格类元素。

- em框 ：em框在字体中定义，也称为字符框(character box)。实际的字形可能比其em框更高或更矮。在CSS中，`font-size`的值确定了各个em框的高度。

- 内容区：在非替换元素中，内容区是元素中各字符的em框串在一起构成的框；而在替换元素中，内容区就是元素的固有高度再加上可能有的外边距、边框或内边距。内容区类似于一个块级元素的内容框(`content box`)。

- 行间距：行间距(leading)是font-size和line-height之差。这个差实际上要分为两半，分别应用到内容区的顶部和底部（注意：行间距只应用于非替换元素）。

- 行内框：行内框通过向内容区增加行间距来描述。对于非替换元素，元素行内框的高度等于`line-height`的高度；对于替换元素，元素行内框的高度则恰好等于内容区的高度，因为行间距不应用到替换元素（注意：行内框的区域与内联元素背景颜色所在的区域无关）。

- 行框：行框是包含该行中出现的行内框的最高点和最低点的最小框。换句话说，行框的上边界要位于最高行内框的上边界；而行框的底边要放在最低行内框的下边界。

![](https://wanls4583.github.io/images/posts/其他/深入理解vertical-align/line-box.jpg)


### baseline

字母x的下边缘（线）就是基线

![](https://wanls4583.github.io/images/posts/其他/深入理解vertical-align/baseline.png)

`baseline`的确定规则：

- inline-table元素的baseline是它的table第一行的baseline。

- 父元素【line box】的baseline是最后一个inline box 的baseline。 

- inline-block元素的baseline确定规则：

  - 规则1：`inline-block`元素，如果内部有`line box`，则`inline-block`元素的`baseline`就是最后一个作为内容存在的元素[inline box]的`baseline`，而这个元素的`baseline`的确定就要根据它自身来定了。

  - 规则2：`inline-block`元素，如果其内部没有`line box`或它的`overflow`属性不是`visible`，那么`baseline`将是这个`inline-block`元素的底`margin`边界。具体情况如[【示例1】](#test1)。

  示例1：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            bottom: 0;
        }

        .wrap {
            line-height: 100px;
            background-color: gold;
            font-size: 20px;
            color: #ffffff;
        }

        .wrap span {
            background-color: red;
        }

        .div1 {
            position: relative;
            display: inline-block;
            width: 200px;
            height: 200px;
            border: 10px solid red;
            padding: 10px;
            margin: 10px;
        }
    </style>
</head>

<body>
    <div class="wrap">
        <div class="div1"></div>
        <div class="div1" style="overflow:hidden">
            <span>x</span>
        </div>
        <div class="div1">
            <span>x</span>
        </div>
        <span>x</span>
    </div>
</body>

</html>
```

结果：

![](https://wanls4583.github.io/images/posts/其他/深入理解vertical-align/vertical-align-baseline.png)

### vertical-align：middle

将元素盒子的垂直中点（不再考虑盒子的baseline）与父盒子的baseline加上父盒子的x-height的一半位置对齐。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            bottom: 0;
        }

        .wrap {
            line-height: 100px;
            background-color: gold;
            font-size: 20px;
            color: #ffffff;
        }

        .wrap span {
            background-color: red;
        }

        .div1 {
            position: relative;
            display: inline-block;
            width: 200px;
            height: 200px;
            border: 10px solid red;
            padding: 10px;
            margin: 10px;
        }

        .div2 {
            height: 50%;
            background-color: blue;
        }

        .line {
            position: absolute;
            top: 50%;
            border-top: 1px solid blue;
            width: 300px;
        }
    </style>
</head>

<body>
    <div class="wrap">
        <div class="div1" style="vertical-align:middle">
            <div class="div2">xhj</div>
            <i class="line"></i>
        </div>
        <span>xhj</span>
        <span style="font-size:100px;">xhj</span>
    </div>
</body>

</html>
```

结果：

![](https://wanls4583.github.io/images/posts/其他/深入理解vertical-align/vertical-align-middle.png)

### vertical-align：top

将盒子的顶端(`margin-top`边界)与父盒子的内容框顶端对齐。

```html
<div class="wrap">
    <div class="div1" style="vertical-align:top">
        <div class="div2"></div>
        <i class="line"></i>
    </div>
    <span>xhj</span>
    <span class="child" style="font-size:100px;">xhj</span>
</div>
```

结果：

![](https://wanls4583.github.io/images/posts/其他/深入理解vertical-align/vertical-align-top.png)

结果解释：由于`.wrap`的`line-height`为`50px`，而`.child`的默认行高大于`50px`，因此其顶部将被有一部分溢出容器。

### vertical-align：text-top

将盒子的顶端(`margin-top`边界)与父盒子的`em`框顶端对齐。

```html
<div class="wrap">
    <div class="div1" style="vertical-align:text-top">
        <div class="div2"></div>
        <i class="line"></i>
    </div>
    <span>xhj</span>
    <span class="child" style="font-size:100px;">xhj</span>
</div>
```

结果：

![](https://wanls4583.github.io/images/posts/其他/深入理解vertical-align/vertical-align-text-top.png)

### vertical-align：bottom

将盒子的顶端(`margin-bottom`边界)与父盒子的内容框底端对齐。

```html
<div class="wrap">
    <div class="div1" style="vertical-align:bottom">
        <div class="div2"></div>
        <i class="line"></i>
    </div>
    <span>xhj</span>
    <span class="child" style="font-size:100px;">xhj</span>
</div>
```

结果：

![](https://wanls4583.github.io/images/posts/其他/深入理解vertical-align/vertical-align-bottom.png)

### vertical-align：text-bottom

将盒子的底端(`margin-bottom`边界)与父盒子的`em`框底端对齐。

```html
<div class="wrap">
    <div class="div1" style="vertical-align:text-bottom">
        <div class="div2"></div>
        <i class="line"></i>
    </div>
    <span>xhj</span>
    <span class="child" style="font-size:100px;">xhj</span>
</div>
```

结果：

![](https://wanls4583.github.io/images/posts/其他/深入理解vertical-align/vertical-align-text-bottom.png)
