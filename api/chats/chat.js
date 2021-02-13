const express = require('express');
const socket = require('socket.io');
const path = require('path');
const router = express.Router();


router.get('/:classcode',(req,res)=>{
  res.send("get chats here");
});


module.exports = router;
