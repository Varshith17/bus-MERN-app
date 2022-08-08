const express = require('express');
const { Container } = require('reactstrap');
const route =  express.Router();
const userModal = require('../Modals/userModal');

route.post('/user', (req,res)=>{
    try{
        req.on('data',data=>{
            const  reqData = JSON.parse(data);
            const query={
                email:reqData.email,
                password:reqData.password
            }
        userModal.findOne(query,(error,responseData)=>{
            if(error){
                console.log(error)
                res.send("DBError")
            }
            else{
                if(responseData){
                   const response = {
                       user:"User Authenticated",
                       name:responseData.name,
                       email:responseData.email,
                       mobileNo:responseData.mobileNo,
                   }
                    res.send(response);
                }
                else{
                    const response={
                        user:"User Not Authenticated"
                    }
                    res.send(response);
                }
             }
            });
        })  
    }
    catch(err){
        res.send("Error"+err);
        console.log(err);
    }
    
})
route.post('/',  (req,res)=>{
    try{     
        req.on('data',d=>{
            const body= JSON.parse(d)
            const data ={
                name:body.name,
                email:body.email,
                mobileNo:body.mobileNo,
                password:body.password,
                gender:body.gender,
                DOB:body.DOB,
            }
              userModal.create(data,(err,user)=>{
                if(err) {
                    const response={
                        user:"Account already Exists"
                    }
                   res.send(response)
                }       
                else{
                    const response = {
                        user:"Account created",
                        name:user.name,
                        email:user.email,
                        mobileNo:user.mobileNo
                    }
                    res.send(response);
                }
            })
        })     
    }
    catch(err){
        res.send("Error"+err);
    }    
})
module.exports=route;