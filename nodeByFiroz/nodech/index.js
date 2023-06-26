const fs=require("fs");         //here we import "fs" module
//fs.mkdirSync("hello");

//fs.writeFileSync("hello/bio.txt","my name is mirza firoz uddin");       //create a file

// fs.appendFileSync("hello/bio.txt"," welcome home:)");

/* 
const data=fs.readFileSync("hello/bio.txt","utf-8");    //utf-8 for read data without getting the buffar data

console.log(data); 
*/

// fs.renameSync("hello/bio.txt","hello/myBio.txt");        //for rename file

// fs.unlinkSync("hello/myBio.txt");        //for delete file

fs.rmdirSync("hello");      //for delete folder