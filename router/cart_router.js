const { Router } = require("express");
const { cart, getCarts, addQuantity, reduceTheQuantity, deleteCart } = require("../controller/cart_ctr");
const requireAdmin = require("../middleware/authMiddleware");

const cartRouter = Router();

cartRouter.post("/add_cart", requireAdmin, cart);
cartRouter.get("/carts_list", requireAdmin, getCarts)
cartRouter.post("/add_quantity", requireAdmin, addQuantity)
cartRouter.post("/reduce_quantity", requireAdmin, reduceTheQuantity)
cartRouter.delete("/delete_cart", requireAdmin, deleteCart)

module.exports = cartRouter;
