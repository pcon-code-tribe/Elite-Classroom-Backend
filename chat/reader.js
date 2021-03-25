const fs = require('fs');

fs.open('chat/read.json','r',(err,file)=>{
  if(err){
    fs.open('chat/read.json','w',(err,file)=>{
      if(err){
        console.log(err);
      }else{
        const content ={};
        fs.writeFile('./chat/read.json',JSON.stringify(content),err=>{
          if(err){
            console.log(err);
          }else{
            console.log('reading messages now!!');
          }
        })
      }
    });
  }else{
    console.log("reading messages!!");
  }
});

module.exports = {
  //sets the info for a msg who read it
  setMsgInfo:(info,callback)=>{
    let {id,user_id,user_name} =  info;
    // console.log(id);

    fs.readFile('chat/read.json',(err,data)=>{

      if(err){
        console.log(err);
        callback(err);
      }else{

        try{

          

          var newData = JSON.parse(data);
          console.log(newData);
          if(newData[`${id}`] === undefined){
            newData[`${id}`] = {readers:[JSON.stringify(info)]};
          }else{
            var currData = newData[`${id}`].readers;
            currData.push(JSON.stringify(info));
            newData[`${id}`].readers = currData;
          }

          newData[`${id}`][`${info.user_id}`] = true;

          fs.writeFile('chat/read.json',JSON.stringify(newData),()=>{});
          callback(null);
        }catch(err){
          console.log(err);
          callback(err);
        }

      }

    });

  },
  //read the info for a particular msg with a certain id
  getMsgInfo:(id,callback)=>{
    fs.readFile('chat/read.json',(err,data)=>{
      if(err){
        console.log(err);
        callback(err);
      }else{
        
        try{

          const allData = JSON.parse(data);
          let readyData;

          if( id === null || id === undefined){
            readyData = allData;
          }else{
              let tosenddata = allData[`${id}`].readers;
              tosenddata.forEach(item=>{
                readyData.push(JSON.parse(item));
              });
          }

          callback(null,readyData);

        }catch(err){
          console.log(err);
          callback(err);
        }

      }
    });
  }
}
