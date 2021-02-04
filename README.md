## work_submission routes

### /api/work/create/upload
key = "file"
upload an attachment and responds with a json. Example responce : 
{
    "ETag": "\"b8f198a0fdfd3e3a236e9241dcde3b82\"",
    "Location": "https://elite-classroom-backend.s3.amazonaws.com/d13c57d7-8393-47fb-9a18-8766f2905df7.JPG",
    "key": "d13c57d7-8393-47fb-9a18-8766f2905df7.JPG",
    "Key": "d13c57d7-8393-47fb-9a18-8766f2905df7.JPG",
    "Bucket": "elite-classroom-backend"
}

### /api/work/create/submit 
submits a particular work from user. need a request body of type:
{
    "user_id":1,
    "work_id":1,
    "work":"submit this task",
    "attachment":"https://elite-classroom-backend.s3.amazonaws.com/d9e7fad8-3969-4594-b698-909da47a862c.JPG",
    "submitted_on":"2000-09-12 10:10:00"
}
and on successfull submission respondes with a json :
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 3,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
}

##  /api/work/read/submission/:sid
responce:{
    "submission_id": 2,
    "user_id": 1,
    "work_id": 1,
    "work": "submit this task",
    "attachment": "https://elite-classroom-backend.s3.amazonaws.com/d9e7fad8-3969-4594-b698-909da47a862c.JPG",
    "submitted_on": "2000-09-12T04:40:00.000Z"
}

## /api/work/read/work/:workid

## /api/work/read/user/:uid

## /api/work/read/work/:workid/:uid