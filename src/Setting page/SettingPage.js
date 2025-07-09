import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h2>Setting</h2>
      </div>

      <div className="settings-list">
        <div className="settings-item" onClick={() => navigate("/lpassword")}>
          <div className="icon purple">🔒</div>
          <span>Log In Password</span>
        </div>
        <div className="settings-item" onClick={() => navigate("/wpassword")}>
          <div className="icon teal">🔐</div>
          <span>Withdrawal Password</span>
        </div>
        <div className="settings-item" onClick={() => navigate("/wmethod")}>
          <div className="icon orange">💳</div>
          <span>Withdrawal Method</span>
        </div>
        <div className="settings-item" onClick={() => navigate("/login")}>
          <div className="icon green">🚪</div>
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
