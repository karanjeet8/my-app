import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-card">
        {/* ✅ Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>←</button>

        <div className="profile-section">
          {/* You can use either emoji or image link here */}
          <div className="emoji-icon">📈</div>

          {/* Or use image from a public link */}
          {/* 
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="profile-img"
          />
          */}

          <h2 className="username">Z1 Share Market</h2>
          <p className="role">Your Trusted Trading Partner</p>
        </div>

        <div className="about-content">
          <h3>About Us</h3>
          <p>
            Z1 Share Market is a platform where investors confidently manage their portfolios,
            track market trends, and make secure investments. With a user-friendly interface,
            real-time updates, and expert tools, we empower both beginners and experienced traders.
          </p>

          <h3>Our Mission</h3>
          <p>
            To simplify investing and provide transparent, powerful tools to help you grow your wealth.
          </p>

          <h3>Contact Us</h3>
          <ul>
            <li>📧 Email: support@z1market.com</li>
            <li>📞 Phone: +91-9876543210</li>
            <li>📍 Location: Mumbai, India</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
