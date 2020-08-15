const http = require('http');

http.createServer((request, response) => {
    let body = [];

    request.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        // 这里chunk是Buffer类型，如果转成string，会导致end中 Buffer.concat(body)报错。
        // body.push(chunk.toString());
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(
`
<html maaa=a >
<head>
    <style>
        body div #myid {
            background-color: #fff5000;
        }

        body div img {
            width: 30px;
            background-color: #ff1111;
        }

        body div .image {
            height: 10px;
        }

        .cl1#name {
            color: #FFF;
        }
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img id="name" class="title cl1 image" />
    </div>
</body>
</html>
`
        );
    });
}).listen(8088);

console.log('server started');