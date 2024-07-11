const Router = require("express")
const {register, verifyCode, login} = require("../controller/auth_ctr")

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/verify_code", verifyCode)
authRouter.post("/login", login)

module.exports = authRouter