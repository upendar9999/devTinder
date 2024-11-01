const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("./utils/validation");

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
    try{
     //Validation of Data
     validateSignUpData(req);

     //Encrypt the password
     const {firstName,lastName,emailId, password } = req.body;

     const passwordHash = await bcrypt.hash(password,10);
     console.log(passwordHash);

    // Creating a instance of a user model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });
   
        await user.save();
    res.send("User added successfully");
    } catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
});

app.post("/login",async (req,res)=>{
    try{

    const {emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
        throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid){
          res.send("Logged in successfully");
    }
    else{
        throw new Error("Invalid credentailssss");
    }
   }
   catch(err){
    res.status(400).send("ERROR:"+err.message);
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
app.patch("/user/:userId",async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = [
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills",
        ];
        const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("Skills cannot be more than 10");
        }
        
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
