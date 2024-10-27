const express = require("express");

const app = express();

app.use("/",(req,res)=>{
    res.send("Hello from dashboard");
})

app.use("/hello",(req,res)=>{
    res.send("Hello hello hello");
})

app.use("/test",(req,res)=>{
    res.send("Hello from the server");
})
app.listen(9999,()=>{
    console.log("Server is succesfully listening on port 9999..");
});