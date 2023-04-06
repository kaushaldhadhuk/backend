const express = require("express")
const router = express.Router()
const { authAdmin } = require("../middlewere/auth")
const serviceController = require("../Controller/service.controllers")
const {
    validatation4addservice,
    validatation4updateservice
} = require("../utils/joi.validate")

router.post("/add-service", authAdmin, validatation4addservice, serviceController.addservice)
router.get("/get-service", serviceController.getservice)
router.put("/update-service", authAdmin, validatation4updateservice, serviceController.updateService)
router.delete("/delete-service", authAdmin, serviceController.deleteservice)

module.exports = router