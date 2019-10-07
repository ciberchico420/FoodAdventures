const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReservSchema = new Schema({
    tourId:{type:String,required:true},
    clientId:{type:String,required:true},
    people:[{
        name:String,
        email:String,
        age:Number
    }],
    phone:{type:String, required:true},
    observations:{type:String,required:false},
    date:{type:Date,required:true},
    hour:{type:Array,required:true}
})


module.exports = mongoose.model("reservations",ReservSchema);