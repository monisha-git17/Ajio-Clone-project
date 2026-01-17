const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    // ✅ check user in DB
    let user = await User.findOne({ mobile });

    let isNewUser = false;

    // ✅ if not found -> create new user
    if (!user) {
      isNewUser = true;
      user = new User({
        mobile,
        role: "buyer",   // default role
        isProfileComplete: false,
      });
    }

    // ✅ generate 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // ✅ store OTP in DB
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    console.log(`OTP for ${mobile} = ${otp}`);

    return res.json({
      message: "OTP sent successfully ✅",
      isNewUser,
      mobile,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});


// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ clear otp after verify
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.json({
      message: "OTP Verified ✅",
      role: user.role,
      isProfileComplete: user.isProfileComplete,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});
// ✅ Setup Account (New user details save)
router.post("/setup-account", async (req, res) => {
  try {
    const { mobile, gender, name, email, inviteCode } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Save details
    user.gender = gender;
    user.name = name;
    user.email = email;
    user.inviteCode = inviteCode;
    user.isProfileComplete = true;

    await user.save();

    return res.json({
      message: "Account setup done ✅",
      role: user.role,
      isProfileComplete: user.isProfileComplete,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
