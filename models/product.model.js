const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		animalType: { type: String, required: true },
		breedType: { type: String, required: true },
		age: { type: Number, required: true },
		weight: { type: String, required: true },
		price: { type: String, required: true },
		desc: { type: String, required: true },
		color: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		country: { type: String, required: true },
		phone: { type: String, required: true },
		frontPhoto: { type: String, required: true },
		backPhoto: { type: String, required: true },
		lumpiCertificate: { type: String, required: true },
		generalReport: { type: String, required: true },
		data: { type: Object }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newProduct = new mongoose.model("product", productSchema, "product");
module.exports = newProduct;
