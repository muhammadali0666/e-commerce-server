const Router = require("express");
const {
  register,
  verifyCode,
  login,
  shoppingCart,
  getShoppingCart,
} = require("../controller/auth_ctr");
const requireAuth = require("../middleware/authMiddleware");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify_code", verifyCode);
authRouter.post("/login", login);
authRouter.post("/shopping_cart/:id", requireAuth, shoppingCart);
authRouter.get("/get_shopping_cart", requireAuth, getShoppingCart);

module.exports = authRouter;
