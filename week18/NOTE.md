学习笔记

# 1. 单元测试工具 | Mocha（一）
测试工具是工具链中非常重要的一环，必需品。

比较火的有Mocha、Jest。

npm install --save-dev mocha
npx mocha

使用assert断言输入和输出的相等性；describe用于分组，让结构更好看。

# 2. 单元测试工具 | Mocha（二）
为了避免我们写的模块必须以node.js的方式导出。

@babel/core @babel/register @babel/preset-env
.babelrc中：
```js
{
    "presets": ["@babel/preset-env"]
}
```

node modules的脚本里面，会默认把node_modules/.bin加到自己的path里面。

使用packgae.json的"scripts"
```js
"scripts": {
    test": "mocha --require @babel/register"
}
```

单元测试有一个非常重要的指标：code coverage
# 3. 单元测试工具 | code coverage
code coverage表示测试覆盖到了源文件里面的哪些代码。

istanbuljs nyc，可以在一个复杂的文件中帮我们计算测试覆盖的比例。

nyc的指标有 % Stmts、 % Branch、 % Funcs、 % Lines。
我们主要还是看% Lines。

nyc要带上babel运行的话，需要给babel和nyc互相加一个插件:
* babel安装插件babel-plugin-istanbul
* nyc安装插件@istanbuljs/nyc-config-babel

# 4. 单元测试工具 | 对html-parser进行单元测试
配置launch.json运行mocha:
```js
"runtimeArgs": [
    "--require", "@babel/register"
],
"sourceMaps": true,
"args": [],
"program": "${workspaceFolder}/node_modules/mocha/bin/_mocha"
```

.babelrc设置：
```js
"sourceMaps": "inline"
```

不断npm run coverage并添加用例提高 % Lines.

# 5. 单元测试工具 | 所有工具与generator的集成
generator-toytool

添加依赖：
"@babel/core",
"@babel/preset-env",
"@babel/register",
"babel-loader",
"babel-plugin-istanbul",
"mocha",
"nyc"

复制文件：.babelrc、.nycrc、sample-test.js

webpack配置rules babel-loader

