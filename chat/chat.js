const socketIO = require('socket.io');
const express = require('express');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');



module.exports = function(io){
  const route = express.Router();
  console.log("chat");

  var connections= new Map();



  io.on('connection',(socket)=>{
    console.log('new user connected chat');
    console.log(socket.handshake.address);
    var name =uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

    connections.set(name,socket.client.id);
    console.log(connections);

    socket.on('newMsg',data=>{
      io.sockets.emit('newMsg',data);
    })

    socket.emit('userInfo',{
      name: name,
      time:  `${new Date()}`
    });

    socket.on('disconnect',()=>{
      console.log("a user disconnected");
    })

  });

  return route;

}
