const mongoose = require('mongoose');
var os = require('os');
let con;
const drokt =true;

if(drokt){

con = mongoose.connect("mongodb://casiel:Drokirifa123@localhost:27017/FoodAdventures?authSource=admin");
}else{
con = mongoose.connect("mongodb://localhost:27017/FoodAdventures")
}
con.then(db => console.log("Base de datos conectada"))
.catch(err => console.log(err));


module.exports = mongoose;