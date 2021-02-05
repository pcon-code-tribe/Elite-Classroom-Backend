require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./api/router');
app.use(express.json());
app.use('/api', routes);







app.listen(process.env.APP_PORT,()=> {
    console.log("Server up and running on " ,process.env.APP_PORT);
});
