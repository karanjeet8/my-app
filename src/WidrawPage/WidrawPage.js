// File: WithdrawPage.js
import React, { useState, useEffect } from "react";
import "./Styles.css";
import { FaCopy } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { ref, push, get } from "firebase/database";
import { auth, database } from "../Firebase";
import { useNavigate } from "react-router-dom";

const translations = {
  English: {
    title: "Withdraw money",
    balanceLabel: "Balance",
    withdrawAll: "Withdraw all",
    withdrawAmount: "Withdrawal amount",
    placeholder: "Please enter the withdrawal amount",
    infoTitle: "Withdrawal information",
    name: "Name",
    address: "Address",
    password: "Withdrawal password",
    submit: "Submit",
    changeMethod: "Change Withdrawal Method",
    successMessage: (name, id, amount) =>
      `📢 ${name} (ID: ${id}) has withdrawn ${amount} USDT.`,
  },
};

const WithdrawPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [name, setName] = useState("Loading...");
  const [address, setAddress] = useState("Loading...");
  const [userId, setUserId] = useState("");

  const language = localStorage.getItem("language") || "English";
  const t = translations[language];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid);

        try {
          const userRef = ref(database, `users/${firebaseUser.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userInfo = snapshot.val();
            setName(userInfo.name || firebaseUser.displayName || "User");

            // ✅ Fetch withdrawal method from localStorage
            const method = JSON.parse(localStorage.getItem("withdrawMethod"));
            if (method?.address) {
              setAddress(`${method.type} - ${method.address}`);
            } else {
              setAddress(userInfo.address || "N/A");
            }
          } else {
            setName(firebaseUser.displayName || "User");
            setAddress("N/A");
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          setName(firebaseUser.displayName || "User");
          setAddress("N/A");
        }

        const storedBalance = parseFloat(localStorage.getItem("balance")) || 0;
        setBalance(storedBalance);
      } else {
        alert("Please login to withdraw.");
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  const handleWithdrawAll = () => {
    setWithdrawAmount(balance.toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      alert("❌ Please enter a valid amount to withdraw.");
      return;
    }

    if (amount > balance) {
      alert("❌ Withdrawal amount exceeds available balance.");
      return;
    }

    if (!withdrawPassword || withdrawPassword.length < 4) {
      alert("❌ Please enter a valid withdrawal password.");
      return;
    }

    const newBalance = (balance - amount).toFixed(2);
    setBalance(parseFloat(newBalance));
    localStorage.setItem("balance", JSON.stringify(parseFloat(newBalance)));

    setWithdrawAmount("");
    setWithdrawPassword("");

    const withdrawalData = {
      userId,
      name,
      address,
      amount: amount.toFixed(2),
      status: "Pending",
      timestamp: new Date().toISOString(),
    };

    const withdrawalRef = ref(database, "withdrawals");
    await push(withdrawalRef, withdrawalData);

    const message = t.successMessage(name, userId, amount.toFixed(2));
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);

    alert(`✅ ${message}`);
  };

  return (
    <div className="withdraw-container">
      <div className="back-button-container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>

      <h2 className="page-title">{t.title}</h2>

      <div className="balance-card">
        <div className="balance-header">
          <span className="balance-label">{t.balanceLabel}</span>
          <FaCopy
            className="copy-icon"
            onClick={() => {
              navigator.clipboard.writeText(balance.toFixed(2));
              alert("✅ Balance copied to clipboard!");
            }}
          />
        </div>
        <div className="balance-amount">{balance.toFixed(2)}</div>
        <button className="withdraw-all-btn" onClick={handleWithdrawAll}>
          {t.withdrawAll}
        </button>
      </div>

      <div className="change-method">
        <button
          className="change-method-btn"
          onClick={() => navigate("/Wmethod")}
        >
          {t.changeMethod}
        </button>
      </div>

      <form className="withdraw-form" onSubmit={handleSubmit}>
        <label className="section-label">{t.withdrawAmount}</label>
        <input
          className="input-box"
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder={t.placeholder}
        />

        <div className="withdraw-info">
          <p><strong>{t.infoTitle}</strong></p>
          <div className="info-row">
            <span>{t.name}</span>
            <span>{name}</span>
          </div>
          <div className="info-row">
            <span>{t.address}</span>
            <span className="highlight-address">{address}</span>
          </div>
        </div>

        <label className="section-label">{t.password}</label>
        <input
          className="input-box"
          type="password"
          placeholder={t.password}
          value={withdrawPassword}
          onChange={(e) => setWithdrawPassword(e.target.value)}
        />

        <button type="submit" className="submit-btn">
          {t.submit}
        </button>
      </form>
    </div>
  );
};

export default WithdrawPage;
