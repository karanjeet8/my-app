import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const faqData = [
  {
    question: "What is Z1 Trading Platform?",
    answer:
      "Z1 is a user-friendly trading platform that enables investors to trade stocks, track investments, and manage portfolios in real-time."
  },
  {
    question: "Is there a minimum deposit?",
    answer:
      "Yes, the minimum deposit to start trading is $500. This helps ensure proper trading margins."
  },
  {
    question: "How secure is my data?",
    answer:
      "We use bank-level encryption and two-factor authentication to ensure your data and transactions are secure."
  },
  {
    question: "Can I withdraw my funds anytime?",
    answer:
      "Yes, you can request a withdrawal 24/7. Processing usually takes 1–2 business days."
  },
  {
    question: "Do you provide customer support?",
    answer:
      "Yes, our customer service team is available 7 days a week from 7:00 AM to 11:00 PM."
  }
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        {/* ✅ Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>←</button>

        <h2 className="faq-title">📘 Frequently Asked Questions</h2>

        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleIndex(index)}
          >
            <div className="faq-question">{item.question}</div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
