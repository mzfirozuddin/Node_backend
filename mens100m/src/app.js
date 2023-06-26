const express = require("express");
require("./db/conn");
const MensRanking = require("./models/mens");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
// We will handle post request
app.post("/mens", async (req, res)=>{
    try {
        const createMensRecord = new MensRanking(req.body);
        const insertMen = await createMensRecord.save();
        res.status(201).send(insertMen);
    } catch (error) {
        res.status(400).send(error);
    }
})

// We will handle get request
app.get("/mens", async (req, res)=>{
    try {
        const getMens = await MensRanking.find();
        res.status(200).send(getMens);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, ()=>{
    console.log(`Listening to port no ${port}..`);
})