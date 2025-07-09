import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, push } from "firebase/database";
import { auth, database } from "../Firebase"; // ✅ Import auth and DB
import "./Styles.css";

const DepositPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedVip = location.state?.vip;

  const [depositAmount, setDepositAmount] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [user, setUser] = useState(null);

  const usdtWalletId = "TQK1xvU9F3mJ9vFDdSg1f5kWUJv7H6t";

  useEffect(() => {
    const storedBalance = parseFloat(localStorage.getItem("balance")) || 0;
    setCurrentBalance(storedBalance);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        alert("You must be logged in to deposit.");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid deposit amount.");
      return;
    }

    const newBalance = +(currentBalance + amount).toFixed(2);
    localStorage.setItem("balance", newBalance.toString());
    setCurrentBalance(newBalance);

    const depositRecord = {
      id: "TXN" + Date.now(),
      userId: user.uid,
      userEmail: user.email,
      amount,
      timestamp: new Date().toISOString(),
      status: "Pending",
      method: "USDT",
    };

    // ✅ Push to Firebase Realtime Database
    const depositRef = ref(database, "deposits");
    await push(depositRef, depositRecord);

    alert(`Deposit successful: ${amount.toFixed(2)} USDT`);

    navigate("/order-confirm", {
      state: {
        vip: selectedVip,
        balance: newBalance,
        deposited: amount,
      },
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(usdtWalletId);
    alert("USDT Wallet ID copied!");
  };

  return (
    <div className="app-wrapper">
      <div className="deposit-container">
        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <h2 className="deposit-heading">💰 Deposit Funds</h2>

        <div className="balance-box">
          Current Balance: <strong>{currentBalance.toFixed(2)} USDT</strong>
        </div>

        <input
          type="number"
          className="deposit-input"
          placeholder="Enter deposit amount "
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />

        {depositAmount && parseFloat(depositAmount) > 0 && (
          <div className="entered-amount">
            Amount to Deposit: <strong>{parseFloat(depositAmount).toFixed(2)} USDT</strong>
          </div>
        )}

        <div className="usdt-section">
          <p className="usdt-label">Send Money to this Wallet ID :</p>
          <div className="usdt-address">{usdtWalletId}</div>
          <button className="copy-btn" onClick={copyAddress}>
            📋 Copy Wallet ID
          </button>
          <p className="usdt-note"></p>
        </div>

        <button className="deposit-btn" onClick={handleDeposit}>
          Deposit Now
        </button>
      </div>
    </div>
  );
};

export default DepositPage;
