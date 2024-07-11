const Router = require("express")
const {register, verifyCode} = require("../controller/auth_ctr")

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/verify_code", verifyCode)

module.exports = authRouter