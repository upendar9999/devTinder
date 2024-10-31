const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());
// GET API /user by email
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
        const user = await User.findOne({emailId:userEmail});
        if(!user){
            res.status(404).send("User not found");
        }
        else{
        res.send(user);
        }
    // const user = await User.find({emailId:userEmail});
    // if(user.length === 0){
    //     res.status(404).send("User not found");
    // }
    // else{
    // res.send(user);
    // }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }

});
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

// /feed API to get all users
app.get("/feed",async (req,res)=>{

    try{
    const user = await User.find({});
    res.send(user);
    
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }

});

// DELETE API /user by userId
app.delete("/user",async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

//Update the data of the user
app.patch("/user",async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try{
         await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true,
         });
        res.send("User updated successfully");

    }catch(err){
        res.status(400).send("Update failed:"+ err.message);
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
