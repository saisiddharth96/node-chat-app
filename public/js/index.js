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
// socket.on("newEmail", function(email) {
//   console.log(JSON.stringify(email, undefined, 2));
// });

// socket.on("newMessage", function(message) {
//   console.log(message);
// });

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">My Current location</a>');

  li.text(`${message.from} : `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=Message]').val()
  }, function () {

  });
});

// socket.on("newMasterMessage", function(message) {
//     console.log(message);
//     var li = jQuery('<li></li>');
//     li.text(`${message.from} : ${message.text}`);

//     jQuery('#messages').append(li);
// });

// socket.emit('createMessage',{
//     from : "Richa",
//     text : "Hey Sid!"
// }, function(data){
//     console.log('Got It!', data);
// });

var locationButton = jQuery('#location');

locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported!');
  }

  navigator.geolocation.getCurrentPosition(function(position){

    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });


  }, function(error){
    alert("Unable to fetch location!");
  })
});