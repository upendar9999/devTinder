const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth");
const profileRouter = require("./routes/profile");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);


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
