require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();
const routes = require("./api/router");
const PORT = process.env.PORT || 4000;
app.use(express.json());



const pool = require("./config/database");
app.use("/api", routes);




console.log('process.env');






app.listen(PORT, () => {
    console.log("Server up and running on ", PORT);
});