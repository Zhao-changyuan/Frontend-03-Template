学习笔记

# 1. 实现一个线上Web服务 | 初始化server
## 发布系统包含的三个子系统
* 线上服务系统，真实用户使用的
* 发布系统，程序员使用
* 发布工具，命令行工具

这里使用阿里云实例 ubuntu 20 live server

sudo apt install nodejs
sudo apt install npm

安装最新版的nodejs: 
npm install -g n
n latest

# 2. 实现一个线上Web服务 | 利用Express，编写服务器（一）
最广泛应用的服务器框架Express
npx express-generator

npm 的scripts只有叫start的时候才不需要加run。
这里移除了routes和views

# 3. 实现一个线上Web服务 | 利用Express，编写服务器（二）
service ssh start

windows命令行执行如下命令复制文件到服务器指定文件夹：
scp -r .\* root@139.9.122.117:/home/server

这个就是我们的线上服务。

# 4. 实现一个发布系统 | 用node启动一个简单的server
发布服务：是由一个发布的服务器端和一个发布的工具构成的。

首先会写一个最基本的功能，然后再逐渐的进行扩展，最后变成一个工程上基本可用的系统。

## publish-server
向真实的线上服务复制文件

## publish-tool
发送我们想要发布的文件

# 5. 实现一个发布系统 | 编写简单的发送请求功能
server端：
http.createServer(function(req, res) => {}).listen();

client端（publish-tool）:
http.request({xxx}, response => {xxx})

**request和response都是流式处理的**

# 6. 实现一个发布系统 | 简单了解Node.js的流
要把文件通过HTTP的方式传给发布的服务器。

事件：
* data
* end

以文件package.json学习的node ReadStream和WriteStream
的流式传输方式。

# 7. 实现一个发布系统 | 改造server
发布工具(publish-tool) --> 发布系统(publish-server8082) --> 线上服务系统(server:3000)

# 8. 实现一个发布系统 | 实现多文件发布
node里压缩相关的包：archiver unzipper
pipe: 将一个流导进另一个流里面 (End the writer when the reader ends. Default: true.)

# 9. 实现一个发布系统 | 用GitHub oAuth做一个登录实例
鉴权的问题

Client secret: 6c6cea64f103126ab1fee5b727693a8f01444b71

鉴权发布流程：
* 1. publish-tool打开 https://github.com/login/oauth/authorize
* 2. publish-server的 /auth路由：接收code， 用code+client_id+client_secret换token
* 3. publish-tool 创建server: 接受token，后点击发布
* 4. publish-server /publish路由：用token获取用户信息，检查权限，接受发布


