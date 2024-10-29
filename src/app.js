const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());
app.post("/signup",async (req,res)=>{
    // Creating a instance of a user model
    const user = new User(req.body);
    try{
        await user.save();
    res.send("User added successfully");
    } catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
});

connectDB().then(()=>{
    console.log("Database connection established succesfully");
    app.listen(9999,()=>{
        console.log("Server is succesfully listening on port 9999..");
    });
}).catch(err=>{
    console.error("database cannot be eshtablished");
})
