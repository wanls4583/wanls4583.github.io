---
author: wanls4583
comments: true
date: 2017-06-27 09:00:55+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/06/27/javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e4%b9%9d%e7%ab%a0%ef%bc%89%e6%97%a5%e6%9c%9f%e4%b8%8e%e6%97%b6%e9%97%b4/
slug: javascript%e7%ac%94%e8%ae%b0-%ef%bc%88%e7%ac%ac%e4%b9%9d%e7%ab%a0%ef%bc%89%e6%97%a5%e6%9c%9f%e4%b8%8e%e6%97%b6%e9%97%b4
title: javascript笔记--（第九章）日期与时间
wordpress_id: 132
categories:
- JavaScript学习笔记

tags:
- JavaScript学习笔记

---

## Date类型

ECMAScript中的Date类型是在早期Java中java.util.Date类基础上构建的。为此，Date类型使用UTC (Coordinated Universal Time，国际协调时间[又称世界统一时间]) 1970年1月1日午夜(零时)开始经过的毫秒来保存日期。

ECMAScript提供了两个方法，Date.parse()和Date.UTC()。Date.parse()默认是京8区，Date.UTC()默认没有时区。Date.parse()方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回 1970/1/1 午夜距离该日期时间的毫秒数。ECMA-262没有定义Date.parse()应该支持哪种日期格式，因此方法的行为因实现而异，因地区而异。默认通常接收的日期格式如下：

1. '月/日/年'，如6/13/2011;
2. '英文月名 日, 年'，如 May 25, 2004;
3. '英文星期几 英文月名 日 年 时:分:秒 时区'，如 Tue May 25 2004 00:00:00 GMT-070

```
<script type="text/javascript">
	var date1 = Date.parse('6/13/2017 0:0:1');//相当于Mon Jun 13 2017 00:00:01 GMT+0800
	console.log(date1);//1497283201000
	var date2 = Date.parse('Jun 13,2017 00:00:02');
	console.log(date2);//1497283202000
	var date3 = Date.parse('Mon Jun 13 2017 00:00:00 GMT+0800');
	console.log(date3);//1497283200000
</script>
```
日期后面可以跟时间

Date.UTC()方法同样也返回表示日期的毫秒数，但它与Date.parse()在构建值时使用不同的信息。(年份，基于0的月份[0表示1月，1表示2月]，月中的哪一天[1-31]，小时数[0-23]，分钟，秒以及毫秒)。只有前两个参数是必须的。如果没有提供月数，则天数为1；如果省略其他参数，则统统为0。

```
<script type="text/javascript">
	var date1 = Date.UTC(2017,5,13,0,0,1,10);//年，月，日，时，分，秒，毫秒
	console.log(date1);//1497312001010,也是返回1970/1/1 午夜距离该日期时间的毫秒数
</script>
```

### 日期方法

与其他类型一样，Date类型也重写了toLocaleString()、toString()和valueOf()方法。

```
<script type="text/javascript">
	var date1 = new Date(Date.UTC(2017,5,13,0,0,1,10));//年，月，日，时，分，秒，毫秒
	console.log(date1.toString());//Tue Jun 13 2017 08:00:01 GMT+0800 (中国标准时间)
	console.log(date1.toLocaleString());//2017/6/13 上午8:00:01
	console.log(date1.valueOf());//1497312001010
</script>
```
注意：toString和toLocaleString在不同的浏览器上可能不一样，一般不用这两个方法来显示时间

其他的一些方法：
```
<script type="text/javascript">
	var date1 = new Date();
	console.log(date1.toDateString());//Thu Feb 02 2017
	console.log(date1.toLocaleDateString());//2017/2/2
	console.log(date1.toTimeString());//15:51:07 GMT+0800 (中国标准时间)
	console.log(date1.toLocaleTimeString());//下午3:51:07
	console.log(date1.toUTCString());//Thu, 02 Feb 2017 07:52:32 GMT
</script>
```

## 组件方法

组件方法，是为我们单独获取你想要的各种时间/日期而提供的方法。需要注意的时候，这些方法中，有带UTC的，有不带UTC的。UTC日期指的是在没有时区偏差的情况下的日期值。
```
<script type="text/javascript">
	var box = new Date(Date.UTC(2017,2,10,5,15,10));
	console.log('毫秒:'+box.getTime());				//1489122910000，获取日期的毫秒数，和valueOf()返回一致
	
	console.log('年:'+box.getFullYear());				//2017，获取四位年份

	console.log('月:'+(1+box.getMonth()));				//3，获取月份，没指定月份，从0开始算起

	console.log('日:'+box.getDate());				//10,获取日期

	console.log('星期:'+box.getDay());				//5,返回星期几，0表示星期日，6表示星期六
	
	console.log('时:'+box.getHours());				//13,返回时,这里获得的是北京时间，加上了8个时区

	console.log('UTC时:'+box.getUTCHours());			//5,返回时
	
	console.log('分:'+box.getMinutes());				//15，返回分钟
	
	console.log('秒:'+box.getSeconds());				//10,返回秒数
	
	console.log('毫秒:'+box.getMilliseconds());			//0,返回毫秒数
	
	console.log(box.getTimezoneOffset());				//-480,返回本地时间和UTC时间相差的分钟数,480/60=8
</script>
```
上面所有的方法除了getDay()和getTimezoneOffset()，都有相应的set方法，如setTime()，setFullYear()，并且除了getTimezoneOffset()，所有的set和get方法都有相应的UTC方法，如getUTCTime()，setUTCTime()，getUTCHours()，setUTCHours()。



