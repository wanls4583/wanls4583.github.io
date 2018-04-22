---
author: wanls4583
comments: true
date: 2017-06-26 09:20:35+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/26/javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e4%b8%80%e7%ab%a0%ef%bc%89javascript%e6%a6%82%e8%bf%b0/
slug: javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e4%b8%80%e7%ab%a0%ef%bc%89javascript%e6%a6%82%e8%bf%b0
title: javascript笔记--（第一章）javascript概述
wordpress_id: 51
tags:
- JavaScript学习笔记

categories:
- JavaScript学习笔记

---

## 什么是 JavaScript

JavaScript 是一种具有面向对象能力的、解释型的程序设计语言。更具体一点，它是基于对象和事件驱动并具有相对安全性的客户端脚本语言 。 因为他不需要在一个语言环境下运行 ， 而只需要支持它的浏览器即可 。 它的主要目的是 ， 验证发往服务器端的数据 、 增加 We b互动、加强用户体验度等。

## JavaScript 特点

- 松散性
JavaScript是一种松散类型的语言，也就是说，它的变量不必具有一个明确的类型。
- 对象属性
JavaScript中的对象把属性名映射为任意的属性值。它的这种方式很像哈希表或关联数组，而不像 C 中的结构体或者 C++ 、 Java 中的对象。
- 继承机制
JavaScript 中的面向对象继承机制是基于原型的。

## ECMAScript 介绍

由 ECMAScript-262 定义的 ECMAScript 与 Web 浏览器没有依赖关系。 ECMAScript 定义的只是这门语言的基础，而在此基础之上可以构建更完善的脚本语言。我们常见的 We b浏览器只是 ECMAScript 实现可能的宿主环境之一，在浏览器里运行的javascript脚本语言实现了该规则。既然他不依赖于 Web 浏览器，那么他还在哪些环境中寄宿呢？比如： ActionScript 、ScriptEase 等 。 而他的组成部分有 ： 语法 、 类型 、 语句 、 关键字 、 保留字 、 操作符 、 对象等 。 ECMAScript目前有四个版本（1,2,3,4,5），不同的浏览器,对其的支持程度是不一样的，现在浏览器基本上至少都支持第3版，我们学的javascript通常也是指javascript第三版。

## JavaScript 核心

虽然 JavaScript 和 ECMAScript 通常被人们用来表达相同的含义，但 JavaScript 的含义却 比 ECMA-26 2 中规定的要多得多 。 一个完整 的 JavaScrip t 应该由下列三个不同的部分组成 。

- 核心 (ECMAScript)
- 文档对象模型 (DOM)
- 浏览器对象模型 (BOM)

## 文档对象模型(DOM)

文档对象模型 (DOM ， Document Object Model) 是针对 XML 但经过扩展用于 HTML 的应用程序编程接口 (API ， Application Programmingg Interface) 。DOM 有三个级别，每个级别都会新增很多内容模块和标准，不同的浏览器对其的支持程度有所不同。

## 浏览器对象模型(BOM)

访问和操作浏览器窗口的浏览器对象模型 (BOM ， Browser Object Model) 。开发人员使用 BOM 可以控制浏览器显示页面以外的部分 。 而 BOM 真正与众不同的地方 ( 也是经常会导致问题的地方 ) ，还是它作为 JavaScript 实现的一部分，至今仍没有相关的标准。
