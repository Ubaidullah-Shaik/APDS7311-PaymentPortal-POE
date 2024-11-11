// EmployeeLogin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './EmployeeLogin.css';

function EmployeeLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmployeeLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/employee-login", {
        username,
        password,
      });
      if (response.data.success) {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/employeeDashboard");
        }, 2000); // Navigate after 2 seconds to show toast
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (error) {
      console.error("Employee login failed", error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="employee-container">
      <ToastContainer position="top-center" autoClose={2000} />
      
      <div className="employee-header">
        <h1 className="employee-text">Employee Login</h1>
        <div className="employee-underline"></div>
      </div>
      
      <form onSubmit={handleEmployeeLogin} className="employee-inputs">
        <div className="employee-input">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="employee-input">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="employee-submit-container">
          <button type="submit" className="employee-submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeLogin;
