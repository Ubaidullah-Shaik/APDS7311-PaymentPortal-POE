import React, { useEffect, useState } from "react";
import axios from "axios";
import './PaymentHistory.css'; // Import CSS file for styling

function PaymentHistory() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get("http://localhost:3000/payments");
                setPayments(response.data);
            } catch (error) {
                console.error("Error fetching payment history:", error);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div>
            <h1 className="payment-history-title">Payment History</h1> {/* Heading outside of the container */}
            <div className="payment-history-container">
                <table className="payment-history-table">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Recipient Account</th>
                            <th>Provider</th>
                            <th>SWIFT Code</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.amount}</td>
                                <td>{payment.currency}</td>
                                <td>{payment.recipientAccountNumber}</td>
                                <td>{payment.provider}</td>
                                <td>{payment.swiftCode}</td>
                                <td>{payment.description}</td>
                                <td>{payment.status}</td>
                                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaymentHistory;