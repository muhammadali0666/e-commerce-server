const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: String,
      quantity: Number,
      name: String,
      new_price: String,
      old_price: String,
      image: String,
      category: String,
    },
  ],
  active: { type: Boolean, default: true },
  modifiedOn: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart