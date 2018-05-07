// justin making client's connection to server

const socket = io.connect("http://localhost:4000");

var message = document.getElementById("message");
var handle = document.getElementById("handle");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

// emit an event when i click send FROM CLIENT ONLY. justin have to handle the data object from server

btn.addEventListener("click", function() {
  socket.emit("newMessage", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

message.addEventListener("keypress", function() {
  socket.emit("typing", handle.value);
  // justin need to react to it on the server
  
  if (event.keyCode == 13) {
    btn.click();
  };
});


// team server to listen to events from client 
socket.on("newMessage", function(data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function(data) {
  feedback.innerHTML =
    "<p><em>" + data + " is about to share his/her thoughts! </em></p>";
});
