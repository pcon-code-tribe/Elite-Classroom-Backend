const { Router } = require('express');
const router = Router();
const uploads = require('../storage/storage.middleware');
const { uploadTheme, getTheme } = require('./themes.controller');

router.post('/put',uploads,uploadTheme);
router.get('/get',getTheme);

module.exports = router;