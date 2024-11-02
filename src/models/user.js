const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Inavlid Email address :" + value);
           }
        },
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
             throw new Error("Enter a strong password :" + value);
            }
         },
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLCexwutNZt0aSRMrVRLoXtex8XMNyWxjD4Q&s",
        validate(value){
            if(!validator.isURL(value)){
             throw new Error("Inavlid URL :" + value);
            }
         },
    },
    about:{
        type:String,
        default:"This is default description"
    },
    skills:{
        type:[String]
    },

},{
    timestamps:true,
});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{
        expiresIn : "1d",
      });
      return token;
}
userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    
      return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);