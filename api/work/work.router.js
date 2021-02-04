const express = require('express');
const router = express.Router();
const create = require('./create/create.router');
const read = require('./read/router');
const update = require('./update/update.router');

router.use('/create',create);

router.use('/read',read);

router.use('/update',update);

module.exports = router;