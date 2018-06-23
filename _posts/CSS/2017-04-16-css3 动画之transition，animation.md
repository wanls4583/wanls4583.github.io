---
author: wanls4583
comments: true
date: 2017-04-16
layout: post
title: css3 动画之transition，animation
categories:
- CSS

tags:
- CSS
---

## css3动画
>csss3实现动画的方式主要有两种方式：一种是用transition过渡效果来实现动画，另外一种直接使用animation配合keyframe来实现。虽然这两种方式都能实现动画效果，但是区别还是有的。

### transition

官方属性解释：

![这里写图片描述](http://img.blog.csdn.net/20170416191328100?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

也可以把属性写成一行：
```css
div
{
transition: width 2s, height 2s, transform 2s;
-moz-transition: width 2s, height 2s, -moz-transform 2s;
-webkit-transition: width 2s, height 2s, -webkit-transform 2s;
-o-transition: width 2s, height 2s,-o-transform 2s;
}
```
transition主要用来实现两帧动画，也即开始和结束，通过过渡可以实现一些特殊的效果。transition动画既可以用鼠标hover状态来触发，也可以用js脚本来触发。

需要注意的是：transition默认有逆向动画的特性

#### 1.hover触发
```html
<!doctype html>
<html lang="en">
<head>
<title></title>
<style>
body,html{
    margin: 0;
    padding: 0;
}
img {
    position:absolute;
    transition: opacity 5s;
    -webkit-transition: opacity 5s;
}
.transparent {
    opacity: 0;
}
.transparent:hover{
    opacity: 1;
}
</style>
</head>
<body>
    <div>
        <img src="http://img.blog.csdn.net/20170416194335276?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="日景"/>
        <img src="http://img.blog.csdn.net/20170416194441746?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="夜景" id="nightImage" class="transparent"/>
    </div>
</body>
</html>
```

<iframe src="https://wanls4583.github.io/code/css/tansition-animation/test1.html" width="370" height="260" style="border-style: none"></iframe>

当鼠标放上去后，夜景透明度将慢慢从0变成1，慢慢显示出来，因为夜景是在上层，所以日景将慢慢消失。因为transition动画默认有逆向动画的特性，当鼠标移开后，夜景将慢慢消失，日景将慢慢显示，而不是突兀的从夜景变为日景。


#### 2.js脚本触发
```html
<!doctype html>
<html lang="en">
<head>
<title></title>
 
<style>
body,html{
    margin: 0;
    padding: 0;
}
img {
    position:absolute;
    transition: opacity 5s;
    -webkit-transition: opacity 5s;
}
.solid {
    opacity: 1;
}
.transparent {
    opacity: 0;
}
</style>
 
<script>
    function toNight(){
            var nightImage = document.getElementById("nightImage");
            nightImage.className = "solid";
    }
 
    function toDay(){
            var nightImage = document.getElementById("nightImage");
            nightImage.className = "transparent";
    }
</script>
</head>
<body>
    <button onclick="toNight()">看夜景</button>
    <button onclick="toDay()">看日景</button>
    <div>
        <img src="http://img.blog.csdn.net/20170416194335276?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="日景"/>
        <img src="http://img.blog.csdn.net/20170416194441746?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="夜景" id="nightImage" class="transparent"/>
    </div>
</body>
</html>
```

<iframe src="https://wanls4583.github.io/code/css/tansition-animation/test2.html" width="370" height="300" style="border-style: none"></iframe>

当点击看夜景后，夜景透明度将慢慢从0变成1，慢慢显示出来，因为夜景是在上层，所以日景将慢慢消失。因为transition动画默认有逆向动画的特性，当点击看日景将夜景图片的透明度改为0的时候，夜景并不会突兀的立马消失，而是随着透明度慢慢的从1变为0，慢慢的消失，日景也随之慢慢的显现出来。

### animation
 @keyframes 规则和所有动画属性：
 ![这里写图片描述](http://img.blog.csdn.net/20170416200131034?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

可以把所有属性写在一行：
```css
div
{
animation: myfirst 5s linear 2s infinite alternate running;
/* Firefox: */
-moz-animation: myfirst 5s linear 2s infinite alternate running;
/* Safari 和 Chrome: */
-webkit-animation: myfirst 5s linear 2s infinite alternate running;
/* Opera: */
-o-animation: myfirst 5s linear 2s infinite alternate running;
}
```
keyframes有两种写法：

1.from和to
```css
@keyframes myfirst
{
from {background: red;}
to {background: yellow;}
}
```
2.%
```css
@keyframes myfirst
{
0%   {background: red;}
25%  {background: yellow;}
50%  {background: blue;}
100% {background: green;}
}
```
animation主要用来实现多帧动画，多帧的状态是通过@keyframes来实现的，每个状态对应了一帧，在某些情况下元素的初始状态也是一帧。

需要注意的是：

- animation-direction默认状态下值为normal，即当动画到结束位置时不会自动逆向动画，会突然回到起点位置和状态，即使是循环动画，在运行到终点时也会突然回到起点位置和状态。当设置了值为alternate时，在动画到达终点时会沿着来时的动画轨迹逆向回到起点位置和状态（transition默认就有逆向动画的特性，可以想象成其也有个animation-direction属性，只不过只有个alternate值）。在设置了alternate的情况下，其逆向动画也算一次动画计数。
- animation-play-state默认的值是running，也即运行状态，可以通过js代码使其为pause来暂停动画，当动画暂停时，动画的运行时间animation-duration也将暂停计时，当再次变为running值时，可以从当前位置继续运行动画。
- animation-fill-mode默认值为none，也即当动画结束时会回到起点的位置和状态，可以将其设置为forwards，这样当动画结束后会保持在终点的位置和状态。

animation有三种方式触发：

1.直接给元素添加动画，页面渲染时就触发
```html
<!doctype html>
<html lang="en">
<head>
<title></title>
<style>
body,html{
    margin: 0;
    padding: 0;
}
div {
    background-color: red;
    width: 100px;
    height: 100px;
    animation: myfirst 5s forwards;
}
@keyframes myfirst
{
	100%{
		width: 1000px;
	}
}
</style>
</head>
<body>
    <div>
    </div>
</body>
</html>
```

在这种情况下，元素的初始状态也是一帧，所以可以不用设置0%对应的状态

2.hover触发
```html
<!doctype html>
<html lang="en">
<head>
<title></title>
<style>
body,html{
    margin: 0;
    padding: 0;
}
img {
    position:absolute;
}
.transparent {
    opacity: 0;
}
.transparent:hover{
    animation: night 5s;
}
@keyframes night
{
	100%{
		opacity: 1;
	}
}
</style>
</head>
<body>
    <div>
        <img src="http://img.blog.csdn.net/20170416194335276?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="日景"/>
        <img src="http://img.blog.csdn.net/20170416194441746?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="夜景" id="nightImage" class="transparent"/>
    </div>
</body>
</html>
```

<iframe src="https://wanls4583.github.io/code/css/tansition-animation/test4.html" width="370" height="260" style="border-style: none"></iframe>

这个效果和之前transition用hover触发的那个例子的效果一样，在用hover触发的情况下，动画的第一帧即元素当前所对应的状态，所以@keyframes night可以不设置0%的状态。

3.用js脚本触发
```html
<!doctype html>
<html lang="en">
<head>
<title></title>
<style>
body,html{
    margin: 0;
    padding: 0;
}
img {
    position:absolute;
}
.transparent {
    opacity: 0;
}
.day {
    animation: day 5s;
}
.night {
    animation: night 5s;
}
@keyframes night
{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}
@keyframes day
{
	0%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}
</style>
 
<script>
    function toNight(){
            var nightImage = document.getElementById("nightImage");
            nightImage.className = "night";
    }
 
    function toDay(){
            var nightImage = document.getElementById("nightImage");
            nightImage.className = "day";
    }
</script>
</head>
<body>
    <button onclick="toNight()">看夜景</button>
    <button onclick="toDay()">看日景</button>
    <div>
        <img src="http://img.blog.csdn.net/20170416194335276?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="日景"/>
        <img src="http://img.blog.csdn.net/20170416194441746?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTQwOTA1MTk4Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="夜景" id="nightImage" class="transparent" />
    </div>
</body>
</html>
```

<iframe src="https://wanls4583.github.io/code/css/tansition-animation/test5.html" width="370" height="300" style="border-style: none"></iframe>

这个例子的效果和之前transition用js触发的那个例子的效果一样，在用 js 事件改变 class 来触发 animation 动画的情况下，@keyframes 如果用百分号划分帧界限，则 @keyframes 默认的第一帧为规则里最小的那个值所对应的状态。如果用 from，to 划分，如果定义了 from，则为 from 所对应的状态，否则为 to。

在这个例子中，如果 @keyframes night 里没有0%的状态，则会突兀的把透明度变为1，而不会有过渡效果，因为其第一帧就是100%对应的那一帧。
