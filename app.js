require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./api/users/user.router");

app.use(express.json());


app.use("/api/users",router);



const classRoutes = require('./routes/class');
app.use('/', classRoutes);





app.listen(process.env.APP_PORT,()=> {
    console.log("Server up and running on port" ,process.env.APP_PORT);
});
