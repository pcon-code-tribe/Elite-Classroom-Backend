const fs = require('fs');

fs.open('api/themes/theme.json','r',(err,file)=>{
    if(err){
      fs.open('api/themes/theme.json','w',(err,file)=>{
        if(err){
          console.log(err);
        }else{
          const content ={themes:[]};
          fs.writeFile('./api/themes/theme.json',JSON.stringify(content),err=>{
            if(err){
              console.log(err);
            }else{
              console.log('themes ready');
            }
          })
        }
      });
    }else{
      console.log("themes ready");
    }
});

const recordTheme =  (url,cb)=>{

    try{
        fs.readFile('api/themes/theme.json',(err,info)=>{
            if(err){
                console.log(err);
                return cb(err);
            }

            let data = JSON.parse(info);
    
            if(data === null || data === undefined){
                return cb({code:500,message:'some unknown error occured'});
            }

            let currData = data.themes;
            currData = [...currData,url];

            data.themes = currData;

            fs.writeFile('api/themes/theme.json',JSON.stringify(data),()=>{});

            return cb(null);


        });
    }catch(err){
        console.log(err);
        return cb(err);
    }

}

module.exports = {recordTheme};