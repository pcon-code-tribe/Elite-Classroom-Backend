const { submitFeedback } = require('./feedback.service');
module.exports = {
    feedback: (req, res) => {
        submitFeedback(req.body)
            .then((result) => {
                if (!result) {
                    res.status(500);
                    return res.json({
                        success: 0,
                        message: 'Error occurred in storing feedback',
                    });
                }

                res.status(200);
                return res.json({
                    success: 1,
                    message: 'Feedback saved',

                });
            })

        .catch((e) => {
            res.status(e.status);
            res.send(e);
            res.end();
        });
    },
};