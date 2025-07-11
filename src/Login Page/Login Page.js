import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import "./Styles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", !darkMode ? "dark" : "light");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("❌ Please enter both email and password.");
      return;
    }

    const adminEmail = "admin@example.com";
    const adminPassword = "555444333";

    if (email === adminEmail && password === adminPassword) {
      alert("✅ Logged in as Admin");
      navigate("/admin");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in successfully!");
      navigate("/home");
    } catch (err) {
      setError("❌ Invalid credentials or account not found.");
    }
  };

  return (
    <div className="login-page">
      <div className="theme-toggle">
        <button onClick={toggleMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="login-left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3079/3079068.png"
          alt="wallet"
          className="wallet-image"
        />
        <h2>Easy Wallet Control</h2>
        <p>Create wallets and easily manage your cash flow.</p>
      </div>

      <div className="login-right">
        <div className="login-header">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOP9DL-fGkLcFB3_gkT3sN9gdCfw6S3LLL0g&s"
            alt="logo"
            className="logo"
          />
        </div>

        <div className="login-form-box">
          <h2>Welcome Back!</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={togglePasswordVisibility} className="eye-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="form-actions">
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="primary-btn">
              SIGN IN →
            </button>

            {/* ✅ Register Redirect */}
            <div className="register-link">
              <p>
                New user?{" "}
                <span onClick={() => navigate("/register")} className="register-text">
                  Register here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
