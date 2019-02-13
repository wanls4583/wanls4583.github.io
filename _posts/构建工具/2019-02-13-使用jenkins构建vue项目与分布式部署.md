---
author: wanls4583
comments: true
date: 2019-02-13
layout: post
title: 使用jenkins构建vue项目与分布式部署
categories:
- 其他

tags:
- 构建工具
---

一、分布式部署拓扑图

![](https://wanls4583.github.io/images/posts/构建工具/使用jenkins构建vue项目与分布式部署-1.png)

二、配置远程服务器

可以使用`Publish Over SSH`插件来实现linux服务器之间的免密码登录，其步骤如下：
1. 在 jenkins 服务器上安装`Publish Over SSH`插件
2. 生成RSA秘钥对
3. 将公钥配置到远程的三台机（10.32.0.223,10.33.0.11,10.167.0.246）,将公钥添加到`/root/.ssh/authorized_keys`文件即可
4. 将私钥添加到`Publish Over SSH`的配置中
5. 在`Publish Over SSH`的配置中添加远程服务器

![](https://wanls4583.github.io/images/posts/构建工具/使用jenkins构建vue项目与分布式部署-2.png)

注意 `jenkins_publish_dir` 目录在远程服务器上的 root 账户下必须存在，通过SSH传输的文件默认会放在该目录下

三、配置触发器、构建等操作

![](https://wanls4583.github.io/images/posts/构建工具/使用jenkins构建vue项目与分布式部署-3.png)

因为我们jenkins执行的操作涉及到 sudo，所以需要在jenkins服务器配置 jenkins 账号的免密权限

![](https://wanls4583.github.io/images/posts/构建工具/使用jenkins构建vue项目与分布式部署-4.png)

经过上面的配置，只要git用户lisong有提交（提交的注释信息后面必须是-deploy），则jenkins会自动拉取代码并构建，最后分发到远程的三台机子