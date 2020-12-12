// 服务端
let http = require('http');
let https = require('https');
let fs = require('fs');
let unzipper = require('unzipper');
let querystring = require('querystring');

/**
 * 2. auth路由：接收code， 用code+client_id+client_secret换token
 * @param {*} request 
 * @param {*} response 
 */
function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    getToken(query.code, function(info) {
        console.log(info);
        //response.write(JSON.stringify(info));
        response.write(`<a href="http://localhost:8083/?token=${info.access_token}">publish</a>`);
        response.end();
    });

}

/**
 * 获取token
 * @param {*} code 
 * @param {*} callback 
 */
function getToken(code, callback) {
    let request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.32cd7dcb42055c4c&client_secret=6c6cea64f103126ab1fee5b727693a8f01444b71`,
        port: 443,
        method: 'post',
    }, function(response) {
        let body = '';
        response.on('data', chunk => {
            body += (chunk.toString());
        });

        response.on('end', () => {
            callback(querystring.parse(body));
        });
    });
    request.end();
}

/**
 * 4. publish路由：用token获取用户信息，检查权限，接受发布
 * @param {*} request 
 * @param {*} response 
 */
function publish(request, response) {
    // 登录一次
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    if(query.token) {
        getUser(query.token, function(userInfo) {
            if (userInfo.login === 'Zhao-changyuan') {
                request.pipe(unzipper.Extract({ path: '../server/public/' }));
                request.on('end', function() {
                    response.end('Success!');
                })
            } else {
                request.on('end', function() {
                    response.end('😝You do not have permission to publish!!!');
                });
            }
        });

        // request.pipe(unzipper.Extract({ path: '../server/public/' }));
    }
}

/**
 * 获取用户信息
 * @param {*} token 
 * @param {*} callback 
 */
function getUser(token, callback) {
    let request = https.request({
        hostname: 'api.github.com',
        path: `/user`,
        port: 443,
        method: 'get',
        headers: {
            'Authorization': `token ${token}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
        }
    }, function(response) {
        let body = '';
        response.on('data', chunk => {
            body += (chunk.toString());
        });

        response.on('end', () => {
            callback(JSON.parse(body));
        });
    });
    request.end();
}

http.createServer(function(request, response) {
    if (request.url.match(/^\/auth\?/)) {
        return auth(request, response);
    }

    if (request.url.match(/^\/publish\?/)) {
        return publish(request, response);
    }

    // console.log('request');
    //let outFile = fs.createWriteStream('../server/public/tmp.zip');
    // request.pip(outFile);
    // request.pipe(unzipper.Extract({ path: '../server/public/' }));
}).listen(8082);