import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const WithdrawPage = () => {
  const navigate = useNavigate();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawPassword, setWithdrawPassword] = useState("");

  const handleWithdraw = () => {
    const savedPassword = localStorage.getItem("withdraw-password");

    if (!withdrawPassword) {
      alert("Please enter withdrawal password.");
      return;
    }

    if (withdrawPassword !== savedPassword) {
      alert("Incorrect withdrawal password.");
      return;
    }

    if (!withdrawAmount || isNaN(withdrawAmount) || parseFloat(withdrawAmount) <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }

    // ✅ Proceed with withdrawal logic
    alert(`Withdrawing ₹${withdrawAmount} successfully!`);
    // Optionally navigate or reset fields
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Money</h2>

      <input
        type="number"
        className="input-field"
        placeholder="Enter Amount"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />

      <input
        type="password"
        className="input-field"
        placeholder="Enter Withdrawal Password"
        value={withdrawPassword}
        onChange={(e) => setWithdrawPassword(e.target.value)}
      />

      <button className="withdraw-button" onClick={handleWithdraw}>
        💸 Withdraw
      </button>
    </div>
  );
};

export default WithdrawPage;
