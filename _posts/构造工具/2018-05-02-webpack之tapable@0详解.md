---
author: wanls4583
comments: true
layout: post
title: Webpack之tapable@0详解
categories:
- 构建工具

tags:
- 构造工具

---

## Tapable

> tapable是webpack的事件流核心库，其中webpack4.0之前的版本都是使用Tapable@0版本，从webpack4.0开始使用Tapable@1版本，本篇文章针对的是Tapable@0，所使用的具体版本为Tapable@0.2.8。

### 获取Tapable

[Tapable.js](https://github.com/webpack/tapable/tree/v0.2.8/lib)

下载后修改44行代码使其挂载到window，方便测试

```javascript
// module.exports = Tapable;
window.Tapable = Tapable;
```

### 示例

```html
<!DOCTYPE html>
<html>
<head>
	<title>tapable-demo</title>
	<script type="text/javascript" src="./Tapable.js"></script>
</head>
<body>
	<script type="text/javascript">
		var tap = new Tapable();

		//applyPlugins：依次执行所有插件
		tap.plugin('test',function(a,b){
			console.log('test1',a,b);
		})
		tap.plugin('test',function(a,b){
			console.log('test2',a,b);
		})
		tap.applyPlugins('test','arg1','arg2');
		console.log('-----------------------');
		//applyPluginsWaterfall：依次执行插件，前一个插件的返回值将作为下一个插件的参数
		tap.plugin('testWaterfall',function(a,b){
			console.log('testWaterfall1',a,b);
			//返回值作为下一个插件的第一个返回值
			return 1;
		})
		tap.plugin('testWaterfall',function(a,b){
			console.log('testWaterfall2',a,b);
		})
		tap.applyPluginsWaterfall('testWaterfall','arg1','arg2');
		console.log('-----------------------');
		//applyPluginsBailResult(依次执行插件，当插件返回值不为undefined时，停止执行之后的插件)
		tap.plugin('testBailResult',function(a,b){
			console.log('testBailResult1',a,b);
			//返回值不为undefined，其后的插件将不再执行
			return null;
		})
		tap.plugin('testBailResult',function(a,b){
			console.log('testBailResult2',a,b);
		})
		tap.applyPluginsBailResult('testBailResult','arg1','arg2');
		console.log('-----------------------');
		//applyPluginsAsyncSeries：异步的执行插件，后一个插件只有在前一个插件执行回调后才会开始执行，如果有一个插件回调的参数不为false，则将停止执行其后的插件
		tap.plugin('testAsyncSeries',function(a,b,cb){
			console.log('testAsyncSeries1',a,b);
			//执行了回调后才会接着执行接下来的插件
			cb();
		})
		tap.plugin('testAsyncSeries',function(a,b,cb){
			console.log('testAsyncSeries2',a,b);
			//回调参数不为false，将不再继续执行
			cb(1);
		})
		tap.plugin('testAsyncSeries',function(a,b,cb){
			console.log('testAsyncSeries3',a,b);
		})
		tap.applyPluginsAsyncSeries('testAsyncSeries','arg1','arg2',function(...arg){
			console.log('testAsyncSeriesCb',...arg);
		})
		console.log('-----------------------');
		//applyPluginsAsyncSeriesBailResult：和applyPluginsAsyncSeries类似，只是回调停止继续执行的判断条件不同
		tap.plugin('testAsyncSeriesBailResult',function(a,b,cb){
			console.log('testAsyncSeriesBailResult1',a,b);
			//执行了回调后才会接着执行接下来的插件
			cb();
		})
		tap.plugin('testAsyncSeriesBailResult',function(a,b,cb){
			console.log('testAsyncSeriesBailResult2',a,b);
			//回调参数个数大于0，将不再继续执行
			cb(null);
		})
		tap.plugin('testAsyncSeriesBailResult',function(a,b,cb){
			console.log('testAsyncSeriesBailResult3',a,b);
		})
		tap.applyPluginsAsyncSeriesBailResult('testAsyncSeriesBailResult','arg1','arg2',function(...arg){
			console.log('testAsyncSeriesBailResultCb',...arg);
		})
		console.log('-----------------------');
		//applyPluginsAsyncWaterfall：和applyPluginsAsyncSeries类似，只不过插件回调参数只能是两个
		tap.plugin('testAsyncWaterfall',function(a,cb){
			console.log('testAsyncWaterfall1',a);
			//执行了回调后才会接着执行接下来的插件，第一个必须为false，第二值用来传递给下个插件
			cb(null,'value');
		})
		tap.plugin('testAsyncWaterfall',function(a,cb){
			console.log('testAsyncWaterfall2',a);
			//回调参数不为false，将不再继续执行
			cb(1);
		})
		tap.plugin('testAsyncWaterfall',function(a,cb){
			console.log('testAsyncWaterfall3',a);
		})
		tap.applyPluginsAsyncWaterfall('testAsyncWaterfall','arg1',function(...arg){
			console.log('testAsyncWaterfallCb',...arg);
		})
		console.log('-----------------------');
		//applyPluginsParallel：通过for循环并行的执行所有插件，如果某个插件执行了回调且回调参数不为false，则其后所有未执行的插件将不再执行。可能存在插件异步调用了回调，这时候后面的插件可能已经执行了
		tap.plugin('testParallel',function(a,b,cb){
			console.log('testParallel1',a,b);
		})
		tap.plugin('testParallel',function(a,b,cb){
			console.log('testParallel2',a,b);
			//回调参数不为false，将不再继续执行
			cb(1);
			//如果换成异步，则后面的插件依然能执行
			// setTimeout(function(){
			// 	cb(1);
			// },0)
		})
		tap.plugin('testParallel',function(a,b,cb){
			console.log('testParallel3',a,b);
		})
		tap.applyPluginsParallel('testParallel','arg1','arg2',function(...arg){
			console.log('testParallelCb',...arg);
		})
		console.log('-----------------------');
		//applyPluginsParallelBailResult：通过for循环执行所有插件，只有第一个插件的回调能执行
		tap.plugin('testParallelBailResult',function(a,b,cb){
			console.log('testParallelBailResult1',a,b);
			//回调函数只有第一次执行,并且参数个数要大于0
			setTimeout(function(){
				cb(null,'value');
			},100)
		})
		tap.plugin('testParallelBailResult',function(a,b,cb){
			console.log('testParallelBailResult2',a,b);
			cb(1);
		})
		tap.plugin('testParallelBailResult',function(a,b,cb){
			console.log('testParallelBailResult3',a,b);
		})
		tap.applyPluginsParallelBailResult('testParallelBailResult','arg1','arg2',function(...arg){
			console.log('testParallelBailResultCb',...arg);
		})
	</script>
</body>
</html>
```

**运行结果:**

![](https://wanls4583.github.io/images/posts/构造工具/webpack之tapable@0详解.jpg)