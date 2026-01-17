import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ get mobile from navigation state
  const mobile = location.state?.mobile;

  const handleVerify = async () => {
    if (!mobile) {
      setError("Mobile number not found. Please login again.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Invalid OTP");
      return;
    }

    alert("OTP Verified ✅");

    // ✅ redirect based on role (example)
    if (data.role === "admin") navigate("/admin");
    else if (data.role === "vendor") navigate("/vendor");
    else navigate("/buyer");
  };

  return (
    <div className="loginOverlay">
      <div className="loginBox">
        <h2 className="loginTitle">Enter OTP</h2>

        <p style={{ marginBottom: "10px", color: "#666" }}>
          Mobile: {mobile}
        </p>

        <input
          type="text"
          className="loginInput"
          placeholder="Enter 4 digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={4}
        />

        <button className="continueBtn" onClick={handleVerify}>
          VERIFY OTP
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
}
