const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    optVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    otpExpiresIn: {
      type: Date,
    },
    passwordResetToken:{
      type:String,
    },
    passwordResetExpires:{
      type:Date,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
