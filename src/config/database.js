const mongoose = require("mongoose");

 const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://namastedev:VhcsSxR40o9z90t8@namastenode.c5qlg.mongodb.net/devTinder");
};

module.exports = connectDB;



