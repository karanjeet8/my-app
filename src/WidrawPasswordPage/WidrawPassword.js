import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const ChangeWithdrawPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Prefill from localStorage
  useEffect(() => {
    const savedPassword = localStorage.getItem("withdraw-password");
    if (savedPassword) {
      setNewPassword(savedPassword);
      setConfirmPassword(savedPassword);
    }
  }, []);

  const handleSave = () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("withdraw-password", newPassword);
    alert("Withdrawal password saved successfully!");
    navigate(-1); // Go back
  };

  return (
    <div className="withdraw-pass-container">
      <div className="header-with-back">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <h2>🔐 Update Withdrawal Password</h2>
      </div>

      <input
        type="password"
        className="input-field"
        placeholder="New Withdrawal Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        type="password"
        className="input-field"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="save-button" onClick={handleSave}>
        💾 Save Password
      </button>
    </div>
  );
};

export default ChangeWithdrawPassword;
