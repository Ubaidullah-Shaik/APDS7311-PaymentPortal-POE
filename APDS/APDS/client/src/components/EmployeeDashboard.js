import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './EmployeeDashboard.css';

function EmployeeDashboard() {
    const [transactions, setTransactions] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState("");
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("http://localhost:3000/employee/transactions");
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);
    

    const handleApprovePayment = (paymentId) => {
        setSelectedPaymentId(paymentId);
        setShowConfirmModal(true);
    };

    const confirmApprovePayment = async () => {
        setShowConfirmModal(false);
        setIsLoading(true);
        setSubmissionStatus("Submitting to SWIFT...");

        try {
            await axios.put(`http://localhost:3000/employee/approve-payment/${selectedPaymentId}`);
            setSubmissionStatus("Submitted to SWIFT");

            // Update transactions
            setTransactions((prevTransactions) =>
                prevTransactions.map((transaction) =>
                    transaction._id === selectedPaymentId ? { ...transaction, status: "Completed" } : transaction
                )
            );

            // Show success modal after a delay
            setTimeout(() => {
                setIsLoading(false);
                setShowSuccessModal(true);
            }, 4000); // Show success message after 3 seconds
        } catch (error) {
            console.error("Error approving payment:", error);
            alert("Failed to approve payment");
            setIsLoading(false);
            setSubmissionStatus("");
        }
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
        setSelectedPaymentId(null);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div>
            <h1 className="dashboard-title">Employee Dashboard</h1>
            <p className="dashboard-welcome">Welcome to the Employee Dashboard!</p>
            <div className="dashboard-container">
                <Link to="/add-employee" className="add-employee-link">Add New Employee</Link>
                <h3>All User Transactions</h3>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>User ID</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction._id}</td>
                                <td>{transaction.userId}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.currency}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.status}</td>
                                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                                <td>
                                    {transaction.status === "Pending" && (
                                        <button
                                            className="approve-button"
                                            onClick={() => handleApprovePayment(transaction._id)}
                                        >
                                            Approve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirm Modal */}
            {showConfirmModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Submit to SWIFT?</p>
                        <button className="confirm-button" onClick={confirmApprovePayment}>Yes</button>
                        <button className="cancel-button" onClick={closeConfirmModal}>No</button>
                    </div>
                </div>
            )}

            {/* Loading and Submission Status Modal */}
            {isLoading && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{submissionStatus}</p>
                        {submissionStatus === "Submitting to SWIFT..." && (
                            <div className="loading-spinner"></div>
                        )}
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="success-icon">✔</div>
                        <p>{submissionStatus}</p>
                        <button className="close-button" onClick={closeSuccessModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployeeDashboard;
