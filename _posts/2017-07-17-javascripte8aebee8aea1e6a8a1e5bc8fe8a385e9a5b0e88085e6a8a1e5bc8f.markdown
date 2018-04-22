---
author: wanls4583
comments: true
date: 2017-07-17 13:13:15+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/07/17/javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e8%a3%85%e9%a5%b0%e8%80%85%e6%a8%a1%e5%bc%8f/
slug: javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e8%a3%85%e9%a5%b0%e8%80%85%e6%a8%a1%e5%bc%8f
title: Javascript设计模式(装饰者模式)
wordpress_id: 350
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>装饰者模式可以在保证不改变原有对象的基础上，去扩展一些原有的方法

```javascript
var BH = {
    extend:function(me,superConstructor){
        var F = function(){};
        F.prototype = superConstructor.prototype;
        me.prototype = new F();
        me.prototype.constructor = me;
        me.superClass = superConstructor.prototype;
    }
}
var Programmer = function(programmer){
	this.programmer =programmer;
}
Programmer.prototype = {
	constructor : Programmer,
	skill : function(){
		return '会用电脑 ';
	}
}

var JsProgrammer = function(programmer){
	JsProgrammer.superClass.constructor.call(this,programmer);
}
BH.extend(JsProgrammer,Programmer);
JsProgrammer.prototype = {
	constructor: JsProgrammer,
	skill : function(){
		return this.programmer.skill()+',会javascript ';
	}
}


var JavaProgrammer = function(programmer){
	JsProgrammer.superClass.constructor.call(this,programmer);
}
BH.extend(JavaProgrammer,Programmer);
JavaProgrammer.prototype = {
	constructor: JavaProgrammer,
	skill : function(){
		return this.programmer.skill()+',会java ';
	}
}


var programmer = new Programmer();
document.write(programmer.skill());
document.write('  
--------------------------------  
');

var programmer = new JsProgrammer(programmer);
document.write(programmer.skill());
document.write('  
--------------------------------  
');

var programmer = new JavaProgrammer(programmer);
document.write(programmer.skill());
document.write('  
--------------------------------  
');
```
