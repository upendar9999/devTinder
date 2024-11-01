const validator = require("validator");

const validateSignUpData = (req)=>{
    const {firstName,lastName,password,emailId} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("EmailId is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
};

module.exports = {
    validateSignUpData,
}