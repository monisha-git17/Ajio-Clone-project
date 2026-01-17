import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function SetupAccount() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get mobile from state
  const mobile = location.state?.mobile;

  const [gender, setGender] = useState("female");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSendOtp = async () => {
    if (!agree) {
      alert("Please accept Terms and Conditions");
      return;
    }
    if (!name || !email) {
      alert("Fill all details");
      return;
    }

    try {
      // ✅ Save profile in backend
      const res = await fetch("http://localhost:5000/api/auth/setup-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile,
          gender,
          name,
          email,
          inviteCode,
        }),
      });

      const data = await res.json();

      alert(data.message);

      // ✅ after setup redirect based on role
      if (data.role === "buyer") navigate("/buyer");
      if (data.role === "vendor") navigate("/vendor");
      if (data.role === "admin") navigate("/admin");
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="ajioOverlay">
      <div className="ajioModal">
        <div className="ajioBackRow" onClick={() => navigate("/")}>
          ← Back
        </div>

        <div className="ajioClose" onClick={() => navigate("/")}>
          ×
        </div>

        <h1 className="ajioTitle">Welcome to AJIO</h1>
        <p className="ajioSubText">Please set up your account</p>

        <div className="ajioMobileRow">
          <span>{mobile}</span>
          <span className="ajioEdit" onClick={() => navigate("/")}>
            Edit
          </span>
        </div>

        <p style={{ fontSize: "13px", color: "#666", marginTop: "-8px" }}>
          OTP will be sent to your number for verification.
        </p>

        <div className="ajioRadioRow">
          <span style={{ color: "#666" }}>Gender:</span>
          <label>
            <input
              type="radio"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
            Male
          </label>
        </div>

        <input
          className="ajioInput"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          className="ajioInput"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          className="ajioInput"
          placeholder="Invite code (optional)"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />

        <div className="ajioCheckRow">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <span>
            By Signing Up, I agree to{" "}
            <Link to="/terms" style={{ color: "#0c76b7", fontWeight: "600" }}>
              Terms and Conditions.
            </Link>
          </span>
        </div>

        <button className="ajioBtn" onClick={handleSendOtp}>
          SEND OTP
        </button>
      </div>
    </div>
  );
}
