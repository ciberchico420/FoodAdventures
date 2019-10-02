const exp = require('express');
const router = exp.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require("jsonwebtoken")

const jwtSecret = require("../passport/jwtConfig");



router.get("/logout",(req,res,next)=>{
    req.logOut();
    res.clearCookie("jwt");
    res.send("Logged Out")
})

router.post("/register", (req,res)=>{

  var isOk = true;
  console.log(req.query["birth"]);
  User.findOne({email:req.query["email"]},(err,respo)=>{
    if(respo !=null){
      console.log("email");
      console.log(respo);
      res.json({info:"El correo ya esta registrado."});
    }else{
      if(req.query["password"] !== req.query["checkPassword"]){
        res.json({info:"Las contraseñas no coinciden."});
      }else{  
        
        if(!req.query["birth"]){
          res.json({info:"Por favor ingresa una fecha de nacimiento."});
        }else{
          const user =new User();
          user.email = req.query["email"];
          user.pass = req.query["password"];
          user.birth = req.query["birth"];
          user.fullName = req.query["fullName"];
          user.gender = req.query["gender"];
          user.save();
          res.json({info:"Todo listo."});
        }
      }
    
    }
  })
  })
router.post("/login",(req,res,next)=>{
    passport.authenticate('login',(err,user,info)=>{
        if(info != undefined){
            console.log(info.message);
            res.json(info);
        }else{
            const payload = {
                email: user.email,
                expires: Date.now()+30000000,
 
              };
        
              /** assigns payload to req.user */
              req.login(payload, {session: false}, (error) => {
                if (error) {
                  res.status(400).send({ error });
                }
        
                /** generate a signed json web token and return it in the response */
                const token = jwt.sign(JSON.stringify(payload), jwtSecret.secret);
        
                /** assign our jwt to the cookie */
                res.cookie('jwt', token);
                res.status(200).json(token);
            })
        }
    })(req,res,next)


})
module.exports= router;