const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());


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

app.get("/profile",userAuth,async (req,res)=>{
    try{
    const user = req.user;
    res.send(user);
}
    catch(err){
        res.status(400).send("ERR:"+err.message);
    }
})

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    const user = req.user;
    //Sending a connection request
    console.log("Sending a connection request");
    res.send(user.firstName + " sent the Connection Request");

})



connectDB().then(()=>{
    console.log("Database connection established succesfully");
    app.listen(9999,()=>{
        console.log("Server is succesfully listening on port 9999..");
    });
}).catch(err=>{
    console.error("database cannot be eshtablished");
})
