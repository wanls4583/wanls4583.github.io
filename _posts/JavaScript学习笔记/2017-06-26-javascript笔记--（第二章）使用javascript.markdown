---
author: wanls4583
comments: true
date: 2017-06-26 09:25:40+00:00
layout: post
title: javascript笔记--（第二章）使用javascript
wordpress_id: 55
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## 内嵌代码

```
<script type="text/javascript">
	alert(' 欢迎来到 JavaScript 世界！ ');
</script>
```

注意：如果你想弹出一个 </script> 标签的字符串，那么浏览器会误解成 JS 代码已经结束了。解决的方法，就是把字符串分成两个部分，通过连接符 ‘ + ’ 来连接。

```
<script type="text/javascript">
	alert(' 欢迎来到 JavaScript 世界！ ');
	alert('</script>');
</script>
```

以上脚本会报错，不能运行，改成如下即可：

```
<script type="text/javascript">
	alert(' 欢迎来到 JavaScript 世界！ ');
	alert('</scr'+'ipt>');
</script>
```

## 引入外部文件

```
<script type="text/javascript" src="demo1.js"></script>
```

## 不支持js的处理

```
<noscript>
您没有启用javascript
</noscript>
```