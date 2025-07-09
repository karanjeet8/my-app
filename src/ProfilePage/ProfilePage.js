import React, { useEffect, useState } from "react";
import "./Styles.css";
import {
  FaBell,
  FaWallet,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaCog,
  FaGift,
  FaUsers,
  FaFileAlt,
  FaArrowLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase"; // ✅ Import your firebase auth

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    id: "",
    score: 0,
    balance: 0.0,
    avatar: "",
    inviteCode: ""
  });
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const storedBalance = parseFloat(localStorage.getItem("balance")) || 0;
    const todayCommission = parseFloat(localStorage.getItem("todayProfit")) || 0;
    const storedUserData = JSON.parse(localStorage.getItem("user")) || {};

    // ✅ Listen for Firebase user
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email || "Unknown";
        const uid = firebaseUser.uid || "UID0001";

        const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`;

        setUser({
          name: email,
          id: uid,
          score: todayCommission,
          avatar,
          balance: storedBalance,
          inviteCode: storedUserData.inviteCode || ""
        });
      } else {
        // Not logged in
        navigate("/login");
      }
    });

    const updateAvailable = localStorage.getItem("hasNewUpdate") === "true";
    setHasNotification(updateAvailable);

    return () => unsubscribe(); // Cleanup
  }, [navigate]);

  const services = [
    { label: "Balance Information", icon: <FaWallet />, route: "/wd" },
    { label: "Team", icon: <FaUsers />, route: "/customer" },
    { label: "Deposit Record", icon: <FaFileAlt />, route: "/deposit" },
    { label: "Order Record", icon: <FaFileAlt />, route: "/orderhistory" },
    { label: "Invitation", icon: <FaGift />, route: "/invite" },
    { label: "Setting", icon: <FaCog />, route: "/setting" }
  ];

  return (
    <div className="profile-container">
      <div className="back-btn" onClick={() => navigate("/home")}>
        <FaArrowLeft /> Back
      </div>

      <div className="profile-header">
        <div className="profile-info">
          <img className="avatar" src={user.avatar} alt="avatar" />
          <div className="details">
            <p className="username">{user.name}</p>
            <p className="credit">User ID: {user.id}</p>
            {user.inviteCode && (
              <p className="invite">Invitation code: {user.inviteCode}</p>
            )}
          </div>
        </div>
        <div className="notification-wrapper">
          <FaBell className="notification-icon" />
          {hasNotification && <span className="notification-dot" />}
        </div>
      </div>

      <div className="wallet-box">
        <p className="wallet-label">Wallet Balance</p>
        <p className="wallet-balance">${user.balance.toFixed(2)}</p>
      </div>

      <div className="wallet-actions">
        <button className="deposit-btn" onClick={() => navigate("/deposit")}>
          <FaMoneyBillWave /> Deposit
        </button>
        <button className="withdraw-btn" onClick={() => navigate("/widraw")}>
          <FaExchangeAlt /> Withdrawal
        </button>
      </div>

      <div className="service-center">
        <h3>Service Center</h3>
        <div className="service-grid">
          {services.map((s, i) => (
            <div key={i} onClick={() => navigate(s.route)}>
              <div className="icon">{s.icon}</div>
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
