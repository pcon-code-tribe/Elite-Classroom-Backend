const multer = require('multer');

const storage = multer.memoryStorage({
    destination: (req,file,callback)=>{
        callback(null,"../../../uploads");
    }
});

const uploads =multer(storage).single('file');

module.exports = uploads;