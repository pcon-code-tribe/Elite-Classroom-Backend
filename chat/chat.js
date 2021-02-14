const socketIO = require('socket.io');
const express = require('express');
const {writeRecord} = require('./recorder');

//this stores the current room acquired by each connections
var connections= new Map();


module.exports = function(io){
  const route = express.Router();
  console.log("chat");



  io.on('connection',(socket)=>{
    console.log('new user connected chat');

    //sending and storinf messages
    socket.on('newMsg',(data)=>{
      const room = data.class_id;
      console.log(data);
      writeRecord(data,err=>{
        if(err){
          socket.send("error while sending message");
        }else{
          io.sockets.in(`${room}`).emit('newMsg',data);
        }
      });
    });

    //joining a connection to a room class_id
    socket.on('connectRoom',(data)=>{
      const room = data.class_id;
      connections.set(socket.client.id,room);
      console.log(connections);
      socket.join(`${room}`);
    })

    socket.on('disconnect',()=>{
      connections.delete(socket.client.id);
      console.log(connections);
      console.log("a user disconnected");
    })

  });

  return route;

}
