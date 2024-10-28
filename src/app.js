const express = require("express");

const app = express();

app.get("/getUserData",(req,res)=>{

    //try{
    throw new Error("hgjhkgjhkg");
    
    res.send("User Data Sent");
    
    // catch(err){
    //     res.status(500).send("Some Error,Contact support Team");
    // }
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong");
    }
});



app.listen(9999,()=>{
    console.log("Server is succesfully listening on port 9999..");
});