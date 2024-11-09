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

const validateEditProfileData = (req) => {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
    );
    return isEditAllowed;
  };
  module.exports = {
    validateSignUpData,
    validateEditProfileData,
  };
