const { classes } = require('./getClasses.controller');
const router = require('express').Router();

router.get('/classes', classes);

module.exports = router;
