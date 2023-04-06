const Joi = require('joi')
const enums = require("../utils/enums.json")

module.exports = {

    validatation4signup: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            phone: Joi.any(),
            password: Joi.string().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4login: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updateuser: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string(),
            address: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            pincode: Joi.number().allow(null, ""),
            country: Joi.string(),
            phone: Joi.number().allow(null, ""),
            image: Joi.string()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4forgotpass: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4verifyOTP: (req, res, next) => {
        let schema = Joi.object().keys({
            otp: Joi.number().required(),
            email: Joi.string().email().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4verifypassword: (req, res, next) => {
        let schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email().required()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4changepassword: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            oldPassword: Joi.string().required(),
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addcategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addsubcategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            categoryId: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updatesubcategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updatecategory: (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string()
        });

        let { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4createvendor: (req, res, next) => {
        let schema = Joi.object().keys({
            bankName: Joi.string().required(),
            accountNumber: Joi.number().required(),
            ifscCode: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4loginadmin: (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addProduct: (req, res, next) => {
        let schema = Joi.object().keys({
            categoryId: Joi.string().required(),
            subCategoryId: Joi.string().required(),
            vendorPhone: Joi.number().required(),
            propertyName: Joi.string().required(),
            propertyType: Joi.string(),
            propertyArea: Joi.string().required(),
            propertyAddress: Joi.string().required(),
            propertyCity: Joi.string().required(),
            propertyImage: Joi.string().required(),
            propertyState: Joi.string().required(),
            propertyFloor: Joi.number().allow(null, ""),
            propertyOldYear: Joi.string().allow(null, ""),
            propertyAvailableFrom: Joi.date().required(),
            propertyAgreement: Joi.string().required(),
            isFurnished: Joi.boolean().required(),
            isParking: Joi.boolean().required(),
            price: Joi.string().required(),
            description: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updateProduct: (req, res, next) => {
        let schema = Joi.object().keys({
            vendorPhone: Joi.number(),
            propertyName: Joi.string(),
            propertyType: Joi.string(),
            propertyArea: Joi.string(),
            propertyAddress: Joi.string(),
            propertyCity: Joi.string(),
            propertyImage: Joi.string(),
            propertyState: Joi.string(),
            propertyFloor: Joi.number(),
            propertyOldYear: Joi.string(),
            propertyAvailableFrom: Joi.date(),
            propertyAgreement: Joi.string(),
            isFurnished: Joi.boolean(),
            isParking: Joi.boolean(),
            price: Joi.string(),
            description: Joi.string(),
            status: Joi.string()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validate4productStatus: (req, res, next) => {
        let schema = Joi.object().keys({
            id: Joi.string().required(),
            status: Joi.string().required()
        });

        let { error } = schema.validate(req.query);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addBlog: (req, res, next) => {
        let schema = Joi.object().keys({
            title: Joi.string().required(),
            desc: Joi.string().required(),
            image: Joi.string().required(),
            author: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updateBlog: (req, res, next) => {
        let schema = Joi.object().keys({
            title: Joi.string(),
            desc: Joi.string(),
            image: Joi.string(),
            author:Joi.string()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4addservice: async (req, res, next) => {
        let schema = Joi.object().keys({
            companyName: Joi.string().required(),
            companyAddress: Joi.string().required(),
            serviceType: Joi.string().required(),
            image: Joi.string().required(),
            time: Joi.string().required(),
            price: Joi.string().required(),
            discPrice: Joi.string().required(),
            phone: Joi.string().required()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validatation4updateservice: async (req, res, next) => {
        let schema = Joi.object().keys({
            companyName: Joi.string(),
            companyAddress: Joi.string(),
            serviceType: Joi.string(),
            image: Joi.string(),
            time: Joi.string(),
            price: Joi.string(),
            discPrice: Joi.string(),
            phone: Joi.string()
        });

        let { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    }

}