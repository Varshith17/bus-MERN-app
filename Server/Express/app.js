const express = require('express');
const app = express();
 const cors = require('cors');
const mongoose  = require('mongoose');
const port =9000;
app.use(cors());
mongoose.connect(" mongodb://localhost:27017/busticketbooking",{useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true,useFindAndModify: false},(err,client)=>{
    if(err){
        console.log("Error",err);
    }
});

const con = mongoose.connection;
con.on('open',()=>{
    console.log("DB Connected...");
});

const userRouter = require('./routes/users')
app.use('/users',userRouter);

const busRouter  = require('./routes/buses')
app.use('/buses',busRouter);

const ticketRouter  = require('./routes/tickets')
app.use('/tickets',ticketRouter);

app.listen(port,()=>{
    console.log("App running at "+port)
})