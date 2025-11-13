// src/Login_Page/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out all fields!");
      return;
    }

    console.log("Login successful:", { email, password });
    setError(null);
    alert(`Login Successful!\nEmail: ${email}`);

    // Navigate to Dashboard (root will redirect to /home)
    navigate("/Dashboard");
  };

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Change this to your actual signup route if you have one
    navigate("/signup"); // or keep "/Dashboard" if signup is inside dashboard
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Forgot password feature coming soon!");
    // navigate("/forgot-password");
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to access your financial dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email Address</label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <div className="password-header">
                <label htmlFor="password" className="input-label">Password</label>
                <a href="#" className="forgot-password-link" onClick={handleForgotPasswordClick}>
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-btn">
              Log In
            </button>

            <div className="login-footer">
              <p className="signup-prompt">
                Don't have an account?{" "}
                <a href="#" className="signup-link" onClick={handleSignUpClick}>
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="login-side-panel">
          <div className="brand-logo">
            <div className="logo-placeholder"></div>
            <h2>FinancePro</h2>
          </div>
          <p>Manage your wealth with confidence and clarity.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;