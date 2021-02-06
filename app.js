require("dotenv").config();
const express = require("express");
const mysql = require("mysql"); //this
const app = express();
const routes = require("./api/router");
const PORT = process.env.PORT || 4000; //this
app.use(express.json());



const pool = require("./config/database"); //this
//app.use("/api/users", router);




console.log('process.env') //this

const classRoutes = require('./routes/classwork');

app.use('/', classRoutes);




app.listen(PORT, () => {
    console.log("Server up and running on ", PORT);
});