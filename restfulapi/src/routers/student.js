const express = require("express");
//1: Create a Express Router
const router = new express.Router();
const Student = require("../models/students");


// using async await
router.post("/students", async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
    
})

// read the data of registered students
router.get("/students", async (req,res)=>{
    try {
        const studentData = await Student.find();
        res.send(studentData);
    } catch (error) {
        res.send(error);
    }
})

// get the individul students data
router.get("/students/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const studentIndvidualData = await Student.findById(_id);
        res.status(200).send(studentIndvidualData);
    } catch (error) {
        res.status(500).send(error);
    }
})


// update the student
router.patch("/students/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body,{new:true});
        res.send(updateStudents);
    } catch (error) {
        res.status(404).send(error);
    }
})

//delete the student by id
router.delete("/students/:id", async(req, res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        
        if (!req.params.id) {
        return res.status(400).send();
        }

        res.send(deleteStudent);

    }catch(err){
        res.status(500).send(err);
    } 

})

module.exports = router;