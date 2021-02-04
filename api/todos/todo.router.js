const { notTurnedIn } = require('./todo.controller');
const router = require('express').Router();

router.get('/notTurnedIn', notTurnedIn);

module.exports = router;
