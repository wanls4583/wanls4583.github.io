---
author: wanls4583
comments: true
date: 2017-04-11-css
layout: post
title: css换行（white-space、word-wrap、word-break）
categories:
- CSS

tags:
- CSS
---

## white-space

|值|	 描述|
|--|--|
|normal| 默认。空白会被浏览器忽略。|
|pre| 空白会被浏览器保留。其行为方式类似 HTML 中的 `<pre>` 标签。|
|nowrap| 文本不会换行，文本会在在同一行上继续，直到遇到 `<br>` 标签为止。|
|pre-wrap| 保留空白符序列，但是正常地进行换行。|
|pre-line| 合并空白符序列，但是保留换行符。|
|inherit| 规定应该从父元素继承 `white-space` 属性的值。|


### pre

```html
<style> 
p.test
{
	width:11em; 
	border:1px solid #000000;
	white-space:pre;
}
</style>
</head>
<body>
<p class="test"> This paragraph contains a word. 
	The long word will break and wrap to the next line.</p>
</body>
</html>
```

![](https://wanls4583.github.io/images/posts/CSS/2017-04-11-css换行（white-space、word-wrap、word-break）-1.jpg)

### pre-line

```html
<style> 
p.test
{
	width:11em; 
	border:1px solid #000000;
	white-space:pre-line;
}
</style>
```

![](https://wanls4583.github.io/images/posts/CSS/2017-04-11-css换行（white-space、word-wrap、word-break）-2.jpg)

### pre-wrap

```html
<style> 
p.test
{
	width:11em; 
	border:1px solid #000000;
	white-space:pre-wrap;
}
</style>
```

![](https://wanls4583.github.io/images/posts/CSS/2017-04-11-css换行（white-space、word-wrap、word-break）-3.jpg)

### nowrap

```html
<style> 
p.test
{
	width:11em; 
	border:1px solid #000000;
	white-space:nowrap;
}
</style>
```

![](https://wanls4583.github.io/images/posts/CSS/2017-04-11-css换行（white-space、word-wrap、word-break）-4.jpg)

## word-wrap

|值|	 描述|
|--|--|
|normal| 只在允许的断字点换行（浏览器保持默认处理）。|
|break-word| 如果单词长度超过一行，允许在长单词或 URL 地址内部进行换行。|

```html
<style> 
p.test
{
	width:11em; 
	border:1px solid #000000;
	word-wrap:break-word;
}
</style>
</head>
<body>
<p class="test"> This paragraph contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.</p>
</body>
```

![](https://wanls4583.github.io/images/posts/CSS/2017-04-11-css换行（white-space、word-wrap、word-break）-5.jpg)

## word-break

|值|	 描述|
|--|--|
|normal| 使用浏览器默认的换行规则。|
|break-all| 允许在单词内换行。|
|keep-all| 只能在半角空格或连字符处换行。|

```html
<style> 
p.test
{
	width:11em; 
	border:1px solid #000000;
	word-break:break-all;
}
</style>
</head>
<body>
<p class="test"> This paragraph contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.</p>
</body>
```

![](https://wanls4583.github.io/images/posts/CSS/2017-04-11-css换行（white-space、word-wrap、word-break）-6.jpg)

## word-wrap 与 word-break 的区别

`word-wrap:break-word`与`word-break:break-all`共同点是都能把长单词强行断句，不同点是`word-wrap:break-word`会首先起一个新行来放置长单词，新的行还是放不下这个长单词则会对长单词进行强制断句；而`word-break:break-all`则不会把长单词放在一个新行里，当这一行放不下的时候就直接强制断句了。
