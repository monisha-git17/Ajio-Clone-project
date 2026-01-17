import React from "react";
import NavbarAjio from "../components/NavbarAjio";

export default function Login() {
  return (
    <>
      <NavbarAjio />

      <div style={{ padding: "60px 80px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>Login Page</h1>
        <p style={{ marginBottom: "25px" }}>This is AJIO Login Page</p>

        <div style={{ width: "420px" }}>
          <input
            type="text"
            placeholder="Enter Email / Mobile"
            style={{
              width: "100%",
              padding: "14px 16px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            style={{
              width: "100%",
              padding: "14px 16px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />

          <button
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "6px",
              background: "#6c757d",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
