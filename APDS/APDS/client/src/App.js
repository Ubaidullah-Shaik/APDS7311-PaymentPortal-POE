
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import EmployeeLogin from "./components/EmployeeLogin";
import EmployeeDashboard from "./components/EmployeeDashboard"; // Import EmployeeDashboard
import AddEmployee from "./components/AddEmployee"; // Import AddEmployee component
import PaymentHistory from "./components/PaymentHistory";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/employeeDashboard" element={<EmployeeDashboard />} /> {/* Employee Dashboard route */}
          <Route path="/add-employee" element={<AddEmployee />} /> {/* New route */}
          <Route path="/payment-history" element={<PaymentHistory />} /> {/* Payment History route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
