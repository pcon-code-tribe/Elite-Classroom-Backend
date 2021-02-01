const { createUser } = require("./user.service");

const{genSaltSync,hashSync,compareSync} = require("bcrypt") 
const {sign} = require("jsonwebtoken");


module.exports = {

    login : (req,res) => {

        const body = req.body;
        createUser(body , (err, results)=>{
            
            if(err)
            {
                console.log(err);
            }
            if(!results)
            {
                return res.json({
                    success :0,
                    data : "Invailed email and password"
                });
            }

            const jsontoken = sign({body : results}, process.env.JWT_key);
            return res.json({
                success :1,
                message : "Login Successfully",
                token : jsontoken
            });
         });
        
    },

};
