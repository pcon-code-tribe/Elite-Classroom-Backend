require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./api/users/user.router");

app.use(express.json());



app.use("/api/users",router);





app.listen(process.env.APP_PORT,()=> {
    console.log("Server up and running on " ,process.env.APP_PORT);
});
