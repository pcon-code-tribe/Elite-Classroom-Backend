const fs = require('fs');

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


module.exports = {
  writeRecord:(data,callback)=>{
    const timestamp = new Date();
    const room = data.class_id;
    const newData = JSON.stringify(data);

    const content = `${timestamp}|${room}|${newData}|\n`;
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
             sendData.push(JSON.parse(item.split('|')[2]))
           }
         });


        callback(null,sendData);
      }
    });
  }
}
