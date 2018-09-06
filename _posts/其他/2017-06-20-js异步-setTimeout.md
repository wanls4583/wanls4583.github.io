---
author: wanls4583
comments: true
layout: post
date: 2017-06-20
title: js异步-setTimeout
tags:
- 其他

categories:
- 其他
---

>&emsp;&emsp;js引擎是单线程的，可是浏览器却可以是多线程的，js引擎只是浏览器的一个线程而已。定时器计，网络请求，浏览器渲染等等...，都是由不同的线程去完成的。

![这里写图片描述](https://wanls4583.github.io/images/posts/其他/2017-06-20-js异步-setTimeout-1.jpg)
![这里写图片描述](https://wanls4583.github.io/images/posts/其他/2017-06-20-js异步-setTimeout-2.jpg)

&emsp;&emsp;js引擎单线程执行的，它是基于事件驱动的语言.它的执行顺序是遵循一个叫做事件队列的机制。从图中我们可以看出,浏览器有各种各样的线程,比如事件触发器，网络请求,定时器等等.线程的联系都是基于事件的。js引擎处理到与其他线程相关的代码,就会分发给其他线程，他们处理完之后,需要js引擎计算时就是在事件队列里面添加一个任务。 这个过程中，js并不会阻塞代码等待其他线程执行完毕，而且其他线程执行完毕后添加事件任务告诉js引擎执行相关操作。这就是js的异步编程模型。

示例：
```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>定时器</title>
    <script type="text/javascript">
        window.onload = function () {
            setTimeout(function(){
            	console.log("setTimeout_2");
            	console.log(2,new Date().getTime());
            },100);
            sleep(100);
            testNext();
        }
        function testNext() {
            console.log("后续执行的函数");
        }
        function sleep(number) {
            var now = new Date();
            var exitTime = now.getTime() + number;
            while (true) {
                now = new Date();
                if (now.getTime() > exitTime)
                    break;
            }
            setTimeout(function(){
            	console.log("setTimeout_1");
            	console.log(1,new Date().getTime());
            },0)
        }
    </script>
</head>
<body>

</body>
</html>
```
结果：
![这里写图片描述](https://wanls4583.github.io/images/posts/其他/2017-06-20-js异步-setTimeout-3.jpg)

此时如果将sleep中的参数改小一点：
```html
setTimeout(function(){
	console.log("setTimeout_2");
	console.log(2,new Date().getTime());
},100);
sleep(90);
testNext();
```
![这里写图片描述](https://wanls4583.github.io/images/posts/其他/2017-06-20-js异步-setTimeout-4.jpg)

&emsp;&emsp;可以看到第一个定时器我们指定延时是100，第二个定时器指定的延时是0，但是通过设置循环的执行时间，可以改变他们两个的执行顺序（实际上是改变浏览器把他们加入到队列的顺序）。因为定时器setTimeout是由浏览器定时器模块来调度的，和js单线程是无关的，可以认为定时器模块有一个统一的时间，js执行setTimeout函数的时候，会传递延时参数和回调函数以及其他参数给定时器模块。浏览器定时器模块统一管理这些定时器。这些定时器开始的时间也即setTimeout执行时浏览器定时器模块的时间，当某个定时器的时间到了，浏览器定时器模块就会在任务列表末尾插入一个任务来执行相应的回调函数。

有一点需要注意的是：
&emsp;&emsp;js的dom跟新操作其实是异步的，当js操作dom元素需要跟新页面的显示时，将会在队列末尾插入一个页面跟新事件，当js执行到任务队列里的这个任务时就会去调用GUI引擎渲染页面。之所以这样，是因为js语言设定js引擎与GUI引擎是互斥的，js引擎在运行的时候会阻塞GUI引擎的渲染，GUI引擎在渲染的时候同样会阻塞js引擎的运行。另外，GUI的渲染频率一般是60帧，也就是1000/60毫秒渲染一次，如果同一个dom元素在此间隔内执行了多余一次相同性质的跟新操作，GUI引擎渲染的时候将只渲染最后一次的更新操作，也就是所谓的丢帧。

关于settimeout(0)：
&emsp;&emsp;不同浏览器的实现情况不同，HTML5定义的最小时间间隔是4毫秒，使用settimeout(0)会使用浏览器支持的最小时间间隔。所以当我们需要把一些操作放到下一帧处理的时候，我们通常使用settimeout(0)来hack。
