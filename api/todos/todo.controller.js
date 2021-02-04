const {
  notTurnedInTodo,
  missingTodo,
  turnedInTodo,
} = require('./todo.service');

module.exports = {
  notTurnedIn: (req, res) => {
    notTurnedInTodo(req.body)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while retrieving Not turned in todo',
          });
        }

        res.status(200);

        return res.json({
          success: 1,
          message: 'Not turned in todo retrieved',
          data: result,
        });
      })
      .catch((e) => {
        res.status(e.status);
        res.send(e);
        res.end();
      });
  },

  missing: (req, res) => {
    missingTodo(req.body)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while retrieving missing todo',
          });
        }

        res.status(200);

        return res.json({
          success: 1,
          message: 'Missing todo retrieved',
          data: result,
        });
      })
      .catch((e) => {
        res.status(e.status);
        res.send(e);
        res.end();
      });
  },

  turnedIn: (req, res) => {
    turnedInTodo(req.body)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while retrieving turnedIn todo',
          });
        }

        res.status(200);

        return res.json({
          success: 1,
          message: 'TurnedIn todo retrieved',
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
