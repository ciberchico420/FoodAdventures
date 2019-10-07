const express = require("express");
const router = express.Router();
const passport = require('passport');
const axios = require("axios");
const Tour = require('../models/tours');
const Reservation = require('../models/reservations');
const Reglas = require('../Rules')
const jwt = require("jsonwebtoken")

const jwtSecret = require("../passport/jwtConfig");
var fs = require('file-system');

const path = require("path");

//USUARIOS

router.get('/user',
(req, res,next) => {
  passport.authenticate('jwt', { session: false }, function(err, user, info) {

    // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
    if (err || !user) {
      // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
      res.json()
    } else {
      res.json(user);
    }
  })(req, res, next);
});



router.get("/test",(req,res,next)=>{
  res.json({expire:jwt.verify(req.cookies["jwt"],jwtSecret.secret),dateNow:Date.now()})
  console.log();

});


//TOURS
router.get("/tours",(req,res,next)=>{

  Tour.find({},(err,respuesta)=>{
    res.json(respuesta);
  })
 
})
router.post('/addTour',
(req, res,next) => {
  passport.authenticate('jwt', { session: false }, function(err, user, info) {
    if(user.role >= Reglas.ADD_NEW_TOUR){
      const datos=req.body.data;
      console.log(datos);
      const tour = new Tour();
      tour.title = datos.title;
      tour.description = datos.description;
      tour.price = datos.price;
      tour.schedule = datos.schedule;
      tour.img = datos.img;
      tour.save();
      res.json({info:"¡Todo listo!",status:"success"});
    }else{
      res.json({info:"No tienes el rol necesario",status:"warning"})
    }
    
  })(req, res, next);
});

function infoMsg(data,type="warning"){
  return {info:data,status:type}
}

router.get("/getTour",(req,res,next)=>{
      if(req.query.id != undefined){

        Tour.find({_id:req.query.id},(err,respuesta)=>{
          if(respuesta){
              res.json(respuesta[0]);
          }else{
            res.json(infoMsg("No se encontró ningún resultado."))
          }
          
   
        })
      }else{
         res.json({info:"Por favor agrega un id valido"});
      }

 
})


router.post("/editTour",(req,res,next)=>{

  passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    if(user.role >= Reglas.EDIT_TOUR){
      const datos=req.query;
      const tour = await Tour.findById(datos.tourId)
      tour.title = datos.title;
      tour.description = datos.description;
      tour.price = 3000;
      tour.save(); 
      res.json({info:'Tour agregado',status:"success"});
    }
  })(req,res,next)
  

})

router.post("/deleteTour",(req,res,next)=>{

  console.log("Request a deletetour")

  passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    if(err){
      res.json({info:err,status:"warning"});
    }
    if(user.role >= Reglas.EDIT_TOUR && user.role != undefined){
      const datos=req.query;
     await Tour.deleteOne({_id:datos.tourId})
      res.json({info:'Tour eliminado',status:"success"});
      console.log("Tour eliminado")
    }else{
      res.json({info:'No tienes los permisos necesarios',status:"danger"});
    }
  })(req,res,next)
  

})

//Reservations

router.get("/reservations",(req,res,next)=>{


  passport.authenticate('jwt', { session: false }, function(err, user, info) {
    if(user.role >= Reglas.ADD_RESERVATION){
      try{

        
        Reservation.find({},(err,respuesta)=>{
          res.json(respuesta);
        })

      }catch(err){}
    }
  
  })(req,res,next)
})
    

router.post('/addReservation',
(req, res,next) => {
  passport.authenticate('jwt', { session: false }, function(err, user, info) {
    if(user.role >= Reglas.ADD_RESERVATION){
      try{
        
        const datos = req.query;
        console.log(datos.people)
        var newPe = []
        datos.people.forEach(element => {
          newPe.push(JSON.parse(element))
        });
        const reserv = new Reservation();
        reserv.tourId = datos.tourId;
        reserv.clientId = datos.clientId;
        reserv.people = newPe;
        if(newPe.length <= 1){
          res.json(infoMsg("Debe haber mínimo dos personas por grupo","warning"));
        }
        reserv.phone = datos.phone;
        reserv.date = datos.date;
        reserv.hour = datos.hour;
        reserv.save().then(doc=>{
          res.json(infoMsg("Reservacion realizada","success"));
        }).catch(reason=>{
          res.json(infoMsg("Error:" +reason,"danger"));
        });
      
      }catch(err){
        console.log(err)
        res.json(infoMsg("Error: "+err.message,"danger"));
      }
    
    }else{
      res.json(infoMsg("No estas autentificado."))
    }
  
  })(req,res,next)
});

router.get("/getReservation",(req,res,next)=>{


  passport.authenticate('jwt', { session: false }, function(err, user, info) {
    if(user.role >= Reglas.ADD_RESERVATION){
      try{

        if(req.query.id != undefined){

          Reservation.find({_id:req.query.id},(err,respuesta)=>{
            if(respuesta){
                res.json(respuesta[0]);
            }else{
              res.json(infoMsg("No se encontró ningún resultado."))
            }
            
      
          })
        }else{
           res.json({info:"Por favor agrega un id valido"});
        }

      }catch(err){res.json(infoMsg("Error: "+err.message,"danger"));}}
    })(req,res,next)


})

router.get("/resByDate",(req,res,next)=>{


  passport.authenticate('jwt', { session: false }, function(err, user, info) {
    if(user.role >= Reglas.ADD_RESERVATION){
      try{

        
        Reservation.find({date:req.query.date},(err,respuesta)=>{
          res.json(respuesta);
        })

      }catch(err){}
    }
  
  })(req,res,next)
})


//EXTRAS 
router.post("/uploadImg",(req,res,next)=>{
 passport.authenticate('jwt', { session: false }, function(err, user, info) {
    if(user.role >= Reglas.UPLOAD_IMG){
      //console.log(req.body.data.img);
      var arr = []
      req.body.data.img.forEach(element => {
        const datos = saveImage(element);
        arr.push(datos.filename)
      });
     // const s =saveImage(req.body.data.img);
      
      res.json(arr);

    }else{
      res.json(infoMsg("No cuentas con el permiso necesario"));
    }
  })(req,res,next)
});

function saveImage  (baseImage){
  /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
  const uploadPath =  path.dirname(require.main.filename);
  //path of folder where you want to save the image.
  const localPath = `${uploadPath}/public/uploads/tourImages/`;

  //Find extension of file
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
  //Forming regex to extract base64 data of file.
  const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
  //Extract base64 data.
  const base64Data = baseImage.replace(regex, "");
  const rand = Math.ceil(Math.random()*1000);
  //Random photo name with timeStamp so it will not overide previous images.
  const filename = `Photo_${Date.now()}_${rand}.${ext}`;
  
  //Check that if directory is present or not.
  if(!fs.existsSync(`${uploadPath}/uploads/`)) {
      fs.mkdirSync(`${uploadPath}/uploads/`);
  }
  if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath);
  }
  fs.writeFileSync(localPath+filename, base64Data, 'base64');
  return {filename, localPath};
}


module.exports= router;