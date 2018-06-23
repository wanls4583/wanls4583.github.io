---
author: wanls4583
comments: true
date: 2017-04-16
layout: post
title: css3 3d转换之perspective,perspective-origin
categories:
- CSS

tags:
- CSS
---

## perspective

> perspective 属性对于3D变形来说至关重要。该属性会设置查看者的位置，并将可视内容映射到一个视锥上，继而投到一个2D视平面上。如果不指定透视，则Z轴空间中的所有点将平铺到同一个2D视平面中，并且变换结果中将不存在景深概念。

以下为将图片沿x轴旋转一定角度的两个效果，一个设置了 perspective，一个没有设置 perspective，可以看到明显的区别。

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-16-css3 3d转换之perspective,perspective-origin-1.jpg)

上面的描述可能让人难以理解一些，其实对于 perspective 属性，我们可以简单的理解为视距，用来设置用户和元素3D空间Z平面之间的距离。而其效应由他的值来决定，值越小，用户与3D空间Z平面距离越近，视觉效果更令人印象深刻；反之，值越大，用户与3D空间Z平面距离越远，视觉效果就很小。

为了加深印象，请看以下例子：

```
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <style type="text/css">
        .wrapper {   
            width: 50%;   
            float: left;   
        }   
        .cube {   
            font-size: 4em;   
            width: 2em;   
            margin: 1.5em auto;   
            transform-style: preserve-3d;   
            transform: rotateY(45deg); 
        }   
        .side {   
            position: absolute;   
            width: 2em;   
            height: 2em;   
            background: rgba(255, 99, 71, 0.6);   
            border: 1px solid rgba(0, 0, 0, 0.5);   
            color: white;   
            text-align: center;   
            line-height: 2em;   
        }   
        .front {   
            transform: translateZ(1em);   
        }   
        .top {   
            transform: rotateX(90deg) translateZ(1em);   
        }   
        .right{   
            transform: rotateY(90deg) translateZ(1em);   
        }   
        .left {   
            transform: rotateY(-90deg) translateZ(1em);   
        }   
        .bottom{   
            transform: rotateX(-90deg) translateZ(1em);   
        }   
          
        .back {   
            transform: rotateY(-180deg) translateZ(1em);   
        }   
        .w1 {   
            perspective: 1000px; 
        }   
        .w2{   
            perspective: 200px;   
        }  
    </style>
</head>
<body>
    <div class="wrapper w1">  
        <div class="cube">  
            <div class="side  front">1</div>  
            <div class="side   back">6</div>  
            <div class="side  right">4</div>  
            <div class="side   left">3</div>  
            <div class="side    top">5</div>  
            <div class="side bottom">2</div>  
        </div>  
    </div>  
    <div class="wrapper w2">  
        <div class="cube">  
            <div class="side  front">1</div>  
            <div class="side   back">6</div>  
            <div class="side  right">4</div>  
            <div class="side   left">3</div>  
            <div class="side    top">5</div>  
            <div class="side bottom">2</div>  
        </div>  
    </div>
</body>
</html>
```
![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-16-css3 3d转换之perspective,perspective-origin-2.jpg)

为了更好的理解 perspective 属性，我们很有必要把他和 translateZ 的关系结合起来。其实也可以把 perspective 的值简单的理解为人的眼睛到显示器的距离，而 translate 就是3D物体距离源点的距离，下面引用W3C的一张图来解说 perspective 和 translateZ 的关系。

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-16-css3 3d转换之perspective,perspective-origin-3.jpg)

perspective 可以写在画布（父元素）上，也可以直接写在元素本身上，对于一张画布只有一个变型体的时候，几乎没有差别。但是当一个画布上有多个变型体的时候，两种写法的差别立即就表现出来了。就像下面这个例子，蓝色的部分，perspective 直接写在色块上，红色的部分，perspective 写在了父容器上，以画布作为透视元素，所以子元素的形态都是不一样的。

```
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <style type="text/css">
        body{
            margin: 0;
            padding: 50px 0 0 0;
        }
        .wrapper {   
            width: 45%;   
            float: left;   
        }   
        .w1 {   
            perspective: 1000px; 
            overflow: hidden;
            border:2px solid red;
            box-sizing: border-box;
            margin-left: 2.5%;
        }  
        .w2{   
            overflow: hidden;
            border:2px solid blue;
            box-sizing: border-box;
            margin-left: 5%;
        } 
        .block{
            width: 100px;
            height: 100px;
            margin: 20px;
            float: left;
            transform: rotateY(45deg);
        } 
        .w1 .block{
            background-color: red;
        }
        .w2 .block{
            transform: perspective(500px) rotateY(45deg); 
            background-color: blue;
        }
    </style>
</head>
<body>
    <div class="wrapper w1">  
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
    </div>  
    <div class="wrapper w2">  
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
    </div>
</body>
</html>
```

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-16-css3 3d转换之perspective,perspective-origin-4.jpg)

之所以会这样，是因为在父元素上设置了perspective后，所以子元素的源点都只有一个，默认为父元素的中心。而在子元素上设置 perspective，每个子元素都会有一个源点，所以表现行为都一样，关于源点，请看下面的 persepective-origin

perspective-origin

> perspective-origin属性是3D变形中另一个重要属性，主要用来决定perspective属性的源点角度。它实际上设置了X轴和Y轴位置(或者说基点)，在该位置观看者好像在观看该元素的子元素。

```css
perspective-origin: x-axis y-axis;
```

x-axis:
定义视图在x轴上的位置。默认值：50%。可能的参数值形式:left、center、right、length和%。

y-axis:
定义视图在y轴上的位置。默认值：50%。可能的参数值形式:top、center、bottom、length和%。
看了上面的介绍可能还是不够清晰，没有能在大脑中形成一个清晰的概念，那么看下面这张图片:

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-16-css3 3d转换之perspective,perspective-origin-5.jpg)
 
下面这张截在W3C官网的图可以更好的阐述这一观点：

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-16-css3 3d转换之perspective,perspective-origin-6.jpg)

接下来看几个个例子：

下面的代码和上面的那个例子基本一样，只是改变了.w1,.w2,.cube三个css样式

#### 1.源点向左偏

```css
.w1 {   
         perspective: 1000px; 
 }   
.w2{   
        perspective: 1000px;
        perspective-origin: left center;
 } 
.cube{   
        font-size: 4em;   
        width: 2em;   
        margin: 1.5em auto;   
        transform-style: preserve-3d;   
 } 
```

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-16-css3 3d转换之perspective,perspective-origin-7.jpg)

#### 2.源点向上偏

```css
.w1 {   
         perspective: 1000px; 
 }   
.w2{   
        perspective: 1000px;
        perspective-origin: center -100px;
 } 
```

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-16-css3 3d转换之perspective,perspective-origin-8.jpg)

3.源点向左偏的同时向上偏

```css
.w1 {   
         perspective: 1000px; 
 }   
.w2{   
        perspective: 1000px;
        perspective-origin: left -100px;
 } 
```

![这里写图片描述](https://wanls4583.github.io/images/posts/CSS/2017-04-16-css3 3d转换之perspective,perspective-origin-9.jpg)

可以看到，我们只是给第二个盒子加了个 perspective-origin 属性,其表现结果却和第一个盒子有很大不同，这就是 perspective-origin 改变基点的作用。

参考：

[http://www.jb51.net/css/462429.html](http://www.jb51.net/css/462429.html)
