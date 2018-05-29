---
author: wanls4583
comments: true
date: 2017-07-04 03:19:06+00:00
layout: post
title: html-Emmet语法
wordpress_id: 283
categories:
- 其他

tags:
- 其他

---

## 后代：>
缩写：nav>ul>li
```
<nav>
    <ul>
        <li></li>
    </ul>
</nav>
```
## 兄弟：+
缩写：div+p+bq
```
<div></div>
<p></p>
<blockquote></blockquote>
```
## 上级：^
缩写：div+div>p>span+em^bq
```
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```
缩写：div+div>p>span+em^^bq
```
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```
## 分组：()
缩写：div>(header>ul>li*2>a)+footer>p
```
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```
缩写：(div>dl>(dt+dd)*3)+footer>p
```
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```
## 乘法：*
缩写：ul>li*5
```
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```
## 自增符号：$
缩写：ul>li.item$*5
```
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```
缩写：h$[title=item$]{Header $}*3
```
<h1 title="item1">Header 1</h1>
<h2 title="item2">Header 2</h2>
<h3 title="item3">Header 3</h3>
```
缩写：ul>li.item$$$*5
```
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```
缩写：ul>li.item$@-*5
```
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```
缩写：ul>li.item$@3*5
```
<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```
## ID和类属性
缩写：#header
```
<div id="header"></div>
```
缩写：.title
```
<div class="title"></div>
```
缩写：form#search.wide
```
<form id="search" class="wide"></form>
```
缩写：p.class1.class2.class3
```
<p class="class1 class2 class3"></p>
```
## 自定义属性
缩写：p[title="Hello world"]
```
<p title="Hello world"></p>
```
缩写：td[rowspan=2 colspan=3 title]
```
<td rowspan="2" colspan="3" title=""></td>
```
缩写：[a='value1' b="value2"]
```
<div a="value1" b="value2"></div>
```
## 文本：{}
缩写：a{Click me}
```
<a href="">Click me</a>
```
缩写：p>{Click }+a{here}+{ to continue}
```
<p>Click <a href="">here</a> to continue</p>
```
## 隐式标签
缩写：.class
```
<div class="class"></div>
```
缩写：em>.class
```
<em><span class="class"></span></em>
```
缩写：ul>.class
```
<ul>
    <li class="class"></li>
</ul>
```
缩写：table>.row>.col
```
<table>
    <tr class="row">
        <td class="col"></td>
    </tr>
</table>
```

原文: <a href="http://www.w3cplus.com/tools/emmet-cheat-sheet.html © w3cplus.com">http://www.w3cplus.com/tools/emmet-cheat-sheet.html © w3cplus.com</a>

