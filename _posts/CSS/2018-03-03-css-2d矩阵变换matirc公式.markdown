---
author: wanls4583
comments: true
date: 2018-03-03 04:51:47+00:00
layout: post
title: css-2d矩阵变换matirc公式
wordpress_id: 495
categories:
- CSS

tags:
- CSS

---

## 矩阵变换原理：
![](https://wanls4583.github.io/images/posts/CSS/2018-03-03-css-2d矩阵变换matirc公式-1.gif)

## translate
```css
transform: matrix(1, 0, 0, 1, 水平偏移距离, 垂直偏移距离);
```
例(x,y都增加30px)：
```
transform: matrix(1, 0, 0, 1, 30, 30); /* a=1, b=0, c=0, d=1, e=30, f=30 */
```

## rotate
```css
transform: matrix(cosθ, sinθ, -sinθ, consθ, 0, 0);/*θ代表旋转的角度，默认顺时针*/
```

## skew
```css
transform: matrix(1, tanθy, tanθx, 1, 0, 0);/*θy代表y轴偏离的角度，θx代表x轴偏离的角度，两者没有关联*/
```
![](https://wanls4583.github.io/images/posts/CSS/2018-03-03-css-2d矩阵变换matirc公式-2.jpg)

