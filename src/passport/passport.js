const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const jwtSecret = require("./jwtConfig");

const User = require('../models/user');


passport.use('register',new LocalStrategy(
    {
        usernameField: 'username',
         passwordField: 'password',
         passReqToCallback: true,
         session:false
      },
      async(req,email,password, done) => {
          const user = new User();
          user.email = email;
          user.pass = password;
         await user.save();
        return done(null,user);
      }

))
passport.use('login',new LocalStrategy( {
    usernameField: 'username',
     passwordField: 'password',
     passReqToCallback: true,
     session:false
  },(req,username,password,done) =>{
      try{
          User.findOne().where({email:username}).then(user=>{
            if(user == null){
                return done(null,false,{info:"El correo electrónico o la contraseña son incorrectos."})
            }else{
                if(password !== user.pass){
                    return done(null,false,{info:"El correo electrónico o la contraseña son incorrectos."})
                }

               return done(null,user);
            }
          })
      }catch(err){
        return done(err,false);
      }
    
  }
  ))

  var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
   
    return token;
  };

  passport.use(new JWTstrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: jwtSecret.secret,
     },
     (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
      }
     
      try{
        User.findOne().where({email:jwtPayload.email}).then(user=>{
          if(!user){
            return done(null,false,{message:"No existe el usuario dado en el Payload"})
          }
            user.pass = undefined;
            return done(null,user)
        })
      }catch(err){
        return done(err,false);
      }
      
     // return done(null, jwtPayload);
    }
));