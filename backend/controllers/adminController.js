const { users } = require("./authController");

// ✅ pending vendors list
const getPendingVendors = (req, res) => {
  const pending = users.filter((u) => u.role === "vendor" && u.isApproved === false);

  return res.json({ success: true, vendors: pending });
};

// ✅ approve vendor
const approveVendor = (req, res) => {
  const { id } = req.params;

  const vendor = users.find((u) => u.id === Number(id) && u.role === "vendor");

  if (!vendor) {
    return res.status(404).json({ success: false, message: "Vendor not found" });
  }

  vendor.isApproved = true;

  return res.json({ success: true, message: "Vendor Approved ✅", vendor });
};

module.exports = { getPendingVendors, approveVendor };
