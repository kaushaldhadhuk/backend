const express = require("express")
const router = express.Router()
const { authAdmin } = require("../middlewere/auth")
const superAdminController = require("../Controller/superAdmin.controllers")
const {
} = require("../utils/joi.validate")

router.get("/get-all-user", authAdmin, superAdminController.getAllUser)
router.post("/super-admin-login", superAdminController.superAdminLogin)

module.exports = router