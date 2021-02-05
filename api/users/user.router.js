const { login } = require('./user.controller');
const router = require('express').Router();

router.post('/login', login);

module.exports = router;
