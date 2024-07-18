const { Router } = require("express");
const { cart, getCarts } = require("../controller/cart_ctr");
const requireAuth = require("../middleware/authMiddleware");

const cartRouter = Router();

cartRouter.post("/add_cart", requireAuth, cart);
cartRouter.get("/carts_list", requireAuth, getCarts)

module.exports = cartRouter;
