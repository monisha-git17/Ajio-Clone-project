import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OtpPage from "./pages/OtpPage";
import SetupAccount from "./pages/SetupAccount";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/setup-account" element={<SetupAccount />} />


      
    </Routes>
  );
}
