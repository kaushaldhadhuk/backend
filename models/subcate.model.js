const mongoose = require('mongoose');

const SubcateSchema = mongoose.Schema({

    s_c_name :{type : String},
    c_id: {
        type :mongoose.Schema.Types.ObjectId,
        ref: "categories"
    }
})

module.exports=mongoose.model("subcategories",SubcateSchema);