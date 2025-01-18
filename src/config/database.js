const mongoose = require("mongoose");

 const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://namastedev:NrGzRdczy8W0JGlO@namastenode.c5qlg.mongodb.net/devTinder"
    );
};

module.exports = connectDB;



