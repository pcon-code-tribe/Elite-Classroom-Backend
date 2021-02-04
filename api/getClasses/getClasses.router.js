const { classes } = require('./getClasses.controller');
const router = require('express').Router();

router.post('/classes', classes);

module.exports = router;