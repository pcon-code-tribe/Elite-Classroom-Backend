const {getid, getcode, update, del, create} = require('./notes.controller');
const router = require('express').Router();

router.get('/getNotesid/:id', getid);
router.get('/getNotescode/:class_code', getcode);
router.put('/updateNotes/:id', update);
router.delete('/deleteNotes/:id', del);
router.post('/createNotes/:class_code', create);

module.exports = router;