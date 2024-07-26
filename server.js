const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./router/auth_router");
const productRouter = require("./router/product_model");
const cartRouter = require("./router/cart_router");
const connectDb = require("./db/config");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.middleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

///////////////// router
connectDb();
app.use(authRouter);
app.use(productRouter);
app.use(cartRouter);

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

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`server is running on the ${PORT}`);
});
