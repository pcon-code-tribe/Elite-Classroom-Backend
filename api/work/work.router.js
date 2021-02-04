const express = require('express');
const router = express.Router();
const create = require('./create/create.router');

router.use('/create',create);

module.exports = router;