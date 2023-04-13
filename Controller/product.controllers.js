const productSchema = require("../Models/product.model");
const categorySchema = require("../Models/catagory.model");
const orderSchema = require("../Models/order.model");
const subcategorySchema = require("../Models/subcatagory.model");
const messages = require("../utils/messages.json");
const enums = require("../utils/enums.json");
const ObjectId = require("mongoose").Types.ObjectId
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
require("dotenv").config()

module.exports = {

    addProduct: async (req, res) => {
        try {
            const category = await categorySchema.findById({ _id: req.body.categoryId })
            const subcategory = await subcategorySchema.findById({ _id: req.body.subCategoryId })
            if (!category || !subcategory) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.NOT_FOUND });
            }

            const create = await productSchema.create({
                ...req.body,
                vendorId: req.user._id
            })
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.PRODUCT_ADDED, create });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getProduct: async (req, res) => {
        try {
            const role = req.user.role.role
            let criteria = {}
            if (role === "superAdmin") {
                if (req.query.status == 'Rejected') {
                    criteria = { status: "Rejected" }
                } else if (req.query.status == 'Approved') {
                    criteria = { status: "Approved" }
                } else {
                    criteria = { status: "Pending" }
                }
            } else if (role === "vendor") {
                if (req.query.id) {
                    if (req.query.status == 'Rejected') {
                        criteria = { status: "Rejected" }
                    } else if (req.query.status == 'Approved') {
                        criteria = { status: "Approved" }
                    } else {
                        criteria = { status: "Pending" }
                    }
                    criteria = { ...criteria, vendorId: new ObjectId(req.query.id) }
                } else {
                    criteria = { isSold: false, status: "Approved", vendorId: { $ne: req.user._id } }
                }
            } else if (role === "user") {
                criteria = { isSold: false, status: "Approved", vendorId: { $ne: req.user._id } }
            }
            let sort = { createdAt: -1 }
            if (req.query.filter == "true") sort = { price: 1 }
            if (req.query.filter == "false") sort = { price: -1 }
            if (req.query.letter != "null") criteria = { ...criteria, propertyCity: { $regex: req.query.letter, $options: 'i' } }
            console.log(criteria, "criteria")
            const getProduct = await productSchema.aggregate([
                {
                    '$lookup': {
                        'from': 'category',
                        'localField': 'categoryId',
                        'foreignField': '_id',
                        'as': 'categoryId'
                    }
                }, {
                    '$unwind': {
                        'path': '$categoryId',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'subCategory',
                        'localField': 'subCategoryId',
                        'foreignField': '_id',
                        'as': 'subCategoryId'
                    }
                }, {
                    '$unwind': {
                        'path': '$subCategoryId',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$match': criteria
                }, {
                    '$sort': sort
                }
            ])
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, product: getProduct });
        } catch (error) {
            console.log(error)
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getUserProduct: async (req, res) => {
        try {
            let criteria = { isSold: false, status: "Approved" }
            if (req.query.letter != "null") criteria = { ...criteria, propertyCity: { $regex: req.query.letter, $options: 'i' } }
            let sort = { createdAt: -1 }
            if (req.query.filter == "true") sort = { price: 1 }
            if (req.query.filter == "false") sort = { price: -1 }
            const getProduct = await productSchema.aggregate([
                {
                    '$lookup': {
                        'from': 'category',
                        'localField': 'categoryId',
                        'foreignField': '_id',
                        'as': 'categoryId'
                    }
                }, {
                    '$unwind': {
                        'path': '$categoryId',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'subCategory',
                        'localField': 'subCategoryId',
                        'foreignField': '_id',
                        'as': 'subCategoryId'
                    }
                }, {
                    '$unwind': {
                        'path': '$subCategoryId',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$match': criteria
                }, {
                    '$sort': sort
                }
            ])
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, product: getProduct });
        } catch (error) {
            console.log(error)
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getProductById: async (req, res) => {
        try {
            const product = await productSchema.findById(req.query.id)
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, product: product });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id } = req.query
            const updateProduct = await productSchema.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            )
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, product: updateProduct });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await productSchema.findByidAndDelete(req.query.id)
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, product });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    updateProductStatus: async (req, res) => {
        const { id, status } = req.query
        const product = await productSchema.findById(id)
        if (!product) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: messages.PRODUCT_NOT_FOUND });
        }
        try {
            const updateProductStatus = await productSchema.findByIdAndUpdate(
                id,
                { $set: { status: status } },
                { new: true }
            )
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, product: updateProductStatus });
        } catch (error) {
            console.log(error)
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    buyProduct: async (req, res) => {
        console.log(req.body)
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: req.body.companyName,
                                images: [req.body.image]
                            },
                            unit_amount: parseInt(req.body.price - req.body.discPrice) * 100,
                        },
                        quantity: 1,
                    },
                ],
                shipping_address_collection: { allowed_countries: ['IN'] },
                shipping_options: [
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: { amount: 0, currency: 'inr' },
                            display_name: 'Free service',
                            delivery_estimate: {
                                minimum: { unit: 'business_day', value: 2 },
                                maximum: { unit: 'business_day', value: 3 },
                            },
                        },
                    },
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: { amount: 5000, currency: 'inr' },
                            display_name: 'Fastest service',
                            delivery_estimate: {
                                minimum: { unit: 'business_day', value: 1 },
                                maximum: { unit: 'business_day', value: 1 },
                            },
                        },
                    },
                ],
                phone_number_collection: {
                    enabled: true
                },
                mode: 'payment',
                success_url: `http://localhost:3000/checkoutSuccess?id=${req.body._id}`,
                cancel_url: 'http://localhost:3000/Addtocart',
            });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, data: session.url });
        } catch (error) {
            console.log(error)
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: true, message: error.message });
        }
    },
    orderSuccess: async (req, res) => {
        try {
            await orderSchema.create({
                userId: req.user._id,
                serviceId: new ObjectId(req.query.id)
            })

            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUCCESS });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getOrder:async (req, res) => {
        try {
			const role = req.user.role.role
			let criteria = { userId: req.user._id }
			if (role == "superAdmin") criteria = {}
			const getOrder = await orderSchema.aggregate([
				{ $match: criteria },
				{
					$lookup: {
						from: "service",
						localField: "serviceId",
						foreignField: "_id",
						as: "serviceId",
					},
				},
				{
					$unwind: {
						path: "$serviceId",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "user",
						localField: "userId",
						foreignField: "_id",
						as: "userId",
					},
				},
				{
					$unwind: {
						path: "$userId",
						preserveNullAndEmptyArrays: true,
					},
				}
			])
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.SUCCESS, getOrder: getOrder });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
    }

}