const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
	{
		companyName: { type: String },
		companyAddress: { type: String },
		serviceType: { type: String },
		price: {type: String },
		discPrice: { type: String },
		image: { type: String },
		phone: { type: String },
		time: { type: String }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newService = new mongoose.model("service", serviceSchema, "service");
module.exports = newService;
