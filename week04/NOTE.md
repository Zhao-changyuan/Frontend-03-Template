学习笔记

# 1. 排版
## 1.1 根据浏览器属性进行排版
第一代：正常流；第二代：flex；第三代：grid。

### flex排版
* 主轴
* 交叉轴
主轴和交叉轴是相对的，相互垂直，主轴可以是水平方向也可以垂直方向。

主轴的水平方向时，则交叉轴是垂直方向，可设置属性如下：
    Main: width x left right,       Cross: height y top bottom

主轴的垂直方向时，则交叉轴是水平方向，可设置属性如下：
    Main: height y top bottom,       Cross: width x left right

flex排版需要知道子元素的，所以我们认为layout是发生在endTag之前的。

### 总结
处理了flexDirection和wrap相关的属性
## 1.2 收集元素进行

## 1.3 计算主轴

## 1.4 计算交叉轴

# 2. 渲染
## 2.1 绘制单个元素

## 2.2 绘制DOM树