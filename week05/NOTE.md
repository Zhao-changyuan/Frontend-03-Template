学习笔记

# 1.CSS总论
## 1.1 CSS语法的研究
**CSS 2.1总体结构**
* @charset
* @import
* rules
   * @media
   * @page
   * rule 大部分时间都在写的
分为两大类：at-rule 和 rule

## 1.2 CSS @规则的研究
* @charset
* @import
* **@media** 
* @page
* @counter-style
* **@keyframes**
* **@fontface**
* @support 暂不推荐使用
* @namespace 完备性的一个考量

## 1.3 CSS规则的结构
如下：
* 选择器 
   * selector_group
   * selector
      * '>'
      * ' '
      * '+'
      * '~'
   * simple_selector
      * type
      * '*'
      * .
      * '#'
      * []
      * :
      * ::
      * :not()
* 声明
   * Key 
      * variables
      * properties
   * Value
      * calc
      * number
      * length
      * ...


## 1.4 收集标准
一个爬虫工具

## 1.5 CSS总论总结

# 2. CSS选择器

## 2.1 选择器语法
7类简单选择器：

类型选择器
通配符选择器
类选择器
id选择器
属性选择器
伪类选择器
伪元素选择器

**复合选择器**
* <简单选择器><简单选择器><简单选择器>
* *或则div必须写在最前面

**复杂选择器**
   <复合选择器><空格><复合选择器>
   <复合选择器>">"<复合选择器>
   <复合选择器>"~"<复合选择器>
   <复合选择器>"+"<复合选择器>
   <复合选择器>"||"<复合选择器>

## 2.2 选择器的优先级
div#a.b .c[id=x]
[0, 1, 3, 1] 

#a:not(#b)
[0, 2, 0, 0]
这里:not()是一个逻辑伪类选择器，它不会增加选择器的优先级，逻辑伪类整个选择器的优先级
是由括号里面内容决定的。

*.a
[0, 0, 1, 0]

div.a
[0, 0, 1, 1]

## 2.3 伪类

链接/行为
1. :any-link 匹配所有的超链接
2. :link 未访问过的超链接 :visited 已经访问过的超链接
3. :hover
4. :active
5. :focus
6. :target

树结构
1. :empty
2. :nth-child()
3. :nth-last-child()
4. :first-child :last-child :only-child
推荐：越是复杂的语法，越是以简单的方式来用

逻辑型
1. :not伪类 只能写复合选择器
2. :where :has 目前机会不大

不应该出现过于复杂的选择器。

## 2.4 伪元素
常用的：
::before

::after

::first-line

::first-letter
一种是无中生有，一种是把部分内容括起来。

::first-line支持设置的属性有：
font系列、color系列、background系列、word-spacing、letter-spacing、test-decoration、text-transform、line-height。

::first-letter支持设置的属性有：
font系列、color系列、background系列、test-decoration、text-transform、line-spacing、word-spacing、line-height、float、vertical-align、盒模型系列：margin,padding,border