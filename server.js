const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4000,function(){
    console.log('listening to port 4000');
}); 

app.use(express.static('client'));


// socket.io to work on this var server; will wait for client
const io = socket(server);
// to listen to client on that ONE particular socket!!
io.on('connection', function(socket) {
    console.log('socket connection made with ' + socket.id);
    socket.on('newMessage', function(data){
        io.sockets.emit('newMessage', data);
    });

    socket.on('typing', function(data){
        // broadcast to all other sockets EXCEPT for the one typing!!!
        socket.broadcast.emit('typing', data)
    })
});



