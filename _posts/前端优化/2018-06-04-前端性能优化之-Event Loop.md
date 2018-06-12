---
author: wanls4583
comments: true
date: 2018-06-04 14:06
layout: post
title: 前端性能优化之-Event Loop
categories:
- 前端优化

tags:
- 前端优化
---

## Event Loop

> To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must use event loops as described in this section. There are two kinds of event loops: those for browsing contexts, and those for workers.<br><br>
There must be at least one browsing context event loop per user agent, and at most one per unit of related similar-origin browsing contexts.<br><br>
A browsing context event loop always has at least one browsing context.<br><br>
A browsing context event loop always has at least one browsing context. If such an event loop's browsing contexts all go away, then the event loop goes away as well. A browsing context always has an event loop coordinating its activities.<br><br>
Worker event loops are simpler: each worker has one event loop, and the worker processing model manages the event loop's lifetime<br><br>
*——— [https://html.spec.whatwg.org/multipage/webappapis.html#event-loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)*

以上是 whatwg 标准定义的浏览器事件循环。在浏览器中为了协调各种任务的运行，存在着两种 EventLoop，一种是浏览器上下文事件循环，一种是 JavaScript Worker 上下文的事件循环。

每一个用户代理（可能有多个浏览器上下文）必须至少有一个浏览器上下文event loop，但是每个[单元的相似源浏览器上下文](https://html.spec.whatwg.org/multipage/browsers.html#unit-of-related-similar-origin-browsing-contexts)（同源的标签页窗口）至多有一个event loop。

一个浏览器上下文事件循环机制至少对应着一个浏览器上下文，一个浏览器上下文总是会有一个事件循环机制。而 worker 事件循环则相对简单，一个 worker 后台线程对应一个事件循环机制。

[浏览器上下文](https://html.spec.whatwg.org/multipage/browsers.html#browsing-context)是一个将 Document 对象呈现给用户的环境。在一个 Web 浏览器内，一个标签页或窗口常包含一个浏览上下文，如一个 iframe 或一个 frameset 内的若干 frame。


> The rendering engine is single threaded. Almost everything, except network operations, happens in a single thread. In Firefox and Safari this is the main thread of the browser. In Chrome it's the tab process main thread. <br><br>
The browser main thread is an event loop. It's an infinite loop that keeps the process alive. It waits for events (like layout and paint events) and processes them. <br><br>
*——— [https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Event_loop](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Event_loop)*

浏览器的渲染引擎是一个单线程，网页渲染相关的操作基本上都在这个线程里完成（当然，这个单线程会会调用其他线程来协同工作），在 FireFox 和 Safari 浏览器里，这个单线程就是浏览器的主线，而在 Chrome 浏览器里，这个单线程就是渲染进程的主线程（之所以会这样，是因为 Blink 内核的多进程模型和 Webkit2 内核不一样，具体可参考[Webkit构架和模块](https://wanls4583.github.io/2018/05/webkit学习笔记-(3)Webkit构架和模块/)）。主线程是一个事件循环，以下是 FireFox 中关于主事件循环的代码：

```javascript
while (!mExiting)
    NS_ProcessNextEvent(thread);
```

## 浏览器事件循环的运行机制

事件循环中存在这两种任务队列：task queue（宏任务队列，网上也有人叫macrtask queue），microtask queue（微任务队列）。其实还有一个 render queue（更新队列），这个队列用来存储所有的更新操作。

> For example, a user agent could have one task queue for mouse and key events (the user interaction task source), and another for everything else. The user agent could then give keyboard and mouse events preference over other tasks three quarters of the time, keeping the interface responsive but not starving other task queues, and never processing events from any one task source out of order.<br><br>
*——— [https://html.spec.whatwg.org/multipage/webappapis.html#event-loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)*

而对于宏任务队列，又可根据任务来源分为两种队列，用户交互相关的任务源的事件存储在一个队列（这个队列的优先级高，主要是为了快速响应交互），其他任务源的事件存储在另一个队列。主线程会给优先级高的队列更多的执行单元。

这是 whatwg 说明可能出现的情况，也就是说浏览器里可能存在两个宏任务队列（浏览器具体如何实现，要视浏览器厂商而定）。

### 更新过程

> An event loop must continually run through the following steps for as long as it exists:
- Let oldestTask be the oldest task on one of the event loop's task queues, if any, ignoring, in the case of a browsing context event loop, tasks whose associated Documents are not fully active. The user agent may pick any task queue. If there is no task to select, then jump to the microtasks step below.
- Set the event loop's currently running task to oldestTask.
- Run oldestTask.
- Set the event loop's currently running task back to null.
- Remove oldestTask from its task queue.
- Microtasks: Perform a microtask checkpoint.
- Update the rendering.If this event loop is a browsing context event loop... <br><br>
*——— [https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-for-spec-authors](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-for-spec-authors)*

- 首先检查宏任务队列是否为空，如果不为空，则从队列中取出最先加入的任务
- 把取出的宏任务标记为当前运行中的任务
- 执行宏任务
- 将取出的任务从宏任务队列里删除
- 执行完宏任务后，执行microtasks任务检查点
- 更新页面

### 更新详细流程

![](http://on-img.com/chart_image/5b13d368e4b07596cf3b2b5c.png)

为了避免混淆，假设是从最近的一次页面更新完成后开始执行主循环的。

1. 首先，检查宏任务队列是否有任务，如果不为空，则取出最早加入队列的一个任务（宏任务里的任务都是按添加的时间点，按序执行的），并且主线程将切换到 JavaScript 线程执行任务。此时，主线程将停止事件循环，直到 JavaScript 线程执行完成所有同步代码，执行完成后，跳至步骤2。在这个过程中，可能会产生新的宏任务和微任务，它们会分别被加到相应的队列里，等待主线程取出它们去执行。如果在执行任务的期间使用 JavaScript 更改了样式或者DOM元素，使页面需要 reflow/repaint，则浏览器会将这些更改添加到更新队列。如果宏任务队列为空，则跳至步骤2。<br><br>
2. 检查微任务队列是否为空，如果不为空，则取出最早加入队列的一个任务执行（任务的执行顺序同宏任务队列），其后的执行和步骤 1 一致，只不这里会循环的执行完队列里所有的微任务，执行期间产生的微任务会加入到微任务队列，并且会在本次主循环中都执行完。<br><br>
3. 检查页面是否需要更新，这里检查机制并不是简单的检查更新队列是否为空，浏览器还会考虑到屏幕刷新频率等因素（以下的引用有说明），标准中没有定义具体的规则。比如说，以大于 60HZ 的频率更新页面是没有必要的，因为 30HZ-60HZ 的更新频率在肉眼看来已经很流畅了。如果确定需要更新，则主线程切换到渲染线程，此时，主线程将停止事件循环，直到页面渲染完成。
在执行具体的更新操作操作之前，浏览器会依次触发下面的事件：<br><br>
	- dispatch pending UI events
    - resize event
    - scroll event
    - mediaquery listeners
    - CSSAnimation events
    - Observers
    - rAF

> There are two classes of UI events:
- Discrete - those that aren't continuous (eg. mousedown, mouseup, touchstart, touchend).
- Continuous - mousewheel, wheel, mousemove, pointermove, touchmove.<br><br>
*——— [https://github.com/atotic/event-loop](https://github.com/atotic/event-loop)*

如果页面有注册这些事件的函数，则会生成一个宏任务放进宏任务队里，并返回事件循环。当由这一步触发的事件任务经过事件循环都执行完成后，最后才是真正的更新操作。如果在执行任务的期间使用 JavaScript 更改了样式或者DOM元素，使页面需要 reflow/repaint，则浏览器会将这些更改添加到更新队列，并在本轮更新中更新。

这些事件是依次触发的，Chrome正常，不过有些浏览器会与标准不一致[(测试)](https://github.com/wanls4583/wanls4583.github.io/tree/master/code/前端优化/event-loop/dispatch-order)。

#### 更新流程验证

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
        body,html{
            height: 100%;
            padding: 0;
            margin: 0;
        }
        .d1{
            width: 100px;
            height: 100px;
            background: red;
        }
        .d2{
            height: 100%;
        }
    </style>
</head>
<body>
    <div class="d1"></div>
    <div class="d2"></div>
    <script type="text/javascript">

        function testST(){
            requestAnimationFrame(function(){
                document.querySelector('.d1').style.width = '200px';
                console.log('RAF');
            });
            window.addEventListener('scroll', function() {
                document.querySelector('.d1').style.width = '400px';
                setTimeout(function(){
                    document.querySelector('.d1').style.backgroundColor = 'green';
                    console.log('timeout');
                },0);
                console.log('scroll');
                sleep(200);
            });
            window.scrollBy(0,10);
        }

        function testPro(){
            requestAnimationFrame(function(){
                document.querySelector('.d1').style.width = '200px';
                console.log('RAF');
            });
            window.addEventListener('scroll', function() {
                document.querySelector('.d1').style.width = '400px';
                Promise.resolve().then(function(){
                    document.querySelector('.d1').style.backgroundColor = 'green';
                    console.log('promise');
                });
                console.log('scroll');
                sleep(200);
            });
            window.scrollBy(0,10);
        }

        function sleep(t){
            let start = Date.now();
            while(true){
                if(Date.now() - start >= t){
                    break;
                }
            }
        }
    </script>
</body>
</html>
```

操作：
- 打开页面后，切换到调试工具 Performance 选项卡，点击 record 按钮开始记录页面事件活动
- 在控制台输入 testST() 运行函数

**`testST()` 结果：**

![](http://wanls4583.github.io/images/posts/前端优化/event-loop-1.png)

从结果中可以看到，同时执行 requesAnimationFrame 和 scroll，在更新时会先触发 scroll 事件，然后再触发 animationFrame 事件。由于在 scroll 回调里暂停了 200ms，这两个任务执行完成之前，队列里还有一个 timer 任务待执行，但是，主线程在执行完由 render 过程触发的任务后会立即开始执行更新操作，所以 timer 任务里的样式更改，需要在下一个 render 过程才会被页面跟新。

如果运行 testPro()，结果则不是这样了。这里将 setTimout 换成了 promise， 由于 requesAnimationFrame 和 scroll 也是宏任务，所以在执行完回调后，会检查微任务队列并执行所有任务，所以里面的样式更改会在本次 render 过程里被更新到页面。

**`testPro()` 结果：**

![](http://wanls4583.github.io/images/posts/前端优化/event-loop-2.png)

### 垂直同期(vSync)

> Whether a top-level browsing context would benefit from having its rendering updated depends on various factors, such as the update frequency. For example, if the browser is attempting to achieve a 60Hz refresh rate, then these steps are only necessary every 60th of a second (about 16.7ms). If the browser finds that a top-level browsing context is not able to sustain this rate, it might drop to a more sustainable 30Hz for that set of Documents, rather than occasionally dropping frames. (This specification does not mandate any particular model for when to update the rendering.) Similarly, if a top-level browsing context is in the background, the user agent might decide to drop that page to a much slower 4Hz, or even less.<br><br>
*——— [https://html.spec.whatwg.org/multipage/webappapis.html#event-loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop)*

> Render part of the loop gets executed on vSync<br><br>
*——— [https://github.com/atotic/event-loop](https://github.com/atotic/event-loop)*

浏览器在执行完微任务后检查是否有必要更新页面，它会以垂直同期的方式更新页面，这里的垂直同期指的是，浏览器可能会根据屏幕的刷新频率来更新页面，多数时候，屏幕的更新频率是 60HZ（一秒钟60次），也即浏览器只要以约 16.7ms 的间隔更新页面就可以实现流畅的画面，在 16.7ms 内的更新检查将会返回 false。


