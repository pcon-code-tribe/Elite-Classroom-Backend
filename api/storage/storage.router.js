const express = require('express');
const router = express.Router();
const {upload,remove,download}= require('./storage.controller');
const uploads = require('./storage.middleware');

router.post('/upload',uploads,upload);
router.get('/download',download);
router.delete('/remove',remove);

module.exports = router;