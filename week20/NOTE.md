学习笔记

# 1.持续集成 | 发布前检查的相关知识

## daily build
每天在服务端构建一次

## BVT (Build Verification Test)
构建的验证测试，冒烟测试

前端这边可以选择在提交的时候做一次build和基本验证测试。

前端最轻量级的检查方式：lint

# 2.持续集成 | Git Hooks基本用法
pre-commit.sample hook，一般会把lint之类的操作放在这里执行。
pre-push.sample hook，check操作放在这里执行。
pre-receive.sample hook

#!/usr/bin/env node

# 3.持续集成 | ESLint基本用法
npm install --save-dev eslint
npx eslint --init, 问几个问题
npm eslint .\index.js

# 4.持续集成 | ESLint API及其高级用法

```js
let process = require("process");
const { ESLint } = require("eslint");

(async function main() {
  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({ fix: false });

  // 2. Lint files. This doesn't modify target files.
  const results = await eslint.lintFiles(["index.js"]);

  // 4. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 5. Output it.
  console.log(resultText);

  for (let result of results) {
      if(result.errorCount) {
          process.exitCode = 1;
      }
  }

})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
```

`git stash push -k`
`git stash list`
`git stash pop`

服务端的git系统多数提供的是Web hooks的能力，它不是git的能力，服务端的检查具有一定的强制性。

# 5.持续集成 | 使用无头浏览器检查DOM
PhantomJS已经过于老旧
推荐使用Chrome的Headless模式

基于lint和无头浏览器可以构建一个强有力的持续集成体系，来帮助我们去保证项目的一个基本质量。还可以将lint和无头浏览器放到服务端去执行，这样就变成了一个强制标准。到客户端就是一个辅助工具。