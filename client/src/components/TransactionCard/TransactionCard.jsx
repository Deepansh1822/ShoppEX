import React from 'react';
import { assets } from '../../assets/assets.js';
import './TransactionCard.pro.css';

const TransactionCard = ({ order, isAdmin }) => {
    const formatItems = (items) =>
        items.map((item) => `${item.name} x ${item.quantity}`).join(', ');

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="transaction-card card-entry-anim">
            <div className="card-body">
                <h5 className="card-title">Order #{order.orderId}</h5>
                {isAdmin && (
                    <p className="card-text mb-1">
                        <strong>Customer:</strong> {order.customerName}<br />
                        <small className="text-muted">{order.phoneNumber}</small>
                    </p>
                )}
                <p className="card-text mb-1"><strong>Items:</strong> {formatItems(order.items)}</p>
                <p className="card-text mb-1"><strong>Total:</strong> ₹{order.grandTotal.toFixed(2)}</p>
                <p className="card-text mb-1"><strong>Payment:</strong> {order.paymentMethod}</p>
                <span className={`badge ${order.paymentDetails?.status === "COMPLETED" ? "bg-success" : "bg-warning text-dark"}`}> {order.paymentDetails?.status || "PENDING"} </span>
                <p className="card-text mt-2"><small className="text-muted">{formatDate(order.createdAt)}</small></p>
            </div>
        </div>
    );
};

export default TransactionCard;
