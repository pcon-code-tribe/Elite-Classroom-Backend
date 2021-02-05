const express = require("express");
const router = express.Router();
var db = require('../config/database');
const { nanoid } = require('nanoid');

//shows everytning the teacher has posted for a particular classcode

router.post('/classwork', (req, res) => {
    let class_Code = req.body.code;
    let sql = 'select work_id, title, description,type, attachment from class_works where class_code = ? order by created_date';
    let query = db.query(sql, [class_Code], (err, result) => {

        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    });
})

//add classwork for a particular class

router.post('/add-classwork', (req, res) => {

    let { class_Code, title, desc, type, attachment, created_date, due_date } = req.body;
    let sql = 'insert into class_works set class_Code=?,title=?,description=?,type=?,attachment=?,created_date=?,due_date=?';
    let query = db.query(sql, [class_Code, title, desc, type, attachment, created_date, due_date], (err, result) => {

        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send("work added");
        }
    });
})

// deleting classwork for a particular class code

router.delete('/delete-classwork', (req, res) => {
    let work_id = req.body.work_id;
    if (work_id) {
        let sql = 'delete from class_works where work_id= ? ';
        let query = db.query(sql, [work_id]);
        res.status(200).json({
            message: "work Deleted",
        });
    } else {
        res.status(400).json({
            message: "Missing Required Field",
        });
    }
})

//updating classwork 

router.put("/update-classwork", async(req, res) => {
    let { work_id, title } = req.body;
    if (work_id && title) {
        let check_sql = "SELECT * FROM class_works WHERE work_id=?";
        let [check_result] = await db.query(check_sql, [work_id]);
        if (check_result) {
            let sql = "UPDATE class_works set title=? WHERE work_id=?";
            let result = await db.query(sql, [title, work_id]);
            res.status(200).json({
                message: "work Edited",
            });
        } else {
            res.status(400).json({
                message: "work id Doesn't Exist",
            });
        }
    } else {
        res.status(400).json({
            message: "Missing Required Field",
        });
    }
})



module.exports = router;