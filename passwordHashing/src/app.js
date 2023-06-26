const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

// password hashing

const securePassword = async (password)=>{

    // hashing apply when we store password
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);

    // hashing apply when we check password
    // const passwordMatch = await bcrypt.compare(password,passwordHash);
    const passwordMatch = await bcrypt.compare("Firoz@134",passwordHash);
    console.log(passwordMatch);
}

securePassword("Firoz@1234")



// Authentication & Cookies usng "jsonwebtoken" 

const jwt = require("jsonwebtoken");

const createToken = async () =>{
    //token getenate
    // jwt.sign({payload}, "secretOrPrivateKey", [options, callback])

    /*  
    const token = await jwt.sign({_id : "638c753c4fcc3fb647c870dd"},"Ab1ggUZXxzw2HJKwhKk6oryHWZ8pXBxR");
    console.log(token); 
    */

    const token = await jwt.sign({_id : "638c753c4fcc3fb647c870dd"},"Ab1ggUZXxzw2HJKwhKk6oryHWZ8pXBxR",{
        expiresIn : "2 seconds"
    });
    console.log(token);

    /*   // short note

    payload should be unique;
    secret key should be minimum 32 character;
    option or callback is optional, here we pass token expire time;
     */


    /* // this is generated token

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.         // => 1st part represent the "header"
    eyJfaWQiOiI2MzhjNzUzYzRmY2MzZmI2NDdjOD
    cwZGQiLCJpYXQiOjE2NzI1NjQ3NzB9.               // => 2nd part represent the "payload" data
    DoskMUcTkv-2zEwUy58f2BwKsApt-_Y-Fj3JojR8HbY   // => 3rd part represent the "signature"
    */

    // token verify
    // jwt.verify(token, "secretOrPublicKey", [options, callback])
    
    const userVerification = await jwt.verify(token, "Ab1ggUZXxzw2HJKwhKk6oryHWZ8pXBxR");
    console.log(userVerification);

}

createToken();

app.listen(port, ()=>{
    console.log(`Listening to port no ${port}...`);
})



