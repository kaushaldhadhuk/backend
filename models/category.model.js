const mongoose = require("mongoose");
const categorySchema= mongoose.Schema({
    c_name: {type: String},
})

module.exports = mongoose.model("categories", categorySchema);