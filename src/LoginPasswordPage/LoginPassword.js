import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const ChangeLoginPassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    const storedPassword = localStorage.getItem("login-password") || "";

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (storedPassword && currentPassword !== storedPassword) {
      alert("Current password is incorrect.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    localStorage.setItem("login-password", newPassword);
    alert("Login password updated successfully!");
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="login-pass-container">
      <div className="header-with-back">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <h2>🔑 Change Login Password</h2>
      </div>

      <input
        type="password"
        className="input-field"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        className="input-field"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        type="password"
        className="input-field"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="save-button" onClick={handleSave}>
        💾 Save Password
      </button>
    </div>
  );
};

export default ChangeLoginPassword;
