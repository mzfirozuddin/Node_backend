require('dotenv').config();    // here we require "dotenv" packeg
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("./db/conn");
const RegistedUser = require("./models/userRegister");
const async = require("hbs/lib/async");
const auth = require("./middleware/auth");



const static_path = path.join(__dirname,"../public");
// console.log(static_path);
const views_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(cookieParser());   // This is a middlewire for cookie-parser
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partial_path);


// console.log(process.env);    // for checking that dotenv is working or not
// console.log(process.env.SECRET_KEY);

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/secret", auth , (req,res) => {   // Here "auth" is used for authorization. It means only loged in user can access this page
    // console.log(`Cookie is : ${req.cookies.jwt}`);  // req.cookies.cookie_name
    res.render("secret");
});


app.get("/logout", auth, async(req, res)=>{
    try {
        // console.log(req.userData);
        // console.log(req.userData.tokens);


        // This is a single device logout
        // We have also delete the token from database
        /* 
        req.userData.tokens = req.userData.tokens.filter((storedTokens) => {
            // console.log(currToken);
            return storedTokens.token != req.userToken;
        }); 
        */


        // Logout from all Devices
        req.userData.tokens = [];


        // This is also a single device logout
        res.clearCookie("jwt");     // Here we clear the cookie(token) from the browser
        
        console.log(`Logout Successfully`);
        await req.userData.save();          
        res.render("login");
    } catch (error) {
        res.status(500).send(error);
    }
})


app.get("/register", (req,res) => {
    res.render("register");
});

app.post("/register", async (req,res) => {
    try {
        // console.log(req.body.firstname);
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if (password === confirmPassword) {
            
            const registerUser = new RegistedUser({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                age : req.body.age,
                gender : req.body.gender,
                phone : req.body.phone,
                password : req.body.password,
                confirmPassword : req.body.confirmPassword

            })

            const signUpToken = await registerUser.generateAuthToken();
            // console.log(signUpToken);
            

            // Stote token in Cookie

            // The res.cookie() function is used to set the cookie name and value
            // The value parameter may be a string or object converted to JSON
           
            // syntax:-  res.cookie("name","value",[option])   // option is optional
            
            // res.cookie("jwt",signUpToken);
            res.cookie("jwt",signUpToken,{
                expires:new Date(Date.now() + 30000),
                httpOnly:true   // for this the cookie can not be remove by scripting language
            });


            const registered = await registerUser.save();
            res.status(201).render("index");

        }else{

            res.send(`password are not matching`);
        }

    } catch (err) {

        res.status(400).send(err);
    }

});

app.get("/login", (req,res) => {
    res.render("login"); 
});

app.post("/login", async (req,res) => {

    // Before hashinng use

     /* try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(`Email is: ${email} and password is: ${password}`);

        // const userEmail = await RegistedUser.findOne({email : email});
        const userEmail = await RegistedUser.findOne({email}); // object destructuring
        // res.send(userEmail);
        // console.log(userEmail);
        // console.log(userEmail.password);

        if (userEmail.password === password) {
            res.status(201).render("index");
        }else{
            res.status(400).send("Invalid Password");
        }
        
     } catch (err) {
        res.status(400).send(`Invalid Email`);
     } 
     */


     // After hashing use
     try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await RegistedUser.findOne({email : email});
        
        const isMatch = await bcrypt.compare(password, userEmail.password);

        const logInToken = await userEmail.generateAuthToken();
        // console.log(logInToken);

        res.cookie("jwt",logInToken,{
            expires:new Date(Date.now() + 300000),
            httpOnly:true,
            // secure:true  // this is for HTTPS   
        });


        if (isMatch) {
            const logedin = await userEmail.save();
            res.status(201).render("index");
        }else{
            res.status(400).send("Invalid Password");
        }

        
     } catch (err) {
        res.status(400).send(`Invalid Email`);
     }
     
});

app.listen(port, () =>{
    console.log(`Listening to port no ${port}...`);
});