---
author: wanls4583
comments: true
date: 2017-07-15 19:28:53+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/07/16/javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e7%bb%84%e5%90%88%e6%a8%a1%e5%bc%8f/
slug: javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e7%bb%84%e5%90%88%e6%a8%a1%e5%bc%8f
title: Javascript设计模式(组合模式)
wordpress_id: 319
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>组合模式，将对象组合成树形结构以表示“部分-整体”的层次结构，组合模式使得用户对单个对象和组合对象的使用具有一致性。

实例:
```javascript
var Util = {
	forEach: function(items,fn,args){
		for (var i = 0; i < items.length; i++) {
			fn.apply(items[i],args);
		}
	},
	wirteLine: function(){
		document.write('  
--------------------------------  
');
	}
}
var Compsite = function(name){
	this.childs = [];
	this.name = name;
}
Compsite.prototype.addChild = function(child){
	this.childs.push(child);
}
Compsite.prototype.doWorking = function(name){
	if(this.name === name || !name){
		//如果是叶子节点
		if(this.childs.length == 0){
			document.write(this.name+'在工作 ');
		}else{
			Util.forEach(this.childs,this.doWorking);
		}
	}else{
		Util.forEach(this.childs,this.doWorking,[name]);
	}
	
}
var company = new Compsite('公司');
var dept1 = new Compsite('部门1');
var dept2 = new Compsite('部门2');
var dept3 = new Compsite('部门3');
var ol1_1 = new Compsite('员工1_1');
var ol1_2 = new Compsite('员工1_2');
var ol2_1 = new Compsite('员工2_1');
var ol2_2 = new Compsite('员工2_2');
var ol3_1 = new Compsite('员工3_1');
var ol3_2 = new Compsite('员工3_2');

company.addChild(dept1);
company.addChild(dept2);
company.addChild(dept3);
dept1.addChild(ol1_1);
dept1.addChild(ol1_2);
dept2.addChild(ol2_1);
dept2.addChild(ol2_2);
dept3.addChild(ol3_1);
dept3.addChild(ol3_2);

company.doWorking();
Util.wirteLine();
company.doWorking('部门1');
Util.wirteLine();
company.doWorking('员工1_1');
Util.wirteLine();
dept1.doWorking('员工1_2');
Util.wirteLine();
ol3_2.doWorking();
```
在上面的实例中，公司、部门、员工都具有相同的行为，其中，公司和部门是组合对象，员工是单个对象，可以像操作单个对象一样操作组合对象。组合对象、单个对象可以继续组合成组合对象。

组合模式使用场景：

- 你想表示对象的部分-整体层次结构
- 你希望用户忽略组合对象与单个对象的不同，用户将统一地使用组合结构中的所有对象
