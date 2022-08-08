const mongoose = require('mongoose');
const schema= mongoose.Schema;
const buses={
    travels:String,
    from:String,
    to:String,
    type:String,
    pickupTime:String,
    pickupLocation:String,
    travelingTime:String,
    dropTime:String,
    dropLocation:String,
    fare:Number,
    bookedSeats:Array,
    id:{
        type:Number,
        unique:true
    }
}
module.exports=mongoose.model('buses',buses);