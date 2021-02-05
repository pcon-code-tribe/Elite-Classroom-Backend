const {get, update, del, create} = require('./notes.controller');
const router = require('express').Router();

router.get('/getNotes', get);
router.put('/updateNotes', update);
router.delete('/deleteNotes', del);
router.post('/createNotes', create);

module.exports = router;