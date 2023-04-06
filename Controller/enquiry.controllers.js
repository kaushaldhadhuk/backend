const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")
const enquirySchema = require("../Models/enquiry.model")

module.exports = {

    addEnquiry: async (req, res) => {

        try {
            const Enquiry = await enquirySchema.create({ ...req.body, userId: req.user._id });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUCCESS, Enquiry });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }

    },
    getEnquiry: async (req, res) => {
        try {
            const Enquiry = await enquirySchema.find().sort({ "createdAt": -1 });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, Enquiry });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteEnquiry: async (req, res) => {
        let criteria = {}
        if (req.query.id) criteria = { _id: req.query.id }
        try {
            const Enquiry = await enquirySchema.deleteMany(criteria);
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUCCESS, Enquiry });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }

}