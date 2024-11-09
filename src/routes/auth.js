const {validateSignUpData} = require("../utils/validation");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
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

authRouter.post("/login",async (req,res)=>{
    try{

    const {emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
        throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid){
         // Create a JWT Token
          const token = await user.getJWT();
          // Add the token to the cookie and send the response back to the user
          res.cookie("token",token,{
            expires : new Date(Date.now() + 8 * 3600000)
          });
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

authRouter.post("/logout", (req,res)=>{

    res.cookie("token", null, {expires:new Date(Date.now())});

    res.send("LogOut Successful");

});

module.exports = {authRouter};


