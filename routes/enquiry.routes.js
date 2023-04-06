const express = require("express")
const router = express.Router()
const { authUser, authAdmin } = require("../middlewere/auth")
const enquiryController = require("../Controller/enquiry.controllers")

router.post("/addEnquiry", authUser, enquiryController.addEnquiry)
router.get("/getEnquiry", enquiryController.getEnquiry)
router.delete("/deleteEnquiry", authAdmin, enquiryController.deleteEnquiry)

module.exports = router