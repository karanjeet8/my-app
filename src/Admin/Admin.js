// File: AdminPanel.js
import React, { useEffect, useState } from "react";
import "./Styles.css";

const SHEET_API = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"; // Replace with your deployed Google Apps Script URL

const AdminPanel = () => {
  const [vipData, setVipData] = useState([]);

  useEffect(() => {
    fetch(SHEET_API)
      .then((res) => res.json())
      .then((data) => setVipData(data))
      .catch((err) => console.error("Failed to fetch VIP data", err));
  }, []);

  const handleChange = (index, key, value) => {
    const updated = [...vipData];
    updated[index][key] = value;
    setVipData(updated);
  };

  const handleUpgrade = () => {
    fetch(SHEET_API, {
      method: "POST",
      body: JSON.stringify(vipData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((res) => alert("✅ VIP Data Updated: " + res))
      .catch((err) => alert("❌ Failed to update: " + err));
  };

  return (
    <div className="admin-panel">
      <h2>🛠️ Admin Panel</h2>
      {vipData.map((vip, index) => (
        <div key={index} className="vip-card">
          <h3>{vip.level}</h3>
          <input
            value={vip.percent}
            onChange={(e) => handleChange(index, "percent", e.target.value)}
            placeholder="Percent"
          />
          <input
            value={vip.unlocked}
            onChange={(e) => handleChange(index, "unlocked", e.target.value)}
            placeholder="Unlocked Amount"
          />
          <input
            value={vip.orders}
            onChange={(e) => handleChange(index, "orders", e.target.value)}
            placeholder="Orders"
          />
          <input
            value={vip.rate}
            onChange={(e) => handleChange(index, "rate", e.target.value)}
            placeholder="Rate"
          />
          <input
            value={vip.image}
            onChange={(e) => handleChange(index, "image", e.target.value)}
            placeholder="Image URL"
          />
        </div>
      ))}
      <button className="upgrade-button" onClick={handleUpgrade}>
        🚀 Upgrade
      </button>
    </div>
  );
};

export default AdminPanel;