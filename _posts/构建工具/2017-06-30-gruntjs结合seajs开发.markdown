---
author: wanls4583
comments: true
date: 2017-06-30 06:11:27+00:00
layout: post
title: gruntjs结合seajs开发
wordpress_id: 258
categories:
- 构建工具

tags:
- 构造工具

---
>gruntjs是一款前端构建化工具，其可以帮我们做很多重复性的劳动，可以很大程度上提高前端开发的效率，下面用实例就来简单介绍下其配合seajs模块化框架是如何使用的。

示例

1.首先你得安装nodejs，然后新建nodejs文件夹，当作项目的根目录，在其中新建package.json

package.json:
```javascript
{  
  "name":"testGrunt",  
  "version":"0.1.0",  
  "dependencies": {  
    "grunt":"~1.0.1",  
    "grunt-cmd-concat":"~0.2.1",  
    "grunt-contrib-uglify":"~2.0.0",  
    "grunt-cmd-transport":"~0.5.1",  
    "grunt-mcopy":"~0.4.3",  
    "grunt-contrib-clean":"~0.6.0"  
  }  
}  
```
2.打开命令行，进入nodejs目录，运行以下命令安装所有的依赖
```
npm install  
```
此时将在nodejs目录下生成一个文件夹node_modules，里面包含了我们需要用的所有依赖
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gruntjs结合seajs开发-1.jpg" alt="" />

3.在nodejs目录下新建我们的测试页面

sea.html：
```
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Document</title>  
    <script type="text/javascript" src="sea.js"></script>  
    <script type="text/javascript">  
        seajs.use("main",function(){  
            console.log("执行入口模块回调函数");  
        })  
    </script>  
</head>  
<body>  
</body>  
</html> 
``` 
注意：main为合并后的文件,，与sea.html同目录，该文件中的每个模块都必须要有id才能项目依赖，并且其入口模块的id必须为main

4.在nodejs目录下新建目录，用来存放项目的js模块，并且在该目录下新建main.js，a.js，test.js

main.js：
```javascript
define(function(require,exports,module){  
    require("test.js");  
    console.log("执行main.js");  
});  
test.js：
[javascript] view plain copy
define(function(require,exports,module){  
    require("a.js");  
    console.log("执行test.js");  
})  
```
a.js：
```javascript
[javascript] view plain copy
define(function(require,exports,module){  
    console.log("执行a.js");  
})  
```
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gruntjs结合seajs开发-2.jpg" alt="" />

5.把seajs框架文件sea.js拷贝到nodejs目录下，在nodejs目录下新建我们的grunt任务配置文件Gruntfile.js

Gruntfile.js：
```javascript
module.exports = function(grunt) {  
  
  // Project configuration.  
  grunt.initConfig({  
    pkg: grunt.file.readJSON('package.json'),  
    transport: {  
        target_1: {  
            files: [{  
                expand:true,  
                cwd: 'sea_modules',  
                src: '*.js',  
                dest: 'dist'  
            }]  
        }  
    },  
    concat: {  
        target_1: {  
            options: {  
                noncmd: true  
            },  
            files: {  
                'dist/main.js': ['dist/main.js','dist/test.js','dist/a.js']  
            }  
        }  
    },  
    uglify: {  
        target_1: {  
            files: {  
                'dist/main.js': ['dist/main.js']  
            }  
        }  
    },  
    copy : {  
        target_1 : {  
            files:[  
            {expand: true, cwd:'dist',src:'main.js', dest:'.', filter: 'isFile'}  
            ]  
        }  
    },  
    clean: {  
        build: {  
            src: ["dist"]  
        }  
    }  
  });  

  // 加载包含 "uglify" 任务的插件。  
  grunt.loadNpmTasks('grunt-cmd-transport');//提取js模块的id和依赖  
  grunt.loadNpmTasks('grunt-cmd-concat');//合并js模块  
  grunt.loadNpmTasks('grunt-contrib-uglify');//压缩js模块  
  grunt.loadNpmTasks('grunt-mcopy');//复制文件  
  grunt.loadNpmTasks('grunt-contrib-clean');//清空文件夹  
  
  // 默认被执行的任务列表。  
  grunt.registerTask('default', ['transport','concat','uglify','copy','clean']);  
  
};  
```
6.打开命令行，进入nodejs目录，运行grunt命令
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gruntjs结合seajs开发-3.jpg" alt="" />

此时将会在nodejs目录下生成合并后的main.js，该文件即我们最终需要的文件

main.js：
```javascript
define("main",["test"],function(a,b,c){a("test.js"),console.log("执行main.js")}),define("test",["a"],function(a,b,c){a("a.js"),console.log("执行test.js")}),define("a",[],function(a,b,c){console.log("执行a.js")});  
```
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gruntjs结合seajs开发-4.jpg" alt="" />

如果只运行transport任务:
```javascript
grunt.registerTask('default', ['transport'/*,'concat','uglify','copy','clean'*/]);  
```
则将只提取js模块的id和依赖
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gruntjs结合seajs开发-5.jpg" alt="" />

提取后的文件：

main.js：
```javascript
define("main", [ "test" ], function(require, exports, module) {  
    require("test.js");  
    console.log("执行main.js");  
});  
```
test.js：
```javascript
define("test", [ "a" ], function(require, exports, module) {  
    require("a.js");  
    console.log("执行test.js");  
}); 
``` 
a.js：
```javascript
define("a", [], function(require, exports, module) {  
    console.log("执行a.js");  
});  
```
7.运行sea.html进行测试，结果如下：
<img src="https://wanls4583.github.io/images/posts/构建工具/2017-06-30-gruntjs结合seajs开发-6.jpg" alt="" />

可以看到，成功合并了文件。


