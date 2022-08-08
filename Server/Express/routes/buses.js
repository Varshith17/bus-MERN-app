const express = require('express');
const route =  express.Router();
const busesModal =  require('../Modals/busesModal');
route.post('/routes',(req,res)=>{
    try{
        req.on('data',data=>{
            const reqData= JSON.parse(data);
            const query={
                from:reqData.from,
                to:reqData.to
            }
            const buses = busesModal.find(query,(error,responseData)=>{
                if(error){
                    console.log(error)
                    res.send("DBError")
                }
                else{
                    res.send(responseData)
                }
            })
        })
    }
    catch(err){
        console.log("Err "+err);
        res.send("Error "+err)
    }
});

route.post('/seats',(req,res)=>{
    try{
        req.on('data',data=>{
            const reqData= JSON.parse(data); 
            const buses = busesModal.findOne({id:reqData.busId},
                (error,responseData)=>{
                if(error){
                    console.log(error)
                }
                else{
                    res.send("Seats Booked");
                    responseData.bookedSeats=reqData.bookedSeats;
                    responseData.save();
                   
                }
            })

            // busesModal.updateOne({id:2},{$set:{bookedSeat:reqData.bookedSeats}},(error,updatedResult)=>{
            //     if(error){
            //         console.log("Error", error)
            //     }
            //     else{
            //         console.log("Bus ticket Updated");
            //         console.log(updatedResult)
            //     }
            // })

        })   
    }
    catch(err){
        console.log(err);
    }
});

module.exports=route;