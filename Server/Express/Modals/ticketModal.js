const mongoose = require('mongoose');
const schema= mongoose.Schema;
const ticket={
    user:String,
    email:String,
    mobileNo:Number,
    passengerDetails:Array,
    from:String,
    to:String,
    selectedSeats:Array,
    paymentInfo:Object,
    boardingPoint:String,
    boardingTime:String,
    dropLocation:String,
    dropTime:String,
    totalCharges:Number,
    ticketFare:Number,
    travelDate:Date,
}
module.exports=mongoose.model('tickets',ticket);