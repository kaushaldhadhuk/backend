const mongoose = require('mongoose')

const offerSchema = mongoose.Schema({
    
    p_id :{
        type : int
    },
    
    discount :{
        type : int
    },
    start_date :{
        type : date
    },
    end_date :{
        type : date
    },

    offer_type : {
        type : Boolean
    },
    
    status : {
        type : Boolean
    }
})
module.exports = mongoose.model('offer', userSchema);