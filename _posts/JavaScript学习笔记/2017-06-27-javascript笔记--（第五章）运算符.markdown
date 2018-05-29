---
author: wanls4583
comments: true
date: 2017-06-27 08:12:37+00:00
layout: post
title: javascript笔记--（第五章）运算符
wordpress_id: 115
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 表达式

表达式是ECMAScript中的一个“短语”，解释器会通过计算把它转换成一个值。最简单的表达式是字面量或者变量名

```javascript
function(n) {return x+y;}	//函数字面量、函数表达式
box    //变量
```				

### 一元运算符

```
<script type="text/javascript">
	var box = '89';	box++;				
	console.log(box); //90，数值字符串自动转换成数值
	var box = 'ab';	box++;				
	console.log(box);  //NaN，字符串包含非数值转成NaN
	var box = false; box++;				
	console.log(box);  //1，false转成数值是0，累加就是1
	var box = 2.3; box++;				
	console.log(box);  //3.3，直接加1
	var box = {
		toString : function() {
			return 1;
		}
	};			
	box++;
	console.log(box);  //2，不设置toString或valueOf即为NaN
</script>
```
```
<script type="text/javascript">
	var box = '89';	box=+box;				
	console.log(box); //89，数值字符串自动转换成数值
	var box = 'ab';	box=+box;				
	console.log(box);  //NaN，字符串包含非数值转成NaN
	var box = false; box=+box;				
	console.log(box);  //0，false转成数值是0
	var box = {
		toString : function() {
			return 1;
		}
	};			
	box=+box;
	console.log(box);  //1，不设置toString或valueOf即为NaN
</script>
```

加法和减法运算符一般用于算术运算，也可像上面进行类型转换。

### 算术运算符

ECMAScript定义了5个算术运算符，加减乘除求模(取余)。如果算术运算的值不是数值，那么后台会先使用Number()转型函数将简单类型值转换为数值(隐式转换)，如果该值是对象，则先调用valueOf或者toString方法，再用Number()将其值转换成数值。

*减法：*

```javascript
var box = 1 - NaN;				//NaN，只要有一个NaN就为NaN
var box = Infinity - Infinity;			//NaN
var box = -Infinity - -Infinity;		//NaN
var box = Infinity - -Infinity;			//Infinity
var box = -Infinity - Infinity;			//-Infinity
var box = 100 - true;				//99，true转成数值为1
var box = 100 - '';				//100，''转成了0
```

*乘法：*

```javascript
var box = 100 * NaN;				//NaN，只要有一个NaN即为NaN
var box = Infinity * Infinity;			//Infinity
var box = -Infinity * Infinity ;		//-Infinity
var box = -Infinity * -Infinity ;		//Infinity
```

*除法：*

```javascript
var box = Infinity / 0;//NaN
var box = Infinity / null;//NaN
var box = Infinity % Infinity;//NaN			
var box = -Infinity %  Infinity;//NaN
var box = -Infinity %  -Infinity;//NaN
var box = 100 %  0;//NaN
var box = 100 %  '';//NaN
var box = 100 %  null;//NaN
```

### 关系运算符

和其他运算符一样，当关系运算符操作非数值时要遵循一下规则：

1. 两个操作数都是数值，则数值比较；
2. 两个操作数都是字符串，则比较两个字符串对应的字符编码值；
3. 两个操作数有一个是数值，则将另一个转换为数值，再进行数值比较；
4. 两个操作数有一个是对象，则先调用valueOf()方法或toString()方法，再用结果比较；

*相等和不等的比较：*

- 两个操作数都是对象，则比较他们是否是同一个对象，如果都指向同一个对象，则返回true，否则返回false
- 在全等和全不等的判断上，比如值和类型都相等，才返回true，否则返回false

<font style='background:#eee'>
注意：null>=为true，null<=0为true，null>0为false，null<为false，之所以会这样，是因为在进行>和<时候会将null转换成0，而>=的结果其实是取<的反，<=同理。
</font>

### 逻辑运算符

有三个逻辑运算符：逻辑与(AND)、逻辑或(OR)、逻辑非(NOT)。

*逻辑与&&：*

如果两边的操作数有一个操作数不是布尔值的情况下，与运算就不一定返回布尔值，此时，遵循已下规则：

1. 第一个操作数是对象，则返回第二个操作数；
2. 第二个操作数是对象，则第一个操作数返回true，才返回第二个操作数，否则返回false;
3. 有一个操作数是null，则返回null；
4. 有一个操作数是undefined，则返回undefined。

<font style='background:#eee'>总结上面几点就是：与运算符在运算时，如果第一个数在转换成布尔值的情况下是false则返回第一个操作数（原值，不一定是布尔值），否则返回第二个操作数</font>

*逻辑或||：*

如果两边的操作数有一个操作数不是布尔值的情况下，逻辑与运算就不一定返回布尔值，此时，遵循已下规则：

1. 第一个操作数是对象，则返回第一个操作数；
2. 第一个操作数的求值结果为false，则返回第二个操作数；
3. 两个操作数都是对象，则返回第一个操作数；
4. 两个操作数都是null，则返回null；
5. 两个操作数都是NaN，则返回NaN；
6. 两个操作数都是undefined，则返回undefined；

<font style='background:#eee'>总结上面几点就是：或运算符在运算时，如果第一个数在转换成布尔值的情况下是true则返回第一个操作数（原值，不一定是布尔值），否则返回第二个操作数</font>

*逻辑非！：*

逻辑非运算符可以用于任何值。无论这个值是什么数据类型，这个运算符都会返回一个布尔值。它的流程是：先将这个值转换成布尔值，然后取反。

```javascript
var box = !(5 > 4);				//false
var box = !{};					//false
var box = !'';					//true
var box = !0;					//true
var box = !null;				//true
var box = !NaN;					//true
var box = !undefined;				//true
```

