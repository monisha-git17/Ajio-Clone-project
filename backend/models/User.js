const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },

  role: { type: String, enum: ["buyer", "vendor", "admin"], default: "buyer" },

  otp: { type: String },
  otpExpiry: { type: Number },

  // ✅ new fields for setup account page
  gender: { type: String },
  name: { type: String },
  email: { type: String },
  inviteCode: { type: String },

  isProfileComplete: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
