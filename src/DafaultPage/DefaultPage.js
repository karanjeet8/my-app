// File: HomePage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState("");
  const [finalName, setFinalName] = useState("");

  // ✅ Updated to check if user is registered
  const handleLaunch = () => {
    const email = localStorage.getItem("user-email");
    const password = localStorage.getItem("login-password");

    if (email && password) {
      navigate("/login"); // Already registered
    } else {
      navigate("/register"); // New user
    }
  };

  const handleStarClick = (index) => {
    setSelectedRating(index);
    setShowNameInput(true);
  };

  const handleStarHover = (index) => {
    setUserRating(index);
  };

  const handleStarLeave = () => {
    setUserRating(0);
  };

  const handleSubmitRating = () => {
    if (userName.trim()) {
      setFinalName(userName.trim());
      setShowNameInput(false);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="title-3d">Next-Gen Trading</h1>
          <p className="subtitle">
            Experience trading like never before with real-time insights and 3D analytics.
          </p>
          <button className="cta-btn" onClick={handleLaunch}>
            🚀 Launch Platform
          </button>
        </div>

        {/* 3D Graph */}
        <div className="hero-graph">
          <div className="laptop-mockup">
            <div className="laptop-screen">
              <div className="bars3d-container">
                <div className="bar3d bar1"></div>
                <div className="bar3d bar2"></div>
                <div className="bar3d bar3"></div>
                <div className="bar3d bar4"></div>
                <div className="bar3d bar5"></div>
              </div>
            </div>
            <div className="laptop-base"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 TradeSmart. All rights reserved.</p>

          {/* Interactive Rating */}
          <div className="footer-rating">
            <p>Rate your experience:</p>
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                className={`star ${index <= (userRating || selectedRating) ? "filled" : ""}`}
                onClick={() => handleStarClick(index)}
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={handleStarLeave}
              >
                ★
              </span>
            ))}

            {/* Show input if rating was selected */}
            {showNameInput && (
              <div className="rating-name-input">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={handleSubmitRating}>Submit</button>
              </div>
            )}

            {/* Show result if both rating and name submitted */}
            {finalName && selectedRating > 0 && (
              <p className="rating-result">
                {finalName} rated {selectedRating} star{selectedRating > 1 ? "s" : ""}!
              </p>
            )}
          </div>

          {/* Good User Comments */}
          <div className="footer-comments">
            <p>“Best trading experience I’ve ever had!” - Aarav K.</p>
            <p>“Easy to use, visually stunning, and accurate.” - Priya D.</p>
            <p>“Love the real-time analytics and fast performance.” - John M.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
