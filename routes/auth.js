const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOtp,
  forgotPassword,
  resetPassword,
  logout
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout",logout);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
