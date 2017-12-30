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

io.on("connection", (socket) => {
  console.log("Connected to client");

  //socket.emit creates the event to a single (only one) connection and sends it off from server to client 
  //or client to server whereever required. The emit doesent have a callback 
  //but has data that needs to be emitted from c->s or s->c
  // socket.emit('newEmail',{
  //   from : "Server",
  //   text : "New Email alert!"
  // });

  // socket.emit('newMessage',{
  //   from : "Siddharth's Server",
  //   text: "Test message 123 123" 
  // });

  socket.emit('newMessage',{
    from : "Sabka Baap!",
    text : "Hello BC!"
  });

  socket.broadcast.emit('newMessage',{
    from : "Naya Bandha!",
    text : "Aaya re apun!"
  });

  socket.on('createMessage', (newMessage)=>{
    console.log(JSON.stringify(newMessage,undefined,2));
    //io.emit creates and sends an event to every connection

    io.emit('newMasterMessage',{
      from : newMessage.from,
      text : newMessage.text
    });
    
    //socket,broadcast.emit is a method which sends off the data specified to 
    //every client except the one which is sending off the message
 
    // socket.broadcast.emit('newMasterMessage',{
    //   from : newMessage.from,
    //   text : newMessage.text,
    //   createdAt : new Date().getTime()
    // });
  });

  // socket.on('createEmail', (newEmail)=>{
  //   console.log(JSON.stringify(newEmail,undefined,2));
  // });

  socket.on("disconnect", (socket) => {
    console.log("Client disconnected!");
  });
});

server.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
  