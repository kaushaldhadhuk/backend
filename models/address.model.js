const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    
    u_id :{
        type : int
    },
    
    city:{
        type : string
    },
    state :{
        type : String
    },
    country:{
        type : string
    },

    pincode : {
        type : int
    },
    
    addreess : {
        type : string
    },

    add_type : {
        type : string
    }

    
})
module.exports = mongoose.model('address', userSchema);