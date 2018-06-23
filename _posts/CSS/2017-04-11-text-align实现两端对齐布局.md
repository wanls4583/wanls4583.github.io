---
author: wanls4583
comments: true
date: 2017-04-11
layout: post
title: text-align实现两端对齐布局
categories:
- CSS

tags:
- CSS
---

`text-align:justify`

该属性和值可实现文本两端对齐

```html
<style>
div
{
    border:1px solid black;
}
</style>
</head>
<body>
<h1>CSS text-justify实例</h1>
<div>In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. 'Whenever you feel like criticizing anyone,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'</div>
<p>
</body>
```

![](https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-1.jpg)

```html
<style>
div
{
    border:1px solid black;
    text-align:justify
}
</style>
```

![](https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-2.jpg)

利用这个特性，结合`display：inline-block`可以实现两端对齐布局

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title>
<style>
.box{width:600px; padding:20px; margin:20px auto; background-color:#f0f3f9; text-align:justify;}
.list{width:120px; display:inline-block; padding-bottom:20px; text-align:center; vertical-align:top;}
.justify_fix{display:inline-block; width:100%; height:0; overflow:hidden;}/*使最后一行也可两端对齐*/
</style>
</head>
<body>
<div class="box">
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-1.jpg" />
哇哦，美女，口水，鼻血~~~</span>
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-2.jpg" />
哇哦，美女，口水，鼻血，不行了，我的小兔乱撞~~</span>
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-3.jpg" />
哇哦，美女，口水，鼻血，不行了，我的小兔乱撞~~</span>
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-4.jpg" />
哇哦，美女，口水，鼻血，不行了，我的小兔乱撞~~</span>
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-5.jpg" />
哇哦，美女，口水，鼻血，不行了，我的小兔乱撞~~</span>
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-6.jpg" />
哇哦，美女，口水，鼻血，不行了，我的小兔乱撞~~</span>
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-7.jpg" />
哇哦，美女，口水，鼻血，不行了，我的小兔乱撞~~</span>
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-8.jpg" />
哇哦，美女，口水，鼻血，不行了，我的小兔乱撞~~</span>
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-9.jpg" />
哇哦，美女，口水，鼻血，不行了，我的小兔乱撞~~</span>
    <span class="list"><img src="https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-10.jpg" />
哇哦，美女，口水，鼻血，不行了，我的小兔乱撞~~</span>
    <span class="justify_fix"></span>
</div>
</body>
</html>
```

![](https://wanls4583.github.io/images/posts/CSS/2017-04-11-text-align实现两端对齐布局-3.jpg)