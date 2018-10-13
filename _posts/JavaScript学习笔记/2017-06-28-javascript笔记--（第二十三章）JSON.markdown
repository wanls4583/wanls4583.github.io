---
author: wanls4583
comments: true
date: 2017-06-28 10:06:09+00:00
layout: post
title: javascript笔记--（第二十三章）JSON
wordpress_id: 200
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## JSON
JSON和XML类型，都是一种结构化的数据表示方式。所以，JSON并不是JavaScript独有的数据格式，其他很多语言都可以对JSON进行解析和序列化。

## JSON语法
JSON的语法可以表示三种类型的值：简单值，对象，数组。

### 简单值
可以在JSON中表示字符串、数值、布尔值和null。但JSON不支持JavaScript中的特殊值undefined。

### 对象
JSON中的对象表示法需要加上双引号
```
<script type="text/javascript">
    {
	"name" : "Lee",//使用双引号，否则转换会出错
	"age" : 100
    }
</script>
```
### 数组
[100, "Lee", true]

一般比较常用的一种复杂形式是数组结合对象的形式：
```
<script type="text/javascript">
    [
	{
		"title" : "a",
		"num" : 1
	},
	{
		"title" : "b",
		"num" : 2
	},
	{
		"title" : "c",
		"num" : 3
	}
    ]
</script>
```
### 解析和序列化
JSON对象提供了两个方法，一个是将原生JavaScript值转换为JSON字符串：stringify()；另一个是将JSON字符串转换为JavaScript原生值：parse()。

*stringify()*

stringify()方法接受三个参数，第一个是必须的，其他两个可选。第二个参数可以是一个数组，也可以是一个函数，用于过滤结果。第三个个参数则表示是否在JSON字符串中保留缩进。
```
<script type="text/javascript">
	var box = [{name : 'a', age : 1, height : 177},{name : 'b', age : 2, height : 188}];
	var json = JSON.stringify(box, ['name'],0);//[{"name":"a"},{"name":"b"}]
	console.log(json);
</script>
```
如果不需要保留缩进，则不填即可；如果不需要过滤结果，但又要保留缩进，则讲过滤结果的参数设置为null。如果采用函数，可以进行复杂的过滤
```
<script type="text/javascript">
	var box = [{name : 'a', age : 1, height : 177},{name : 'b', age : 2, height : 188}];
	var json = JSON.stringify(box, ['name'],4);
	console.log(json);
</script>
```
运行结果
<img src="https://wanls4583.github.io/images/posts/JavaScript学习笔记/2017-06-28-javascript笔记--（第二十三章）JSON-1.jpg" alt="" />

函数不能删除键值对，只能修改，并且不能返回null或者空字符串

还有一种方法可以自定义过滤一些数据，使用toJSON()方法，可以将某一组对象里指定返回某个值。
```
<script type="text/javascript">
	var box = [{name : 'a', age : 1, height : 177, toJSON : function () {
		return this.name;
	}},{name : 'b',age : 2, height : 188, toJSON : function () {
		return this.name;
	}}];
	var json = JSON.stringify(box, function (key, value) {
		switch (key) {
			case 'name' : 
				return 'Mr. ' + value;
			case 'age' : 
				return value + 'year';
			default : 
				return value;
		}
	}, 4);
	console.log(json);
</script>
```
运行结果
<img src="https://wanls4583.github.io/images/posts/JavaScript学习笔记/2017-06-28-javascript笔记--（第二十三章）JSON-2.jpg" alt="" />

如果对象里已经有了toJSON函数，则第二个参数是无效的

*parse()*

parse()接受两个参数，第一个是必须的，第二个参数是一个函数（数组无效）
```
<script type="text/javascript">
	var box = '[{"name" : "a","age" : 1},{"name" : "b","age" : 2}]';
	var json = JSON.parse(box, function (key, value) {
		if (key == 'name') {
			return 'Mr. ' + value;
		} else {
			return value;
		}
	});
	console.log(json[0].name);
</script>
```

