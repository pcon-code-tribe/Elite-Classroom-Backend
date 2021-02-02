require('dotenv').config();
const { createUser } = require('./user.service');

const { sign } = require('jsonwebtoken');

module.exports = {
  login: (req, res) => {
    const body = req.body;

    createUser(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: 'Invalid email and password',
        });
      }
      const jsonToken = sign({ body: results }, process.env.JWT_KEY);
      return res.json({
        success: 1,
        message: 'Login Successfully',
        token: jsonToken,
      });
    });
  },
};
