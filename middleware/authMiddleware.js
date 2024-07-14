const jwt = require("jsonwebtoken");
const User = require("../Model");

async function requireAuth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.SEKRET_KEY);
      acceptVariable = decoded;
      // const admin = await Users.findOne({ where: { email: email } });
      // req.isAdmin = admin.rows[0].role;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;
