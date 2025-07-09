import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";
import { auth, database } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";

const WithdrawMethod = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);

        const methodRef = ref(database, `users/${user.uid}/withdrawMethod`);
        const snapshot = await get(methodRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setSelectedMethod(data.method || "");
          setAccountDetails(data.details || "");
        } else {
          // fallback to localStorage
          const savedMethod = localStorage.getItem("withdraw-method") || "";
          const savedDetails = localStorage.getItem("withdraw-details") || "";
          setSelectedMethod(savedMethod);
          setAccountDetails(savedDetails);
        }
      } else {
        alert("Please login first.");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSave = async () => {
    if (!selectedMethod || !accountDetails) {
      alert("❌ Please select a method and enter account details.");
      return;
    }

    try {
      const methodRef = ref(database, `users/${userId}/withdrawMethod`);
      await set(methodRef, {
        method: selectedMethod,
        details: accountDetails,
      });

      localStorage.setItem("withdraw-method", selectedMethod);
      localStorage.setItem("withdraw-details", accountDetails);

      alert("✅ Withdrawal method saved successfully.");
    } catch (err) {
      console.error("❌ Failed to save method:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const goBack = () => navigate(-1);

  return (
    <div className="withdraw-method-container">
      <button className="back-button" onClick={goBack}>← Back</button>

      <h2>💸 Set Withdrawal Method</h2>

      <label>Select Method:</label>
      <select
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
        className="input-field"
      >
        <option value="">-- Choose Method --</option>
        <option value="USDT (TRC20)">USDT (TRC20)</option>
        <option value="PayPal">PayPal</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="UPI / PhonePe">UPI / PhonePe</option>
      </select>

      <label>
        Enter Account Info (
        {selectedMethod === "USDT (TRC20)" && "Wallet ID"}
        {selectedMethod === "PayPal" && "Email"}
        {selectedMethod === "Bank Transfer" && "Bank details"}
        {selectedMethod === "UPI / PhonePe" && "UPI ID"}
        ):
      </label>
      <input
        type="text"
        className="input-field"
        placeholder="Enter account details"
        value={accountDetails}
        onChange={(e) => setAccountDetails(e.target.value)}
      />

      <button className="save-button" onClick={handleSave}>
        💾 Save Method
      </button>

      {selectedMethod && accountDetails && (
        <div className="current-info">
          <h4>✅ Current Method:</h4>
          <p><strong>Type:</strong> {selectedMethod}</p>
          <p><strong>Details:</strong> {accountDetails}</p>
        </div>
      )}
    </div>
  );
};

export default WithdrawMethod;
