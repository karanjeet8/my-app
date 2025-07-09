// File: OrderConfirm.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, push, set, getDatabase } from "firebase/database";
import { auth } from "../Firebase"; // Make sure Firebase is configured correctly
import "./Styles.css";

const OrderConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialVip = location.state?.vip;
  const depositedBalance = location.state?.balance ?? 0;

  const [vip, setVip] = useState(initialVip || null);
  const [balance, setBalance] = useState(depositedBalance);
  const [todayCommission, setTodayCommission] = useState(0.0);
  const [yesterdayCommission, setYesterdayCommission] = useState(0.0);
  const [maxOrders, setMaxOrders] = useState(initialVip?.dailyOrders || 25);

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // 🔄 Load commission history
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("commissionData"));
    const today = getTodayDate();

    if (storedData?.date === today) {
      setTodayCommission(storedData.todayCommission);
      setYesterdayCommission(storedData.yesterdayCommission || 0);
    } else if (storedData?.date) {
      setTodayCommission(0.0);
      setYesterdayCommission(storedData.todayCommission || 0);
    }
  }, []);

  // 💾 Save updated commission history
  useEffect(() => {
    const today = getTodayDate();
    localStorage.setItem(
      "commissionData",
      JSON.stringify({
        date: today,
        todayCommission,
        yesterdayCommission,
      })
    );
  }, [todayCommission, yesterdayCommission]);

  // 📡 Fetch live VIP data from Google Sheets
  useEffect(() => {
    const fetchVIPData = async () => {
      try {
        const res = await fetch("https://script.google.com/macros/s/XYZ/exec"); // Replace with your deployed Sheet script URL
        const data = await res.json();
        const match = data.find((item) => item.level === initialVip?.level);
        if (match) {
          const updatedVip = {
            level: match.level,
            percent: match.percent,
            dailyOrders: parseInt(match.dailyOrders),
            unlockAmount: parseFloat(match.unlockAmount),
          };
          setVip(updatedVip);
          setMaxOrders(updatedVip.dailyOrders);
        }
      } catch (err) {
        console.error("Error fetching VIP data from Google Sheets:", err);
      }
    };

    if (initialVip?.level) {
      fetchVIPData();
    }
  }, [initialVip]);

  const handleStartOrdering = async () => {
    const orderAmount = 1.0;
    const commissionRate = parseFloat(vip?.percent.replace("%", "")) / 100;

    if (balance < vip?.unlockAmount) {
      alert(`Add balance to unlock ${vip.level}. Minimum required: ${vip.unlockAmount} USDT`);
      return;
    }

    if (balance < orderAmount) {
      alert("The account balance is low, please deposit first.");
      return;
    }

    if (maxOrders <= 0) {
      alert("You have reached the daily order limit.");
      return;
    }

    const commission = +(orderAmount * commissionRate).toFixed(2);
    const newBalance = +(balance - orderAmount).toFixed(2);
    const newTodayCommission = +(todayCommission + commission).toFixed(2);
    const newMaxOrders = maxOrders - 1;

    setBalance(newBalance);
    setTodayCommission(newTodayCommission);
    setMaxOrders(newMaxOrders);

    localStorage.setItem("balance", JSON.stringify(newTodayCommission));

    const confirmedOrder = {
      id: "UU" + Math.random().toString(36).substr(2, 10).toUpperCase(),
      time: new Date().toLocaleString(),
      product: {
        name: "Prismacolor Premier Soft Core Colored Pencils Assorted Colors",
        price: orderAmount,
        quantity: 1,
        image: "/images/product1.png",
      },
      profit: commission,
      available: newBalance,
      deposit: depositedBalance,
      vip,
      status: "Completed"
    };

    // 🧠 Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(confirmedOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // 🔥 Save to Firebase (by user)
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const userId = user.uid;
      const orderRef = ref(db, `orders/${userId}`);
      const newOrderRef = push(orderRef);
      await set(newOrderRef, confirmedOrder);
    }

    alert(`Order placed for ${vip.level}.\nToday's Commission: ${commission.toFixed(2)} USDT`);
  };

  return (
    <div className="confirm-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <h2 className="order-heading">Order</h2>

      <div className="vip-section">
        {vip ? (
          <div className="vip-banner">
            <span className="vip-icon">💎</span>
            <div>
              <div className="vip-level">{vip.level}</div>
              <div className="vip-percent">Commission: {vip.percent}</div>
              <div className="vip-unlock">Unlocks at: {vip.unlockAmount} USDT</div>
            </div>
          </div>
        ) : (
          <div className="vip-banner">VIP Info Not Available</div>
        )}
      </div>

      <div className="summary-box">
        <div className="summary-item">
          <span className="summary-label">Balance</span>
          <span className="summary-value">{balance.toFixed(2)} </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Today Commission</span>
          <span className="summary-value">{todayCommission.toFixed(2)} </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Yesterday Commission</span>
          <span className="summary-value">{yesterdayCommission.toFixed(2)} </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Max Orders</span>
          <span className="summary-value">{maxOrders}</span>
        </div>
      </div>

      <button className="start-ordering-btn" onClick={handleStartOrdering}>
        🚀 Start Ordering
      </button>
    </div>
  );
};

export default OrderConfirm;
