const mongoose = require('mongoose')

const pmediaSchema = mongoose.Schema({
    
    p_id :{
        type : int
    },
    
    url:{
        type : string
    },
    type :{
        type : Boolean
    }
      
})
module.exports = mongoose.model('pmedia', userSchema);