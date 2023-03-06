const mongoose = require('mongoose')

const vendorSchema = mongoose.Schema({
    
    gst_no :{
        type : int
    },
    
    u_id:{
        type : int
    },
    add_id :{
        type : int
    }
    
})
module.exports = mongoose.model('vendor', userSchema);