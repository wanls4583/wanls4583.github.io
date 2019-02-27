---
author: wanls4583
comments: true
date: 2019-02-27 16:19
layout: post
title: 前端性能优化之-PWA(vue中接入pwa实践)
tags:
- 前端优化
---

> 目前的应用中，pwa主要用来实现离线存储静态文件（当然还有推送功能，目前看来比较鸡肋），使其在断网的情况下依然可以被浏览器加载。

## 在vue中使用pwa

1.manifest.json:
```javascript
{
  "scope": "/",
  "name": "音盟发布后台",
  "short_name": "音盟发布后台",
  "start_url": "/",
  "display": "standalone",
  "description": "音盟发布后台",
  "orientation": "portrait",
  "theme_color": "#f9d67e",
  "background_color": "#fff",
  "icons": [
  {
    "src": "./img/logo.png",
    "sizes": "48x48",
    "type": "image/png"
  },
  {
    "src": "./img/logo.png",
    "sizes": "144x144",
    "type": "image/png"
  }]
}
```

2.index.html:
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="manifest" href="/static/manifest.json">
    <script type="text/javascript">
      (function() {
        if('serviceWorker' in navigator && location.protocol=='https:') { //注册service-worker，必须是https（localhost除外）
          navigator.serviceWorker.register('/service-worker.js');
        }
      })();
    </script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

3.使用`sw-precache-webpack-plugin`插件

```javascript
...
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
...
new SWPrecacheWebpackPlugin({
  cacheId: 'ym-app',
  staticFileGlobs: ['dist/**/*.{js,html,css}'],
  minify: true,
  stripPrefix: 'dist/'
})
...
```

build之后其会在dist目录下生成一个`service-worker.js`文件。其代码住流程如下：

```javascript
...
//每个需要存储的文件对应一个hash，文件变化时，service-worker.js 中的对应的hash也会变化
var precacheConfig = [["index.html", "d38edf8db59e7dd91ccb877ef163d31b"], ["service-worker.js", "5c0c0cbecb8544bfcc687c909fd49cdc"], ["static/css/app.fef1abee3f12f21e218ddec1d58b6fc6.css", "2a77574058b3438fb5f7cce4513a8bb4"], ["static/html/wxLogin.html", "e0ed73f05b7922414e1005dc41ca28c1"], ["static/js/0.3f2be2a020b3a94ac1ea.js", "41e7823410b3b65e738d382cfe21cc62"], ["static/js/1.5143706b17b1bc69d45d.js", "47366bb0197080021e0c7fd46f7d5c9f"], ["static/js/12.934297257cdd3d0c2260.js", "6ff8adb94666b3b8594dad94c81876df"], ["static/js/13.121bcdf047b663540110.js", "52581bea367c2d6d17fb88450a0fd2cf"], ["static/js/14.2b6c69e731f113365755.js", "7911ad600864deefc0e8e8caf670faaa"], ["static/js/2.5a19dea541f93af2e6b4.js", "542c99e30546905ca44d03787424a9c5"], ["static/js/3.12f6287ab8242457ef6a.js", "efc489a57473fe2934f4fd5728e89f6e"], ["static/js/4.a220248c2802112f4cef.js", "2f4da6289567ba71a3d6476f29ef77ec"], ["static/js/5.3d3259fc69baa8ef3ca5.js", "3442a26bd866862c6cc7973954023531"], ["static/js/6.e8f023f6bc3b547719ac.js", "4de3cf7108a0333fe14f56d469dd33c3"], ["static/js/7.15fe9ce8ca404aebf40b.js", "89f3c3591836ff7c0531cc68a39244f0"], ["static/js/8.0606f59eefd3b8235495.js", "6043047d95c69b50db6bfb6404aeed86"], ["static/js/9.2147611e55ffe0ebb062.js", "25e5bac14378c1f860411e47f21631b4"], ["static/js/app.735923e393b696a5cddd.js", "004363266ab53430477e47020161d552"], ["static/js/manifest.0244e595627d2cf52aaa.js", "96756f50ccc73262740afff811cb7051"], ["static/js/vendor.433132e77c4d31c0d66f.js", "9336d0a614cfc7adc3af0858e58e1cc6"], ["static/js/wxLogin.js", "5a676b71d687d7c323df7e7980eecd55"]],
...
//注册事件（每次 service-workder.js 文件有改变时都会重新注册）
self.addEventListener("install",function(){
	//预加载 precacheConfig 中的文件（链接后面会加上hash参数）,将其存储到cache
});
//激活事件（触发install后，会接着触发该事件）
self.addEventListener("install",function(){
	//检查所有可用的存储条目，根据hash值判断是否有效，无效则将其cache中删除出
});
//拦截请求
self.addEventListener("fetch",function(){
	//如果cache中存在该文件，则直接返回，否则从服务器拉取最新的文件
});
```

`sw-precache-webpack-plugin`插件的主要作用为生成一个`service-workder.js`文件，每次当相应的文件有改变时，其内容也会更改，这样浏览器又会重新注册service-worker。

**注意：正式环境必须是https协议**