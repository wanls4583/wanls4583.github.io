# js-avl-tree

> 使用 JavaScript 编写的平衡二叉树，可以快速的插入，删除和查找数据。

## 内容

- [**`安装`**](#安装)
- [**`案例`**](#案例)
- [**`AVLNode`**](#AVLNode)
- [**`insert`**](#insert)
- [**`delete`**](#delete)
- [**`search`**](#rsearch)
- [**`贡献`**](#贡献)


## 安装

```bash
npm install js-avl-tree
```

## 案例

请查看[**`example`**](https://github.com/wanls4583/js-avl-tree/tree/master/src/example)

## AVLNode

```javascript
//节点
function AVLNode(key, data) {
    this.key = key; //查找关键字
    this.data = data; //节点数据
    this.lChild = null; //左子树
    this.rChild = null; //右子树
    this.pre = null; //中序前一个节点
    this.next = null; //中序后一个节点
    this.pNode = null; //父节点
    this.height = 0; //节点的高度
}
```

## insert

```javascript
/**
 * 插入节点
 * @param  {[type]} key  节点的key
 * @param  {[type]} data 节点的数据
 * @return {Boolean}     插入是否成功
 */
insert = function(key, data)
```

## delete

```javascript
/**
 * 删除节点
 * @param  {[type]}  key 需要删除的节点的key
 * @return {AVLNode}     被删除后的点
 */
delete = function(key)
```

## search

```javascript
/**
 * 查找节点
 * @param  {[type]}  key 需要查找的节点的key
 * @return {AVLNode}     查找结果
 */
search = function(key)
```

## 贡献

欢迎给出一些意见和优化，期待你的 `Pull Request`