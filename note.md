#canvas仿写知乎登录背景效果
用canvas仿写一个知乎登录页的背景效果。[在线演示](http://sandbox.runjs.cn/show/irslejki)


##概述

本文包含以下知识点：

1. **canvas的基本api**
2. **基础的运动公式**
3. **边界检测**

###canvas

canvas作为HTML5新增的绘图标签，大大加强js的绘图能力。canvas只提供图形容器和一些基础的api，具体的绘图流程需要我们自己来实现。常用的api有：

1. **ctx.fillStyle**
2. **ctx.strokeStyle**
3. **ctx.beginPath**
4. **ctx.closePath**
5. **ctx.arc**
6. **ctx.save**
7. **ctx.restore**
8. **ctx.clearRect**
9. **ctx.moveTo**
10. **ctx.lineTo**

其中**beginPAth**和**closePath**会成对出现。它们的功能类似于PS的钢笔工具。`beginPath()`开始一段路径，`closePath()`结束一段路径。在这期间，可以使用`lineTo()`绘制一条直线路径或者使用`arc()`绘制一段圆弧路径。最后使用`stroke()`对其描边或是`fill()`填充路径。


本文会讲解例子中的简单效果，包括：

1. 绘制圆
2. 匀速直线运动
3. 匀减速直线运动
4. 边界检测

####绘制圆

```javascript
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    ctx.save();                
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
```

上述代码在canvas的中央绘制出一个黑色的圆。canvas只提供的api全部挂载在`getContext('2d')`返回的上下文对象中。方法**arc**用来绘制一段圆弧，当其实角度为0，结束角度为2*PI时则绘制出一个完整的圆。最后一个boolean的参数表示绘制的方式为顺时针货逆时针。


####匀速直线运动

在例子中，大多数的小球遵循匀速直线运动的规则。将小球的速度分解到X轴与Y轴上，得到的同样是匀速直线运动，假设小球的初始位置为10，从左向右运动，每次为1，则有代码：

```javascript
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var speed = 1
var x = 10	
		
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)    
	
	ctx.fillStyle = '#aaa';            
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
	x += speed	
    ctx.closePath();
    ctx.fill();
			
	window.requestAnimationFrame(loop)
}

loop()
```
小球的x坐标在每次绘制时增加1，从而达到匀速的效果。上述代码中的`ctx.clearRect()`和`window.requestAnimationFrame()`为绘制canvas动画的关键代码。

`clearRect`将指定范围内的画布内容清空，这里直接将整个canvas清空。而`requestAnimationFrame`则是HTML5中新添加的api，它的功能和`setInterval`类似。不同的是，它有一些优化，如当前浏览器标签为未激活状态时，不会执行。同时，它会自动计算调用方法的时间间隔，不像`setInterval`一样需要手动计算。

由于是HTML5中新增的api，在低版本IE中存在兼容性问题，我们可以使用`setInterval`代替。关于间隔时间的取值，一般填写12~14ms为宜。这是因为当1秒执行60帧时才能比较流畅，平均一帧的时间为16.67ms。根据算法的复杂成都，去除js计算的时间。

####减速直线运动

[demo](http://runjs.cn/code/s6iqrmsw)中的小球跟随鼠标移动，并缓慢停留至鼠标位置。我们设置小球的速度与小球和鼠标的距离成正比（即小球离鼠标越远，速度越大）。有以下代码：

```javascript
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var mouseX = 0
var mouseY = 0
var speedX = 0
var speedY = 0
var x = 10
var y = canvas.height/2
		
canvas.addEventListener('mousemove', function(e){
    mouseX = e.offsetX
	mouseY = e.offsetY					
})		

		
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)    
	
	ctx.fillStyle = '#aaa';            
    ctx.beginPath();
	
	var distanceX = mouseX - x
	var distanceY = mouseY - y
	
	speedX = distanceX * 0.05
	speedY = distanceY * 0.05					
	x += speedX
	y += speedY
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
	 
    ctx.closePath();
    ctx.fill();
			
	window.requestAnimationFrame(loop)
}

loop()
```

和匀速直线运动不同之处在于，小球的坐标不在是每次移动固定的像素，而是由计算得出。当鼠标快速移动时，`distanceX`增大，速度增大，小球快速移动。

####边界检测