const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/websiteRegistration")
.then(()=>{
    console.log("Connection Successful...");
}).catch((err)=>{
    console.log("Connection not Successful!");
})