const express = require('express');
const app = express();

// API
// get - read
// post - create
// put - update
// delete - delete/remove

// app.get(rout, callback)

app.get("/", (req,res) => {
   res.send("Hello world From The Express!"); 
})

app.get("/about", (req,res) => {
   res.send("Hello world From The about!"); 
})

app.listen(8000, () =>{
    console.log("Listing the port at 8000");
})