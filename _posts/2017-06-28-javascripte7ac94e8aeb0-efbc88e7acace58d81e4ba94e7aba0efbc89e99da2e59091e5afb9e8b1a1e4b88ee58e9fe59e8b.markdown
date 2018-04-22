---
author: wanls4583
comments: true
date: 2017-06-28 02:29:56+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/28/javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%8d%81%e4%ba%94%e7%ab%a0%ef%bc%89%e9%9d%a2%e5%90%91%e5%af%b9%e8%b1%a1%e4%b8%8e%e5%8e%9f%e5%9e%8b/
slug: javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e5%8d%81%e4%ba%94%e7%ab%a0%ef%bc%89%e9%9d%a2%e5%90%91%e5%af%b9%e8%b1%a1%e4%b8%8e%e5%8e%9f%e5%9e%8b
title: javascript笔记--（第十五章）（一）面向对象与原型
wordpress_id: 159
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 面向对象
ECMAScript有两种开发模式：1.函数式(过程化)，2.面向对象(OOP)。面向对象的语言有一个标志，那就是类的概念，而通过类可以创建任意多个具有相同属性和方法的对象。但是，ECMAScript没有类的概念，因此它的对象也与基于类的语言中的对象有所不同。

## 工厂方法
解决实例化对象产生大量重复的问题
```
<script type="text/javascript">
	function createObject(name, age) {		//集中实例化的函数
		var obj = new Object();
		obj.name = name;
		obj.age = age;
		obj.run = function () {
			return this.name + this.age + '运行中...';
		};
		return obj;
	}
	var box1 = createObject('Lee', 100);		//第一个实例
	var box2 = createObject('Jack', 200);		//第二个实例
	console.log(box1.run());
	console.log(box2.run());					
</script>
```
## 构造函数
解决了重复实例化的问题，又解决了对象识别的问题
```
<script type="text/javascript">
	function Box(name, age) {				//构造函数模式
		this.name = name;
		this.age = age;
		this.run = function () {
			return this.name + this.age + '运行中...';
		};
	}

	var box1 = new Box('Lee', 100);			//new Box()即可
	var box2 = new Box('Jack', 200);
	console.log(box1.run());
	console.log(box1 instanceof Box);		//很清晰的识别他从属于Box		
</script>
```
*构造函数的方法有一些规范：*

- 函数名和实例化构造名相同且大写，(PS：非强制，但这么写有助于区分构造函数和普通函数)；
- 通过构造函数创建对象，必须使用new运算符。

*构造函数实例化对象过程：*

- （1）当使用了构造函数，并且new 构造函数()，那么就后台执行了new Object()；
- （2）将构造函数的作用域给新对象，(即new Object()创建出的对象)，而函数体内的this就代表new Object()出来的对象。
- （3）执行构造函数内的代码；
- （4）返回新对象(后台直接返回)。

构造函数和普通函数的唯一区别，就是他们调用的方式不同。只不过，构造函数也是函数，必须用new运算符来调用，否则就是普通函数。
```javascript
var box = new Box('Lee', 100);			//构造模式调用
alert(box.run());
Box('Lee', 20);					//普通模式调用，无效

var o = new Object();					
Box.call(o, 'Jack', 200)			//对象冒充调用
alert(o.run());	
```
函数属性引用问题：
```javascript
var box1 = new Box('Lee', 100);			//传递一致
var box2 = new Box('Lee', 100);			//同上

alert(box1.name == box2.name);			//true，属性的值相等
alert(box1.run == box2.run);			//false，方法其实也是一种引用地址
```
为了解决函数引用地址不一致的问题，可以使用外部函数：
```javascript
function Box(name, age) {
	this.name = name;
	this.age = age;
	this.run = run;
}
function run() {				//通过外面调用，保证引用地址一致
	return this.name + this.age + '运行中...';
}
```
虽然使用了全局的函数run()来解决了保证引用地址一致的问题，但这种方式又带来了一个新的问题，全局中的this在对象调用的时候是Box本身，而当作普通函数调用的时候，this又代表window。

