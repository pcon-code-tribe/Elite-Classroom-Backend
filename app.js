require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./api/router');
const PORT = process.env.PORT || 3300;
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log('Server up and running on ', PORT);
});
