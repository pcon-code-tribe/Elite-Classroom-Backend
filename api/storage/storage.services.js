const pool = require('../../config/database');
const {Storage} = require('@google-cloud/storage');
const {v4} = require('uuid');
const {format} = require('util');
const mime = require('mime-types');

const storage = new Storage({
    projectId: "elite-classroom-cdae0",
    keyFilename: "serviceAccountKey.json"
});

const bucket = storage.bucket("gs://elite-classroom-cdae0.appspot.com");

const uploadImageToCloud = (file)=>{
    return new Promise((resolve, reject)=>{
        if(!file)reject('No file exist');
        const name = file.originalname.split('.');
        let newFileName= `${v4()}.${name[name.length -1]}`;
        let uploadTask = bucket.file(newFileName);

        console.log(file.mimetype);

        const blobStream = uploadTask.createWriteStream({
            metadata:{
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            console.log(error);
            reject('Something is wrong! Unable to upload at the moment.');
          });
      
        blobStream.on('finish', () => {
        const Location = format(`https://storage.googleapis.com/${bucket.name}/${uploadTask.name}`);
        resolve({Location});
        });
      
        blobStream.end(file.buffer);

    });
}

const downloadFromCloud =  (name)=>{
    return new Promise( async(resolve, reject)=>{
        if(!name) reject("file name could not be empty");

        let downloadTask = bucket.file(name);

        try{
            const extension =  name.split('.')[1];
            const destination = `./temp_downloads/${v4()}.${extension}`;
            const options = {destination}
            const file = await downloadTask.download(options);
            resolve({destination,extension});
        }catch(e){
            console.log(e);
            reject(e);
        }

    });
}

const deleteFromCloud = (name)=>{
    return new Promise( async(resolve, reject)=>{
        if(!name) reject("file name could not be empty");
        let deleteTask = bucket.file(name);
        
        try{
            const data = await deleteTask.delete();
            // console.log(data);
            resolve(data);
        }catch(e){
            console.log(e);
            reject(e);
        }
    });
}

module.exports = {
    uploadWork:(file,callback)=>{
        uploadImageToCloud(file).then(data=>{
            // console.log(data);
            return callback(null, data);
        }).catch(err=>{
            console.log(err);
            return callback(err);
        })
    },
    downloadWork:(url, callback)=>{
        downloadFromCloud(url).then(data=>{
            // console.log(data);
            callback(null, data);
        }).catch(err=>{
            console.log(err);
            callback(err);
        })
    },
    deleteWork: (url, callback)=>{
        var data = url.split('/')[4];
        deleteFromCloud(data).then(info=>{
            callback(null, info);
        }).catch(err=>{
            callback(err);
        })
    },
}