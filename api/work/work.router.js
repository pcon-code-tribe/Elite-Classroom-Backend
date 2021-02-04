const express = require('express');
const router = express.Router();
const create = require('./create/create.router');
const read = require('./read/router');

router.use('/create',create);

router.use('/read',read);

module.exports = router;