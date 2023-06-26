//module wrapper code
// console.log(__dirname);
// console.log(__filename);

//****************************************


const http = require("http");

const server = http.createServer((req , res) =>{
    res.end("Hello guys! My name is firoz uddin ");
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("Listint to the port no 8000");
});

