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
router.get("/getUserProduct", productController.getUserProduct)
router.get("/getProductById", authVendor, productController.getProductById)
router.put("/update-product", authVendor, validatation4updateProduct, productController.updateProduct)
router.delete("/delete-product", authAdmin, productController.deleteProduct)
router.post("/buy-product", productController.buyProduct)
router.post("/order-success", authUser, productController.orderSuccess)
router.get("/get-order", authUser, productController.getOrder)

module.exports = router
