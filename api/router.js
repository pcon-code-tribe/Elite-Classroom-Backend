const express = require('express');
const router = express.Router();

router.use('/users', require('./users/user.router'));
router.use('/joinClassroom', require('./joinClassroom/join.router'));

module.exports = router;