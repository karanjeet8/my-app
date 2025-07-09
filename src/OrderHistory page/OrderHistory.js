// File: OrderRecord.js
import React, { useEffect, useState } from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";
import { database, db } from "../Firebase"; // ✅ Firebase setup
import { ref, set } from "firebase/database";

const OrderRecord = () => {
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersWithStatus = savedOrders.map(order => ({
      ...order,
      status: order.status || "Completed",
    }));
    setOrders(ordersWithStatus);
  }, []);

  const filterOrders = () => {
    if (selectedTab === "All") return orders;
    return orders.filter(order => order.status === selectedTab);
  };

  // ✅ Sync to Firebase Realtime Database
  const saveToFirebase = () => {
    const orderRef = ref(database, "orderRecords/");
    set(orderRef, orders)
      .then(() => {
        alert("✅ Orders saved to Firebase!");
      })
      .catch((error) => {
        alert("❌ Failed to save: " + error.message);
      });
  };

  return (
    <div className="order-record-container">
      {/* Floating Back Button */}
      <button className="back-btn-floating" onClick={() => navigate(-1)}>
        ←
      </button>

      <h2 className="record-heading">📦 Order record</h2>

      <div className="tabs">
        {["All", "In Progress", "Completed", "Frozen"].map(tab => (
          <button
            key={tab}
            className={`tab ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ✅ Sync Button */}
      <button className="sync-button" onClick={saveToFirebase}>
        
      </button>

      {filterOrders().length === 0 ? (
        <p className="empty-message">No orders in "{selectedTab}"</p>
      ) : (
        filterOrders().map((order, index) => (
          <div className="order-card" key={index}>
            <p className="order-time">🕒 Order time: {order.time}</p>
            <p className="order-id">🆔 UID: {order.id}</p>

            <div className="vip-info">
              <img src={order.vip?.image} alt="VIP" className="vip-image" />
              <div>
                <strong>VIP Level:</strong> {order.vip?.level || "N/A"}<br />
                <strong>Commission Rate:</strong> {order.vip?.percent || "N/A"}<br />
                <strong>Deposit:</strong> {order.deposit} USDT<br />
                <strong>Profit:</strong> {order.profit} USDT<br />
                <strong>Available Balance:</strong> {order.available} USDT
              </div>
            </div>

            <div className="product-info">
              <img src={order.product.image} alt="product" className="product-img" />
              <div className="product-text">
                <h4>{order.product.name}</h4>
                <p>{order.product.price} USDT × {order.product.quantity}</p>
              </div>
            </div>

            <div className="order-stats">
              <p>Total Price <span>{(order.product.price * order.product.quantity).toFixed(2)} USDT</span></p>
              <p>Status <span>{order.status}</span></p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderRecord;
