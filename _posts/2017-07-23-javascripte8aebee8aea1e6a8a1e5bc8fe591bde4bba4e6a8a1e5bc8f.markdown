---
author: wanls4583
comments: true
date: 2017-07-23 06:42:38+00:00
layout: post
link: http://lisong.hn.cn/index.php/2017/07/23/javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e5%91%bd%e4%bb%a4%e6%a8%a1%e5%bc%8f/
slug: javascript%e8%ae%be%e8%ae%a1%e6%a8%a1%e5%bc%8f%e5%91%bd%e4%bb%a4%e6%a8%a1%e5%bc%8f
title: Javascript设计模式(命令模式)
wordpress_id: 391
categories:
- JavaScript设计模式

tags:
- JavaScript设计模式

---

>“行为请求者”与“行为实现者”通常呈现一种“紧耦合”。但在某些场合，比如要对行为进行“记录、撤销/重做、事务”等处理，这种无法抵御变化的紧耦合是不合适的。在这种情况下，如何将“行为请求者”与“行为实现者”解耦？将一组行为抽象为对象，实现二者之间的松耦合。这就是命令模式（Command Pattern）。

实例：
```
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style type="text/css">
		#div1{
			position: fixed;left:50%;top:50%;width: 50px;height: 50px;background: red;
		}
	</style>
	<script type="text/javascript">
		//调用者,向上命令
		var MoveUp = function(reciever){
			this.reciever = reciever;
		};
		MoveUp.prototype.execute = function(){
			this.reciever.move(0,-10);
		}
		MoveUp.prototype.undo = function(){
			this.reciever.move(0,10);
		}

		//调用者,向下命令
		var MoveDown = function(reciever){
			this.reciever = reciever;
		};
		MoveDown.prototype.execute = function(){
			this.reciever.move(0,10);
		}
		MoveDown.prototype.undo = function(){
			this.reciever.move(0,-10);
		}

		//调用者,向左命令
		var MoveLeft = function(reciever){
			this.reciever = reciever;
		};
		MoveLeft.prototype.execute = function(){
			this.reciever.move(-10,0);
		}
		MoveLeft.prototype.undo = function(){
			this.reciever.move(10,0);
		}

		//调用者,向右命令
		var MoveRight = function(reciever){
			this.reciever = reciever;
		};
		MoveRight.prototype.execute = function(){
			this.reciever.move(10,0);
		}
		MoveRight.prototype.undo = function(){
			this.reciever.move(-10,0);
		}

		//接受者，真正执行操作的类
		var Reciever = function(){};
		Reciever.prototype.move = function(left,top){
			var div = document.getElementById('div1');
			var left = div.offsetLeft+left;
			var top = div.offsetTop+top;
			div.style.setProperty("left",left+"px");
			div.style.setProperty("top",top+"px");
		}

		//装饰者，添加记录操作的行为
		var UndoDercorator = function(command){
			this.command = command;
		}
		UndoDercorator.undoStack = [];
		UndoDercorator.prototype.execute = function(){
			UndoDercorator.undoStack.push(this.command);
			this.command.execute();
		}
		UndoDercorator.prototype.undo = function(){
			this.command.undo();
		}

		window.onload = function(){
			var reciever = new Reciever();

			var left = document.getElementById('left');
			var right = document.getElementById('right');
			var up = document.getElementById('up');
			var down = document.getElementById('down');
			var undo = document.getElementById('undo');

			var moveLeft = new UndoDercorator(new MoveLeft(reciever));
			var moveRight = new UndoDercorator(new MoveRight(reciever));
			var moveUp = new UndoDercorator(new MoveUp(reciever));
			var moveDown = new UndoDercorator(new MoveDown(reciever));

			left.addEventListener('click',function(){
				moveLeft.execute();
			})
			right.addEventListener('click',function(){
				moveRight.execute();
			})
			up.addEventListener('click',function(){
				moveUp.execute();
			})
			down.addEventListener('click',function(){
				moveDown.execute();
			})
			undo.addEventListener('click',function(){
				if(UndoDercorator.undoStack.length>0){
					var cmd = UndoDercorator.undoStack.pop();
					cmd.undo();
				}else{
					alert('不能再回退了');
				}
				
			})
		}
	</script>
</head>
<body>
	<div id = "div1"></div>
	<input type="button" value="left" id="left">
	<input type="button" value="right" id="right">
	<input type="button" value="up" id="up">
	<input type="button" value="down" id="down">
	<input type="button" value="down" id="undo">
</body>
</html>
```