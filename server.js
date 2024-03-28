const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 4000 

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
  console.log(`server is running on the ${PORT}`);
})