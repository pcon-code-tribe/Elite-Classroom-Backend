const pool = require('../../config/database');
const {Storage} = require('@google-cloud/storage');
const {uuid} = require('uuidv4');
const {format} = require('util');

const storage = new Storage({
    projectId: "elite-classroom-cdae0",
    keyFilename: "serviceAccountKey.json"
});

const bucket = storage.bucket("gs://elite-classroom-cdae0.appspot.com");

const uploadImageToCloud = (file)=>{
    return new Promise((resolve, reject)=>{
        if(!file)reject('No file exist');
        const name = file.originalname.split('.');
        let newFileName= `${uuid()}.${name[name.length -1]}`;
        let uploadTask = bucket.file(newFileName);

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
        // The public URL can be used to directly access the file via HTTP.
        const url = format(`https://storage.googleapis.com/${bucket.name}/${uploadTask.name}`);
        const data ={
            Location:url,
            Bucket:bucket.name,
            name:uploadTask.name
        }
        resolve(data);
        });
      
        blobStream.end(file.buffer);

    });
}

const downloadFromCloud =  (name)=>{
    return new Promise( async(resolve, reject)=>{
        if(!name) reject("file name could not be empty");

        let downloadTask = bucket.file(name);

        try{
            const file = await downloadTask.download();
            resolve(file);
        }catch(e){
            console.log(e);
            reject(e);
        }

    })
}

const deleteFromCloud = (name)=>{
    return new Promise( async(resolve, reject)=>{
        if(!name) reject("file name could not be empty");
        let deleteTask = bucket.file(name);
        
        try{
            const data = await deleteTask.delete();
            console.log(data);
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
            console.log(data);
            return callback(null, data);
        }).catch(err=>{
            console.log(err);
            return callback(err);
        })
    },
    downloadWork:(url, callback)=>{
        downloadFromCloud(url).then(data=>{
            console.log(data);
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