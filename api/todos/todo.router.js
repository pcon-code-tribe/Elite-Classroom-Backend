const { notTurnedIn, missing, turnedIn } = require('./todo.controller');
const router = require('express').Router();

router.get('/notTurnedIn', notTurnedIn);
router.get('/missing', missing);
router.get('/turnedIn', turnedIn);

module.exports = router;
