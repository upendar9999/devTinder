const express = require("express");

const app = express();

app.get("/user",(req,res,next)=>{
   console.log("Hellow World");
   next();
},(req,res,next)=>{
   console.log("Hellow World 2");
   next();
},(req,res,next)=>{
    console.log("Hellow World 3");
    next();
},(req,res,next)=>{
    console.log("Hellow World 4");
    // res.send("Response 4 !!");
    next(); 
},(req,res,next)=>{
    console.log("Hellow World 5");
    res.send("Response 5 !!");
    
}
);
app.listen(9999,()=>{
    console.log("Server is succesfully listening on port 9999..");
});