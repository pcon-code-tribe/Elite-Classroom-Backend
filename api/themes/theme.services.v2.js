const pool = require('../../config/database');
const {downloadWork} = require('../storage/storage.services');

const recordTheme = (url,cb)=>{

    try{

        const sql = `INSERT INTO themes (theme_url) VALUES (?)`;

        pool.query(sql,[url],(err,res)=>{
            if(err){
                console.log(err);
                return cb(err);
            }
            return cb(null);
        });

    }catch(err){
        console.log(err);
        return cb(err);
    }

}

const readTheme = (cb)=>{

    const sql = `SELECT themes.theme_url FROM themes`;

    try{

        pool.query(sql,(err,res)=>{
            const data = res;
            // console.log(data);
            const num = Math.floor(data.length * Math.random());
            const name = data[num].theme_url.split('/')[4];

            downloadWork(name,(err,dwnData)=>{

                if(err){
                    console.log(err);
                    return cb(err);
                }

                if(dwnData === null  || dwnData === undefined){
                    return cb({code:500,message:'unable to fetch file'});
                }

                // console.log(`dwndata: ${dwnData}`);

                return cb(null,dwnData);

            });

        });

    }catch(err){
        console.log(err);
        return cb(err);
    }
}

module.exports = {recordTheme,readTheme};