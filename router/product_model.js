const Router = require("express")
const {addProduct} = require("../controller/product_ctr")

const productRouter = Router()

productRouter.post("/add_product", addProduct)

module.exports = productRouter