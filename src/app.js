const express = require("express");

const app = express();

const { adminAuth , userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);

app.use("/user/login",(req,res)=>{
    res.send("User Logged in successfully");
})
app.use("/user/data",userAuth,(req,res)=>{
    res.send("User Data Sent");
})
app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Delete a User");
});


app.listen(9999,()=>{
    console.log("Server is succesfully listening on port 9999..");
});