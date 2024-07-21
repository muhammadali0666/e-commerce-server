const { Router } = require("express");
const { cart, getCarts, addQuantity, reduceTheQuantity, deleteCart } = require("../controller/cart_ctr");
const requireAuth = require("../middleware/authMiddleware");

const cartRouter = Router();

cartRouter.post("/add_cart", requireAuth, cart);
cartRouter.get("/carts_list", requireAuth, getCarts)
cartRouter.post("/add_quantity", requireAuth, addQuantity)
cartRouter.post("/reduce_quantity", requireAuth, reduceTheQuantity)
cartRouter.delete("/delete_cart", requireAuth, deleteCart)

module.exports = cartRouter;
