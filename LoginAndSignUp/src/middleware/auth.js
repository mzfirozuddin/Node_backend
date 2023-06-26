const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");
const RegistedUser = require("../models/userRegister");

const auth = async (req, res, next)=>{
    try {
        
        const userToken = req.cookies.jwt;
        const verifyUser = jwt.verify(userToken, process.env.SECRET_KEY);  // jwt.verify("token","secret key")
        // console.log(verifyUser);

        // Get all data of user
        const userData = await RegistedUser.findOne({_id:verifyUser._id});
        // console.log(userData);
        // console.log(userData.firstname);

        // THIS IS FOR LOG OUT FUNCTIONALITY
        req.userToken = userToken;
        req.userData = userData;
        // console.log(userToken);
        // console.log(userData);

        next();   // It must to write otherwise page can not be access.

    } catch (error) {
        res.status(401).send(error);
    }

}

module.exports = auth;