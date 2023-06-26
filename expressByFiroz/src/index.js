const path = require("path");
const express = require("express");
const app = express();
const port = 8000;

// console.log(__dirname);

// console.log(path.join(__dirname, ".."));

// console.log(path.join(__dirname, "../public"));

const staticPath = path.join(__dirname, "../public");

// Build-in middleware
app.use(express.static(staticPath));

app.listen(port, ()=>{
    console.log(`Listening to port no ${port}`);
});