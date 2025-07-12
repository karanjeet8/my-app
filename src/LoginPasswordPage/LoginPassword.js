import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import "./Styles.css";

const ChangeLoginPassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    if (!user || !user.email) {
      alert("No user logged in.");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      // Step 1: Re-authenticate the user
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update password
      await updatePassword(user, newPassword);

      alert("✅ Password changed successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.code === "auth/wrong-password") {
        alert("❌ Current password is incorrect.");
      } else {
        alert("❌ Failed to update password. Please try again.");
      }
    }
  };

  return (
    <div className="login-pass-container">
      <div className="header-with-back">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h2 className="header-title">Change Login Password</h2>
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
