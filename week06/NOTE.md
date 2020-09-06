学习笔记

# 1.CSS排版
把margin理解为“一个元素自身周围至少需要的空间“，这样就非常容易立即为什么margin需要折叠了。

在CSS标准中，规定了如何排布每一个文字或则盒的算法，这个算法依赖一个排版的“当前状态”，CSS把这个当前状态称为“格式上下文（formatting context）”。

我们可以认为排版过程是这样的：
格式化上下文 + 盒/文字 = 位置

一些元素会在其内部创建新的块级格式上下文，这些元素有：
1. 浮动元素
2. 绝对定位元素
3. 非块级但仍能包含块级元素的容器（如inline-blocks，table-cells，table-captions）；
4. 块级的能包含块级元素的容器，且属性overflow不为visible。

自身为块级，且overflow为visible的块级元素容器，它的块级格式上下文和外部的块级格式上下文发生了融合，也就是说，如果不考虑盒模型相关的属性，这样的元素从排版的角度就好像不存在。

## 1.1 盒
源代码：标签 tag
语义：元素 element
表现：盒 box

HTML代码中可以书写开始“标签”，结束“标签”，和自封闭“标签”。
一对起止“标签”，表示一个“元素”。
DOM树中存储的是“元素”和其他类型的节点（Node）,元素是节点中的一种，还有文本节点、注释节点等。
CSS选择器选中的是“元素” 或则“伪元素”。
CSS选择器选中的“元素”，在排版总可能产生多个“盒”。
排版和渲染的基本单位是“盒”。

box-sizing:
* content-box
* border-box，包括border padding content

padding影响盒内的排版；margin影响盒本身的排版，决定了盒周围至少要存在空白区域的大小。

## 1.2 正常流

在CSS排版中排的是盒和文字。

正常流和我们平时书写文字的习惯是一致的。
inline-block的基线是随着盒内的文字变化的。

**正常流排版**
* 收集“盒和文字”进行
* 计算“盒和文字”在行中的排布
* 计算行的排布

inline-level-box
block-level-box

一个个line-box和block-level-box从上到下的排列。

block-level-formatting-context，排块级的，块级格式化上下文
inline-level-formatting-context，排行内的，行内级格式化上下文

## 1.3 正常流的行级排布
基线对齐

中文和英文混排，会在基线的基础上产生一个偏移。

**行模型**

* line-top
* text-top
* base-line
* text-bottom
* line-bottom

如果有多种字体混排，则text-top和text-bottom是由fontSize最大的一个字体决定的。

如果文字和盒混排，就会产生line-top和line-bottom的偏移的问题，例如一个盒是从text-bottom去对齐的，那么它就可能吧line-top撑开。盒的先后顺序和盒的尺寸都会影响line-top和line-bottom的这个位置。

**注意**
行内盒inline-block它的基线是随着自己里面的文字去变化的，不建议给行内盒使用基线对齐的。

不同的vertical-align对整个行高的影响还是比较多的。

## 1.4 正常流的块级排布
**float与clear**
浮动元素已经脱离了正常流，但是它是依附于正常流去定义的。
float的一个显著的特征就是，它会影响我们生成的行盒的尺寸。

当float元素出现以后，它不止影响自己所在的一行，凡是它的高度所占据的范围内，所有的行盒都会根据这个float元素的尺寸调整自己的大小。

float元素能浮动的位置会受到上一个浮动元素的影响，会产生一个float相堆叠的现象。

clear不是一个清除浮动的意思，它是找一个干净的空间来执行浮动的效果，例如clear: right就是要找到右边这样一块干净的空间来执行浮动的操作。

使用float会发生重排现象。

**margin折叠**
Margin Collapse
margin只是要求元素周围有这么多空白，不是说要求一定要更别的边距有这么大空白。
只会发生在BFC里面。

"float" "边距折叠" "BFC"三个叠加后：难题。

## 1.5 BFC合并
正常流里最困难的一部分。

**Block**
BFC : Block Level Formatting Context（块级格式上下文）

Block Container: 里面有BFC的
    能容纳正常流的盒，里面就有BFC，例如block、inline-block、table-cell、flex item、grid cell、table-caption等。

Block-level Box: 外面有BFC的

Block Box = Block Container + Block-level Box: 里外都有BFC的，既是Block Container又是Block-level Box。

**Block Container**
基本上是一些display的效果，所有能够容纳里面不是特殊的display的模式的，它里面就是正常流。
* block
* inline-block
* table-cell
* flex item
* grid cell
* table-caption

**Block-level Box**
Block level:
* display: block
* display: flex
* display: table
* display: grid
* ...

Inline level:
* display: inline-block
* display: inline-flex
* display: inline-table
* display: inline-grid
* ...

**关于Block box - 设立BFC**
* floats，浮动的元素里面是一个正常流
* absolutely positionel elements，绝对定位元素里面是一个正常流
* block containers(such as inline-blocks, table-cells, and table-captions) 是Block Container但不是Block-level box。
  that are not bock boxes,
    * flex items
    * grid cell
    * ...
* and block boxes with 'overflow' other than 'visible'

默认那些能容纳正常流的盒，我们都认为它会创建BFC，但是只有一种情况例外，就是Block Box里外都是BFC并且overflow是visible，就相当于没有BFC嘛，这个时候会发生BFC合并。

**BFC合并**
* block box && overflow: visible，此时会发生BFC合并。
   * BFC合并与float
   * BFC合并与边距折叠

边距折叠只会发生在同一个BFC里面。

## 1.6 Flex排版
* 收集盒进行
* 计算盒在主轴方向的排布
* 计算盒在交叉轴方向的排布

**分行**
* 根据主轴尺寸，把元素分进行
* 若设置了no-wrap，则强行分配进第一行

# 2. CSS动画与绘制
1. 控制元素的位置和尺寸的信息
2. 控制绘制和最后实际看到的渲染的信息
3. 交互与动画的信息

## 2.1 动画

### 2.1.1 Animation
* @keyframes定义
* animation 使用
   * animation-name 时间曲线
   * animation-duration 动画的时长
   * animation-timing-function 动画的时间曲线；
   * animation-delay 动画开始前的延时；
   * animation-iteration-count 动画的播放次数；
   * animation-direction 动画的方向

一个常见的技巧是在百分比帧中定义transition而不是使用animation的timing-function来让值发生改变，这样的话它的每两个关键帧之间它的timing-function都可不一样。

### 2.1.2 Transition
* transition-property 要变换的属性；
* transition-duration 要变换的时长；
* transition-timing-function 时间曲线；
* transition-delay 延迟。

### 2.1.3 cubic-bezier

## 2.2 颜色
看到的大部分光都是混色的混合光。

### 2.2.1 CMYK与RGB

### 2.2.2 HSL和HSV
HSL作为一种语义化的颜色，可以只调节H值而保持明暗关系和颜色的鲜艳程度不变。

## 2.3 绘制

* 几何图形
   * border
   * box-shadow
   * border-radius
* 文字
   * font
   * text-decoration
* 位图
   * background-image

**应用技巧**
data uri + svg
