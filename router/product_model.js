const Router = require("express")
const {addProduct, getProducts, deleteProduct, getLatestProduct} = require("../controller/product_ctr")

const productRouter = Router()

productRouter.post("/add_product", addProduct)
productRouter.get("/all_product", getProducts)
productRouter.get("/latest_products", getLatestProduct)
productRouter.delete("/delete_product/:id", deleteProduct)

module.exports = productRouter