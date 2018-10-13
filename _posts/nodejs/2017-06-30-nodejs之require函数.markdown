---
author: wanls4583
comments: true
date: 2017-06-30 07:09:23+00:00
layout: post
title: nodejs之require函数
wordpress_id: 264
categories:
- nodejs

tags:
- nodejs

---

nodejs的require函数有三种引入方式：

## 1.引入同目录下的包（根据文件夹名称）

示例：

node_require/somepackage/package.json：
```javascript
{  
  "name": "somepackage",  
  "version": "1.0.0",  
  "description": "",  
  "main": "./dist/test.js",  
  "scripts": {  
    "test": "echo \"Error: no test specified\" && exit 1"  
  },  
  "author": "",  
  "license": "ISC"  
}  
```
注意：main属性指定了模块的入口文件，如果没有package.json文件，则入口文件默认为包根目录下的index.js文件

node_require/somepackage/dist/test.js：
```javascript
var a = {name:'this is test.js'};  
//exports.a=a;  
module.exports=a  
node_require/getModule1.js：
[javascript] view plain copy
var a = require('./somepackage')  
//console.log(a.a.name);  
console.log(a.name); 
``` 
注意：包名称前面需要加"./"
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-1.jpg)

在命令行下运行：
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-2.jpg)

## 2.引入同目录下node_modules目录下的包（根据文件夹名称）
node_require\node_modules\somepackage\index.js：
```javascript
var a = {name:'this is index.js'};  
module.exports=a  
node_require\node_modules\getModule2.js
[javascript] view plain copy
var a = require('somepackage')  
console.log(a.name);  
```
注意：这里直接写的包文件夹名称
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-3.jpg)

在命令行下运行：
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-4.jpg)

3.引入全局包

首先我们的设置全局环境变量，我这里的全局目录为C:\Users\Lisong\AppData\Roaming\npm\node_modules,所以设置环境变量NODE_PATH=C:\Users\Lisong\AppData\Roaming\npm\node_modules

示例：

C:\Users\Lisong\AppData\Roaming\npm\node_modules\somepackage\index.js：
```javascript
var a = {name:'this is global_test'};  
module.exports=a  
```
node_require\getModule3.js：
```javascript
var a = require('somepackage')  
console.log(a.name);  
```
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-5.jpg)

运行命令行：
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-6.jpg)

此时，如果本地目录下也有somepackage包：

node_require\node_modules\somepackage\index.js：
```javascript
var a = {name:'this is index.js'};  
module.exports=a  
```
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-7.jpg)

运行命令行：
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-8.jpg)

可以看到，会优先使用本地包

最后说一下啊，require的作用域。nodejs的require函数是同步的（和seajs不一样），引入的时候会执行模块的所有代码，模块里定义的变量作用域值在模块内。

示例：

node_require\node_modules\somepackage\index.js：
```javascript
var a = {name:'this is index.js'};  
console.log("index.js:"+a.name);  
```
node_require\getModule4.js：
```javascript
require('somepackage')  
console.log(a);  
```
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-9.jpg)

运行命令行：
![](https://wanls4583.github.io/images/posts/nodejs/2017-06-30-nodejs之require函数-10.jpg)

