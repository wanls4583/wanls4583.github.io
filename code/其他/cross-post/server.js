const express = require('express');
const fs = require('fs');
const mime = require('mime');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

app.post('/api',function(req,res){  
    res.send(`<script>document.domain="test.com";window.parent.${req.body.callbackName}('服务器数据')</script>`);
})

app.get('/*', function(req,res){
    sendFile(req, res);
});

app.listen(8080);
console.log('listen 8080')

function sendFile(req,res){
        var realPath = __dirname+req.url;
        var exist = fs.existsSync(realPath);
        if(exist){
            var file = fs.readFileSync(realPath);
            res.writeHead(200, {
                'Content-Type': mime.getType(path.basename(realPath)),
            });
            res.end(file);
            console.log('send static file:'+realPath);
        } else {
            res.writeHead(404);
        }
}