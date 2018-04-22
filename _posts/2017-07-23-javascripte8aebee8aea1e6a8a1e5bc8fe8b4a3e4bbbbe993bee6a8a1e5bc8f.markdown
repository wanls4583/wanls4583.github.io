---
author: wanls4583
comments: true
date: 2017-07-23 08:21:52+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/07/23/javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e8%b4%a3%e4%bb%bb%e9%93%be%e6%a8%a1%e5%bc%8f/
slug: javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e8%b4%a3%e4%bb%bb%e9%93%be%e6%a8%a1%e5%bc%8f
title: Javascript设计模式(责任链模式)
wordpress_id: 393
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>在责任链模式中：发送者知道链中的第一个接受者;它向这个接受者发出请求,每一个接受者都对请求进行分析，要么处理它，要么往下传递;每一个接受者知道的其他对象只有一个，即它的下家对象;如果没有任何接受者处理请求，那么请求将从链上离开，不同的实现对此有不同的反应。

实例：
```javascript
//任务发送者
var Assign = function(task){
	this.task = task ;
};
//任务接受者
var Reciever = function(name,cando){
	this.name = name;
	this.cando = cando;
}
Reciever.prototype = {
	constructor: Reciever,
	execute: function(assign){
		if(this.cando == assign.task){
			console.log(this.name+'负责'+assign.task);
		}else if(this.successor){
			this.successor.execute(assign);
		}
	},
	//设置责任链的配置函数
	setSuccessor:function(successor){
		this.successor = successor;
		return successor;
	}
}
var assign = new Assign('js');
var rec1 = new Reciever('员工1','java');
var rec2 = new Reciever('员工2','ui');
var rec3 = new Reciever('员工3','js');
var rec4 = new Reciever('员工4','c++');

rec1.setSuccessor(rec2).setSuccessor(rec3).setSuccessor(rec4);
rec1.execute(assign);
```

