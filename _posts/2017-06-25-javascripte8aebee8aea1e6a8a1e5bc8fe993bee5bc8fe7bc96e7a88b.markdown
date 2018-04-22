---
author: wanls4583
comments: true
date: 2017-06-25 07:53:06+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/25/javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e9%93%be%e5%bc%8f%e7%bc%96%e7%a8%8b/
slug: javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e9%93%be%e5%bc%8f%e7%bc%96%e7%a8%8b
title: JavaScript设计模式(链式编程)
wordpress_id: 28
tags:
- JavaScript设计模式

categories:
- JavaScript设计模式

---

>JavaScript中的链式编程比较简单，可以在对象方法里返回this对象来实现简单的链式编程，Jquery中就用到了这种编程模式。

## 简单链式编程

```javascript
var Person = function(){

}
Person.prototype.eat = function(){
	console.log('吃饭');
	return this;
}
Person.prototype.shower = function(){
	console.log('洗澡');
	return this;
}
Person.prototype.sleep = function(){
	console.log('睡觉');
	return this;
}

var man = new Person();
man.eat().shower().sleep();
```


