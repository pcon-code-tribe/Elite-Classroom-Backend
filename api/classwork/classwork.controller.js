const {
  getClasswork,
  updateClasswork,
  deleteClasswork,
  createClasswork,
} = require('./classwork.service');

module.exports = {
  get: (req, res) => {
    getClasswork(req.params)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while getting work',
          });
        } else {
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
    updateClasswork(req.params, req.body)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while updating work',
          });
        } else {
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
    deleteClasswork(req.params, req.body)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while deleting work',
          });
        } else {
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
    createClasswork(req.body)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while creating work',
          });
        } else {
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
