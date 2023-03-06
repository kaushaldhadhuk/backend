const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    
    description :{
        type : String
    },
    
    u_id:{
        type : int
    },
    P_id :{
        type : int
    },
    rating:{
        type : int
    }

    
})
module.exports = mongoose.model('review', userSchema);