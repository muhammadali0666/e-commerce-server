const jwt = require("jsonwebtoken");

async function requireAdmin(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      throw BaseError.BadRequest("A token is required for authentication")
    }
    try {
      const decoded = jwt.verify(token, process.env.SEKRET_KEY);
      if (!decoded) {
        throw BaseError.BadRequest("Token not active")
      }
      acceptVariable = decoded;
    } catch (error) {
      throw BaseError.BadRequest("Invalid token and try login or register again")
    }
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = requireAdmin;
