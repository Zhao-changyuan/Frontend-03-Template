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
* 分行
   * 根据主轴尺寸，把元素分进行
   * 若设置了no-wrap，则强行分配进第一行

当主轴所有子元素的尺寸超过父元素的尺寸的时候，就会进行分行。
把flex容器中的子元素叫做flex item。

**问题**
!!! 处理 AutoMainSize 部分的逻辑。

## 1.3 计算主轴
计算主轴的方向：
* 找出所有flex元素，把主轴方向的剩余尺寸按比例分配给这些元素；
* 若剩余空间为负数，所有flex元素为0，剩余元素等比例压缩。
* 如果没有flex元素，则根据justifyContent属性来计算每个元素的位置。
## 1.4 计算交叉轴
计算交叉轴的方向：
* 根据每一行最大元素尺寸计算行高
* 根据flex-align和item-align，确定元素的具体位置

# 2. 渲染
## 2.1 绘制单个元素
* 绘制需要依赖一个图形环境，这里采用了npm包images
* 绘制在一个viewport上进行，与绘制相关的属性有：background-color、border、background-image等。
* gradient属性如果要做的话需要使用WebGL的库进行。

## 2.2 绘制DOM树
* 递归调用子元素的绘制方法完成DOM树的绘制
* 忽略掉一些不需要绘制的节点
* 实际浏览器中，文字绘制是难点，需要依赖字体库，这里忽略
* 实际浏览器中，还会对一些图层座compositing，这里也忽略了