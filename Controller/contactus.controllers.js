const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")
const contactSchema = require("../Models/contactus.model")

module.exports = {

    addContact: async (req, res) => {

        try {
            const contact = await contactSchema.create({ ...req.body, userId: req.user._id });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUCCESS, contact });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }

    },
    getContact: async (req, res) => {
        try {
            const contact = await contactSchema.find().sort({ "createdAt": -1 });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, contact });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteContact: async (req, res) => {
        let criteria = {}
        if (req.query.id) criteria = { _id: req.query.id }
        try {
            const contact = await contactSchema.deleteMany(criteria);
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SUCCESS, contact });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }

}