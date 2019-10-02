const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require('passport');
const User = require('../models/user');
const jwt = require("jsonwebtoken")

router.get("/protect",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});


router.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});
module.exports= router;