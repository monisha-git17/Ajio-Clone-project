const express = require("express");
const router = express.Router();

const { getPendingVendors, approveVendor } = require("../controllers/adminController");

router.get("/pending-vendors", getPendingVendors);
router.put("/approve-vendor/:id", approveVendor);

module.exports = router;
