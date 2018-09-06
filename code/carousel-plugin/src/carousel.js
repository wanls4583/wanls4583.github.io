class Carousel {

    constructor(options) {
        this.duration = 0; //切换时长ms
        this.stay = 0; //停留时长ms
        this.container = null; //外部容器
        this.wrap = null; //需要轮播的对象
        this.dotsWrap = null; //锚点
        this.leftArrow = null; //左箭头
        this.rightArrow = null; //右箭头
        this.useTransition = false; //是否使用css3过度切换动画
        this.usePosition = false; //是否使用绝对定位切换动画
        this.enableTouch = true; //是否允许触摸滑动
        this.enableClick = true; //是否允许点击dot切换
        this.dotClassName = ''; //锚点类名
        this.activeClassName = ''; //激活的锚点类名
        this.multi = false; //一屏是否包含多个项目
        this.direct = 'right'; //轮播方向
        this.loopTimer = null; //自动轮播计时器
        this.transTimer = null; //动画过渡完成计时器,防止ios qq内置浏览器有时偶尔不触发transitionEnd的bug
        this.rAFTrackTimer = null; //跟踪transtion过渡计时器
        this.rAFPosTimer = null; //定位实现过渡动画计时器
        this.anicomplete = true; //动画播放完成
        this.carouselCount = 0; //当前移动位置
        this.maxCount; //轮播数量
        this.parentWidth = 0; //父容器宽度
        this.wrapWidth = 0; //轮播对象宽度
        this.prefixStyle = null; //css3前缀
        this.bannerClick = false; //是否点击了banner
        this.transEndTime = new Date().getTime(); //动画结束后的时间戳
        this.isWindowFocus = true; //窗口是否为激活状态
        this.init(options);
    }
    init(options) {
        var self = this;
        this.container = options.container;
        this.wrap = options.wrap;
        this.dotsWrap = options.dotsWrap;
        this.leftArrow = options.leftArrow;
        this.rightArrow = options.rightArrow;
        this.duration = options.duration || 1000;
        this.stay = options.stay || 3000;
        this.activeClassName = options.activeClassName || 'dot';
        this.dotClassName = options.dotClassName || 'active';
        this.multi = options.multi;
        options.enableTouch != undefined && (this.enableTouch = options.enableTouch);
        options.usePosition != undefined && (this.usePosition = options.usePosition);
        options.enableClick != undefined && (this.enableClick = options.enableClick);
        this.container.style.overflow = "hidden";
        this.wrap.style.whiteSpace = "nowrap";
        this.wrapWidth = this.wrap.scrollWidth;
        this.parentWidth = this.container.clientWidth;
        this.maxCount = Math.ceil(this.wrapWidth / this.parentWidth) - 1;

        this.initDefault();

        if (this.usePosition) {
            this.container.style.position = 'relative';
            this.wrap.style.position = 'absolute';
            this.wrap.style.left = '0';
            this.wrap.style.top = '0';
        }

        if (this.maxCount > 0) {
            this.createDots(this.maxCount + 1);
        } else {
            return;
        }

        if (this.useTransition) {
            this._addEvent(this.container, this.prefixStyle.transitionend, function() {
                self.transEnd();
            })
        }

        if (this.enableTouch) {
            this.bindTouchEvent();
        }

        if (this.enableClick) {
            this.bindDotClickEvent();
        }

        this.bindArrowClickEvent();
        this.transEnd();

        //切屏后，js可能停止运行
        function onVisibilityChanged(event) {
            var hidden = event.target.hidden;
            if (hidden) {
                self.isWindowFocus = false;
            } else {
                self.isWindowFocus = true;
                self.transEnd();
            }
        }
        document.addEventListener("visibilitychange", onVisibilityChanged, false);
    }
    //初始化默认过渡方式
    initDefault() {
        this.prefixStyle = this._getPrefixStyle();
        if(!this.usePosition){
            if (this.prefixStyle.transitionProperty && this.prefixStyle.transform) {
                this.useTransition = true;
            } else if (!this.prefixStyle.transform) {
                this.usePosition = true;
            }
        }
    }
    //创建锚点
    createDots(carouselCount) {
        if(!this.dotsWrap || this.multi){
            return;
        }
        var html = '';
        for (var i = 0; i < carouselCount; i++) {
            if (i == 0) {
                html += '<div class="' + this.dotClassName + ' ' + this.activeClassName + '"></div>';
            } else {
                html += '<div class="' + this.dotClassName + '"></div>';
            }
        }
        this.dotsWrap.innerHTML = html;
    }
    //激活当前锚点
    activeDot(num) {
        var offsetX = 0;
        if(!this.dotsWrap || this.multi){
            return;
        }
        if (!num && num != 0) {
            if (this.usePosition) {
                offsetX = this._getComputedStyle('left');
                offsetX ? (offsetX = Number(offsetX.replace('px', ''))) : offsetX = 0;
            } else {
                offsetX = this._getComputedTranslateX();
            }
            num = Math.floor((Math.abs(offsetX) + this.parentWidth / 2) / this.parentWidth);
        }
        var dom = this.dotsWrap.getElementsByClassName(this.activeClassName)[0];
        if (dom) {
            dom.className = this.dotClassName;
        }
        //防止当前容器删除后报错
        if (this.dotsWrap.getElementsByClassName(this.dotClassName)[num]) {
            this.dotsWrap.getElementsByClassName(this.dotClassName)[num].className = this.dotClassName + ' ' + this.activeClassName;
        }
    }
    //绑定锚点点击事件
    bindDotClickEvent() {
        if(!this.dotsWrap || this.multi){
            return;
        }
        var self = this;
        var dots = this.dotsWrap.getElementsByClassName(this.dotClassName);
        var length = dots.length;
        for (var i = 0; i < length; i++) {
            (function(num) {
                self._bindClickEvent(dots[num], function(event) {
                    self._stopPropagation(event);
                    self.goToNoTrans(num);
                })
            })(i)
        }
    }
    //绑定前后切换事件
    bindArrowClickEvent() {
        var self = this;
        var offsetX = 0;
        if (this.leftArrow) {
            this._bindClickEvent(this.leftArrow, function(event) {
                self._stopPropagation(event);
                if (self.carouselCount < self.maxCount) {
                    _stop();
                    self.toLeft();
                }
            })
        }
        if (this.rightArrow) {
             this._bindClickEvent(this.rightArrow, function(event) {
                self._stopPropagation(event);
                if (self.carouselCount > 0) {
                    _stop();
                    self.toRight();
                }
            })
        }

        function _stop() {
            self._clearAllTimeoutId();
            if (!self.usePosition) {
                self.wrap.style[self.prefixStyle.transitionDuration] = '0ms';
                var translateX = self._getComputedTranslateX();
                self.wrap.style[self.prefixStyle.transform] = 'translateX(' + translateX + 'px) translateZ(0)';
            } else {
                self.wrap.style[self.prefixStyle.transitionDuration] = '0ms';
                var left = self._getComputedStyle('left');
                left ? (left = Number(left.replace('px', ''))) : left = 0;
                self.wrap.style.left = left + 'px';
            }
        }
    }
    //绑定触屏事件
    bindTouchEvent() {
        var self = this;
        var startX = 0;
        var translateX = 0;
        var left = 0;
        this._addEvent(this.container, 'touchstart', function(event) {
            self._clearAllTimeoutId();
            self.bannerClick = false;
            startX = event.touches[0].pageX;
            if (!self.usePosition) {
                self.wrap.style[self.prefixStyle.transitionDuration] = '0ms';
                translateX = self._getComputedTranslateX();
                self.wrap.style[self.prefixStyle.transform] = 'translateX(' + translateX + 'px) translateZ(0)';
            } else {
                self.wrap.style[self.prefixStyle.transitionDuration] = '0ms';
                left = self._getComputedStyle('left');
                left ? (left = Number(left.replace('px', ''))) : left = 0;
                wrap.style.left = left + 'px';
            }
        })
        this._addEvent(this.container, 'touchmove', function(event) {
            //防止ios下拉
            self._preventDefault(event);
            self._stopPropagation(event);
            var dtX = event.touches[0].pageX - startX;
            var _translateX = translateX + dtX > 0 ? 0 : translateX + dtX;
            var _left = left + dtX > 0 ? 0 : left + dtX;
            _translateX = _translateX < self.parentWidth - self.wrapWidth ? self.parentWidth - self.wrapWidth : _translateX;
            _left = _left < self.parentWidth - self.wrapWidth ? self.parentWidth - self.wrapWidth : _left;
            if (!self.usePosition) {
                self.wrap.style[self.prefixStyle.transform] = 'translateX(' + _translateX + 'px) translateZ(0)';
            } else {
                self.wrap.style.left = _left + 'px';
            }
        })
        this._addEvent(this.container, 'touchend', function(event) {
            if (!self.usePosition) {
                translateX = self._getComputedTranslateX();
                _next(translateX);
            } else {
                left = self._getComputedStyle('left');
                left ? (left = Number(left.replace('px', ''))) : left = 0;
                _next(left);
            }

            function _next(offsetX) {
                var now = new Date().getTime();
                //如果只是点击，则继续执行未完成的过渡
                if (Math.abs(event.changedTouches[0].pageX - startX) < 5) {
                    self.bannerClick = true;
                    if (self.carouselCount == 0) {
                        self.direct = 'left';
                    } else if (self.carouselCount == self.maxCount) {
                        self.direct = 'right';
                    }

                    if (self.anicomplete) { //过渡动画已经完成，延迟后继续下一个轮播
                        self.loopTimer = setTimeout(function() {
                            if (self.direct == 'left')
                                self.toLeft();
                            else
                                self.toRight();
                        }, self.stay - (now - self.transEndTime));
                    } else { //过渡动画未完成，继续下一个轮播
                        if (self.direct == 'left')
                            self.toLeft();
                        else
                            self.toRight();
                    }
                    return;
                }
                self.anicomplete = false;
                if (event.changedTouches[0].pageX > startX) { //向右轮播
                    //跟新carouselCount
                    self.carouselCount = Math.ceil(Math.abs(offsetX / self.parentWidth));
                    if (self.carouselCount == 0) { //已到第一个，不可向右轮播了
                        self.goTo(0)
                        return;
                    }
                    self.toRight();
                } else { //向左轮播
                    //跟新carouselCount
                    self.carouselCount = Math.floor(Math.abs(offsetX / self.parentWidth));
                    if (self.carouselCount == self.maxCount) { //已到最后一个，不可向左轮播了
                        self.goTo(self.maxCount);
                        return;
                    }
                    self.toLeft();
                }
            }

        })
    }
    /**
     * 根据index切换到
     * @param  {Numbe} num 轮播项目索引
     */
    goTo(num) {
        var translateX = num * parentWidth;
        this.anicomplete = false;
        this._translateX(translateX);
    }
    /**
     * 根据index切换到(无过渡效果)
     * @param  {Numbe} num 轮播项目索引
     */
    goToNoTrans(num) {
        var translateX = -num * this.parentWidth;
        this._clearAllTimeoutId();
        if (!this.usePosition) {
            this.wrap.style[this.prefixStyle.transitionDuration] = '0ms';
            this.wrap.style[this.prefixStyle.transform] = 'translateX(' + translateX + 'px) translateZ(0)';
        } else {
            this.wrap.style.left = translateX + 'px';
        }
        this.carouselCount = num;
        this.transEnd();
        this.activeDot(num);
    }
    //向左切换
    toLeft() {
        if (this.carouselCount >= this.maxCount) {
            this.transEnd();
            return;
        };
        var translateX = 0;
        var style = null;
        var startX = 0;
        var time = 0;
        var left = 0;

        this._clearAllTimeoutId();
        this.anicomplete = false;
        this.carouselCount++;

        if (this.carouselCount == this.maxCount && this.multi) {
            translateX = this.wrapWidth - this.parentWidth;
        }else{
            translateX = this.parentWidth * this.carouselCount;
        }

        this._translateX(translateX);
    }
    //向右切换
    toRight() {
        if (this.carouselCount <= 0) {
            this.transEnd();
            return;
        }
        var translateX = 0;
        var style = null;
        var time = 0;
        var left = 0;
        var die = this.wrapWidth % this.parentWidth;
        var balance = 0;
        //使向右轮播时时，第一个项目的滚动距离为 parentWidth
        if(die && this.multi){
            balance = this.parentWidth - die;
        }
        this._clearAllTimeoutId();
        this.anicomplete = false;
        this.carouselCount--;
        translateX = this.parentWidth * this.carouselCount - balance;
        if(translateX < 0){
            translateX = 0;
        }
        this._translateX(translateX);

    }
    //过渡完成回调
    transEnd() {
        //如果容器已被删除，停止轮播，ie不支持isConnected属性
        if (!this.wrap.clientWidth) {
            this._clearAllTimeoutId();
            return;
        }
        var self = this;
        var dom = null;
        var offsetX = 0;

        this.transEndTime = new Date().getTime();
        this.activeDot(this.carouselCount);
        if (this.carouselCount == 0) {
            this.direct = 'left';
        } else if (this.carouselCount == this.maxCount) {
            this.direct = 'right';
        }
        this._clearAllTimeoutId();
        if (this.usePosition) {
            offsetX = this._getComputedStyle('left');
            offsetX ? (offsetX = Number(offsetX.replace('px', ''))) : offsetX = 0;
        } else {
            offsetX = this._getComputedTranslateX();
        }

        if (this.preTranslateX != Math.abs(offsetX)) { //过渡动画未完成
            if (!this.usePosition) {
                this.wrap.style[this.prefixStyle.transitionDuration] = '0ms';
                this.wrap.style[this.prefixStyle.transform] = 'translateX(' + offsetX + 'px) translateZ(0)';
            } else {
                this.wrap.style[this.prefixStyle.transitionDuration] = '0ms';
                this.wrap.style.left = offsetX + 'px';
            }
            if(this.carouselCount == this.maxCount && this.multi){
                this._translateX(this.wrapWidth - this.parentWidth);
            }else{
                this._translateX(this.carouselCount * this.parentWidth);
            }
        } else { //过渡动画已完成
            this.anicomplete = true;
            this.loopTimer = setTimeout(function() {
                if (self.anicomplete) {
                    if (self.direct == 'left')
                        self.toLeft();
                    else
                        self.toRight();
                }
            }, this.stay);
        }
    }
    //跟踪transtion过渡
    _startTransition() {
        var rAF = this._getRAF();
        var self = this;
        rAF(translate);

        function translate() {
            self.rAFTrackTimer = rAF(function() {
                translate();
                self.activeDot();
            })
        }
    }
    //定位实现切换
    _position(dom, offsetX, duration) {
        var self = this;
        var rAF = this._getRAF();
        var startX = 0;
        var dtX = 0;
        var left = 0;
        var sign = 1;
        var now = new Date().getTime();
        startX = self._getComputedStyle('left');
        startX ? (startX = Number(startX.replace('px', ''))) : startX = 0;
        dtX = (1000 / 60) / duration * (offsetX - startX);
        rAF(translate);

        function translate() {
            self.rAFPosTimer = rAF(function() {
                left = self.wrap.style.left;
                left ? left = Number(left.replace('px', '')) : left = 0;
                left > 0 && (left = 0);
                if (Math.abs(offsetX-left) > Math.abs(dtX)) {
                    left += dtX;
                    dom.style.left = left + 'px';
                    translate();
                    self.activeDot();
                } else {
                    dom.style.left = offsetX + 'px';
                    self.transEnd();
                }
            })
        }
    }
    //x轴平移
    _translateX(translateX) {
        var self = this;
        if (this.useTransition) {
            var time = this.duration * (Math.ceil(Math.abs(-translateX - this._getComputedTranslateX())) / this.parentWidth);
            time = time > this.duration ? this.duration : time;
            this.wrap.style[this.prefixStyle.transitionDuration] = time + 'ms';
            this.wrap.style[this.prefixStyle.transform] = 'translateX(-' + translateX + 'px) translateZ(0)';
            self._startTransition();
            //防止transitionend不响应
            this.transTimer = setTimeout(function() {
                self.transEnd();
            }, this.duration + 100);
        } else {
            var left = this.wrap.style.left;
            left ? (left = Number(left.replace('px', ''))) : left = 0;
            time = this.duration * (Math.ceil(Math.abs(-translateX - left)) / this.parentWidth);
            time = time > this.duration ? this.duration : time;
            this.wrap.style[this.prefixStyle.transitionDuration] = '0ms';
            this._position(this.wrap, -translateX, time);
        }
        this.preTranslateX = translateX;
    }
    _clearAllTimeoutId() {
        var cancelRAF = this._getCancelRAF();
        cancelRAF(this.rAFTrackTimer);
        cancelRAF(this.rAFPosTimer);
        clearTimeout(this.loopTimer);
        clearTimeout(this.transTimer);
    }
    //兼容ios冒泡,banner.click 阻止默认事件后，将不会触发子元素的点击
    _bindClickEvent(dom, fn) {
        var self = this;
        this._addEvent(dom, 'touchstart', function(event) {
            self._stopPropagation(event);
        })
        this._addEvent(dom, 'touchmove', function(event) {
            self._preventDefault(event);
            self._stopPropagation(event);
        })
        this._addEvent(dom, 'touchend', function(event) {
            self._stopPropagation(event);
        })
        this._addEvent(dom, 'click', fn);
    }
    _addEvent(ele, event_name, func) {
        if (window.attachEvent) {
            ele.attachEvent('on' + event_name, func);
        } else {
            ele.addEventListener(event_name, func, false); //默认事件是冒泡
        }
    }
    _stopPropagation(e) {
        if (e && e.stopPropagation) { //非IE   
            e.stopPropagation();
        } else { //IE   
            window.event.cancelBubble = true;
        }
    }
    _preventDefault(e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
    //获取css前缀
    _getPrefixStyle() {
        var _elementStyle = document.createElement('div').style;

        var _vendor = (function() {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform,
                i = 0,
                l = vendors.length;
            for (; i < l; i++) {
                transform = vendors[i] + 'ransform';
                if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
            }
            return false;
        })();

        function _prefixStyle(style) {
            if (_vendor === false) return false;
            if (_vendor === '') return style;
            return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }

        var _transform = _prefixStyle('transform');
        var style = {
            transform: _transform,
            transitionProperty: _prefixStyle('transitionProperty'),
            transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
            transitionDuration: _prefixStyle('transitionDuration'),
            transitionDelay: _prefixStyle('transitionDelay'),
            transformOrigin: _prefixStyle('transformOrigin'),
            transitionend: _prefixStyle('transitionend')
        };
        return style;
    }
    //获取计算后的translateX
    _getComputedTranslateX() {
        var startX = 0;
        var style = window.getComputedStyle ? window.getComputedStyle(this.wrap, null) : null || this.wrap.currentStyle;
        var matrix = style[this.prefixStyle.transform];
        if (matrix != 'none') {
            if(matrix.indexOf('matrix3d')!=-1){ //兼容ie
                startX = Number(matrix.replace(/matrix\(|\)/g, '').split(',')[12]);
            }else{
                startX = Number(matrix.replace(/matrix\(|\)/g, '').split(',')[4]);
            }
        }
        return startX;
    }
    //获取计算后的样式属性值
    _getComputedStyle(property) {
        var style = window.getComputedStyle ? window.getComputedStyle(this.wrap, null) : null || this.wrap.currentStyle;
        return style[property];
    }
    //获取requestAnimationFrame帧函数
    _getRAF() {
        var rAF = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        var cancelRAF = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame;
        if (rAF && cancelRAF) {
            return rAF;
        } else {
            return function(callback) { window.setTimeout(callback, 1000 / 60); };
        }
    }
    //获取cancelAnimationFrame取消帧函数
    _getCancelRAF() {
        var rAF = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        var cancelRAF = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame;
        if (rAF && cancelRAF) {
            return cancelRAF;
        } else {
            return clearTimeout;
        }
    }
}

export default Carousel;