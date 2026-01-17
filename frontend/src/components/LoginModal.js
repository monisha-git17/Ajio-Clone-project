import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ closeModal }) => {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (mobile.length !== 10) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });

    const data = await res.json();

    alert(data.message); // ✅ popup msg: OTP sent

    closeModal();

    if (data.isNewUser) {
      navigate("/setup-account", { state: { mobile } });
    } else {
      navigate("/otp", { state: { mobile } });
    }
  };

  return (
    <div className="loginOverlay" onClick={closeModal}>
      <div className="loginBox" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={closeModal}>
          ×
        </button>

        <h2 className="loginTitle">Welcome to AJIO</h2>

        <label className="loginLabel">Enter Mobile Number *</label>

        <input
          type="text"
          className="loginInput"
          placeholder=""
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          maxLength={10}
        />

        <button className="continueBtn" onClick={handleContinue}>
          CONTINUE
        </button>

        <p className="termsText">
          By Signing In, I agree to{" "}
          <span className="linkText">Terms & Conditions</span> and{" "}
          <span className="linkText">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
