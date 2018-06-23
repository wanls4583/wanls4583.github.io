---
author: wanls4583
comments: true
date: 2017-03-28
layout: post
title: line-height的底线、基线、中线、顶线
categories:
- CSS

tags:
- CSS
---

说明：粉色为顶线，蓝色为中线（和英语本有点差异），绿色为基线，红色为底线

### `vertical-align:top`

![](https://wanls4583.github.io/images/posts/CSS/2017-03-28-line-height的底线、基线、中线、顶线-1.jpg)

### `vertical-align:middle`

![](https://wanls4583.github.io/images/posts/CSS/2017-03-28-line-height的底线、基线、中线、顶线-2.jpg)

### `vertical-align:baseline`

![](https://wanls4583.github.io/images/posts/CSS/2017-03-28-line-height的底线、基线、中线、顶线-3.jpg)

### `vertical-align:bottom`

![](https://wanls4583.github.io/images/posts/CSS/2017-03-28-line-height的底线、基线、中线、顶线-4.jpg)

**结论：**

顶线和底线是相对于中线来计算的，当line-height为0时，顶线和底线将重合，而中线是相对于基线来计算的，基线始终在中线的下方（x的底部），vertical-algin：middle并不是对其到中线而是对齐到基线以上1/2x的位置。