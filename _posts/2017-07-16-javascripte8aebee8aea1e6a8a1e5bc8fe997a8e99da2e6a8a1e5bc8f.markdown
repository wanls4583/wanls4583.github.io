---
author: wanls4583
comments: true
date: 2017-07-16 06:36:32+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/07/16/javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e9%97%a8%e9%9d%a2%e6%a8%a1%e5%bc%8f/
slug: javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e9%97%a8%e9%9d%a2%e6%a8%a1%e5%bc%8f
title: Javascript设计模式(门面模式)
wordpress_id: 328
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>门面模式，是指提供一个统一的接口去访问多个子系统的多个不同的接口，它为子系统中的一组接口提供一个统一的高层接口。使得子系统更容易使用。在JavaScript中，这些子系统可以是一段复杂的代码或者是一个复杂的函数。

*一个简单的门面模式*
```javascript
var addEvent = function(el, ty, fn){
    var cases = [
        function(el, ty, fn) { el.addEventListener(ty, fn, false); },
        function(el, ty, fn) { el.attachEvent('on'+ty, fn); },
        function(el, ty, fn) { el['on'+ty] = fn; }
    ];
    if(el.addEventListener){
        $.addEvent = cases[0];
    }else if(el.attachEvent){
        $.addEvent = cases[1];
    }else{
        $.addEvent = cases[2];
    }
    $.addEvent(el, ty, fn);
}
```
addEvent函数就是一个基本的门面，把检查代码封装在一个地方，这可以让代码变得更简洁,便于之后的重复使用。

*便利门面函数*
```javascript
function a(x){
    return x;
}
function b(x){
    return y;
}
function ab(x, y){
    a(x);
    b(y);
}
```
将多个函数组合起来，而不是将多个函数里的代码直接放在门面函数里可以使得之后的维护更加灵活。

*门面模式的使用场合*：需要重复使用一组函数或者代码

