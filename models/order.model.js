const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "service", required: true },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newOrder = new mongoose.model("order", orderSchema, "order");
module.exports = newOrder;
