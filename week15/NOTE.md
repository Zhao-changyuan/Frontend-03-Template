学习笔记

# 1.手势与动画 | 手势的基本知识
down move end

## 触屏：start move end

* start end tap
* start-->移动10px-->pan start-->move->pan->move-->pan[move-->pan-->]...
                                                      -->end-->pan end
                                                      -->end且速度>? -->flick
* start-->0.5s-->press start --> 移动10px --> pan start
                             --> end --> press end

# 2.手势与动画 | 实现鼠标操作
鼠标的mousedown mousemove mouseup看起来和触屏的touchstart touchmove touchend相似，
但是其实他们的内在逻辑和我们写出来的代码完全不一样。

# 3.手势与动画 | 实现手势的逻辑
默认以tap结束，start时设置0.5s延时判断是否pressstart，move时依据移动距离判断是否panstart。

# 4.手势与动画 | 处理鼠标事件
鼠标存在左右键，而touch也可存在多个点;

mouseup触发了两次问题：
由于每次mousedown时，都会执行
    element.addEventListener('mousemove', mousemove);
    element.addEventListener('mouseup', mouseup);
所以如果同时按下两个按键，mousemove和mouseup事件处理函数会被添加两次，所以每次鼠标移动或鼠标按键抬起，function mousemove和function mouseup都会执行两次。

这里通过一个isListeningMouse标识，在addEventListener时，只执行一次，removeEventListener是也只执行一次。

# 5.手势与动画 | 派发事件
dom 中事件的派发使用 new Event();

# 6.手势与动画 | 实现一个flick事件
判断速度：取最近500ms的所有点，计算 px/ms值，一般认为大于1.5就很快了，标识为flick事件。

# 7.手势与动画 | 封装
listen --> recognize --> dispatch