require('dotenv').config();
const { createUser } = require('./user.service');

const { sign } = require('jsonwebtoken');

module.exports = {
  login: (req, res) => {
    createUser(req.body)
      .then((results) => {
        if (!results) {
          res.status(500);

          return res.json({
            success: 0,
            message: 'Invalid email or password',
          });
        }
        res.status(200);
        const jsonToken = sign({ body: results }, process.env.JWT_KEY);
        return res.json({
          success: 1,
          message: 'Login Successfully',
          token: jsonToken,
        });
      })
      .catch((e) => {
        res.status(e.status);
        res.send(e);
        res.end();
      });
  },
};
