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
![](http://lisong-blog.gz.bcebos.com/css-transforms-matrix.gif?authorization=bce-auth-v1%2F99d20c83bd45422eb6ca5fe083097f9c%2F2018-03-03T04%3A39%3A50Z%2F-1%2Fhost%2Fe0f760a1208c077052ee3060088cb7c6928861ef52bee8e6ee6f6ed2bc1cf86d)

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
![](http://lisong-blog.gz.bcebos.com/css-2d%E7%9F%A9%E9%98%B5%E5%8F%98%E6%8D%A2.jpg?authorization=bce-auth-v1%2F99d20c83bd45422eb6ca5fe083097f9c%2F2018-03-13T06%3A37%3A09Z%2F-1%2Fhost%2Fbfc1dadd3f6fbe81f0d46a3e2752cfaa1c0eaf26c088e209b67f49783cb40213)

