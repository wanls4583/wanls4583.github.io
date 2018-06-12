---
title: JS数据结构-KMP算法
comments: true
layout: post
date: 2018-6-12 21:31:00
tags:
- JS数据结构
---

> KMP 算法核心思想为：通过为模式串建立失败链接，使主串在匹配时不需要回溯索引

```javascript
String.prototype.searchStr = function(p){
	var i = 0,j = 0;
	var flink = getFlink(p);

	while( i <= this.length-(p.length-j) && j<p.length){
		//如果字符相等，或者是模式的第一个字符，主串和模式都应该向后移动一个位置
		if(this[i] == p[j] || j==-1){ 
			i++;
			j++;
		}else{ // 查找失败，只需移动模式串的位置，不需要i回溯
			j = flink[j];
		}
	}

	if(j==p.length){ //匹配成功，返回模式串在子串开始的索引下标
		return i-p.length;
	}else{ //匹配失败，返回-1
		return -1;
	}

	//KMP 算法核心（获取失败连接数组）
	function getFlink(p){
		var flink = [-1,0]; //为-1是为了标记第一个位置（方便之后使用flink去匹配）
		for(var i=2; i<p.length; i++){
			var preFlink = flink[i-1];
			if(p[preFlink] == p[i-1]){
				flink[i] = preFlink+1;
			}else{
				flink[i] = 0;
			}
		}
		return	flink;
	}
}
```


