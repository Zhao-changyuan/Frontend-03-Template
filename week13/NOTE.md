学习笔记

# 1. 组件的基本知识 | 组件的基本概念和基本组成部分
## 对象与组件
组件区别于模块，区别于对象。

* 对象
   * Properties
   * Methods
   * Inherit

* 组件
   * Properties
   * Methods
   * Inherit
   * Attribute
   * Config & State
   * Event
   * Lifecycle
   * Children 树形结构的必要条件

## Attribute
Attribute强调描述性
Property强调从属关系

## 如何设计组件状态
Markup set | JS set | JS Change | User Input Change | 1
-|-|-|-|-
X | √ | √ | ? | property
√ | √ | √ | ? | attribute
X | X | X | √ | state
X | √ | X | X | config

## Lifecycle
created    ?    destroyed

## Children
Content型Children
Template型的Children

# 2. 组件的基本知识 | 为组件添加JSX语法
安装：
"@babel/core": "^7.12.3",
"@babel/plugin-transform-react-jsx": "^7.12.1",
"@babel/preset-env": "^7.12.1",
"babel-loader": "^8.1.0",
"webpack": "^5.3.2"

配置webpack.config.js

# 3. 组件的基本知识 | JSX的基本使用

# 4. 轮播组件 （1）

# 5. 轮播组件 （2）

# 6. 轮播组件 （3）

# 7. 轮播组件 （4）
