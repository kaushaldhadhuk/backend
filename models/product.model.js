const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
		subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "subCategory", required: true },
		vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		vendorPhone: { type: Number, required: true },
		propertyName: { type: String, required: true },
		propertyType: { type: String },
		propertyArea: { type: String, required: true },
		propertyAddress: { type: String, required: true },
		propertyCity: { type: String, required: true },
		propertyState: { type: String, required: true },
		propertyImage: [{ type: String, required: true }],
		propertyFloor: { type: Number },
		propertyOldYear: { type: Number, required: true },
		propertyAvailableFrom: { type: Date, required: true },
		propertyAgreement: { type: String, required: true },
		isFurnished: { type: Boolean, default: false },
		isParking: { type: Boolean, required: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		status: { type: String, default: "Pending" },
		isSold: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newProduct = new mongoose.model("product", productSchema, "product");
module.exports = newProduct;
