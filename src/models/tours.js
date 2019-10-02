const mongoose = require('mongoose');
const {Schema} = mongoose;

const ToursSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    info:{type:String,required:false},
    img:{type:Array,required:false},
    price:{type:Number,required:true},
    days:{type:Array,required:true}
})


module.exports = mongoose.model("tours",ToursSchema);