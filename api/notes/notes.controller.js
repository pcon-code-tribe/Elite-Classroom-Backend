const { getNotes, updateNotes, deleteNotes, createNotes } = require('./notes.service');

module.exports = {
    get: (req, res) => {
        getNotes(req.params)
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
    },

};