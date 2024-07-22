const Router = require("express")
const {addProduct, getProducts, deleteProduct, getLatestProduct, getMenProducts} = require("../controller/product_ctr")

const productRouter = Router()

productRouter.post("/add_product", addProduct)
productRouter.get("/all_products", getProducts)
productRouter.get("/men_products", getMenProducts)
productRouter.get("/latest_products", getLatestProduct)
productRouter.delete("/delete_product/:id", deleteProduct)

module.exports = productRouter