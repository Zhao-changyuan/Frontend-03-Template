学习笔记

# 1. 手势与动画 | 初步建立动画和时间线
帧的概念

最基础的动画的能力就是没帧我们去执行一个什么样的事件。

16毫秒的常识，60帧。

setInterval(() => {}, 16)

let tick = () => {

    setTimeout(tick, 16)
}

let tick = () => {
    requestAnimationFrame(tick);
}

Timeline类
这里虽然使用了Symbol定义了tick方法，但是还是可以通过Object.getOwnPropertySymbols(new Timeline)获取到。

# 2. 手势与动画 | 设计时间线

// 当前时间大于动画开始时间才执行动画
if (t >= 0) {
    if (animation.duration < t) {
        this[ANIMATIONS].delete(animation);
        t = animation.duration; // 避免终止值超出范围
    }
    animation.receive(t);
}

# 3. 手势与动画 | 给动画添加暂停和重启功能
加入暂停标识。

# 4. 手势与动画 | 完善动画的其他功能
延迟 delay
差值函数 timingFunction

# 5. 手势与动画 | 对时间线进行状态管理