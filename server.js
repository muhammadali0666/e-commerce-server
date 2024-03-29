const express = require("express")
const path = require("path")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000 

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
  console.log(`server is running on the ${PORT}`);
})