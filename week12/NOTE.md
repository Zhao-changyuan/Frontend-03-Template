学习笔记

# 1.proxy与双向绑定

## 1.1 proxy的基本用法
不太建议在业务中大量的使用proxy，它的设计是强大且危险的，预期性变差，
为底层库设计的特性。

Proxy对象上的所有行为都是可以再重新指定的。

## 1.2 模仿reactive实现原理（一）
function reactive(object), get(obj, prop), set(obj, prop, val)

## 1.3 模仿reactive实现原理（二）
function effect(callback)

## 1.4 模仿reactive实现原理（三）
JavaScript里面没有任何办法能够获取一个函数它能够访问到的所有变量。

Vue用了一个非常独特的技术，调用一下这个函数，看看它实际用了哪些变量。

## 1.5 优化reactive
* po.a.b问题

## 1.6 reativity响应式对象
DOM元素添加事件实现双向绑定。

# 2. 使用Range实现DOM精确操作
## 2.1 基本拖拽
需要在拖拽元素的mousedown事件里去监听mousemove和mouseup事件。
只有在鼠标按下去时监听这两个事件，才能在性能和逻辑上都正确。

mousemove和mouseup都是要在document上去监听的，如果在dragable上监听，
当我们鼠标一下拖得快了，移开了dragable的区域，就会发生一个拖断的现象。

## 2.2 正常流里的拖拽
