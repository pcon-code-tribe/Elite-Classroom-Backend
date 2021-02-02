const express = require("express");
const router = express.Router();
var db = require('../config/database');
const {nanoid} = require('nanoid');

// get all the classes a student is enrolled in by passing his registration number as a parameter
router.get('/:reg', (req, res) =>{

    let id = `SELECT user_id FROM users WHERE registration_no = ${req.params.reg}`;
    let sql = 'SELECT * FROM classes WHERE user_id = ?';
    let query = db.query(sql, [id], (err, result) =>{

        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        }
    });
});

// creates a new classroom 
router.post('/create', (req, res) =>{

    const {className, profID} = req.body;
    let classCode = nanoid(10);
    let sql = 'INSERT INTO classroom SET class_code = ?, class_name = ?, prof_id = ?';
    let query = db.query(sql, [classCode, className, profID], (err, result) =>{

        if(err){
            throw err;
        }else{
            console.log(result);
            console.log("The class code for " + className + " is " + classCode);
            res.send("Classroom Created!");
        }
    });
});

// join a classroom
router.post('/join/:reg', (req, res) =>{

    let id = `SELECT user_id FROM users WHERE registration_no = ${req.params.reg}`;
    let class_Code = req.body;
    let sql = 'INSERT INTO classes SET user_id = ?, class_code = ?';
    let query = db.query(sql, [id, class_Code], (err, result) =>{

        if(err){
            throw err;
        }else{
            console.log(result);
            res.send("Class Joined!");
        }
    });
});

// show all the users signed up
router.get('/users', (req, res) =>{

    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, result) =>{

        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        }
    });
});


router.post('/add_user', (req, res) =>{

    //let {email, password, name, registration_no } = req.body;
    let sql = 'INSERT INTO users SET email = ?, password = ?, name = ?, registration_no = ?';
    let query = db.query(sql, ["abcd@gmail.com", "123456", "Bhavya", "2019UGCS102"], (err, result) =>{

        if(err){
            throw err;
        }else{
            console.log(result);
            res.send("User Added!");
        }
    });
});


module.exports = router