const fs = require('fs');
const {v4} = require('uuid');

fs.open('chat/record.txt','r',(err,file)=>{
  if(err){
    fs.open('chat/record.txt','w',(err,file)=>{
      if(err){
        console.log("unable to open file");
      }else{
        console.log("record.txt recording");
      }
    });
  }else{
    console.log("record.txt recording!!");
  }
});


//file to save messages on a json file
fs.open('chat/messages.json','r',(err,file)=>{
  if(err){
    fs.open('chat/messages.json','w',(err,file)=>{
      if(err){
        console.log(err);
      }else{
        const content = {};
        fs.writeFile('chat/messages.json',JSON.stringify(content),err=>{
          if(err){
            console.log(err);
          }else{
            console.log("messages is on now");
          }
        });
      }
    });
  }else {
    console.log("tracking messages!");
  }
});


module.exports = {
  writeRecord:(data,callback)=>{
    const timestamp = new Date();
    const room = data.class_id;
    const newData = JSON.stringify(data);
    const id = v4();

    const content = `${timestamp}|${room}|${newData}|${id}|\n`;
    fs.appendFile('chat/record.txt',content,err=>{
      if(err){
        return callback(err);
      }else{
        return callback(null);
      }
    });
  },
  readRecord: (room_id,callback)=>{

    fs.readFile('chat/record.txt','utf8',(err,data)=>{
      if(err){
        console.log(err);
        return callback(err);
      }else{
         var info = data.split('\n');
         var sendData = [];
         info.forEach((item, i) => {
           if(item.split('|')[1] == room_id){
             const currMsg = JSON.parse(item.split('|')[2]);
             sendData.push({
               id:item.split('|')[3],
               msg:currMsg.msg,
               sender:currMsg.sender,
               class:currMsg.class_id,
               time:item.split('|')[0]
             });
           }
         });


        callback(null,sendData);
      }
    });
  }
}
