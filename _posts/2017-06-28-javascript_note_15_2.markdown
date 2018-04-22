---
author: wanls4583
comments: true
date: 2017-06-28 03:06:29+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/28/javascript_note_15_2/
slug: javascript_note_15_2
title: javascript笔记--（第十五章）（二）函数与对象深入了解
wordpress_id: 167
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---
## prototype
每一个函数对象都有一个显示的prototype属性,它代表了函数对象的原型(Function.prototype函数对象是个例外，没有prototype属性，)。

## __proto__
每个普通对象都有一个名为__proto__的内部隐藏属性，指向于它所对应的构造函数的原型对象(chrome、firefox中名称为__proto__，并且可以被访问到)。原型链正是基于__proto__才得以形成（note：不是基于函数对象的属性prototype）。

所有构造器/函数对象（包括自定义的）都是由Function构造的，所以其__proto__都指向Function.prototype，它是一个空函数（Empty function）。
```
<script type="text/javascript">
	console.log(Number.__proto__   === Function.prototype) // true  
	console.log(Boolean.__proto__  === Function.prototype) // true  
	console.log(String.__proto__   === Function.prototype) // true  
	console.log(Object.__proto__   === Function.prototype) // true  
	console.log(Function.__proto__ === Function.prototype) // true   
	console.log(Array.__proto__    === Function.prototype) // true  
	console.log(RegExp.__proto__   === Function.prototype) // true  
	console.log(Error.__proto__    === Function.prototype) // true  
	console.log(Date.__proto__     === Function.prototype) // true 

	var Employee = function (){  
	  
	};  
	  
	function Person(){  
	  
	}  
	console.log(Employee.__proto__  === Function.prototype);//true  
	console.log(Person.__proto__ === Function.prototype);//true   
</script>
```
JavaScript中有内置(build-in)构造器/对象共计12个（ES5中新加了JSON），这里列举了可访问的8个构造器。剩下如Global不能直接访问，Arguments仅在函数调用时由JS引擎创建，Math，JSON是以对象形式存在的，无需new。它们的__proto__是Object.prototype。如下：
```
<script type="text/javascript">
	console.log(Math.__proto__ === Object.prototype);//true  
	console.log(JSON.__proto__ === Object.prototype);//true   
	console.log(Math instanceof Object);//true 
	console.log(Math instanceof Function);//false
	console.log(Array instanceof Object);//true 
	console.log(Array instanceof Function);//true 
</script>
```
由以上测试得出，所有的构造器都来自于Function.prototype，甚至包括根构造器Object及Function自身。所有构造器都继承了Function.prototype的属性及方法。如length、call、apply、bind（ES5）。另，Function.prototype也是唯一一个typeof XXX.prototype为 “function”的prototype。其它的构造器的prototype都是一个普通对象,下面来测试下：
```
<script type="text/javascript">
	console.log(typeof Function.prototype) // function  
	console.log(typeof Object.prototype)   // object  
	console.log(typeof Number.prototype)   // object  
	console.log(typeof Boolean.prototype)  // object  
	console.log(typeof String.prototype)   // object  
	console.log(typeof Array.prototype)    // object  
	console.log(typeof RegExp.prototype)   // object  
	console.log(typeof Error.prototype)    // object  
	console.log(typeof Date.prototype)     // object  
	console.log(typeof Object.prototype)   // object  
</script>
```
所有普通对象的__proto__都指向其构造器的prototype
```
<script type="text/javascript">
	function Foo(){  
	  
	}  
	var foo = new Foo();//对象实例化  
	console.log(foo.__proto__ === Foo.prototype);//true
	
	var obj = new Object();
	console.log(obj.__proto__ === Object.prototype);//true
</script>
```
## constuctor
每个函数对象都有名为“prototype”的属性(上面提到过Function.prototype函数对象是个例外，没有prototype属性)，用于引用原型对象。此原型对象又有名为“constructor”的属性，它反过来引用函数本身。这是一种循环引用。
```
<script type="text/javascript">
	var   arr = ["aaa", "bbb"],  
	console.log(arr.constructor === Array);//true  

	function Foo(){  
  
	}  
	console.log(Foo.prototype.constructor === Foo);//true   
</script>
```
Function、Object、Prototype、__proto__内存关系图

<img src="http://www.blogjava.net/images/blogjava_net/heavensay/web-front/8199006.png" alt="" />

堆区图说明：
<img src="http://www.blogjava.net/images/blogjava_net/heavensay/web-front/35166462.png" alt="" />

Function.prototype函数对象图内部表示prototype属性的红色虚框，只是为了说明这个属性不存在。

通过上面这张图可以得出以下几点：

