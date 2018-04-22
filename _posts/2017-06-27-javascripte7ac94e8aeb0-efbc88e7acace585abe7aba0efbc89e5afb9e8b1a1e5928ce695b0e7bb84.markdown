---
author: wanls4583
comments: true
date: 2017-06-27 08:53:37+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/27/javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%85%ab%e7%ab%a0%ef%bc%89%e5%af%b9%e8%b1%a1%e5%92%8c%e6%95%b0%e7%bb%84/
slug: javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%85%ab%e7%ab%a0%ef%bc%89%e5%af%b9%e8%b1%a1%e5%92%8c%e6%95%b0%e7%bb%84
title: javascript笔记--（第八章）对象和数组
wordpress_id: 129
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## Object类型

```
<script type="text/javascript">
	var box = new Object();
	box.name = "box";

	var box1 = new Object; // 可以省略()
	box1.name = "box1";

	var box2 = Object();//可以省略new
	box2.name = "box2";

	var box3= {'name':"box3"};//key可以加引号

	console.log(box.name);
	console.log(box1['name']) //可以用[]输出属性值
	console.log(box2.name);
	console.log(box3.name);

	delete box.name;//删除name属性
	console.log(box.name) //undefined
</script>
```

## Array类型

```
<script type="text/javascript">
	var box = new Array();	//创建了一个数组
	var box = new Array(10);  //创建一个包含10个元素的数组
	var box = new Array('李炎恢',28,'教师','盐城');	//创建一个数组并分配好了元素
	var box = Array();	//可以省略new关键字
	var box = ['李炎恢',28,'教师','盐城'];  //使用字面量定义数组，不会调用Array构造函数(Firefox除外)
</script>
```

对象或数组都具有toLocaleString()、toString()和valueOf()方法。这三个方法都可以重写

```
<script type="text/javascript">
	var box = ['李松',26,'程序员'];  //使用字面量定义数组，不会调用Array构造函数(Firefox除外)
	console.log(box.valueOf()); //["李松", 26, "程序员"]
	console.log(box.toString()); //李松,26,程序员
	console.log(box.toLocaleString()); //李松,26,程序员
	box.valueOf = function(){
		return "lisong_1";
	}
	box.toString = function(){
		return "lisong_2";
	};
	box.toLocaleString = function(){
		return "lisong_3";
	}
	console.log(box.valueOf()); //lisong_1
	console.log(box.toString()); //lisong_2
	console.log(box.toLocaleString()); //lisong_3

	console.log(box.join("|")) //李松|26|程序员//可以指定连接符
</script>
```

### 数组栈方法

push()方法可以接收任意数量的参数，把它们逐个添加到数组的末尾，并返回修改后数组的长度。而pop()方法则从数组末尾移除最后一个元素，减少数组的length值，然后返回移除的元素。

```
<script type="text/javascript">
	var box = [];
	console.log(box.push('李松',26,'程序员'));//3,添加元素并返回数组长度
	console.log(box);//["李松", 26, "程序员"]

	console.log(box.pop());//程序员,删除栈顶元素并返回删除的元素
	console.log(box);//["李松", 26]
</script>
```

### 数组的队列方法

栈方法是后进先出，而列队方法就是先进先出。列队在数组的末端添加元素，从数组的前端移除元素。通过push()向数组末端添加一个元素，然后通过shift()方法从数组前端移除一个元素。 ECMAScript还为数组提供了一个unshift()方法，它和shift()方法的功能完全相反。unshift()方法为数组的前端添加一个元素

```
<script type="text/javascript">
	var box = [];
	console.log(box.push('李松',26,'程序员'));//3,添加元素并返回数组长度
	console.log(box);//["李松", 26, "程序员"]

	console.log(box.shift());//李松,移除队头元素并返回
	console.log(box);//[26,"程序员"]

	console.log(box.unshift("李松","耒阳"));//4,在队头添加元素并返回添加后的数组长度
	console.log(box);//console.log(box);
</script>
```

<font style='background:#eee'>PS：IE浏览器对unshift()方法总是返回undefined而不是数组的新长度。</font>

### 数组的重排序方法

数组中已经存在两个可以直接用来排序的方法：reverse()和sort()，这两个方法将改变源数组。

```
<script type="text/javascript">
	var box = [1,3,4,2];
	box.reverse(); //将数组逆序
	console.log(box); //[2, 4, 3, 1]

	box.sort(); //默认从小到大排序
	console.log(box); //[1, 2, 3, 4]

	box.reverse(); //将数组逆序
	console.log(box); //[4, 3, 2, 1]

	function mySort(value1,value2){
		if(value1<value2)
			return -1;
		else if(value1 == value2)
			return 0;
		else
			return 1;
	}
	box.sort(mySort); //自定义排序
	console.log(box); //[1, 2, 3, 4]
</script>
```

### 数组的操作方法

ECMAScript为操作已经包含在数组中的元素提供了很多方法。concat()方法可以基于当前数组创建一个新数组。slice()方法可以基于当前数组获取指定区域元素并创建一个新数组。splice()主要用途是向数组的中部插入或删除元素。

