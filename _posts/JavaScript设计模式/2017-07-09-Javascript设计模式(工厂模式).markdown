---
author: wanls4583
comments: true
date: 2017-07-09 05:54:21+00:00
layout: post
title: Javascript设计模式(工厂模式)
wordpress_id: 306
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>工厂设计模式分为简单工厂和抽象工厂，简单工厂即将生产实例的方法分离出来，抽象工厂会抽象出一个方法来生产实例，而真正的实现则交给子类去实现。

### 未使用工厂模式:
```javascript
var Dell = function(){
	console.log('戴尔电脑');
}
var Lenovo = function(){
	console.log('联想电脑');
}
var ComputerShop = function(){};
ComputerShop.prototype={
	Constructor : ComputerShop,
	//卖电脑
	sellComputer : function(type){
		var computer = null;
		if(type=='Dell'){
			computer = new Dell();
		}
		else if(type=='Lenovo'){
			computer = new Lenovo();
		}
		return computer;
	},
	//维修电脑
	service : function(){
		console.log('维修电脑')
	}
	//其他服务....
}
new ComputerShop().sellComputer('Dell');
```
### 简单工厂模式
```javascript
var Dell = function(){
	console.log('戴尔电脑');
}
var Lenovo = function(){
	console.log('联想电脑');
}
var ComputerFactory = {
	createComputer : function(type){
		var computer = null;
		if(type=='Dell'){
			computer = new Dell();
		}
		else if(type=='Lenovo'){
			computer = new Lenovo();
		}
		return computer;
	}
}

var ComputerShop = function(){};
ComputerShop.prototype={
	Constructor : ComputerShop,
	//卖电脑
	sellComputer : function(type){
		//交给工厂去生产实例
		return ComputerFactory.createComputer(type);
	},
	//维修电脑
	service : function(){
		console.log('维修电脑')
	}
	//其他服务....
}
new ComputerShop().sellComputer('Dell');
```
简单工厂可以由动态工厂来实现
### 抽象工厂模式
```javascript
var BH = {
	extend:function(me,superConstructor){
		var F = function(){};
		F.prototype = superConstructor.prototype;
		me.prototype = new F();
		me.prototype.Constructor = me;
	}
}
var Dell = function(){
	console.log('戴尔电脑');
}
var Lenovo = function(){
	console.log('联想电脑');
}
var ComputerShop = function(){};
ComputerShop.prototype={
	Constructor : ComputerShop,
	//卖电脑
	sellComputer : function(type){
		throw Error('抽象工厂不能实例化类');
	},
	//维修电脑
	service : function(){
		console.log('维修电脑')
	}
	//其他服务....
}
var DellComputerShop = function(){}
BH.extend(DellComputerShop,ComputerShop);
DellComputerShop.prototype.sellComputer = function(){
	return new Dell();
}
new DellComputerShop().sellComputer();
```
