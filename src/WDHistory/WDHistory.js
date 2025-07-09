// File: BalanceHistory.js
import React, { useState, useEffect } from "react";
import "./Styles.css";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, database } from "../Firebase";

const BalanceHistory = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async (uid) => {
      try {
        const depositRef = ref(database, `deposits/${uid}`);
        const depositSnap = await get(depositRef);
        const deposits = [];

        if (depositSnap.exists()) {
          const data = depositSnap.val();
          for (const key in data) {
            deposits.push({
              type: "deposit",
              label: data[key].label || "Deposit",
              amount: parseFloat(data[key].amount),
              time: data[key].time || data[key].timestamp || "Unknown",
            });
          }
        }

        const withdrawRef = ref(database, `withdrawals`);
        const withdrawSnap = await get(withdrawRef);
        const withdrawals = [];

        if (withdrawSnap.exists()) {
          const data = withdrawSnap.val();
          for (const key in data) {
            const item = data[key];
            if (item.userId === uid) {
              withdrawals.push({
                type: "withdraw",
                label: "Withdraw money",
                amount: -parseFloat(item.amount),
                time: item.timestamp || "Unknown",
              });
            }
          }
        }

        const allTx = [...deposits, ...withdrawals].sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        );

        setTransactions(allTx);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) fetchData(user.uid);
      else {
        alert("Please log in to view balance history.");
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredTransactions =
    selectedTab === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === selectedTab);

  return (
    <div className="history-container">
      {/* 🟡 Floating Back Button */}
      <button className="back-btn-floating" onClick={() => window.history.back()}>
        ←
      </button>

      <h2 className="history-title">Balance Information</h2>

      <div className="tab-buttons">
        {["all", "deposit", "withdraw"].map((tab) => (
          <button
            key={tab}
            className={selectedTab === tab ? "tab active" : "tab"}
            onClick={() => setSelectedTab(tab)}
          >
            {tab === "all" ? "All" : tab === "deposit" ? "Deposit" : "Withdraw money"}
          </button>
        ))}
      </div>

      <div className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <p className="no-tx-msg">No transactions found.</p>
        ) : (
          filteredTransactions.map((tx, index) => (
            <div key={index} className={`transaction-card ${tx.type}`}>
              <div className="icon-box">{tx.type === "deposit" ? "↑" : "↓"}</div>
              <div className="tx-details">
                <div className="tx-label">{tx.label}</div>
                <div className="tx-time">{tx.time}</div>
              </div>
              <div className={`tx-amount ${tx.amount < 0 ? "negative" : "positive"}`}>
                {tx.amount < 0 ? "" : "+"}
                {Math.abs(tx.amount).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BalanceHistory;
