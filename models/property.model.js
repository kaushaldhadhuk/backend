const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
       

  c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "catagories",
  },
  s_c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcatagories",
  },
  
  rent: {
    type: Number,
  },
  city: {
    type: String,
  },
  p_desc: {
    type: String,
  },
  
  p_age : {
    type: Number,
  },
  bedroom : {
    type: Number,
  },
  size_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sizes",
  },
  bathroom : {
    type: Number,
  },
  description : {
    type : String
},
p_floor :{
    type: Number,
},

o_mono : {
    type: Number,
},
balcony :{
    type: Number,
},

deposit :{
    type: Number,
},

agreement :{
    type: Number,
}

});


    
module.exports = mongoose.model('property', propertySchema);