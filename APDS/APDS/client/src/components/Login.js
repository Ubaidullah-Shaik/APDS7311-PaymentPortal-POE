import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import user_icon from "../components/Assets/user.png";
import password_icon from "../components/Assets/padlock.png";
import account_icon from "../components/Assets/account.png";
import "./LoginSignup.css";

function Login() {
  const [username, setUsername] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regular Expressions for Validation
  const usernamePattern = /^[A-Za-z0-9_]+$/; // Alphanumeric and underscores
  const accountNumberPattern = /^\d+$/; // Only digits
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate username
    if (!usernamePattern.test(username)) {
      validationErrors.username = "Username can only contain letters, numbers, and underscores.";
    }

    // Validate account number
    if (!accountNumberPattern.test(accountNumber)) {
      validationErrors.accountNumber = "Account Number must contain only digits.";
    }

    // Validate password
    if (!passwordPattern.test(password)) {
      validationErrors.password = "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number.";
    }

    // If there are validation errors, update the state and prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with login if all validations pass
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        accountNumber,
        password,
      });

      // Handle successful login
      localStorage.setItem("fullName", response.data.fullName);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/home"), 1500); // Redirect after a brief delay

    } catch (error) {
      console.error("Login failed", error);
      
      // If the account is locked, show a toast with the lock message
      if (error.response && error.response.data.lock) {
        toast.error("Account is temporarily locked due to multiple failed login attempts. Please try again later.");
      } else {
        // Handle other errors (invalid credentials)
        toast.error("Login failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Login - Your App</title>
        <meta name="description" content="Login page for your app. Access your account with your credentials." />
      </Helmet>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> {/* Toast Container */}

      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleLogin}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>
          <div className="input">
            <img src={account_icon} alt="Account Icon" />
            <input
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            {errors.accountNumber && <div className="error-message">{errors.accountNumber}</div>}
          </div>
          <div className="input">
            <img src={password_icon} alt="Password Icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit">
            Login
          </button>
        </div>
      </form>

      <div className="login-redirect-container">
        <div className="login-redirect-line">
          <p className="login-redirect-text">
            Don't have an account? <Link to="/signup" className="login-link">Sign up</Link>
          </p>
        </div>
        <div className="login-redirect-line">
          <p className="login-redirect-text">
            Employee? <Link to="/employee-login" className="login-link">Employee Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
