const express = require('express');
const socket = require("socket.io");
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


const app = express();
// let PORT = process.env.PORT || 4000
// const server = app.use((req, res) => res.sendFile(INDEX)).listen(PORT, () => 
//   console.log(`listening to port ${PORT}`));

// const herokuApp = express.createServer(express.logger());
// const herokuIo = require('socket.io').listen(herokuApp);

// app.use(express.static("client"));

// socket.io to work on this var server; will wait for client
const io = socket(server);
let connections = [];
let users = [];
// to listen to client on that ONE particular socket!!
io.on("connection", function(socket) {
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);
  socket.on("newMessage", function(data) {
    io.sockets.emit("newMessage", data);
  });

  socket.on("typing", function(data) {
    // broadcast to all other sockets EXCEPT for the one typing!!!
    socket.broadcast.emit("typing", data);
  });
});
