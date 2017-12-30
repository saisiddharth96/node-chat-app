const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected!");

  // socket.emit('newEmail',{
  //   from : "sid@sid.com",
  //   text : "Sup!",
  //   receivedAt : "hh:mm:ss",
  // });

  // socket.emit('newMessage',{
  //   from : "server message",
  //   text : "Common message to all my clients",
  //   cretaedAt : "Right now ass!"
  // });

  // socket.on('createEmail', (newEmail)=>{
  //   console.log(`Create Email :- ${JSON.stringify (newEmail,undefined,2)}`);
  // });

  socket.on('createMessage', (message)=>{
    console.log(`New message from "${message.from}" with text "${message.text}"`);
    console.log(message);
    io.emit('newMessage',{
      from : message.from,
      text : message.text,
      cretaedAt : new Date().getTime()
    });
  });

  socket.on("disconnect", socket => {
    console.log("User disconnected!");
  });


});

server.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
  