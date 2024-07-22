const Router = require("express")
const {addProduct, getProducts, deleteProduct, getLatestProduct, getMenProducts, getWomenProducts, getKidsProducts} = require("../controller/product_ctr")

const productRouter = Router()

productRouter.post("/add_product", addProduct)
productRouter.get("/all_products", getProducts)
productRouter.get("/men_products", getMenProducts)
productRouter.get("/women_products", getWomenProducts)
productRouter.get("/kids_products", getKidsProducts)
productRouter.get("/latest_products", getLatestProduct)
productRouter.delete("/delete_product/:id", deleteProduct)

module.exports = productRouter