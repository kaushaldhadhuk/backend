const serviceSchema = require("../Models/services.model");
const messages = require("../utils/messages.json");
const enums = require("../utils/enums.json");

module.exports = {

    addservice: async (req, res) => {
        try {
            const findService = await serviceSchema.findOne({ serviceType: req.body.serviceType, companyName: req.body.companyName })
            if (findService) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.SERVICE_EXISTS });
            }

            await serviceSchema.create(req.body)
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SERVICE_ADDED });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getservice: async (req, res) => {

        try {
            const service = await serviceSchema.find().sort({ "createdAt": -1 })
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, service: service });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    updateService: async (req, res) => {
        const { id } = req.query

        try {

            const findService = await serviceSchema.findById(id)
            if (!findService) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.SERVICE_NOT_FOUND });
            }
            await serviceSchema.findByIdAndUpdate(
                id,
                req.body
            )
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SERVICE_UPDATED });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteservice: async (req, res) => {
        const { id } = req.query

        try {
            const findservice = await serviceSchema.findById(id)
            if (!findservice) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.SERVICE_NOT_FOUND });
            }

            await serviceSchema.findByIdAndDelete(id)
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.SERVICE_DELETED });
        } catch (error) {
            console.log(error)
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }

}