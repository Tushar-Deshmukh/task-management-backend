const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const checkLogin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization token is required",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user info to the request
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      status: "failure",
      message: "Access denied. Admins only.",
    });
  }
};

module.exports = { checkLogin, isAdmin };
