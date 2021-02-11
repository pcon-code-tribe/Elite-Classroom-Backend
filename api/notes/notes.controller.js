const { getNotesid, getNotescode, updateNotes, deleteNotes, createNotes } = require('./notes.service');

module.exports = {

    //get a particular note via given notes_id
    getid: (req, res) => {
        getNotesid(req.params)
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred while getting the notes',
                    });
                }
                else {
                    res.status(200);
                    return res.json(result);
                }
            })
            .catch((e) => {
                res.status(e.status);
                res.send(e);
                res.end();
            });
    },

    //get all notes via class_code
    getcode: (req, res) => {
        getNotescode(req.params)
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred while getting the notes',
                    });
                }
                else {
                    res.status(200);
                    return res.json(result);
                }
            })
            .catch((e) => {
                res.status(e.status);
                res.send(e);
                res.end();
            });
        },

    //update a particular note via given notes_id
    update: (req, res) => {
        updateNotes(req.body, req.params)
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred while updating notes',
                    });
                }
                else {
                    res.status(200);
                    return res.json(result);
                }
            })
            .catch((e) => {
                res.status(e.status);
                res.send(e);
                res.end();
            });
    },

    //delete a particular note via given notes_id
    del: (req, res) => {
        deleteNotes(req.params)
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred while deleting the notes',
                    });
                }
                else {
                    res.status(200);
                    return res.json(result);
                }
            })
            .catch((e) => {
                res.status(e.status);
                res.send(e);
                res.end();
            });
    },

    // create a note in a particular class via its class_code
    create: (req, res) => {
        createNotes(req.body, req.params)
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred while creating the notes',
                    });
                }
                else {
                    res.status(200);
                    return res.json(result);
                }
            })
            .catch((e) => {
                res.status(e.status);
                res.send(e);
                res.end();
            });
    }

};