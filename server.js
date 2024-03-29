const express = require("express")
const path = require("path")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const cors = require("cors")
const dotenv = require("dotenv")
const authRouter = require("./router/auth_router")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000 

app.use(express.json())
app.use(cors())

///////////////// router
app.use(authRouter)

app.get("/", (req, res) => {
  res.send("ok")
})

app.listen(PORT, () => {
  console.log(`server is running on the ${PORT}`);
})