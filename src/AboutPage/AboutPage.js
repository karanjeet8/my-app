// File: About.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <button className="about-back-btn" onClick={() => navigate("/home")}>←</button>

      <div className="about-header">
        <h1 className="about-title">About W1 Wallet</h1>
        <p className="about-subtitle">Your Trusted Financial Partner</p>
      </div>

      <img
        src="https://media.istockphoto.com/id/1366762744/vector/income-growth-concept-investment-management-successful-investments.jpg?s=612x612&w=0&k=20&c=Duj93l01pV_RcQynDsDE90FrgjuLWmNnIcjdUFXy-aw="
        alt="About"
        className="about-image"
      />

      <div className="about-section">
        <h2>🌟 What is W1 Wallet?</h2>
        <p>
          W1 Wallet is a secure digital platform designed for managing your money with simplicity and power.
          From seamless deposits to automated VIP orders, everything is built for ease, speed, and security.
        </p>
      </div>

      <div className="about-section features-section">
        <h2>🚀 Features</h2>
        <ul className="about-list">
          <li>💸 Fast & Easy Deposits</li>
          <li>🔐 Secure Withdrawals</li>
          <li>🗂️ VIP Order Management</li>
          <li>🌍 Multilingual Support</li>
          <li>🧾 Real-Time Records</li>
          <li>📢 Voice Announcements</li>
        </ul>
      </div>

      <img
        src="https://img.freepik.com/premium-vector/growth-chart-concept-increasing-income-profits-investments-growing-income_178888-1944.jpg"
        alt="Growth"
        className="about-image"
      />

      <div className="about-section">
        <h2>🛡️ Secure & Reliable</h2>
        <p>
          All transactions are protected with top-grade encryption and monitored by our admin team.
          Your funds are always safe and transparent in the system.
        </p>
      </div>

      <div className="about-footer">
        <h3>Ready to get started?</h3>
        <p>Join W1 Wallet and take control of your financial future!</p>
      </div>
    </div>
  );
};

export default About;