- 所有对象，包括函数对象的原型链最终都指向了Object.prototype，而Object.prototype.__proto__===null，原型链至此结束。
- Animal.prototype是一个普通对象。
- Object是一个函数对象，也是Function构造的，Object.prototype是一个普通对象。
- Object.prototype.__proto__指向null。
- Function.prototype是一个函数对象，前面说函数对象都有一个显示的prototype属性，但是Function.prototype却没有prototype属性， Function.prototype.prototype===undefined，所以Function.prototype函数对象是一个特例，没有prototype属性。

## 函数与对象的关系
通过上图我们可以推测出js内部实现的一些原理和引擎初始化执行顺序：

- (1)创建一个Object.prototype对象，所有的对象（包括函数对象）都将继承这个对象的属性和方法，Object.prototype用来定义所有对象将继承的属性和方法；
- (2)创建一个Function.prototype函数对象，所有的函数都将继承这个对象的属性和方法，Function.prototype这个特殊的函数对象主要用来给函数对象定义一些系统内置的函数和属性，如apply，call，length，arguments等。；
- (3)将Function.prototype的__proto__属性指向Object.prototype，使其继承Object.prototype的属性和方法；
- (4)创建Function对象，将其__proto__属性和protoype属性都指向Function.prototype；
- (5)用Function对象构造其他本地构造器（Object Function Array String Boolean Number Date RegExp Error EvalError RangeError ReferenceError SyntaxError TypeError URIError），这些本地构造器的__proto__都将指向其对应的构造器（Function）的原型对象（Function.prototype）。需要注意的是，在构造Object构造器的时候会将Object.prototype挂载在其prototype属性上，所有构造器的原型对象的__proto__默认是指向Object.prototype的；
- (5)客户端使用本地构造器构造js中的一切本地对象，也可以用Function对象（隐式function）构造自定义构造器；

通过上面的一些推理，我们可以理解为，js原型链的源头其实是Object.prototype。
```
<script type="text/javascript">
    var a = new Number(1);
    console.log(a instanceof Object);//true
<script type="text/javascript">
```
（注意：对象只是js中的一种概念，不要和Object构造器混肴，instanceof操作符只是按照ECMASCript标准返回布尔值，这里并不能说明a对象和Object.prototype有直接关系，只不过其原型链最终指向了Object.portotype）
```
<script type="text/javascript">
	console.log(Function.prototype);//function(){},空函数
	console.log(Function.prototype.constructor);//function Function(){ [native code] }，Function构造器
	console.log(Function.prototype.__proto__);//Object{}

	console.log(Object.prototype);//Object{}
	console.log(Object.prototype.constructor);function Obeject(){}，Object构造器
	console.log(Object.prototype.__proto__);//null
</script>
```
## 普通对象的创建过程
```
<script type="text/javascript">  
	function Foo(num){};
	var foo = new Foo(1);
</script> 
``` 
当执行new Foo(1)时：

- (1)javascript引擎在内存中开辟一块新的内存，一个新对象被创建。修改新对象的__proto__，指向Foo.prototype，它继承自Foo.prototype;
- (2)构造函数 Foo 被执行。执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例。new Foo 等同于 new Foo(), 只能用在不传递任何参数的情况;
- (3)如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象。

```
<script type="text/javascript">  
	function Foo1(num){
		return 1;
	};
	var foo1 = new Foo1(1);
	console.log(foo1.__proto__);Foo1{}

	function Foo2(){
		return {};//返回对象，会覆盖new出来的对象
	};
	var foo2 = new Foo2;
	console.log(foo2.__proto__);//Object{}
</script>  
```
## instaceof操作符

*语法*

object instanceof constructor

*描述*

instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上,constructor必须是一个构造器，否则将报错。
```
<script type="text/javascript">
	console.log(Function.__proto__);//function(){}
	console.log(Function.prototype);//function(){}
	console.log(Function.prototype.__proto__);//Object对象
	console.log("-----------------------");
	console.log(Object.__proto__);//function(){}
	console.log(Object.prototype);//Object对象
	console.log(Object.prototype.__proto__);//null

	console.log(Function.__proto__==Object.__proto__);//true

	console.log(Object.prototype == Function.prototype.__proto__);//true
	console.log(Function instanceof Object);//true

	console.log(Function.prototype == Object.__proto__);//true
	console.log(Object instanceof Function);//true

	console.log(Function.prototype == Function.__proto__);//true
	console.log(Function instanceof Function);//true
</script>
```

instanceof操作符和对象的isPrototypeOf方法功能一样，只不过isPrototypeOf的调用者可以是一个对象也可以是一个构造器。
```
<script type="text/javascript">
	var a = new Object();
	function B(){};
	B.prototype = a;
	var b = new B();
	console.log(a.isPrototypeOf(b));//true
	console.log(b instanceof a);//报错
</script>
```

参考：
http://blog.csdn.net/cuew1987/article/details/15498121
http://www.blogjava.net/heavensay/archive/2013/10/20/405440.html