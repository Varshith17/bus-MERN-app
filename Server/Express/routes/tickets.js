const express = require('express');
const route =  express.Router();
const ticketModal =  require('../Modals/ticketModal');
const busModal = require('../Modals/busesModal');
route.post('/',(req,res)=>{
    try{
        req.on('data',d=>{
            const body= JSON.parse(d);
             const data={
                user:body.user,
                email:body.email,
                mobileNo:body.mobileNo,
                passengerDetails:body.passengerDetails,
                from:body.from,
                to:body.to,
                selectedSeats:body.selectedSeats,
                paymentInfo:body.paymentInfo,
                boardingPoint:body.boardingPoint,
                boardingTime:body.boardingTime,
                dropLocation:body.dropLocation,
                dropTime:body.dropTime,
                totalCharges:body.totalCharges,
                ticketFare:body.ticketFare,
                travelDate:body.travelDate,
             }
            
             
             ticketModal.create(data,(err,user)=>{
                if(err) {
                   res.send(err)
                }       
                else{
                    res.send("Ticket Booked");
                }
            })
        })
        
    }
    catch(err){
        console.log("Error", err);
        res.send("Error "+err);
    }
})

route.post('/ticket',(req,res)=>{
    try{
        req.on('data',data=>{
            const bodyData=JSON.parse(data);
            const query={
                user:bodyData.user,
                email:bodyData.email,
            }
            ticketModal.find(query,(error,responseData)=>{
                if(error){
                    console.log(error)
                    res.send("DBError")
                }
                else{
                    if(responseData){
                        res.send(responseData);
                    }
                    else{
                        res.send("No tickets found");
                    }
                 }
                });
        })
    }
    catch(err){
        console.log("Error",err);
        res.send("Error",err);
    }
})
module.exports=route;