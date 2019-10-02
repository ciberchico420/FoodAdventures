const mongoose = require('mongoose');

mongoose.connect("mongodb://casiel:Drokirifa123@localhost:27017/FoodAdventures?authSource=admin")
.then(db => console.log("Base de datos conectada"))
.catch(err => console.log(err));


module.exports = mongoose;