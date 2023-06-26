// const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");

//  here we define a schema
const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },

    lastname : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    age : {
        type : Number,
        required : true
    },

    gender : {
        type : String,
        required : true
    },

    phone : {
        type : Number,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    confirmPassword : {
        type : String,
        required : true
    },

    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]

});


// generating tokens
userSchema.methods.generateAuthToken = async function () {
    try {
        // const generatedToken = await jwt.sign({_id : this._id.toString()}, "iammirzafirozuddinstudentofaliahuniversity");
        const generatedToken = await jwt.sign({_id : this._id.toString()}, process.env.SECRET_KEY);
        // console.log(generatedToken);
        // console.log(this.tokens.concat({token : generatedToken}));
        this.tokens = this.tokens.concat({token : generatedToken});
        return generatedToken;

    } catch (err) {
        res.send(`The error part ${err}`);
        console.log(`The error part ${err}`);
    }
}


// password hash   // concept of middlewire
userSchema.pre("save", async function(next){  //pre() means before the save, that's why we pass "save" as first argument
    
    if (this.isModified("password")) {  // it means if password is modified then only do hash
        // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);  
        // console.log(`the current password is ${this.password}`);

        // this.confirmPassword = undefined;  // now confirmPassword does not save in database
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);

    }

    next();  // it is must to call next();
    
})

// here we ceate a collection
const RegistedUser = new mongoose.model("RegistedUser", userSchema);
module.exports = RegistedUser;