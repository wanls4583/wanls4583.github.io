---
author: wanls4583
comments: true
date: 2018-04-02 14:04:19+00:00
layout: post
title: python(list与dic)
wordpress_id: 514
categories:
- python学习笔记

tags:
- python学习笔记
---

## dic
相当于js中的对象
```python
>>> a={'a':1,'b':2}
>>> a
{'a': 1, 'b': 2}
>>> a.get('a')
1
>>> a.get('c',-1) #如果不存在则返回定义的数
-1
>>> a['b']
2
>>> a.pop('a')
1
>>> a
{'b': 2}
```

## set
集合，存储不重复的数据，创建时需要传递一个list
```python
>>> a=set([1,2,2,3])
>>> a
{1, 2, 3}
>>> a.add(4)
>>> a
{1, 2, 3, 4}
>>> a.remove(2)
>>> a
{1, 3, 4}
```
可以使用&,|
```python
>>> set([1,3])&set;([1,2])
{1}
>>> set([1,3])|set([1,2])
{1, 2, 3}
```
