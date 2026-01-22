import React, { useContext } from 'react';
import './Footer.pro.css';
import { Link } from 'react-router-dom';
import { AppContext } from "../../context/AppContext.jsx";

const Footer = () => {
    const { auth } = useContext(AppContext);
    const isAdmin = auth.role === "ROLE_ADMIN";
    const currentYear = new Date().getFullYear();

    return (
        <footer className="premium-footer">
            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="brand-logo-container">
                            <img src="/images/favicon.png" alt="ShoppEX Logo" />
                            <span className="brand-name">ShoppEX</span>
                        </div>
                        <p className="brand-tagline">Redefining the premium shopping experience with every click.</p>
                    </div>

                    <div className="footer-links-container">
                        <div className="footer-link-group">
                            <h6>Quick Links</h6>
                            <ul>
                                <li><Link to="/explore">Explore Store</Link></li>
                                <li><Link to="/about">Our Story</Link></li>
                                {isAdmin ? (
                                    <li><Link to="/admin-feedback">User Feedbacks</Link></li>
                                ) : (
                                    <li><Link to="/feedback">Share Feedback</Link></li>
                                )}
                            </ul>
                        </div>
                        <div className="footer-link-group">
                            <h6>Support</h6>
                            <ul>
                                <li>
                                    <Link to="/orders">
                                        {isAdmin ? "All Transactions" : "Order Tracking"}
                                    </Link>
                                </li>
                                <li><Link to="/profile">My Account</Link></li>
                                <li><Link to="/help">Help Center</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-contact">
                        <h6>Get Connected</h6>
                        <div className="social-icons">
                            <a href="https://github.com/Deepansh1822" target="_blank" rel="noopener noreferrer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" alt="GitHub" />
                            </a>
                            <a href="https://www.linkedin.com/in/deepansh-shakya-b9092b267" target="_blank" rel="noopener noreferrer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" />
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=deepanshshakya669@gmail.com" target="_blank" rel="noopener noreferrer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="copyright">
                        <p>&copy; {currentYear} ShoppEX. All rights reserved.</p>
                    </div>
                    <div className="footer-trust-badges">
                        <span><i className="bi bi-shield-check me-1"></i> Secure Payments</span>
                        <span className="ms-3"><i className="bi bi-truck me-1"></i> Fast Delivery</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