*concat函数：*

```
<script type="text/javascript">
	var box = ["李松",26,"程序员"];
	var box2 = box.concat("耒阳","黄市");
	console.log(box2); //["李松", 26, "程序员", "耒阳", "黄市"]
	console.log(box); //["李松", 26, "程序员"]，当前数组没有变化
</script>
```

*slice函数:*

<table class="dataintable          " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th class="no_wrap" style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); white-space:nowrap; vertical-align:baseline; background-color:rgb(213,213,213)">
					参数
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					描述
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					start
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					end
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
				</td>
			</tr>
		</tbody>
</table>

<h3 style="margin:20px 0px 0px; padding:0px; border:0px">
	<span style="font-size:10px">返回值</span>
</h3>
返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。

```
<script type="text/javascript">
	var box = ["李松",26,"程序员"];
	var box2 = box.slice(1,2); //2是结束下标（不包括）
	console.log(box2); //26]
	console.log(box); //["李松", 26, "程序员"]，当前数组没有变化

	box2 = box.slice(-3,-1);
	console.log(box2); //["李松",26]，倒数第三个开始，倒数第一个结束

	box2 = box.slice(3,1);
	console.log(box2); //[]，开始下标在结束下标之后，将返回空数组

	box2 = box.slice(-1,-3);
	console.log(box2); //[]，开始下标在结束下标之后，将返回空数组
</script>
```

*splice函数：*

PS：该方法会改变原始数组

<table class="dataintable          " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:155px; background-color:rgb(213,213,213)">
					参数
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					描述
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					index
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					howmany
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					必需。要删除的项目数量。如果设置为 0，则不会删除项目。
				</td>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					item1, ..., itemX
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					可选。向数组添加的新项目。
				</td>
			</tr>
		</tbody>
</table>

<h3 style="margin:20px 0px 0px; padding:0px; border:0px">
		<span style="font-size:10px">返回值</span>
</h3>
<table class="dataintable          " style="margin:10px 0px 0px; padding:0px; border:1px solid rgb(170,170,170); border-collapse:collapse; width:709px; color:rgb(0,0,0); font-family:Verdana,Arial,宋体; font-size:12px; background-color:rgb(249,249,249)">
		<tbody style="margin:0px; padding:0px; border:0px">
			<tr style="margin:0px; padding:0px; border:0px">
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; width:155px; background-color:rgb(213,213,213)">
					类型
				</th>
				<th style="margin:0px; padding:5px 15px 5px 6px; border:1px solid rgb(170,170,170); vertical-align:baseline; background-color:rgb(213,213,213)">
					描述
				</th>
			</tr>
			<tr style="margin:0px; padding:0px; border:0px">
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					Array
				</td>
				<td style="margin:0px; padding:6px 15px 6px 6px; border:1px solid rgb(170,170,170); vertical-align:text-top; background-color:rgb(239,239,239)">
					包含被删除项目的新数组，如果有的话。
				</td>
			</tr>
		</tbody>
</table>
<h3 style="margin:20px 0px 0px; padding:0px; border:0px">
		<span style="font-size:10px">说明</span>
</h3>
splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。如果只有第一个参数，则将删除index开始位置之后的所有元素。

```
<script type="text/javascript">
    var box = ["李松",26,"程序员"];
    var box2 = box.splice(1,2,20); //返回删除的元素
    console.log(box2); //[26, "程序员"]
    console.log(box); //["李松", 20]

    box = ["李松",26,"程序员"];
    var box2 = box.splice(1,1,20);//返回删除的元素
    console.log(box2); //[26]
    console.log(box); //["李松", 20, "程序员"]

    box = ["李松",26,"程序员"];
    var box2 = box.splice(1,0,"耒阳");//返回删除的元素
    console.log(box2); //[]
    console.log(box); //["李松", "耒阳", 26, "程序员"]

    box = ["李松",26,"程序员"];
    var box2 = box.splice(-1,0,"耒阳");//返回删除的元素
    console.log(box2); //[]
    console.log(box); //["李松", 26, "耒阳", "程序员"]

    box = ["李松",26,"程序员"];
    var box2 = box.splice(1);//返回删除的元素
    console.log(box2); //[26,"程序员"]
    console.log(box); //["李松"]
</script>
```

## 数组和对象的区别

数组是对象的子类，对象的所有特性，数组都有，此外数组还扩展了自己独有的方法。js中数组和对象都可以用来存储集合，数组一般用来存储有序集合，对象用来存储无序集合。

```
<script type="text/javascript">  
    var a=[0];  
    a['5']=5;  
    a[1]=1;  
    a.test='test'  
    console.log(a['test']);//test  
    console.log(a['0']);//0  
    console.log(a['1']);//1  
    console.log(a[5]);//5  
    console.log(a.length);//6  
    console.log(a);
  	
    var b={0:0,5:5};  
    console.log(b['0']);//0  
    console.log(b[5]);//5  
    console.log(b.length);//undefined  
    console.log(b);
</script>  
```

数组和对象都可以用数字和字符串索引元素，数组length属性返回的是最大的索引数字加1后的结果，对象默认是没有length属性的。

