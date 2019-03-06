var app = require('../app');
var http = require('http');

var port = 8081;
var server = http.createServer(app);
server.listen(port,function(){
    console.log('服务器启动成功,监听端口' + port);
});
