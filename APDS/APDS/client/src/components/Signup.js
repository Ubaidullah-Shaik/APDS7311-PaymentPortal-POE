import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import user_icon from "../components/Assets/user.png";
import password_icon from "../components/Assets/padlock.png";
import account_icon from "../components/Assets/account.png";
import "./LoginSignup.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  
  const [errors, setErrors] = useState({});

  // Regular Expressions for Validation
  const fullNamePattern = /^[A-Za-z\s]+$/; // Only letters and spaces
  const usernamePattern = /^[A-Za-z0-9_]+$/; // Alphanumeric and underscores
  const idNumberPattern = /^\d{13}$/; // 13-digit South African ID number
  const accountNumberPattern = /^\d+$/; // Only digits
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate the inputs using RegEx
    if (!fullNamePattern.test(fullName)) {
      validationErrors.fullName = "Full Name should contain only letters and spaces.";
    }
    if (!usernamePattern.test(username)) {
      validationErrors.username = "Username can only contain letters, numbers, and underscores.";
    }
    if (!idNumberPattern.test(idNumber)) {
      validationErrors.idNumber = "ID Number must be 13 digits.";
    }
    if (!accountNumberPattern.test(accountNumber)) {
      validationErrors.accountNumber = "Account Number must contain only digits.";
    }
    if (!passwordPattern.test(password)) {
      validationErrors.password = "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number.";
    }

    // If there are errors, update the state and prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with signup if all validations pass
    try {
      await axios.post("http://localhost:3000/signup", {
        fullName,
        username,
        idNumber,
        accountNumber,
        password,
      });
      toast.success("Account created successfully. Please log in.");
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Sign Up - My App</title>
        <meta name="description" content="Create an account to access exclusive features." />
      </Helmet>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSignup}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
          </div>
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
              placeholder="ID Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
            {errors.idNumber && <div className="error-message">{errors.idNumber}</div>}
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
            Sign Up
          </button>
        </div>
      </form>
      <div className="login-redirect-container">
        <p className="login-redirect-text">
          Already have an account? <Link to="/" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
