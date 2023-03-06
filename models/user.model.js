const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
    name :{
        type : String
    },
    
    email:{
        type : String
    },
    password :{
        type : String
    },
    mobile:{
        type : Number
    },
    
    // usertype:{
    //     type : String,
    //     enum:["user" , "owner" , "admin"],
    //     required:true
    // },
    // reg_date:{
    //     type: Date,
    //     default: Date.now
    // },
    // token: {
    //     type: String,
    //     required: true
    // }
    

})
module.exports = mongoose.model('user', userSchema);