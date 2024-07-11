const mongoose = require("mongoose");
require("dotenv").config()

async function connectDb() {
  try {
     mongoose.connect(process.env.DB_PASSWORD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() =>console.log('Connected...'))
     .catch(err => console.log(err))
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = connectDb;
