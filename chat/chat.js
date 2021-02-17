const socketIO = require('socket.io');
const express = require('express');
const {writeRecord,readRecord} = require('./recorder');
const {setMsgInfo,getMsgInfo} = require('./reader');

//this stores the current room acquired by each connections
var connections= new Map();
var users = new Map();


module.exports = function(io){
  const route = express.Router();
  console.log("chat");



  io.on('connection',(socket)=>{
    console.log('new user connected chat');

    //sending and storing messages
    socket.on('sendMsg',(data)=>{
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
      let {room,user_id} = data;
      console.log(room);

      //sets socket used to conect against each userid
      users.set(user_id,socket);
      // console.log(users);

      //sets user info for each socket
      connections.set(socket.client.id,{user_id:user_id,room:room});
      console.log(connections);

      readRecord(room,(err,info)=>{
        if(err){
          // console.log(err);
          socket.emit('error',err);
        }else{
          // console.log(info);
          socket.emit('allMsg',info);
        }
      });
      socket.join(`${room}`);
    });

    //when user reads a message
    socket.on('readMsg',(data)=>{
      let {id,user_id,user_name} = data;

      console.log(id);

      setMsgInfo(data,(err)=>{
        if(err){
          console.log(err);
          socket.emit('error','Opps! some error occured')
        }
      });

    });

    //when user wants to get read info for a message
    socket.on('aboutMsgDetail',(data)=>{
      let {id} = data;

      getMsgInfo(id,(err,info)=>{
        if(err){
          console.log(err);
          socket.emit('error','failed to get details');
        }else{
          console.log(info);
            socket.emit('sendMsgDetail',(info));
        }
      });

    });

    socket.on('disconnect',()=>{
      connections.delete(socket.client.id);
      console.log(connections);
      console.log("a user disconnected");
    })

  });

  return route;

}
