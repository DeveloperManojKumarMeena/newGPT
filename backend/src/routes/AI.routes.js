const express = require('express');
const main = require('../../service/Google.service');

const route = express.Router()

route.post('/ai',async(req,res)=>{
    const message = req.body;

    console.log(message)

    const responce= await main(message.ask)
    console.log(responce)
    
    res.status(200).json({
        message:"api hit",
        responce
    })
})


module.exports=route