---
author: wanls4583
comments: true
date: 2018-05-26
layout: post
title: javascript实现三次贝塞尔曲线(cubic-bezier)
categories:
- 其他

tags:
- 其他
---

## 贝塞尔曲线

Bezier curve(贝塞尔曲线)是应用于二维图形应用程序的数学曲线。

**曲线定义：**起始点、终止点（也称锚点）、控制点。通过调整控制点，贝塞尔曲线的形状会发生变化。

### 一阶贝塞尔曲线

**公式：**P<sub>0</sub><sup>1</sup> = (1-t)\*P<sub>1</sub> + t\*P<sub>1</sub> ,t∈[0,1]

<br>![](http://wanls4583.github.io/images/posts/其他/贝塞尔-1.gif)<br>

### 二阶贝塞尔曲线

**公式：**P<sub>0</sub><sup>2</sup> = (1-t)<sup>2</sup>\*P<sub>0</sub> + 2\*t\*(1-t)\*P<sub>1</sub> + t<sup>2</sup>\*P<sub>2</sub> ,t∈[0,1]

<br>![](http://wanls4583.github.io/images/posts/其他/贝塞尔-2.gif)<br>

### 三阶贝塞尔曲线

**公式：**P<sub>0</sub><sup>3</sup> = (1-t)<sup>3</sup>\*P<sub>0</sub> + 3\*t\*(1-t)<sup>2</sup>\*P<sub>1</sub> + 3\*(1-t)\*t<sup>2</sup>\*P<sub>2</sub> + t<sup>3</sup>\*P_3 ,t∈[0,1]

<br>![](http://wanls4583.github.io/images/posts/其他/贝塞尔-3.gif)<br>

### 通用公式

<br>![](http://wanls4583.github.io/images/posts/其他/贝塞尔-4.gif)<br>

## css3动画速度控制 cubic-bezier (x1,y1,x2,y2)

CSS3动画速度的控制通过三次贝塞尔曲线函数实现，定义规则为 `cubic-bezier (x1,y1,x2,y2)`

cubic-bezier 通过控制曲线上的四个点（起始点、终止点以及两个相互分离的中间点）来创造、编辑图形，绘制出一条光滑曲线并以曲线的状态来反映动画过程中速度的变化。

![](http://wanls4583.github.io/images/posts/其他/贝塞尔-5.png)

分别用 A,B,C,D 表示这四个点，其中起始点固定值为 A(0,0),终止点固定为 D(1,1)剩下的中间点 B(x1,y1),C(x2,y2) 也就是所要动态操控的两个点了,对应 cubic-bezier(x1,y1,x2,y2) 中的四个参数,通过改变 B,C 两点的坐标值来动态生成一条贝塞尔曲线表示动画中的速度变化。

### 常用的缓动函数参数

| name | cubic-bezier |
| - | - |
| ease | .25,.1,.25,1 |
| linear | 0,0,1,1 |
| ease-in | .42,0,1,1 |
| ease-out | 0,0,.58,1 |
| ease-in-out | .42,0,.58,1 |

![](http://wanls4583.github.io/images/posts/其他/贝塞尔-6.png)

## Javascript 实现 cubic-bezier

```html
<!DOCTYPE html>
<html>
<head>
	<title>cubic-bezier</title>
	<style type="text/css">
		canvas{
			transform: rotateX(180deg);
			background: red;
		}
	</style>
</head>
<body>
	<canvas width="300" height="300"></canvas>
	<script type="text/javascript">
		//贝塞尔公式
		function bsr(t,p1,p2){
			var p0 = 0, p3 = 1;//起点为0，终点为1
			//3阶贝塞尔曲线公式
			var result = p0*Math.pow((1-t),3) + 3*p1*t*Math.pow((1-t),2) + 3*p2*(1-t)*Math.pow(t,2) + p3*Math.pow(t,3);
			return result;
		}

		//cubic-bezier(.25,.1,.25,1)
		function ease(t){
			var xScale = bsr(t,0.25,0.25);
			var yScale = bsr(t,0.1,1);
			var obj = {
				xScale: xScale,
				yScale: yScale
			};
			return obj
		}

		function draw(x1,y1,x2,y2,duration){
			var startTime=Date.now();

			var ctx = document.querySelector('canvas').getContext('2d');

			var preX=x1, preY=y1;

			_draw();

			function _draw(){
				requestAnimationFrame(function(){
					var t = (Date.now()-startTime)/duration; //t∈[0,1]

					if(t>1){
						return;
					}

					var scale = ease(t);
					var x = (scale.xScale*(x2-x1))>>0;
					var y = (scale.yScale*(y2-y1))>>0;

					ctx.beginPath();
					ctx.moveTo(preX,preY);
					ctx.lineTo(x,y);
					ctx.stroke();

					preX = x;
					preY = y;

					_draw();
				})
			}
		}

		draw(0,0,300,300,3000);
	</script>
</body>
</html>
```

**结果**

![](http://wanls4583.github.io/images/posts/其他/贝塞尔-7.png)

参考：

[https://blog.csdn.net/zhaozjc112/article/details/52909172](https://blog.csdn.net/zhaozjc112/article/details/52909172)

[https://www.cnblogs.com/hnfxs/p/3148483.html](https://www.cnblogs.com/hnfxs/p/3148483.html)