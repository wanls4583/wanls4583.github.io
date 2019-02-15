---
author: wanls4583
comments: true
date: 2019-02-15 12:02
layout: post
title: js模拟实现call,apply,bind
categories:
- JavaScript

tags:
- JavaScript
---

```javaScript
    Function.prototype.myCall = function(context) {
        if(typeof context != 'object') {
            return;
        }
        var fn = Symbol();
        var args = [];
        for(var i=1; i<arguments.length; i++) {
            args.push(arguments[i]);
        }
        context[fn] = this;
        context[fn](...args);
    }

    Function.prototype.myApply = function(context) {
        if(typeof context != 'object') {
            return;
        }
        var fn = Symbol();
        var args = arguments[1] instanceof Array ? arguments[1] : [];
        context[fn] = this;
        context[fn](...args);
    }

    Function.prototype.myBind = function(context) {
        var self = this;
        return function() {
            self.apply(context,arguments);
        }
    }

    function test(arg){
        console.log(this.name,arg);
    }

    var obj = {
        name: 'lisong'
    };

    test.myCall(obj,'testCall'); //lisong testCall

    test.myApply(obj,['testApply']); //lisong testApply

    test.myBind(obj)('testBind'); //lisong testBind
```