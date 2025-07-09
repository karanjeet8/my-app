import React, { useEffect, useState } from "react";
import "./Styles.css";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database } from "../Firebase";

const DepositHistory = () => {
  const [deposits, setDeposits] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;

        // Fetch user-specific deposits from Realtime DB
        const depositRef = ref(database, "deposits");
        onValue(depositRef, (snapshot) => {
          const data = snapshot.val();
          const filteredDeposits = [];

          for (let key in data) {
            if (data[key].userEmail === userEmail) {
              filteredDeposits.push(data[key]);
            }
          }

          const sortedDeposits = filteredDeposits
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

          setDeposits(sortedDeposits);
        });

        // Load balance from localStorage
        const storedBalance = parseFloat(localStorage.getItem("balance")) || 0;
        setBalance(storedBalance.toFixed(2));
      } else {
        alert("You must be logged in to view deposit history.");
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="deposit-history-container">
      {/* ✅ Floating Back Button */}
      <button className="back-btn-floating" onClick={() => window.history.back()}>
        ←
      </button>

      <h2 className="deposit-title">💼 Deposit History</h2>

      <div className="balance-summary">
        Current Balance: <strong>{balance} USDT</strong>
      </div>

      {deposits.length === 0 ? (
        <p className="no-record">No deposits found.</p>
      ) : (
        <div className="deposit-list">
          {deposits.map((deposit) => (
            <div key={deposit.id} className="deposit-card">
              <div><strong>Amount:</strong> ${deposit.amount}</div>
              <div><strong>Method:</strong> {deposit.method}</div>
              <div><strong>Txn ID:</strong> {deposit.id}</div>
              <div><strong>Time:</strong> {new Date(deposit.timestamp).toLocaleString()}</div>
              <div className={`status ${deposit.status.toLowerCase()}`}>
                <strong>Status:</strong> {deposit.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepositHistory;
