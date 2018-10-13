---
author: wanls4583
comments: true
date: 2017-01-31
layout: post
title: Angularjs双向数据绑定原理
categories:
- 前端框架

tags:
- 前端框架

---

angular并不存在定时脏检测。angular 对常用的 dom 事件，xhr 事件等做了封装，在里面触发进入 angular 的`digest`流程。在`digest`流程里面，会从`rootscope`开始遍历，检查所有的`watcher`。

谈起angular的脏检查机制(`dirty-checking`), 常见的误解就是认为： ng 是定时轮询去检查 model 是否变更。
其实，ng 只有在指定事件触发后，才进入`$digest cycle`：

- angular 系统自带 DOM 事件，譬如用户输入文本，点击按钮等。(ng-click)
- XHR 响应事件 (`$http`)
- 浏览器 Location 变更事件 (`$location`)
- Timer 事件(`$timeout`, `$interval`)
- 执行`$digest()`或`$apply()`

