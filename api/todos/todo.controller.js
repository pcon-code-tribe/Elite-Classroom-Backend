const {
  notTurnedInTodo,
  missingTodo,
  turnedInTodo,
} = require('./todo.service');

module.exports = {
  notTurnedIn: (req, res) => {
    notTurnedInTodo(req.params)
      .then((result) => {
        if (!result) {
          return res.status(500).json({
            success: 0,
            message: 'Error occurred while retrieving Not turned in todo',
          });
        }

        return res.status(200).json({
          success: 1,
          message: 'Not turned in todo retrieved',
          data: result,
        });
      })
      .catch((e) => res.status(e.status).send(e).end());
  },

  missing: (req, res) => {
    missingTodo(req.params)
      .then((result) => {
        if (!result) {
          return res.status(500).json({
            success: 0,
            message: 'Error occurred while retrieving missing todo',
          });
        }

        return res.status(200).json({
          success: 1,
          message: 'Missing todo retrieved',
          data: result,
        });
      })
      .catch((e) => res.status(e.status).send(e).end());
  },

  turnedIn: (req, res) => {
    turnedInTodo(req.params)
      .then((result) => {
        if (!result) {
          return res.status(500).json({
            success: 0,
            message: 'Error occurred while retrieving turnedIn todo',
          });
        }

        return res.status(200).json({
          success: 1,
          message: 'TurnedIn todo retrieved',
          data: result,
        });
      })
      .catch((e) => res.status(e.status).send(e).end());
  },
};