## 原型
我们创建的每个函数都有一个prototype(原型)属性，这个属性是一个对象，它的用途是包含可以由特定类型的所有实例共享的属性和方法，逻辑上可以这么理解：prototype是通过调用构造函数而创建的原型对象。简单的说就是静态属性和方法。
```
<script type="text/javascript">
	function Box() {};//声明一个构造函数
	Box.prototype.name = 'Lee';//在原型里添加属性
	Box.prototype.age = 100;					
	Box.prototype.run = function () {//在原型里添加方法
		return this.name + this.age + '运行中...';
	};
	console.log("实例化之前:");
	console.log(Box.prototype);
	var box1 = new Box();
	console.log("实例化之后:");
	console.log(Box.prototype);
	console.log(Box.prototype == box1.__proto__); //true，证明Box的原型对象在实例化之前就已经存在
	
	var box2 = new Box();
	console.log(box1.run == box2.run);//true，方法的引用地址保持一致	
</script>
```
运行结果：
<img src="http://img.blog.csdn.net/20170204183515632?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="null" />

原型对象中的constructor是一个函数，代表构造函数本身

为了更进一步了解构造函数的声明方式和原型模式的声明方式，我们通过图示来了解一下：

构造函数模式：
<img src="http://img.blog.csdn.net/20170204155237837?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

原型模式：
<img src="http://img.blog.csdn.net/20170204155259743?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

在原型模式声明中，多了两个属性，这两个属性都是创建对象时自动生成的。__proto__属性是实例指向原型对象的一个指针。
```
<script type="text/javascript">
	function Box() {}					//声明一个构造函数
	Box.prototype.name = 'Lee';				//在原型里添加属性
	Box.prototype.age = 100;					
	Box.prototype.run = function () {			//在原型里添加方法
		return this.name + this.age + '运行中...';
	};
	var box = new Box();
	console.log(box.__proto__);
	var obj = new Object();
	console.log(obj.__proto__);
</script>
```
在浏览器里查看打印的结果：
<img src="http://img.blog.csdn.net/20170204161423613?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

可以看到，Box实例对象的__proto__属性指向的Box构造函数的原型对象，原型对象里的constructor是原型本身，Box构造函数的原型对象默认是继承自Object。
```
<script type="text/javascript">
	function Box() {}			//声明一个构造函数
	Box.prototype = new Number(2);
	var box = new Box();
	console.log(box.__proto__);
	console.log(box.__proto__.__proto__);
	var obj = new Number();
	console.log(obj);
	console.log(obj.__proto__);
</script>
```
查看输出结果：
<img src="http://img.blog.csdn.net/20170204164307065?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

从结果可以看出，Number的原型对象重写了toString和valueOf方法，原型对象继承自Object

判断一个对象是否在一个对象的原型链上，可以使用isPrototypeOf()方法来测试。
```javascript
alert(Box.prototype.isPrototypeOf(box));
```
对象属性和方法的访问顺序：

1. 先查找构造函数实例里的属性或方法，如果有，立刻返回；
2. 如果构造函数实例里没有，则去它的原型对象里找，如果有，就返回；

```
<script type="text/javascript">
	function Box() {};//声明一个构造函数
	Box.prototype.name = 'Lee';//在原型里添加属性
	var box = new Box();
	box.name = "li";//li
	console.log(box.name);//覆盖原型中的属性

	delete box.name;//删除构造函数里的属性
	console.log(box.name);//Lee			
</script>
```
hasOwnProperty()：判断对象实例中是否有某个属性(不包括原型链)。

