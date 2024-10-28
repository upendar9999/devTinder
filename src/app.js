const express = require("express");

const app = express();


// // This will only handle get call to /user
app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Upendar",lastName:"Musuku"});
});


// app.post("/user",(req,res)=>{
//     console.log("Save the data to the database");
//     res.send("Data successfully saved to the database");
// });

// app.delete("/user",(req,res)=>{
    
//     res.send("Data successfully deleted from the database");
// });
// app.get("/hello",(req,res)=>{

//     res.send("Hello hello hello");
// });

// app.get("/hello/2",(req,res)=>{
//     res.send("Hello second");
// });

// this will match all HTTP method API calls to /test

// app.get("/test",(req,res)=>{
//     res.send("Hello from the server");
// });

// app.use("/",(req,res)=>{
//     res.send("Hello from dashboard");
// });

app.listen(9999,()=>{
    console.log("Server is succesfully listening on port 9999..");
});