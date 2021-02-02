require('dotenv').config();
const express = require('express');
const app = express();

const userRouter = require('./api/users/user.router');

const PORT = process.env.PORT || 80;

app.use(express.json());

app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log('Server up and running on ', PORT);
});
