const fs=require("fs");
const bioData={
    name:"Firoz",
    age:21,
    course: "B.Tech",
};

// console.log(bioData.name);

const jsonData=JSON.stringify(bioData);
// console.log(jsonData);

// fs.writeFile("hello.json",jsonData,(err)=>{
//     console.log("written done");
// });

fs.readFile("hello.json","utf-8",(err, data)=>{
    const orgData=JSON.parse(data);
    console.log(orgData);
    console.log(data);
})

