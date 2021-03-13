require("dotenv").config();
const util = require("util"); //changed
const mysql = require("mysql"); //changed
//const { createPool } = require("mysql");

/*const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10

});*/
let pool = mysql.createPool({
    host: "bfvaemosjvydcnf2atwc-mysql.services.clever-cloud.com",
    user: "ux9z1ad8mrk5lasa",

    port: "3306",
    password: "kBfqcDJ1TrvkIZ31fR13",
    database: "bfvaemosjvydcnf2atwc",
});

pool.getConnection((err, connection) => {

    if (err) {
        throw err;
    } else {
        console.log("MySQL connected...");
    }

    // connection.release();
    //return;
})
pool.query = util.promisify(pool.query); //this line is changed

module.exports = pool;