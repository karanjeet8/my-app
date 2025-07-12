// File: InvitationPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Styles.css";
import { FaWhatsapp, FaTelegramPlane, FaFacebookF } from "react-icons/fa";

const InvitationPage = () => {
  const [invitationCode, setInvitationCode] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const randomCode = generateRandomCode(6);
    setInvitationCode(randomCode);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?data=${randomCode}&size=200x200`);
  }, []);

  const generateRandomCode = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationCode);
    const toast = document.getElementById("copy-toast");
    toast.style.opacity = 1;
    setTimeout(() => {
      toast.style.opacity = 0;
    }, 2000);
  };

  return (
    <div className="invitation-wrapper">
      <div className="invitation-container">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h2 className="title">🎉 Invitation</h2>
        <p className="subtitle">Invite friends and earn rewards together!</p>
        <span className="info-tag">You can call</span>

        <div className="qr-card">
          {qrUrl && <img src={qrUrl} alt="QR Code" className="qr-image" />}
          <p className="label">Your Code</p>
          <p className="code">{invitationCode}</p>
        </div>

        <button className="copy-btn" onClick={handleCopy}>📋 Copy Code</button>

        <div className="share-buttons">
          <p className="share-title">Share your code</p>

          <a
            href={`https://wa.me/7009661005`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn whatsapp"
          >
            <FaWhatsapp className="icon" /> WhatsApp
          </a>

          <a
            href={`https://t.me/your_admin_username`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn telegram"
          >
            <FaTelegramPlane className="icon" /> Telegram
          </a>

          <a
            href={`https://m.me/your.admin.username`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn facebook"
          >
            <FaFacebookF className="icon" /> Facebook
          </a>
        </div>

        {/* 🎯 3D-like animated image */}
        <motion.img
          src="https://thumbs.dreamstime.com/b/refer-friend-concept-cartoon-hands-holding-phone-button-referral-program-landing-page-template-ui-web-mobile-app-215446719.jpg"
          alt="Refer Illustration"
          className="illustration"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        />

        <div id="copy-toast" className="copy-toast">✅ Code Copied!</div>
      </div>
    </div>
  );
};

export default InvitationPage;
