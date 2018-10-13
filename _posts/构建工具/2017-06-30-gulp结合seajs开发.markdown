---
author: wanls4583
comments: true
date: 2017-06-30 06:22:20+00:00
layout: post
title: gulp结合seajs开发
wordpress_id: 260
categories:
- 构建工具

tags:
- 构造工具

---

上一篇说了gruntjs结合seajs开发，这一节我们来说一下gulp结合seajs是怎么开发的。

其实gruntjs和gulp在前端开发中的作用是一样的，都是自动化项目的前端构建利器，那么它们有什么不一样呢？Grunt主要是以文件为媒介来运行它的工作流的，比如在Grunt中执行完一项任务后，会把结果写入到一个临时文件中，然后可以在这个临时文件内容的基础上执行其它任务，执行完成后又把结果写入到临时文件中，然后又以这个为基础继续执行其它任务...就这样反复下去。而在Gulp中，使用的是Nodejs中的stream(流)，首先获取到需要的stream，然后可以通过stream的pipe()方法把流导入到你想要的地方，比如Gulp的插件中，经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到文件中。所以Gulp是以stream为媒介的，它不需要频繁的生成临时文件，这也是Gulp的速度比Grunt快的一个原因。再回到正题上来，gulp.src()方法正是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流(Vinyl files)，这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息，这个我们暂时不用去深入理解，你只需简单的理解可以用这个方法来读取你需要操作的文件就行了

示例

package.json：
```javascript
{  
  "name":"testGulp",  
  "version":"0.1.0",  
  "dependencies": {  
    "gulp":"~3.9.1",  
    "gulp-seajs-combo":"~1.2.3",  
    "gulp-uglify":"~2.0.1"  
  }  
}  
```
gulpfile.js：
```javascript
var gulp = require('gulp');  
var seajsCombo = require( 'gulp-seajs-combo' );  
var uglify = require("gulp-uglify");  
gulp.task('default',function(){  
   gulp.src('sea_modules/main.js')  
   .pipe(seajsCombo())  
   .pipe(uglify())  
   .pipe(gulp.dest('.'))  
  
});  
```
sea_modules/main.js：
```javascript
define(function(require,exports,module){  
    require("test.js");  
    console.log("执行main.js");  
});  
```
sea_modules/a.js：
```javascript
define(function(require,exports,module){  
    console.log("执行a.js");  
})  
```
sea_modules/test.js：
```javascript
define(function(require,exports,module){  
    require("a.js");  
    console.log("执行test.js");  
})  
```
sea.html：
```
<!DOCTYPE html>  
<html lang="en">  
<head> 
    <meta charset="UTF-8">  
    <title>Document</title>  
    <script type="text/javascript" src="sea.js"></script>  
    <script type="text/javascript">  
        seajs.use("main.js",function(){  
            console.log("执行入口模块回调函数");  
        })  
    </script>  
</head>  
<body>  
</body>  
</html>  
```
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gulp结合seajs开发-1.jpg" alt="" />

在命令行下运行npm install安装package.json里的所有依赖，安装完后多了个node_modules文件夹
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gulp结合seajs开发-2.jpg" alt="" />

最后在命令行下执行gulp命令
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gulp结合seajs开发-3.jpg" alt="" />

此时，将会在gulp目录下生成我们想要的文件（合并压缩后的main.js）
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gulp结合seajs开发-4.jpg" alt="" />

运行sea.html测试结果：
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gulp结合seajs开发-5.jpg" alt="" />

可以看到，成功合并了文件。
