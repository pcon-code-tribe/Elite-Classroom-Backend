const {get, update, del, create } = require('./classwork.controller');
const router = require('express').Router();

router.get('/getClasswork/:class_code', get);
router.put('/updatework/:work_id', update);
router.delete('/deletework/:work_id', del);
router.post('/creatework', create);

module.exports = router;