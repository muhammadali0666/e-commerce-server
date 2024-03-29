const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./router/auth_router");
const productRouter = require("./router/product_model")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

///////////////// router
app.use(authRouter);
app.use(productRouter)

///////////////// image storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({storage: storage})

app.use("/images", express.static("upload/images"))

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`
  })
})

app.listen(PORT, () => {
  console.log(`server is running on the ${PORT}`);
});
