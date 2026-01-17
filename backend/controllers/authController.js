// ✅ OTP store (temporary)
const otpStore = {};

// ✅ Users store in memory (temporary DB)
let users = []; 
// user format: { id, mobile, role, name, email, isApproved }

let idCounter = 1;

// ✅ SEND OTP
const sendOtp = (req, res) => {
  const { mobile } = req.body;

  if (!mobile || mobile.length !== 10) {
    return res.status(400).json({ success: false, message: "Enter valid mobile number" });
  }

// ✅ 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

  otpStore[mobile] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000, // 5 min
  };

  console.log("✅ OTP for", mobile, ":", otp);

  return res.json({ success: true, message: "OTP sent ✅", otp }); // OTP shown for testing
};

// ✅ VERIFY OTP
const verifyOtp = (req, res) => {
  const { mobile, otp, role } = req.body;

  if (!mobile || !otp || !role) {
    return res.status(400).json({ success: false, message: "mobile, otp, role required" });
  }

  const record = otpStore[mobile];

  if (!record) return res.status(400).json({ success: false, message: "OTP not found" });

  if (Date.now() > record.expires) {
    delete otpStore[mobile];
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (record.otp !== otp.toString()) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  delete otpStore[mobile];

  // ✅ check if user exists
  const user = users.find((u) => u.mobile === mobile && u.role === role);

  const isNewUser = !user;

  // ✅ Vendor approval logic
  if (user && role === "vendor" && user.isApproved === false) {
    return res.status(403).json({
      success: false,
      message: "Vendor not approved by admin ❌",
    });
  }

  return res.json({
    success: true,
    message: "OTP verified ✅",
    isNewUser,
    role,
    user: user || null,
  });
};

// ✅ SETUP ACCOUNT (new user)
const setupAccount = (req, res) => {
  const { mobile, role, name, email } = req.body;

  if (!mobile || !role || !name) {
    return res.status(400).json({ success: false, message: "mobile, role, name required" });
  }

  const existing = users.find((u) => u.mobile === mobile && u.role === role);
  if (existing) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  const newUser = {
    id: idCounter++,
    mobile,
    role,
    name,
    email,
    isApproved: role === "vendor" ? false : true,
  };

  users.push(newUser);

  return res.json({ success: true, message: "Account created ✅", user: newUser });
};

// ✅ EXPORT
module.exports = { sendOtp, verifyOtp, setupAccount, users };
