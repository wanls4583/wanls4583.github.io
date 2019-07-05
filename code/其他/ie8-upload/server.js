const express = require('express');
const fs = require('fs');
const mime = require('mime');
const path = require('path');
const app = express();

app.post('/api',function(req,res){  
    res.send(`服务器数据`);
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