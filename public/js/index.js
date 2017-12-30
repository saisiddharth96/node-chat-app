var socket = io();

socket.on('connect', function(){
 console.log("Connected to server");
    // socket.emit('createEmail', {
    //     to : "siddharth@gmail.com",
    //     text : "New email created!",
    //     createdTime : "some hh:mm:ss"
    // });

    // socket.emit('createMessage',{
    //     from : "The Client",
    //     text : "Message from client" 
    // });
});

socket.on('disconnect', function(){
    console.log("Disconnected to server!");
});

// socket.on('newEmail', function (email){
//     console.log("New email!",email);
// });

socket.on('newMessage',function(message){
    console.log(`New Message from "${message.from}" Text = "${message.text}"\n`);
});