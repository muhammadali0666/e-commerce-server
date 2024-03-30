const Router = require("express")
const {addProduct, getProducts, deleteProduct} = require("../controller/product_ctr")

const productRouter = Router()

productRouter.post("/add_product", addProduct)
productRouter.get("/all_product", getProducts)
productRouter.delete("/delete_product/:id", deleteProduct)

module.exports = productRouter