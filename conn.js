const mongoose = require('mongoose');

mongoose.set('strictQuery',true)
const db =mongoose.connect('mongodb://localhost:27017/rental',(err,db) =>{
    if(err){
        console.log("error",err);
    }
    else{
        console.log("database conected");
    }
   
})

module.exports = db;