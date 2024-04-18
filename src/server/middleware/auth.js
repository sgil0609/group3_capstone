const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from header
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    // Verify token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach user data to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = { verifyToken };