in操作符：属性是否存在于实例或者原型中。
```
<script type="text/javascript">
	function Box(){
		this.name = "lisong";
	}
	Box.prototype.age = 26;
	function isProperty(object, property) {		//判断原型中是否存在属性
		return !object.hasOwnProperty(property) && (property in object);
	}
	var box = new Box();
	console.log(isProperty(box, 'name'))		//false
	console.log(isProperty(box, 'age'))			//true
</script>
```
使用字面量创建原型对象：
```
<script type="text/javascript">
	function Box(){}
	console.log(Box.prototype);
	Box.prototype = {
		age:26,
		name:"lisong"
	}
	console.log(Box.prototype);
	var box = new Box();
	console.log(box.name);//lisong
	console.log(Box.prototype.constructor == Box);//false
	console.log(Box.prototype.constructor == Object);//true
</script>
```
运行结果：
<img src="http://img.blog.csdn.net/20170204193531023?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="" />

从结果可以看出，用字面量创建的原型对象，其constructor属性会指向Object的构造函数，而不会指向Box的构造函数

## 组合构造函数+原型模式
```javascript
function Box(name, age) {					//不共享的使用构造函数
	this.name = name;
	this.age = age;
	this. family = ['父亲', '母亲', '妹妹'];
};
Box.prototype = {						//共享的使用原型模式
	constructor : Box,
	run : function () {
		return this.name + this.age + this.family;
	}
};
```
这种混合模式很好的解决了传参和引用共享的大难题。是创建对象比较好的方法

## 动态原型模式
原型模式，不管你是否创建了对象实例，它都会初始化原型中的方法，并且在声明一个对象时，构造函数+原型部分让人感觉又很怪异，最好就是把构造函数和原型封装到一起。
```javascript
function Box(name ,age) {					//将所有信息封装到函数体内
	this.name = name;
	this.age = age;
	
	if (typeof this.run != 'function') {			//仅在第一次调用的初始化
		Box.prototype.run = function () {
			return this.name + this.age + '运行中...';
		};
	}
}
var box = new Box('Lee', 100);
alert(box.run());
```
## 寄生构造函数
寄生构造函数，其实就是工厂模式+构造函数模式。这种模式比较通用，但不能instanceof确定对象关系(可以认为使用new构建的对象如果没有用构造函数return的方式来返回对象，那么new出来的对象会带有某种标记或属性用来给instanceof操作符确定对象关系)。
```javascript
function Box(name, age) {
	var obj = new Object();
	obj.name = name;
	obj.age = age;
	obj.run = function () {
		return this.name + this.age + '运行中...';
	};
	return obj;
}
```
假设要创建一个具有额外方法的引用类型。由于之前说明不建议直接String.prototype.addstring，可以通过寄生构造的方式添加。
```javascript
function myString(string) {					
	var str = new String(string);
	str.addstring = function () {
		return this + '，被添加了！';
	};
	return str;
}

var box = new myString('Lee');			//比直接在引用原型添加要繁琐好多
alert(box.addstring());
```
## 原型链继承

```
<script type="text/javascript">
	function Box() {					//Box构造
		this.name = 'Lee';
	}
	function Desk() {					//Desk构造
		this.age = 100;
	}
	Desk.prototype = new Box();				//Desc继承了Box，通过原型，形成链条
	var desk = new Desk();
	console.log(desk.age);
	console.log(desk.name);
								//得到被继承的属性
	function Table() {					//Table构造
	this.level = 'AAAAA';
	}							
	Table.prototype = new Desk();				//继续原型链继承
	var table = new Table();
	console.log(table.name);				//继承了Box和Desk

	console.log(table instanceof Object);			//true
	console.log(desk instanceof Table);			//false，desk是table的超类
	console.log(table instanceof Desk);			//true
	console.log(table instanceof Box);			//true
</script>
```
## 对象冒充继承（借用构造函数）
对象冒充继承主要解决超类型无法传参的问题
```
<script type="text/javascript">
	function Box(age) {
		this.name = ['Lee', 'Jack', 'Hello']
		this.age = age;
	}

	function Desk(age) {
		Box.call(this, age);//对象冒充，给超类型传参
	}
	var desk = new Desk(200);
	console.log(desk.age);
	console.log(desk.name);
</script>
```
## 组合继承（原型链+对象冒充）
借用构造函数虽然解决了刚才两种问题，但没有原型，复用则无从谈起。所以，我们需要原型链+借用构造函数的模式，这种模式成为组合继承。
```
<script type="text/javascript">
	function Box(age) {
		this.name = ['Lee', 'Jack', 'Hello']
		this.age = age;
	}
	Box.prototype.run = function () {				
		return this.name + this.age;
	};
	function Desk(age) {
		Box.call(this, age);//对象冒充，主要用来继承Box构造函数里的属性,第二次调用超类Box
	}
	Desk.prototype = new Box();//原型链继承，用来继承父对象，会包括父对象的实例属性和父对象原型链的属性，第一次调用超类Box
	var desk = new Desk(100);
	console.log(desk.run());

	function isPropertyToProto(object, property) { //判断原型中是否存在属性
		return !object.hasOwnProperty(property) && (property in object);
	}
	console.log(isPropertyToProto(desk,"run"));//true
	console.log(desk.hasOwnProperty("age"));//true
	console.log(desk.__proto__.hasOwnProperty("age"));//true
</script>
```
组合继承缺点：某些属性在构造函数里和原型对象里都有，重复了,还有就是超类被调用了两次

