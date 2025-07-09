import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase"; // ✅ Firestore removed
import "./Styles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const toggleMode = () => setDarkMode(!darkMode);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !username ||
      !email ||
      !loginPassword ||
      !confirmPassword ||
      !phone ||
      !country ||
      !gender ||
      !dob ||
      !withdrawPassword
    ) {
      alert("❌ Please fill in all required fields.");
      return;
    }

    if (loginPassword !== confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        loginPassword
      );
      const user = userCredential.user;

      // ✅ Store minimal info in localStorage
      localStorage.setItem("user-email", email);
      localStorage.setItem("login-password", loginPassword);
      localStorage.setItem("withdraw-password", withdrawPassword);
      localStorage.setItem("full-name", fullName);

      alert("🎉 Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div className={`register-container ${darkMode ? "dark" : "light"}`}>
      <button className="toggle-mode-btn" onClick={toggleMode}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div className="register-left">
        <div className="brand">
          <h1 className="welcome-heading">👋 Welcome to Z1 Wallet</h1>
          <img
            src="https://c4.wallpaperflare.com/wallpaper/272/603/603/5bd056d6c4ca7-wallpaper-preview.jpg"
            alt="icon"
          />
          <h2 className="brand-name">INVEST</h2>
        </div>

        <div className="stats-card">
          <h3>Statistics</h3>
          <p>Total Hours</p>
          <h2>1,240</h2>
          <p>Budget</p>
          <h2>$2,500</h2>
          <div className="tags">
            <span className="tag purple">Sales</span>
            <span className="tag green">Projects</span>
            <span className="tag pink">Income</span>
          </div>
        </div>

        <p className="info-text">Join the journey. Grow your wealth with us!</p>
      </div>

      <div className="register-right">
        <form className="form-box" onSubmit={handleRegister}>
          <h2>Create your account</h2>
          <p className="subtext">It’s free and easy</p>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <span onClick={togglePasswordVisibility} className="eye-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Turkey">Turkey</option>
            <option value="Germany">Germany</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
          </select>

          <input
            type="text"
            placeholder="Invite Code (optional)"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />

          <div className="gender-selection">
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
                required
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Other
            </label>
          </div>

          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Set Withdrawal Password"
            value={withdrawPassword}
            onChange={(e) => setWithdrawPassword(e.target.value)}
            required
          />

          <div className="checkbox">
            <input type="checkbox" id="agree" required />
            <label htmlFor="agree">
              I agree to the <a href="#">Terms & Conditions</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
