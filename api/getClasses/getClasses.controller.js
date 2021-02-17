const { getClass } = require('./getClasses.service');

module.exports = {
  classes: (req, res) => {
    getClass(req.params)
      .then((result) => {
        if (!result) {
          res.status(500);
          return res.json({
            success: 0,
            message: 'Error occurred in fetching classes',
          });
        }

        res.status(200);
        return res.json({
          success: 1,
          message: 'Fetched classes',
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