## 原型式继承
借助原型并基于已有的对象创建新对象，同时还不必因此创建自定义类型。
```
<script type="text/javascript">
	function obj(o) {					//传递一个字面量函数
		function F() {}					//创建一个构造函数
		F.prototype = o;				//把字面量函数赋值给构造函数的原型
		return new F();					//最终返回出实例化的构造函数
	}
	var box = {						//字面量对象
		name : 'Lee',
		arr : ['哥哥','妹妹','姐姐']
	};
	var box1 = obj(box);					//传递
</script>
```
## 寄生式继承（原型式+工厂模式）
原型式+工厂模式结合而来，目的是为了在原型式的基础上封装创建对象的过程。
```
<script type="text/javascript">
	function obj(o) {					//传递一个字面量函数
		function F() {}					//创建一个构造函数
		F.prototype = o;				//把字面量函数赋值给构造函数的原型
		return new F();					//最终返回出实例化的构造函数
	}
	var box = {						//字面量对象
		name : 'Lee',
		arr : ['哥哥','妹妹','姐姐']
	};
	function create(o) {					//封装创建过程
		var f= obj(o);
		f.run = function () {
			return this.arr;			//同样，会共享引用
		}; 
		return f;
	}
	var box1 = create(box);
	console.log(box1.run());//["哥哥", "妹妹", "姐姐"]
</script>
```
上面的代码主要是为了封装额外的方法和属性

## 寄生组合继承（寄生+组合）
解决组合继承超类调用两次的问题
```
<script type="text/javascript">  
    function Box(name) {  
        this.name = name;  
        this.arr = ['哥哥','妹妹','父母'];  
    }  
    Box.prototype.run = function () {  
        return this.name;  
    };  
    function Desk(name, age) {  
        Box.call(this, name);//对象冒充  
        this.age = age;  
    }  
    function obj(o) {  
        function F() {}  
        F.prototype = o;  
        return new F();  
    }  
    function create(box, desk) {//寄生式继承  
       	var f = obj(box.prototype);  
        f.constructor = desk;  
        desk.prototype = f;
        /*
        desk.prototype = box.prototype;
        desk.prototype.constructor = desk;//会同时修改掉box的constructor,所以不能使用desk.prototype = box.prototype
        */
    } 
    create(Box,Desk);  
    var d = new Desk("lisong",26);  
    console.log(d.run());//lisong 
</script>  
```
## 极晚绑定（Very Late Binding）
从技术上讲，根本不存在极晚绑定。该术语描述 ECMAScript 中的一种现象，即能够在对象实例化后再定义它的原型链的方法。例如：
```javascript
var o = new Object();

Object.prototype.sayHi = function () {
  alert("hi");
};

o.sayHi();//hi
```
需要注意的是，这种情况下对原型链是有影响的。
```
function F(){};
var a = new F();
F.prototype = new Number(1);
var b = new F();
console.log(a.__proto__);//F {}
console.log(b.__proto__);//Number {[[PrimitiveValue]]: 1}
```





