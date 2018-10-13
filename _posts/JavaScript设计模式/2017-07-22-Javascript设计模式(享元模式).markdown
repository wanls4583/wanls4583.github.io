---
author: wanls4583
comments: true
date: 2017-07-22 12:57:08+00:00
layout: post
title: Javascript设计模式(享元模式)
wordpress_id: 382
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>享元模式使用共享物件，用来尽可能减少内存使用量以及分享资讯给尽可能多的相似物件；它适合用于只是因重复而导致使用无法令人接受的大量内存的大量物件。通常物件中的部分状态是可以分享。常见做法是把它们放在外部数据结构，当需要使用时再将它们传递给享元。

实例:

假设有一个书店，其有一个固定的印刷厂，书店卖的书有书名，年份，类别，购买者4个属性，其中卖的大多数书会有相同的书名、年份和类别属性，只有购买者属性不一样，这时就可以将书名、年份和类别属性放在外部的数据结构。
```javascript
var Book = function(name,year,type){
	this.name = name;
	this.year = year;
	this.type = type;
}
var BookSelled = function(book,owner){
	this.book = book;
	this.owner = owner;
}
BookSelled.prototype.toString = function(){
	return this.book.name+','+this.book.year+','+this.book.type+','+this.owner;
}
var BookFactory = function(){
	this.books = [];
}
BookFactory.prototype = {
	constructor: BookFactory,
	creatBook: function(name,year,type){
		if(!this.books[name+year+type]){
			this.books[name+year+type] = new Book(name,year,type);
		}
		return this.books[name+year+type];
	}
}
BookStore = function(bookFactory){
	this.bookFactory=bookFactory;
}
BookStore.prototype = {
	constructor: BookStore,
	sellBook: function(name,year,type,owner){
		var book = this.bookFactory.creatBook(name,year,type);
		return new BookSelled(book,owner);
	}
}
var bookStore = new BookStore(new BookFactory());
console.log(bookStore.sellBook('JavaScript',2017,'软件','lisong').toString());
console.log(bookStore.sellBook('唐诗',2017,'文学','张三').toString());
console.log(bookStore.sellBook('JavaScript',2017,'软件','用户1').toString());
console.log(bookStore.sellBook('JavaScript',2017,'软件','用户2').toString());
console.log(bookStore.sellBook('唐诗',2017,'文学','用户3').toString());
```
享元模式可以减少程序运行所需要的空间，但是相应的会增加运行的时间，需要平衡两者的关系，过分使用也不好
