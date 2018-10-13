---
author: wanls4583
comments: true
date: 2017-07-22 14:35:41+00:00
layout: post
title: Javascript设计模式(代理模式)
wordpress_id: 384
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>代理模式的目的就是为了节制（控制）对本体对象的访问，代理对象和本体对象都实现了相同的接口。代理模式可以用来延迟对象的初始化，增强加载速度。

实例：

假设有一个书店对象，其有很多业务，加载这个书店对象需要消耗大量内存，如果程序一开始就初始化这个对象，可能会耗费珍贵的加载时间，而且真正的购买动作往往是用户选购很长时间后才发生，这时我们就可以实现一个代理对象来完成业务逻辑，等到业务正真发生时再去初始化书店对象。
```javascript
var Book = function(name,year,type,num){
	this.name = name;
	this.year = year;
	this.type = type;
	this.num = num;
}
Book.prototype.toString = function(){
	return this.name+','+this.year+','+this.type;
}
//假设BookStore是一个很大的对象
var BookStore = function(){
	this.books = [];
}
BookStore.prototype = {
	constructor: BookStore,
	sellBook: function(name,year,type){
		var book = this.findBook(name,year,type);
		if(book && book.num>1){
			book.num--;
			return book;
		}else{
			return null;
		}
	},
	addBook: function(name,year,type){
		this.books[name+year+type] = new Book(name,year,type,10000);
	},
	findBook: function(name,year,type){
		return this.books[name+year+type];
	}
	//其他的业务
}
//需要提供一个代理对象来延迟BookStore的初始化，真正用到的时候再加载，以提供程序的性能
BookStoreProxy = function(){}
BookStoreProxy.prototype = {
	constructor: BookStoreProxy,
	initialBookStore: function(){
		if(!this.bookStore){
			this.bookStore = new BookStore();
		}
	},
	sellBook: function(name,year,type){
		this.initialBookStore();
		return this.bookStore.sellBook(name,year,type);
	},
	addBook: function(name,year,type){
		this.initialBookStore();
		this.bookStore.addBook(name,year,type);
	},
	findBook: function(name,year,type){
		this.initialBookStore();
		return this.bookStore.findBook(name,year,type);
	}
	//其他的业务
}
var bookStoreProxy = new BookStoreProxy();
bookStoreProxy.addBook('JavaScript',2017,'软件');
bookStoreProxy.addBook('唐诗',2017,'文学');
bookStoreProxy.addBook('高数',2017,'数理化');
console.log(bookStoreProxy.sellBook('JavaScript',2017,'软件').toString());
```

