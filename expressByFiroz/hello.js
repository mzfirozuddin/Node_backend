const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req,res) =>{
    res.send("<h1>This is from home page</h1>");
});

app.get("/about", (req,res) =>{
    res.send({
        id : 1,
        name : "Mirza Firoz Uddin",
        city : "Kolkata",
        age : 22,
    });
});

app.get("/temp", (req,res) =>{
    res.send([
        {
        id : 1,
        name : "Mirza Firoz Uddin",
        city : "Kolkata",
        age : 22,
        },
        {
        id : 2,
        name : "Firoz Uddin",
        city : "Delhi",
        age : 25,
        },
        {
        id : 3,
        name : "Mirza Firoz",
        city : "Kolkata",
        age : 24,
        }
    ]);
});

app.get("/data", (req,res) =>{
    res.json({
        id : 100,
        name : "Neha",
        city : "Kolkata",
        age : 32,
        course : "B.Tech",
    });
});

app.listen(port, () =>{
    console.log(`Listing to port no ${port}`);
});