// File: HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database, ref, onValue, push } from "../Firebase";
import "./Styles.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState("");
  const [audienceType, setAudienceType] = useState("");
  const [ratings, setRatings] = useState([]);

  // Load ratings from Firebase Realtime Database
  useEffect(() => {
    const ratingsRef = ref(database, "ratings");
    onValue(ratingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ratingList = Object.values(data);
        setRatings(ratingList);
      }
    });
  }, []);

  const handleLaunch = () => {
    const email = localStorage.getItem("user-email");
    const password = localStorage.getItem("login-password");

    if (email && password) {
      navigate("/login");
    } else {
      navigate("/register");
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
    if (userName.trim() && audienceType.trim()) {
      const newRating = {
        name: userName.trim(),
        rating: selectedRating,
        audience: audienceType.trim(),
      };

      const ratingsRef = ref(database, "ratings");
      push(ratingsRef, newRating); // Save to Firebase

      setUserName("");
      setAudienceType("");
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

          {/* Rating Section */}
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

            {showNameInput && (
              <div className="rating-name-input">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Audience type (e.g., Trader, Investor)"
                  value={audienceType}
                  onChange={(e) => setAudienceType(e.target.value)}
                />
                <button onClick={handleSubmitRating}>Submit</button>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="footer-comments">
            <p>“Best trading experience I’ve ever had!” - Aarav K.</p>
            <p>“Easy to use, visually stunning, and accurate.” - Priya D.</p>
            <p>“Love the real-time analytics and fast performance.” - John M.</p>

            {ratings.map((item, index) => (
              <p key={index}>
                “{item.name} ({item.audience}) rated {item.rating} star{item.rating > 1 ? "s" : ""}.”
              </p>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
