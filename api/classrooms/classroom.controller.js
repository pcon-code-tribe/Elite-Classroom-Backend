const { createClassroom, joinClassroom } = require('./classroom.service');

module.exports = {
  newClassroom: (req, res) => {
    createClassroom(req.body)
      .then((result) => {
        if (!result) {
          return res.status(500).json({
            success: 0,
            message: 'Error occurred while creating classroom',
          });
        }

        return res.status(200).json({
          success: 1,
          message: 'Classroom created',
          data: result,
        });
      })
      .catch((e) => {
        res.status(e.status).send(e).end();
      });
  },

  joinClass: (req, res) => {
    joinClassroom(req.body)
      .then((result) => {
        if (!result) {
          return res.status(500).json({
            success: 0,
            message: 'Error occurred while joining Classroom',
          });
        }

        return res.status(200).json({
          success: 1,
          message: 'Classroom joined',
        });
      })
      .catch((e) => {
        res.status(e.status).send(e).end();
      });
  },
};
