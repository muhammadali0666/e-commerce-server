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
    default: "user"
  },
  verify: {
    type: String
  }
});

const User = mongoose.model("User", Auth);

module.exports = User;
