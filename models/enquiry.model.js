const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String },
        phone: { type: Number },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
    {
        timestamps: true,
        versionKey: false,
        autoCreate: true,
    }
);

const newEnquiry = new mongoose.model("enquiry", enquirySchema, "enquiry");
module.exports = newEnquiry;
