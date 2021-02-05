const { getNotes, updateNotes, deleteNotes, createNotes } = require('./notes.service');

module.exports = {
    get: (req, res) => {
        getNotes(req.params.id)
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred while getting the notes',
                    });
                }
            })
    },

    update: (req, res) => {
        updateNotes(req.body, req.params.id)
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred while updating the notes',
                    });
                }
            })
    },

    del: (req, res) => {
        deleteNotes(req.params.id)
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred while deleting the notes',
                    });
                }
            })
    },

    create: () => {
        createNotes()
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred while creating the notes',
                    });
                }
            })
    },

};