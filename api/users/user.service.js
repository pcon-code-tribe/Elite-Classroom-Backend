const pool =  require("../../config/database");


  module.exports = {

    createUser : (data , callback) => {

      pool.query("Select * FROM users WHERE google_token = '"+ data.google_token +"'",
       (err, result, field) => {
        if(result.length === 0){

          pool.query("INSERT INTO users (name, email, google_token) VALUES (?,?,?)",
          [
             data.name,
             data.email,
             data.google_token
          ]
          ,
          (error,results,fields) => {
              if(error){
                  return callback(error);
              }
  
              return callback(null,results);
          }
          
          );
  
          
       }else{  
              return callback(null,result);
          }
       
    }
      )
  }

};