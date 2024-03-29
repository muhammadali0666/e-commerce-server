const {Auth} = require("../Model")

Auth.sync({force: false})


const register = async (req, res) => {
  res.send("auth")
}


module.exports = {
  register
}