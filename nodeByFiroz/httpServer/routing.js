const http=require("http");
const server = http.createServer((req,res)=>{
    // console.log(req.url);
    if(req.url=="/"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end("Hello from the home side");
    } else if(req.url=="/about"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end("Hello from the aboutUs side");
    }else if(req.url=="/contact"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end("Hello from the contactUS side");
    }else{
        res.writeHead(404,{"content-type":"text/html"});
        res.end("<h1>404 error. Page not found</h1>");
    }
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("Listing to the port no 8000");
});