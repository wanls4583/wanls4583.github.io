---
author: wanls4583
comments: true
date: 2018-06-01 14:26:00
layout: post
title: 前端性能优化之-Chrome timing详解
categories:
- 前端优化

tags:
- 前端优化
---

![](http://wanls4583.github.io/images/posts/前端优化/chrome-timing-1.png)

- **Queued at:** 请求加入到队列中的时间点（相对于 HTML 文档下载完成的时间）。
- **Started at:** 从队列里取出请求，并开始发送请求的时间点（相对于 HTML 文档下载完成的时间）。
- **Queueing:** 请求在队列里排队所花费的时间。相比关键资源（JavaScript、CSS），图片等资源的优先级比较低，通常会被浏览器放在队列中延迟请求。
- **Stalled:** 请求被阻塞的时间。有多种情况会使请求被阻塞，典型的有如下两种：
	1. TCP 连接验证。TCP三次握手后，浏览器发送数据后，一段时间内（不同的操作系统时间段不同）接收不到服务端ACK包，就会以 某一时间间隔(时间间隔一般为指数型增长)重新发送，从重传开始到接收端正确响应的时间就是stalled阶段。
	2. 在 HTTP 1 中，浏览器仅允许每个源最多同时拥有六个 TCP 连接，当超过6个后，后面的请求将被阻塞。
- **DNS Lookup:** DNS 解析所花费的时间。
- **Initial connection:** 三次握手所花费的时间。（如果是 HTTPS 协议，这里面的时间花费还包括一个 SSL 安全验证的时间）。
- **Request sent:** 请求第一个字节发出前到最后一个字节发出后的时间，也就是上传时间。
- **Waiting(TTFB):** 网络请求被发起（Request sent 之后）到从服务器接收到第一个字节这段时间。
- **Content Download:** 资源下载时间。

## 实践

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="test1.css">
    <link rel="stylesheet" type="text/css" href="test2.css">
    <link rel="stylesheet" type="text/css" href="test3.css">
    <link rel="stylesheet" type="text/css" href="test4.css">
    <link rel="stylesheet" type="text/css" href="test5.css">
    <link rel="stylesheet" type="text/css" href="test6.css">
</head>
<body>
    <h1>this is a test</h1>
    <img src="1.png">
    <img src="2.png">
    <img src="3.png">
    <img src="4.png">
    <img src="5.png">
    <img src="6.png">
    <hr>
    <span>this is a test</span>
    <script src="test.js"></script>
</body>
</html>
```

[示例代码](https://github.com/wanls4583/wanls4583.github.io/tree/master/code/%E5%89%8D%E7%AB%AF%E4%BC%98%E5%8C%96/chrome-timing)

为了方便测试，以下所有的测试都是在 Fast 3G 网络模拟下进行的。

**结果**（Chrome（版本 63.0.3239.84（正式版本） （32 位）））

![](http://wanls4583.github.io/images/posts/前端优化/chrome-timing-2.png)

图中的色条所代表的时段对应为：

- 绿色->Waiting(TTFB)
- 褐色->Stalled
- 白色->Queueing
- 蓝色->Content Download

从图中可以分析出如下结论：

- 对于同等优先级的资源，当并行下载超过6个以后，后面的请求将被阻塞（Stalled），图中的 test.js、7.png 资源就是这种情况。
- 对于低优先级的资源（图片），如果当前有一个高优先级的资源（JavaScript、CSS）请求还没有完成，则最多允许一个（不同浏览器或者相同浏览器的不同版本允许的规则可能不一样，例如版本为 63.0.3239.84 的 Chrome 浏览器是一个，而版本为 67.0.3396.62 的 Chrome 浏览器是两个）低优先级的资源和高优先级的资源并行加载。图中只有 1.png 和 test.js 并行下载，其他图片此时都在队列里派对（Queueing）。

**结果**（Chrome（版本 67.0.3396.62（正式版本） （32 位）））

![](http://wanls4583.github.io/images/posts/前端优化/chrome-timing-3.png)

版本为 67.0.3396.62 的 Chrome 浏览器最多允许两个低优先级的资源和高优先级的资源并行加载。

此时，如果将 JavaScript 资源放到最后

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="test1.css">
    <link rel="stylesheet" type="text/css" href="test2.css">
    <link rel="stylesheet" type="text/css" href="test3.css">
    <link rel="stylesheet" type="text/css" href="test4.css">
    <link rel="stylesheet" type="text/css" href="test5.css">
    <link rel="stylesheet" type="text/css" href="test6.css">
</head>
<body>
    <h1>this is a test</h1>
    <img src="1.png">
    <img src="2.png">
    <img src="3.png">
    <img src="4.png">
    <img src="5.png">
    <img src="6.png">
    <img src="7.png">
    <hr>
    <span>this is a test</span>
    <script src="test.js"></script>
</body>
</html>
```
**结果**（Chrome（版本 63.0.3239.84（正式版本） （32 位）））

![](http://wanls4583.github.io/images/posts/前端优化/chrome-timing-4.png)

**结果**（Chrome（版本 63.0.3239.84（正式版本） （32 位）））

![](http://wanls4583.github.io/images/posts/前端优化/chrome-timing-5.png)

可以看到，如果将 JavaScript（高优先级）资源放到最后，则最多允许5个图片（低优先级）资源同 JavaScript（高优先级）资源一起并行加载。
