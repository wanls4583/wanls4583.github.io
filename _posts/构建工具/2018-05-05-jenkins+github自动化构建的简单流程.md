---
author: wanls4583
comments: true
layout: post
date: 2018-5-5
title: jenkins+github自动化构建的简单流程
categories:
- 构建工具

tags:
- 构建工具

---

## jenkins

jenkins是一个基于java的自动化构建工具，使用它可以为我们解决很多重复的工作，其官网提供了很多插件，根据不同的需求选择相应的插件，可以很大的提高我们的开发或者部署的效率。

本篇文章主要介绍如何实现使用git提交代码到github时，怎么触发Jenkins的自动构建任务。

### 一、安装jenkins

#### 下载jenkins.war项目

jenkins的安装很简单，只要下载官网的[jenkins.war](http://mirrors.shu.edu.cn/jenkins/war/2.119/jenkins.war)包就行。因为Jenkins是基于java的，所以你首先得安装java的jdk并且配置好环境遍历。做好以上两个步骤，只需在命令行中输入以下命令就可以启动jenkins了：

```bash
java -jar jenkins.war
```

第一次启动可能有点慢，直达看到`fully up and running `才算启动完成，在这之前访问，浏览器控制台可能报错，默认访问地址是`localhost:8080`。

启动后，命令行会提示一个初始化密码，打开浏览器访问时需要这个密码去初始化jenkins。

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-1.jpg)

#### 配置工作目录

初始化完成后，我们可以自己配置一下Jenkins的工作目录，也就是拉取代码存储的目录，这个配置config.xml在Jenkins.war解压后的目录，在命令行里可以看到，找到config.xml，在里面重新配置workspaceDir:

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-0.png)

### 二、安装github插件并进行配置

#### 插件安装

在插件管理中切换到可选插件tab页，输入github过滤，在下方的列表中选择`github`插件并进行安装：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-2.jpg)

安装好后回到首页点击新建任务：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-3.jpg)

#### 源码路径

点击刚新建的项目，配置源码管理，这里配置成github的地址，这样每次构建时都会pull一次远程的代码到本地，然后再进行构建。认证只需点击add，添加自己的github名称和密码就行了：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-4.png)

#### 使用触发器

想要监听git的push操作，需要配置构建触发器，这个触发器可以让github有更新时触发Jenkins的构建任务：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-5.jpg)

#### 构建任务

接下来时配置具体的构建任务，我这里是用`git diff --name-only HEAD~ HEAD`命令在控制台输出变化的文件，然后进行模块安装和项目编译`cnpm install && npm run build`（只能输入两行，多个命令可以用&&连接），Windows batch command构建任务可以输入任何在命令行中的命令，执行命令时的目录就是我们配置的工作目录(代码存放的地方)。

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-6.png)

#### 生成github token
为了让github有更新时，能够及时发送HTTP请求给Jenkins，需要在全局配置里配置github server，这个配置主要用来进行github与Jenkins的通信验证，验证是基于token的，所以我们需要先在github上生成一个token，打开[token配置链接](https://github.com/settings/tokens) 添加一个就行了，需要注意的是，token的配置中需要添加admin:org权限。

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-7.jpg)

#### 配置连接github server

生成好token后就可以配置Jenkins的github server配置了。

首先在Credentials管理中添加一个Credentials，secret就是刚刚生成的token：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-8.jpg)

随后打开全局配置，添加id为test的Credentials：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-9.jpg)

#### 配置github webhook

最后需要在github上配置一个webhook钩子，将其地址配置成我们Jenkins服务器的地址，因为我的Jenkins服务器在本地，所以使用了花生壳动态域名，将其映射到内外的8080端口，这样github更新时才能发送post请求通知到Jenkins。

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-10.jpg)

将动态域名地址配置到github：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-11.png)

secret就是之前添加的token。

#### 测试

做完这些就可以开始测试了，我们使用git添加一个test.txt空文件push到github，这时就可以在Jenkins任务面板里看到有个任务正在构建：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-12.png)

构建完成后，点击进去，选择控制台信息，可以查看到构建的详细信息：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-13.png)

命令行的工作目录就是Jenkins拉取下来的源码存储的目录：

![](https://wanls4583.github.io/images/posts/构建工具/jenkins-14.png)



