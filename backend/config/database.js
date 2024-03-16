const mongoose= require('mongoose');
const dotenv = require('dotenv'); 
const connectDB = async () =>{
    try {
const connect =await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");
    }
    catch(error){
console.log(`Error: ${error.message}`);
process.exit(1);
    }
};

module.exports=connectDB;