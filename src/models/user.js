const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsuarioSchema = new Schema({
    email:{type:String,required:true},
    fullName:{type:String,required:false},
    pass:{type:String,required:true},
    birth:{type:Date,required:false},
    gender:{type:String,required:false},
    role:{type:Number,require:false,default:0}
})


module.exports = mongoose.model("usuarios",UsuarioSchema);