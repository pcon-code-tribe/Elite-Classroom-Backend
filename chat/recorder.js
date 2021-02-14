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

    const content = `${timestamp}|${room}|${newData}\n`;
    fs.appendFile('chat/record.txt',content,err=>{
      if(err){
        return callback(err);
      }else{
        return callback(null);
      }
    });
  },
}
