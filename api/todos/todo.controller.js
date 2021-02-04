const { notTurnedInTodo } = require('./todo.service');

module.exports = {
  notTurnedIn: (req, res) => {
    notTurnedInTodo(req.body)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred while retrieving todo',
          });
        }

        res.status(200);

        return res.json({
          success: 1,
          message: 'Todo retrieved',
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
