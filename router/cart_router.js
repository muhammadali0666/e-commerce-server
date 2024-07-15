const { Router } = require("express");
const { cart } = require("../controller/cart_ctr");
const requireAuth = require("../middleware/authMiddleware");

const cartRouter = Router();

cartRouter.post("/cart", requireAuth, cart);

module.exports = cartRouter;
