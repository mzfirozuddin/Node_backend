const mongoose = require("mongoose");

// connection creation
mongoose.connect("mongodb://localhost:27017/ytchannel")
.then( ()=>console.log("Connection Sucessful..."))
.catch( (err)=> console.log(err));

// schema creation
const playlistSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    type : String,
    videos : Number,
    author : String,
    active : Boolean,
    date : {
        type : Date,
        default : Date.now
    }

})

// model creation
const Playlist = new mongoose.model("Playlist",playlistSchema); // It is like a Class

// Insert Document to DB
const createDocument = async () =>{
    try{
        const expressPlaylist = new Playlist({
            name : "Express JS",
            type : "Back End",
            videos : 20,
            author : "Firoz",
            active : true
        })
        const mongodbPlaylist = new Playlist({
            name : "Database",
            type : "Back End",
            videos : 5,
            author : "Firoz",
            active : true
        })
        const mongoosePlaylist = new Playlist({
            name : "Database",
            type : "Back End",
            videos : 10,
            author : "Firoz",
            active : true
        })

        const result = await Playlist.insertMany([expressPlaylist,mongodbPlaylist,mongoosePlaylist]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

createDocument();