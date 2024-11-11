import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';

function Home() {
  const [fullName, setFullName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [provider, setProvider] = useState("SWIFT");
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [description, setDescription] = useState("");
  const [activeView, setActiveView] = useState("makePayment");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [receivedPayments, setReceivedPayments] = useState([]); // State for received payments

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("fullName");
    if (name) {
      setFullName(name);
      setIsLoggedIn(true);
    }
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!amount || !currency || !provider || !accountNumber || !swiftCode || !description) {
      toast.error('Please fill all required fields.');
      return;
    }

    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post("http://localhost:3000/payment", {
        userId,
        amount,
        currency,
        recipientAccountNumber: accountNumber,
        provider,
        swiftCode,
        description,
      });

      toast.success("Payment successful: " + response.data.message);

      // Reset form fields after successful payment
      setAmount("");
      setCurrency("USD");
      setProvider("SWIFT");
      setAccountNumber("");
      setSwiftCode("");
      setDescription("");
    } catch (error) {
      console.error("Error making payment:", error);
      toast.error("Payment failed");
    }
  };

  const handleViewPayments = () => {
    setActiveView("viewPayments");
    navigate("/payment-history");
  };

  const handleViewReceivedPayments = async () => {
    setActiveView("receivedPayments");
    try {
      const response = await axios.get("http://localhost:3000/completed-payments");
      setReceivedPayments(response.data);
    } catch (error) {
      console.error("Error fetching received payments:", error);
      toast.error("Failed to fetch received payments");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      {isLoggedIn ? (
        <div className="welcome-section">
          <h1 className="welcome-message-animated">Welcome, {fullName}!</h1>
          <p className="welcome-message">We're glad to have you back! Please choose an option below:</p>

          <div className="dashboard-container">
            <nav className="nav-panel">
              <button
                onClick={() => setActiveView("makePayment")}
                className={activeView === "makePayment" ? "active" : ""}
              >
                Make a Payment
              </button>
              <button
                onClick={handleViewPayments}
                className={activeView === "viewPayments" ? "active" : ""}
              >
                View Payments
              </button>
              <button
                onClick={handleViewReceivedPayments}
                className={activeView === "receivedPayments" ? "active" : ""}
              >
                Your Pending Swift Payments
              </button>
            </nav>

            {activeView === "makePayment" ? (
              <div>
                <h1>Make an International Payment</h1>

                <form onSubmit={handlePayment}>
                  <div className="form-group">
                    <label>Amount:</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Currency:</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="ZAR">ZAR</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Provider:</label>
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                    >
                      <option value="SWIFT">SWIFT</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Recipient Account Number:</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Enter account number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>SWIFT Code:</label>
                    <input
                      type="text"
                      value={swiftCode}
                      onChange={(e) => setSwiftCode(e.target.value)}
                      placeholder="Enter SWIFT code"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description:</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit">Pay Now</button>
                  </div>
                </form>
              </div>
            ) : activeView === "viewPayments" ? (
              <div>
                <h1>View Payments</h1>
                <p>Waiting for admin approval.</p>
              </div>
            ) : (
<div>
  <h1>Pending Swift Approval Payments</h1>
  {receivedPayments.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Currency</th>
          <th>Provider</th>
          <th>Description</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {receivedPayments.map((payment) => (
          <tr key={payment._id}>
            <td>{payment.amount}</td>
            <td>{payment.currency}</td>
            <td>{payment.provider}</td>
            <td>{payment.description}</td>
            <td>{payment.status}</td>
            <td>{new Date(payment.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No received payments to display</p>
  )}
</div>

            )}
          </div>
        </div>
      ) : (
        <div>
          <h1>Please log in to access your dashboard</h1>
        </div>
      )}
    </div>
  );
}

export default Home;