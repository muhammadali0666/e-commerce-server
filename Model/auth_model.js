const mongoose = require("mongoose");

const Auth = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  verify: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  products: [
    {
      productId: String,
      quantity: {
        type: Number,
        default: 0,
      },
      name: String,
      new_price: String,
      old_price: String,
      image: String,
      category: String,
    },
  ],
});

const User = mongoose.model("User", Auth);

module.exports = User;
