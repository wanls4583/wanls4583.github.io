---
author: wanls4583
comments: true
layout: post
date: 2019-09-07
title: DOMContentLoaded与load事件区别
tags:
- 其他

categories:
- 其他
---

当HTML文档加载并解析完成，并且执行完**同步JS代码**后将会触发DOMContentLoaded事件；当页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，其在DOMContentLoaded事件之后。

需要注意的是：**同步JS代码**如果造成了了新的资源加载请求，将会延迟load事件的触发时间。

示例：
```html
<!DOCTYPE html>
<html>

<head>
    <title></title>
</head>

<body>
</body>
<script>
window.onload = function() {
    console.log('html load')
}
window.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded");
}, false)
</script>
<script>
var img = document.createElement('img')
img.src = 'https://blog.lisong.hn.cn/images/abstract-1.jpg'
img.onload = function() {
    console.log('img load')
}
document.body.appendChild(img)
console.log('inner js')
</script>
<script type="text/javascript" src="outer.js"></script>

</html>
```
outer.js
```
console.log('outer js')
```

结果：
![](https://wanls4583.github.io/images/posts/其他/DOMContentLoaded-load-1.png)
因为同步代码形成了新的资源请求，load事件需要等待资源请求完成后再触发
```html
<!DOCTYPE html>
<html>

<head>
    <title></title>
</head>

<body>
</body>
<script>
window.onload = function() {
    console.log('html load')
}
window.addEventListener("DOMContentLoaded", function () {
     console.log("DOMContentLoaded");
 }, false)
</script>
<script>
setTimeout(function() {
    var img = document.createElement('img')
    img.src = 'https://blog.lisong.hn.cn/images/abstract-1.jpg'
    img.onload = function() {
        console.log('img load')
    }
    document.body.appendChild(img)
}, 0)
console.log('inner js')
</script>
<script type="text/javascript" src="outer.js"></script>
</html>
```
结果：
![](https://wanls4583.github.io/images/posts/其他/DOMContentLoaded-load-2.png)
可以看出，**异步JS代码**形成的资源请求对load触发时机没有影响