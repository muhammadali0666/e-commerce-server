const jwt = require("jsonwebtoken");

async function requireAuth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(403)
        .send({ message: "A token is required for authentication" });
    }
    try {
      const decoded = jwt.verify(token, process.env.SEKRET_KEY);
      if (!decoded) {
        return res.status(403).send({ message: "token not active" });
      }
      acceptVariable = decoded;
    } catch (err) {
      return res.status(401).send({ message: "Invalid token and try login or register again" });
    }
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;
