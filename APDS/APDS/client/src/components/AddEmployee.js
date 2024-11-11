import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './AddEmployee.css';

function AddEmployee() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/add-employee", {
        username,
        password,
      });
      if (response.data.success) {
        toast.success("Employee added successfully!");
        setTimeout(() => {
          navigate("/employeeDashboard");
        }, 2000); // Delay navigation to allow toast to be visible
      } else {
        toast.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Failed to add employee", error);
      toast.error("An error occurred while adding the employee. Please try again.");
    }
  };

  return (
    <div className="add-employee-container">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="add-employee-header">
        <h1 className="add-employee-text">Add Employee</h1>
        <div className="add-employee-underline"></div>
      </div>

      <form onSubmit={handleAddEmployee} className="add-employee-inputs">
        <div className="add-employee-input">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="add-employee-input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="add-employee-submit-container">
          <button type="submit" className="add-employee-submit">Add Employee</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
