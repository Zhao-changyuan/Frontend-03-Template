学习笔记

# 1.初始化与构建 | 初始化工具Yeoman（一）
一般会把generator称为脚手架。
Yeoman社区比较流行的脚手架的生成器。使用它可以开发一个初始化项目、创建模板的工具。generator的generator。

npm init toolchain
npm install yeoman-generator
generators/app/index.js
npm install yo -g
yo toolchain

# 2.初始化与构建 | 初始化工具Yeoman（二）

Prompts

file system

dependencies

# 3.初始化与构建 | 初始化工具Yeoman（三）
generator是如何工作的
# 4.初始化与构建 | Webpack基本知识
## build
build的能力，同时为开发和发布服务的基础设施。
webpack最初是为node设计的一款打包工具，把一个Node的代码打包成一个浏览器可用的代码。

webpack是完全针对js的一个系统，一定要最后打包出来一个JS文件，然后再拿html手工地去引用这个js文件，这就是webpack的一个核心思路。

webpack可做的事情：
* 多文件合并

一般要安装两个包webpack-cli（提供webpack命令）和webpack。安装方式
* 全局安装webpack-cli和webpack，然后使用webpack命令
* local安装，使用npx webpack命令

## Entry
入口文件

## Output
输出的文件名和路径

## Loaders， webpack的灵魂
module.rules[index].use中，一个loader你可以认为它是一个纯粹的文本转换

# 5.初始化与构建 | Babel基本知识
完全独立于webpack的一个独立系统，把新版本的js编译成一个老版本的JS。
更多的时候我们不是独立的使用babel，而是用babel-loader，一般会使用@babel/preset-env和少量的插件配置，后面的使用都会在webpack中使用babel。