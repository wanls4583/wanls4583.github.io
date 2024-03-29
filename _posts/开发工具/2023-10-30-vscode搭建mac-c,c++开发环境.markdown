---
author: wanls4583
comments: true
date: 2018-06-28
layout: post
title: vscode搭建mac环境下c/c++开发环境
categories:
- 开发工具

tags:
- 开发工具

---

## 第一步

安装 C/C++ 扩展

![](https://wanls4583.github.io/images/posts/开发工具/2023-10-30-vscde搭建c,c++开发环境-1.png)

## 第二步

选中项目中的`C`文件后，打开控制面板，使用***C/C++:Edit Configurations***命令自动生成`c_cpp_properties.json`文件

![](https://wanls4583.github.io/images/posts/开发工具/2023-10-30-vscde搭建c,c++开发环境-2.png)

***c_cpp_properties.json***:

```json
{
    "configurations": [
        {
            "name": "Mac",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "macFrameworkPath": [
                "/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks"
            ],
            "compilerPath": "/usr/bin/clang",
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "macos-clang-arm64"
        }
    ],
    "version": 4
}
```

## 第三步

选中项目中的`C`文件后，打开控制面板，使用***C/C++:Add Debug Configurations***命令自动生成`tasks.json`和`launch.json`文件

![](https://wanls4583.github.io/images/posts/开发工具/2023-10-30-vscde搭建c,c++开发环境-3.png)

`tasks.json`里面包含了编译任务，`launch.json`里面则是用来启动调试。

***tasks.json***:

```json
{
    "tasks": [
        {
            "type": "cppbuild",
            "label": "C/C++: clang build active file",
            "command": "/usr/bin/clang",
            "args": [
                "-fcolor-diagnostics",
                "-fansi-escape-codes",
                "-g",
                "${file}",
                "-o",
                "${fileDirname}/${fileBasenameNoExtension}"
            ],
            "options": {
                "cwd": "${fileDirname}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": "build",
            "detail": "Task generated by Debugger."
        }
    ],
    "version": "2.0.0"
}
```

***launch.js***:

```json
{
    "configurations": [
        {
            "name": "C/C++: clang build and debug active file",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb",
            "preLaunchTask": "C/C++: clang build active file"
        }
    ],
    "version": "2.0.0"
}
```

`"preLaunchTask"`为启动调试时预先要处理的任务，也就是上面的编译任务，`"program"`为编译后生成的可执行文件的路径。

***最终项目目录结构为：***

![](https://wanls4583.github.io/images/posts/开发工具/2023-10-30-vscde搭建c,c++开发环境-4.png)

## 调试

在行号处打上断点，启动调试，程序就会在断点出停住，此时可以查看变量的值

![](https://wanls4583.github.io/images/posts/开发工具/2023-10-30-vscde搭建c,c++开发环境-5.png)