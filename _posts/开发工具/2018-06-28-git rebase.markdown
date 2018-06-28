---
author: wanls4583
comments: true
date: 2018-06-28
layout: post
title: git rebase
categories:
- 开发工具

tags:
- 开发工具

---

`git rebase commitid`

该命令可以把另一个分支的最新commit改变为当前分支的基础。在改动中会把不一致的本分支commit保存，把另一个分支的commit加载过来，然后把之前保存的commit打上新的时间戳放在后面，简称“变基”。**rebase 过程是与提交时间无关的**。

![](https://wanls4583.github.io/images/posts/开发工具/git-rebase-1.png)

![](https://wanls4583.github.io/images/posts/开发工具/git-rebase-2.png)

在 dev 分支执行`git rebase master`

![](https://wanls4583.github.io/images/posts/开发工具/git-rebase-3.png)

解决完第一个冲突后`add`到暂存区

![](https://wanls4583.github.io/images/posts/开发工具/git-rebase-4.png)

`git rebase --continue`继续解决下一个冲突（总共有两个冲突）

![](https://wanls4583.github.io/images/posts/开发工具/git-rebase-5.png)
![](https://wanls4583.github.io/images/posts/开发工具/git-rebase-6.png)

最终结果：

![](https://wanls4583.github.io/images/posts/开发工具/git-rebase-7.png)

`git rebase`不会产生新的历史记录：

<embed src="https://wanls4583.github.io/images/posts/开发工具/git-rebase.svg" type="image/svg+xml"></embed>




