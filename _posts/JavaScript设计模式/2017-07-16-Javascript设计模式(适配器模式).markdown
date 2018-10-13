---
author: wanls4583
comments: true
date: 2017-07-16 07:25:48+00:00
layout: post
title: Javascript设计模式(适配器模式)
wordpress_id: 336
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>在计算机编程中，适配器模式（有时候也称包装样式或者包装）将一个类(对象)的接口适配成用户所期待的。一个适配允许通常因为接口(对象)不兼容而不能在一起工作的类(对象)工作在一起，做法是将类(对象)自己的接口包裹在一个已存在的类(对象)中。

从表面看，适配器模式很像门面模式。她们都要对别的对象进行包装并改变其呈现的接口。二者的区别在于她们如何改变接口：

- 门面元素展现的是一个简化的接口，她并不提供额外的选择
- 适配器则要把一个接口转换为另一个接口，她并不滤除某些能力，也不会简化接口

示例：

假设有个库的一个方法是用来打印元素内容的
```javascript
function alertCont(el){
	alert.log(el.innerHTML);
}
```
现在的需求是不改变原有库的基础上把参数换成元素id，此时就可以用到适配器了
```javascript
function alertContAdapter(id){
	alertCont(document.getElementById(id))
}
```
*使用场景*：适配器适用于客户系统期待的接口与现有API提供的接口不兼容这种场合。她只能用来协调语法上的差异问题。

