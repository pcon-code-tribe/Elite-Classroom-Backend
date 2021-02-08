const { createClassroom, joinClassroom } = require('./classroom.service');

module.exports = {
  newClassroom: (req, res) => {
    createClassroom(req.body)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while creating classroom',
          });
        }

        res.status(200);

        return res.json({
          success: 1,
          message: 'Classroom created',
          data: result,
        });
      })
      .catch((e) => {
        res.status(e.status);
        res.send(e);
        res.end();
      });
  },

  joinClass: (req, res) => {
    joinClassroom(req.body)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while joining Classroom',
          });
        }

        res.status(200);

        return res.json({
          success: 1,
          message: 'Classroom joined',
          data: result,
        });
      })
      .catch((e) => {
        res.status(e.status);
        res.send(e);
        res.end();
      });
  },
};
