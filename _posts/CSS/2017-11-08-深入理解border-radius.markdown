---
author: wanls4583
comments: true
date: 2017-11-08 09:55:14+00:00
layout: post
title: 深入理解border-radius
wordpress_id: 454
categories:
- CSS

tags:
- CSS

---
>border-radius具有两个特性：大值特性和等比例特性。这两个特性主要用来控制当border-radius的值大于元素的outerWidth或outerHeight时，元素边框的变形行为。

## 大值特性

当border-radius值很大的时候只会用元素的最大的宽或高(包括border)来渲染
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
<style> 
    div
    {
        border:2px solid #a1a1a1;
        height:198px;
        width:198px;
        background:#dddddd;
        overflow:hidden;
        border-radius:200px 0 0 0;
    }
</style>
</head>
<body>
    <div></div>
</body>
</html>
```
<img src="http://lisong-blog.gz.bcebos.com/border-radius-1.png?authorization=bce-auth-v1%2F99d20c83bd45422eb6ca5fe083097f9c%2F2017-11-08T09%3A51%3A30Z%2F-1%2Fhost%2F7ae9bc3c98c136091c1359ad9253557c2c421aedfe6a861d4b25fd1252d96e9e" alt="" />

改变radius的值：
```html
<style> 
    div
    {
        border:2px solid #a1a1a1;
        height:198px;
        width:198px;
        background:#dddddd;
        overflow:hidden;
        border-radius:300px 0 0 0;
    }
</style>
```
<img src="http://lisong-blog.gz.bcebos.com/border-radius-1.png?authorization=bce-auth-v1%2F99d20c83bd45422eb6ca5fe083097f9c%2F2017-11-08T09%3A51%3A30Z%2F-1%2Fhost%2F7ae9bc3c98c136091c1359ad9253557c2c421aedfe6a861d4b25fd1252d96e9e" alt="" />
可以看出两段代码的效果都是一样，因为300px已经超过了元素的outerHeight和outerWidth，所以自动变成了200px。

## 等比例特性

### 垂直半径和水平半径的等比例性

border-radius定义的某个角的垂直半径和水平半径的比例是不会变的。

其实上面的例子里也用到了这个特性，只是为了将理解力定位在最大值特性，避免等比例特性的干扰，左上角我只设置了一个值，也即垂直半径和水平半径相等，所以体现不出等比例特性，现在我们更改水平半径和垂直半径，使其不相等：
```html
<style> 
    div
    {
        border:2px solid #a1a1a1;
        height:198px;
        width:198px;
        background:#dddddd;
        overflow:hidden;
        border-radius:200px 0 0 0/400px 0 0 0;
    }
</style>
```
<img src="http://lisong-blog.gz.bcebos.com/border-radius-2.png?authorization=bce-auth-v1%2F99d20c83bd45422eb6ca5fe083097f9c%2F2017-11-08T09%3A52%3A10Z%2F-1%2Fhost%2F1524f2db2ca40fdf1fcf1be75f742fc15d38a675da539d5b944390a4e3115d95" alt="" />
根据最大值特性，垂直半径400px已经超出了元素的outerHeight，所以应该会变为元素的最大高度200px，此时由于等比例特性200/400=1/2，所以水平半径=200px*1/2=100px，所以border-radius:200px 0 0 0/400px 0 0 0其实对应于border-radius:100px 0 0 0/200px 0 0 0。
```html
<style> 
    div
    {
        border:2px solid #a1a1a1;
        height:198px;
        width:198px;
        background:#dddddd;
        overflow:hidden;
        border-radius:100px 0 0 0/200px 0 0 0;
    }
</style>
```
<img src="http://lisong-blog.gz.bcebos.com/border-radius-2.png?authorization=bce-auth-v1%2F99d20c83bd45422eb6ca5fe083097f9c%2F2017-11-08T09%3A52%3A10Z%2F-1%2Fhost%2F1524f2db2ca40fdf1fcf1be75f742fc15d38a675da539d5b944390a4e3115d95" alt="" />
从结果上也可以看出border-radius:200px 0 0 0/400px 0 0 0和border-radius:100px 0 0 0/200px 0 0 0的效果是一样的。

注意：当border-radius指定的某个角的水平半径和垂直半径都超过元素尺寸的时候，同样遵循这个两个特性。

### 相邻角的垂直（水平）半径的等比例性

当相邻角的水平（垂直）半径和超过元素的outWidth(outHeight)时候，将按照等比例缩小半径，直至两相邻角的水平（垂直）半径和等于元素的outWidth(outHeight)。
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
<style> 
    .div1
    {
        border:2px solid #a1a1a1;
        height:198px;
        width:198px;
        background:#dddddd;
        overflow:hidden;
        border-radius:300px 0 0 100px;
    }
    .div2
    {
        border:2px solid #a1a1a1;
        height:198px;
        width:198px;
        background:#dddddd;
        overflow:hidden;
        border-radius:150px 0 0 50px;
    }
</style>
</head>
<body>
    <div class="div1"></div>
    <div class="div2"></div>
</body>
</html>
```
<img src="http://lisong-blog.gz.bcebos.com/border-radius-3.png?authorization=bce-auth-v1%2F99d20c83bd45422eb6ca5fe083097f9c%2F2017-11-08T09%3A54%3A29Z%2F-1%2Fhost%2Fcbeaf2eca230f2d70b60cecf2dcd27f5eafccaa85de093f5ec43022b10d9f5b7" alt="" />
因为300+100已经超出了元素的outerWidth(200)和outerHeight(200)，所以按照等比例（3/1）缩小成了150和50，从上图也可看出效果。