const mongoose = require("mongoose");

const contactschema =mongoose.Schema({

    name :{
        type : String,
    },

    email : {
        type : String,
    },
    subject :{
        type : String,
    },
    message :{
        type : String,
    },
});

module.exports = mongoose.model("contact",contactschema); 