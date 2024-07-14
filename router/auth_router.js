const Router = require("express");
const {
  register,
  verifyCode,
  login,
  shoppingCart,
} = require("../controller/auth_ctr");
const requireAuth = require("../middleware/authMiddleware");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify_code", verifyCode);
authRouter.post("/login", login);
authRouter.post("/shopping_cart/:id", requireAuth, shoppingCart);

module.exports = authRouter;
