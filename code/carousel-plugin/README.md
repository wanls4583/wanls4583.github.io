# carousel-plugin

> 一个使用原生 JavaScript 实现的轮播图组件，兼容 pc 和 h5

## 内容

- [**`功能特性`**](#功能特性)
- [**`安装`**](#安装)
- [**`使用`**](#使用)
- [**`案例`**](#案例)
- [**`config`**](#config)   
- [**`贡献`**](#贡献)

## 功能特性
* [x] 使用原生 JavaScript
* [x] 兼容 pc 和 h5
* [x] 持续维护迭代

## 安装

```bash
npm install carousel-plugin --save
```

OR

```html
<script src="./dist/carousel.min.js"></script>
<script>
	new Carousel({
		container: document.querySelector('.carousel'),
		wrap: document.querySelector('.wrap')
	});
</script>

```

## 使用

### 开发

```bash
npm run dev
```

### 编译案例

```bash
npm run build:example
```

### 编译生产环境

```bash
npm run build:prod
```

## 案例

请查看[**`example`**](https://github.com/wanls4583/carousel-plugin/tree/master/src/example)

[**`pc oline demo`**](https://blog.lisong.hn.cn/code/carousel-plugin/dist/example/pc.html)

[**`mobile oline demo`**](https://blog.lisong.hn.cn/code/carousel-plugin/dist/example/mobile.html)

## config

|option|description|default|val|
|:---|---|---|---|
|`duration`|切换时长(ms)[可选]|`1000`|`Number`|
|`stay`|停留时长(ms)[可选]|`1000`|`Number`|
|`container`|外部容器[必选]|`null`|`DOM`|
|`wrap`|轮播容器[必选]|`null`|`DOM`|
|`multi`|一屏是否包含多个项目[可选]|`false`|`Boolean`|
|`dotsWrap`|底部锚点容器[可选]|`null`|`DOM`|
|`leftArrow`|左边切换按钮[可选]|`null`|`DOM`|
|`rightArrow`|右边切换按钮[可选]|`null`|`DOM`|
|`usePosition`|是否使用定位实现动画过渡[可选]|`false`|`Boolean`|
|`enableTouch`|是否允许触摸滑动[可选]|`true`|`Boolean`|
|`enableClick`|是否允许点击底部锚点切换[可选]|`true`|`Boolean`|
|`dotClassName`|锚点类名[可选]|`dot`|`String`|
|`activeClassName`|激活的锚点类名[可选]|`active`|`String`|
|`activeClassName`|激活的锚点类名[可选]|`active`|`String`|

## 贡献

欢迎给出一些意见和优化，期待你的 `Pull Request`