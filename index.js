var express      = require('express');
var socket       = require('socket.io');

var application  = express();

var server 	     = application.listen(5000,function(){
	console.log('your server is runing at port 5000');
});

application.use(express.static('public_html'));

var sio = socket(server);

sio.on('connection',function(vistor) {

	console.log('we have a new vistor as id=>',vistor.id);

	vistor.on('message',function(data){
		sio.sockets.emit('new_msg',data);
	});

	vistor.on('borad',function(data){
		vistor.broadcast.emit('new_borad',data);
	});
});