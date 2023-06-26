const express = require("express");
const request = require("request");
const app = express();
const port = 8000;

// here we set "hbs" view engine
app.set("view engine", "hbs");

// template engine route
app.get("/", (req,res)=>{
    res.render("index");   // It automatically detect the file type (here-> index.hbs)
});

// app.get("/about", (req,res)=>{
//     res.render("about",{        // It automatically detect the file type (here-> about.hbs)
//         Name : "Firoz",
//     });   
// });

app.get("/about", (req,res)=>{
    request(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=692c0ca681a4eef3b94aef99ab453b8f`) 
            .on("data", (chunk) =>{
                const objData = JSON.parse(chunk);
                const arrData = [objData];
                console.log(`City name is ${arrData[0].name} and temparature is ${arrData[0].main.temp}`);
                
               
                // console.log(arrData[0].name);
                res.write(arrData[0].name);
                // res.end(arrData[0].name);c
                

            })
            .on("end", (err) =>{
                if(err) return console.log("connection closed due to errors",err);
                res.end();
          });   
});


app.listen(port, ()=>{
    console.log(`Listing to port no ${port}`);
});