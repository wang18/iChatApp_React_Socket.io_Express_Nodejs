var express = require('express');
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

var app = express();

var connections = [];
var users = [];

app.use(express.static('./public'));

var server = app.listen(4001);
var io = require('socket.io').listen(server);


io.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected %s sockets connected', connections.length);
});

console.log('server is running on port 4001');