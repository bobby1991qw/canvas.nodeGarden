#canvas仿写知乎登录背景效果
用canvas仿写一个知乎登录页的背景效果。[在线演示](http://sandbox.runjs.cn/show/irslejki)


##概述

本文包含以下知识点：

1. **canvas的基本api**
2. **基础的运动公式**
3. **边界检测**

###canvas

canvas作为HTML5新增的绘图标签，大大加强js的绘图能力。它提供了一些基础的api，具体的绘图流程需要我们自己来实现。在本文中，需要使用到的绘制圆弧和绘制直线的api。具体的代码如下

####绘制圆

```js
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    ctx.save();
    ctx.fillStyle = '#e1e2e3';
    ctx.lineWidth = 0;
    ctx.globalAlpha = 0.6;
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
```

canvas只提供图形容器，具体的绘制方法全部挂载在canvas.getContext('2d')这个上下文对象上。

