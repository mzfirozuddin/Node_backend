const http=require("http");
const fs=require("fs");

const server = http.createServer((req,res)=>{
    // const data = fs.readFileSync("../userApi/userapi.json","utf-8");
    const data = fs.readFileSync(`${__dirname}/../userApi/userapi.json`,"utf-8");
        const objData=JSON.parse(data);
    
    if(req.url=="/"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end("Hello from the home side");
    } else if(req.url=="/about"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end("Hello from the aboutUs side");
    }else if(req.url=="/contact"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end("Hello from the contactUS side");
    }else if(req.url=="/userapi"){
        // res.writeHead(200,{"content-type":"text/html"});
        // console.log(`${__dirname}`);

        /*
         fs.readFile("../userApi/userapi.json","utf-8",(err,data)=>{
            const objData=JSON.parse(data);
            res.end(objData[0].name);
        }); 
        */

        res.end(objData[0].name);
    }else{
        res.writeHead(404,{"content-type":"text/html"});
        res.end("<h1>404 error. Page not found</h1>");
    }
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("Listing to the port no 8000");
});