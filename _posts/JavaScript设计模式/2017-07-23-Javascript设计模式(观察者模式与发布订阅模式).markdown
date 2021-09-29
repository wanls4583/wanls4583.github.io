---
author: wanls4583
comments: true
date: 2017-07-23 05:45:37+00:00
layout: post
title: Javascript设计模式(观察者模式与发布订阅模式)
wordpress_id: 389
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>观察者和发布订阅模式设计模式定义了对象间的一种一对多的依赖关系，以便一个对象的状态发生变化时，所有依赖于它的对象都得到通知并自动刷新。此种模式通常被用来实现事件处理系统。

观察者模式实例:
```javascript
//被观察者(主体对象)
function Observable(){
    this.obs = [];//存储观察者列表
}
Observable.prototype.attach = function(ob){
    this.obs.push(ob);
    return this;
}
Observable.prototype.notify = function(){
    this.obs.forEach(function(ob){
        ob.update();
    })
}
//观察者对象
function Watcher(name){
    this.name = name
}
Watcher.prototype.update = function(){
    console.log(this.name);
}

var subject = new Observable();
var ob1 = new Watcher('1');
var ob2 = new Watcher('2');
subject.attach(ob1).attach(ob2);
subject.notify();
```
发布订阅模式实例:
```javascript
function Event(){
    this.subs = {};
}

Event.prototype.on = function(name,cb){
    if(!this.subs[name]){
        this.subs[name]=cb;
    }
}

Event.prototype.trigger = function(name){
    if(name){
        this.subs[name]()
    }else{
        for(var key in this.subs){
            this.subs[key]()
        }
    }
}

var e = new Event();
e.on('e1',function(){
    console.log('e1');
})
e.on('e2',function(){
    console.log('e2');
})
e.trigger('e1');
e.trigger();
```
可以看到，观察者模式和发布订阅模式还是有一些区别的，在观察者模式中，至少需要两个对象（主体对象即被观察者和观察者），所有观察者都需要实现一个统一的接口（update）供被观察者调用，观察者和被观察者存在一定的联系；而发布订阅模式则没有此种限制。
