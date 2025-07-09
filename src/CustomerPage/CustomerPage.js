// File: CustomerService.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const CustomerService = () => {
  const navigate = useNavigate();

  const openWhatsApp = () => {
    window.open("https://wa.me/6283138384", "_blank"); // Replace with your WhatsApp number
  };

  const showHelp = () => {
    alert("💡 For help, check FAQs or contact customer support via WhatsApp.");
  };

  return (
    <div className="customer-container">
      <div className="header">
        <button className="back-arrow" onClick={() => navigate("/home")}>←</button>
        <h2 className="title">Customer Service Center</h2>
        <p className="subtext">Online customer service time 7:00–23:00</p>
      </div>

      <img
        src="https://img.freepik.com/premium-vector/customer-care-illustration-concept_42694-26.jpg"
        alt="Customer Support"
        className="service-image"
      />

      <div className="button-group">
        <button className="service-button" onClick={openWhatsApp}>
          Customer Service →
        </button>
        <button className="service-button" onClick={showHelp}>
          Help →
        </button>
      </div>

      <button className="back-home" onClick={() => navigate("/home")}>
        Back Home
      </button>
    </div>
  );
};

export default CustomerService;
