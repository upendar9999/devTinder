const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

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
         // Create a JWT Token
          const token = await jwt.sign({_id:user._id},"DEV@Tinder$790");
          // Add the token to the cookie and send the response back to the user
          res.cookie("token",token);
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

app.get("/profile",async (req,res)=>{
    try{

    const cookies = req.cookies;
    const { token } = cookies;
    if(!token){
        throw new Error("Inavlid Token");
    }

    const decodedMessage = await jwt.verify(token,"DEV@Tinder$790");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User is not found");
    }

    res.send(user);
}
    catch(err){
        res.status(400).send("ERR:"+err.message);
    }
})
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
