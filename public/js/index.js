var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");

  //We dont want the event to emit until we're connected hence we
  //declare it inside the connect callback
  //  socket.emit('createEmail', {
  //     from : "Client",
  //     text : "Sending new email"
  // });

//   socket.emit("createMessage", {
//     from: "Siddharth's Phone",
//     text: "Test from siddharth's phone to server!",
//     createdAt : new Date().getTime()
//   });
});

socket.on("disconnect", function() {
  console.log("Disconnected to server!");
});

//Listener for new Event i.e newEmail event, this listenes to the exact
//same event which gets emitted from server.js
socket.on("newEmail", function(email) {
  console.log(JSON.stringify(email, undefined, 2));
});

socket.on("newMessage", function(message) {
  console.log(JSON.stringify(message, undefined, 2));
});


socket.on("newMasterMessage", function(message) {
    console.log(JSON.stringify(message, undefined, 2));
  });