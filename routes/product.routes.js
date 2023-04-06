const express = require("express")
const router = express.Router()
const { authAdmin, authVendor, authUser } = require("../middlewere/auth")
const productController = require("../Controller/product.controllers")
const {
    validatation4addProduct,
    validatation4updateProduct
} = require("../utils/joi.validate")

router.post("/add-product", authVendor, validatation4addProduct, productController.addProduct)
router.get("/get-product", authUser, productController.getProduct)
router.put("/update-product", authVendor, validatation4updateProduct, productController.updateProduct)
router.delete("/delete-product", authAdmin, productController.deleteProduct)
router.post("/buy-product", productController.buyProduct)

module.exports = router
