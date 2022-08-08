const mongoose = require('mongoose');
const schema= mongoose.Schema;
const users={
    name:String,
    email:
    {
        type:String,
        unique:true
    },
    mobileNo:Number,
    password:String,
    DOB:Date,
    gender:String,
}
module.exports=mongoose.model('users',users);