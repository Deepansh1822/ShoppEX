
import React, { useState } from 'react';
import CustomerForm from "../../components/CustomerForm/CustomerForm.jsx";
import CartItems from "../../components/CartItems/CartItems.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx";
// import './CartPage.css';
import './CartPage.pro.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    console.log("CartPage rendering");
    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const navigate = useNavigate();

    return (
        <div className="cart-page-container fade-in page-entry-anim">
            <button className="btn btn-outline-secondary back-btn mb-3" onClick={() => navigate('/explore')}>
                <i className="bi bi-arrow-left"></i> Continue Shopping
            </button>
            <div className="cart-layout">
                <div className="cart-left-section">
                    <div className="section-card cart-items-section">
                        <h2 className="section-title">
                            <i className="bi bi-cart-check-fill me-2"></i>Your Shopping Cart
                        </h2>
                        <div className="cart-items-wrapper">
                            <CartItems />
                        </div>
                    </div>
                </div>

                <div className="cart-right-section">
                    <div className="section-card customer-details-section">
                        <h3 className="section-subtitle">Customer Details</h3>
                        <CustomerForm
                            customerName={customerName}
                            mobileNumber={mobileNumber}
                            setMobileNumber={setMobileNumber}
                            setCustomerName={setCustomerName}
                        />
                    </div>

                    <div className="section-card summary-section">
                        <h3 className="section-subtitle">Order Summary</h3>
                        <CartSummary
                            customerName={customerName}
                            mobileNumber={mobileNumber}
                            setMobileNumber={setMobileNumber}
                            setCustomerName={setCustomerName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
