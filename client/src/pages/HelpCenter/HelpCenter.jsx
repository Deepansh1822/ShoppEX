import React, { useState } from 'react';
import './HelpCenter.pro.css';
import Footer from '../../components/Footer/Footer.jsx';
import BackToTop from "../../components/BackToTop/BackToTop.jsx";

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Load messages from localStorage on initialization
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('shoppex_chat_history');
        return savedMessages ? JSON.parse(savedMessages) : [
            { type: 'bot', text: "Hi! I'm ShoppEX AI. How can I assist you today?" }
        ];
    });

    // Save messages to localStorage whenever they change
    React.useEffect(() => {
        localStorage.setItem('shoppex_chat_history', JSON.stringify(messages));
    }, [messages]);

    React.useEffect(() => {
        if (isChatOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isChatOpen]);

    const helpCategories = [
        {
            icon: "bi-box-seam",
            title: "Orders & Shipping",
            description: "Track orders, manage deliveries, and shipping rates.",
            details: [
                "Standard shipping takes 3-5 business days.",
                "Real-time tracking is available in 'My Orders'.",
                "Shipping is free for orders above $50.",
                "International shipping options vary by region."
            ]
        },
        {
            icon: "bi-arrow-left-right",
            title: "Returns & Refunds",
            description: "Easy steps to return products and get your money back.",
            details: [
                "30-day window for hassle-free returns.",
                "Refunds are processed within 7-10 business days.",
                "Items must be in original packaging with tags.",
                "Return shipping is covered for defective items."
            ]
        },
        {
            icon: "bi-person-badge",
            title: "Account & Profile",
            description: "Update passwords, manage addresses, and account security.",
            details: [
                "Secure password resets via verified email.",
                "Manage multiple saved delivery addresses.",
                "Two-factor authentication (2FA) for extra security.",
                "Easily delete or pause your account at any time."
            ]
        },
        {
            icon: "bi-credit-card",
            title: "Payments & Wallet",
            description: "Payment methods, Razorpay issues, and refund status.",
            details: [
                "Safe transactions processed through Razorpay.",
                "Accepting all major credit cards and UPI.",
                "Refund status is updated instantly in your dashboard.",
                "Contact us for any double-deduction issues."
            ]
        },
        {
            icon: "bi-shield-lock",
            title: "Privacy & Security",
            description: "How we protect your data and secure your transactions.",
            details: [
                "End-to-end encryption for all personal data.",
                "We never share your information with third parties.",
                "GDPR and SOC2 compliant data storage.",
                "Automatic logout after 30 minutes of inactivity."
            ]
        },
        {
            icon: "bi-gift",
            title: "Offers & Coupons",
            description: "Using promo codes and understanding seasonal sales.",
            details: [
                "Apply coupons directly at the checkout page.",
                "Stay tuned for exclusive seasonal flash sales.",
                "Refer a friend to earn $10 shopping credits.",
                "Gift cards never expire on ShoppEX."
            ]
        }
    ];

    const faqs = [
        { q: "How do I track my order?", a: "Go to 'My Orders' in the sidebar or click 'Order Tracking' in the footer to see the real-time status of your shipments." },
        { q: "What is the return policy?", a: "We offer a 30-day hassle-free return policy for most items. Ensure the product is in its original packaging." },
        { q: "How can I change my delivery address?", a: "You can update your address during checkout or in the 'Profile' section before the order is shipped." },
        { q: "Is payment on ShoppEX secure?", a: "Yes, we use Razorpay for industry-standard encryption. Your payment details are never stored on our servers." }
    ];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = chatInput.trim();
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setChatInput("");
        setIsTyping(true);

        setTimeout(() => {
            let botResponse = "I'm sorry, I'm still learning. Could you try asking about 'orders', 'refunds', or 'account'?";
            const lowerMsg = userMsg.toLowerCase();

            if (lowerMsg.includes("order") || lowerMsg.includes("track")) {
                botResponse = "You can track your latest orders in the 'Order History' section of your profile. Regular delivery usually takes 3-5 business days.";
            } else if (lowerMsg.includes("refund") || lowerMsg.includes("return")) {
                botResponse = "We offer a 30-day hassle-free return policy. You can initiate a return from your Order History for any unused item in its original packaging.";
            } else if (lowerMsg.includes("payment") || lowerMsg.includes("razorpay") || lowerMsg.includes("bill")) {
                botResponse = "We use Razorpay for secure payments. All transactions are encrypted. We accept all major cards, UPI, and Netbanking.";
            } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
                botResponse = "Hello! I'm your ShoppEX assistant. Hope you're having a great day! How can I help you with your shopping?";
            } else if (lowerMsg.includes("shoppex") || lowerMsg.includes("who are you")) {
                botResponse = "I am the ShoppEX AI assistant, here to provide you with the best shopping experience and help with any queries you might have.";
            } else if (lowerMsg.includes("offer") || lowerMsg.includes("discount") || lowerMsg.includes("coupon")) {
                botResponse = "Check our 'Offers' section in the sidebar for the latest deals! New users get 10% off their first order with code WELCOME10.";
            } else if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("support")) {
                botResponse = "You can reach our human support team at deepanshshakya669@gmail.com. We typically respond within 24 hours.";
            } else if (lowerMsg.includes("shipping") || lowerMsg.includes("delivery")) {
                botResponse = "We provide free standard shipping on orders over $50. International shipping is also available for select regions.";
            }

            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
            setIsTyping(false);

            // Auto scroll to bottom
            const chatBody = document.getElementById('chat-body');
            if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
        }, 1500);
    };

    const [showClearModal, setShowClearModal] = useState(false);

    const handleClearClick = () => {
        setShowClearModal(true);
    };

    const confirmClearChat = () => {
        const initialMsg = [{ type: 'bot', text: "Hi! I'm ShoppEX AI. Chat cleared. How can I assist you today?" }];
        setMessages(initialMsg);
        setShowClearModal(false);
    };

    const openTopicDetails = (cat) => {
        setSelectedTopic(cat);
    };

    const closeTopicDetails = () => {
        setSelectedTopic(null);
    };

    const filteredCategories = helpCategories.filter(cat =>
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="help-center-wrapper page-entry-anim">
                <div className="help-hero">
                    <div className="hero-content">
                        <h1>How can we help you today?</h1>
                        <div className="search-bar-container">
                            <i className="bi bi-search"></i>
                            <input
                                type="text"
                                placeholder="Search for articles, topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="quick-stats">
                            <span><i className="bi bi-lightning-fill me-1"></i> Popular: Tracking, Refunds, My Account</span>
                        </div>
                    </div>
                </div>

                <div className="help-content-container">
                    {/* Categories Section */}
                    {searchQuery !== "" && filteredCategories.length === 0 && filteredFaqs.length > 0 ? (
                        <div className="categories-section mini-empty">
                            <h2 className="section-title text-center mb-5 opacity-50">
                                <i className="bi bi-grid-fill me-2"></i> Browse by Category
                            </h2>
                            <div className="mini-no-results text-center py-5">
                                <div className="mini-empty-icon mb-3">
                                    <i className="bi bi-folder2-open"></i>
                                </div>
                                <h4 className="fw-bold">No categories match your search</h4>
                                <p className="text-secondary">Try a different keyword or check the FAQs below.</p>
                            </div>
                        </div>
                    ) : (
                        filteredCategories.length > 0 && (
                            <div className="categories-section">
                                <h2 className="section-title text-center mb-5">
                                    <i className="bi bi-grid-fill me-2"></i> Browse by Category
                                </h2>
                                <div className="categories-grid">
                                    {filteredCategories.map((cat, index) => (
                                        <div key={index} className="help-cat-card">
                                            <div className="cat-icon">
                                                <i className={`bi ${cat.icon}`}></i>
                                            </div>
                                            <h3>{cat.title}</h3>
                                            <p>{cat.description}</p>
                                            <button className="btn-explore" onClick={() => openTopicDetails(cat)}>
                                                View Articles <i className="bi bi-chevron-right ms-1"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}

                    {/* FAQ Section */}
                    {filteredFaqs.length > 0 && (
                        <div className="faq-section">
                            <div className="row align-items-center">
                                <div className="col-lg-5">
                                    <h2 className="section-title">
                                        <i className="bi bi-question-circle-fill me-2"></i> Frequently Asked Questions
                                    </h2>
                                    <p className="text-secondary">Can't find what you are looking for? We've gathered the most common questions from our community.</p>
                                </div>
                                <div className="col-lg-7 ps-lg-5 faq-right-col">
                                    <div className="faq-accordion">
                                        {filteredFaqs.map((faq, index) => (
                                            <div key={index} className="faq-item" onClick={() => setSelectedFaq(faq)}>
                                                <div className="faq-question">
                                                    {faq.q}
                                                    <i className="bi bi-plus-lg faq-plus-icon"></i>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Global No Results Illustration */}
                    {filteredCategories.length === 0 && filteredFaqs.length === 0 && (
                        <div className="no-results-container text-center py-5">
                            <div className="no-results-icon mb-4">
                                <i className="bi bi-search-heart"></i>
                            </div>
                            <h2 className="section-title justify-content-center">Oops! No matches found</h2>
                            <p className="text-secondary mb-4">We couldn't find anything for "{searchQuery}". Try searching for something else or chat with our AI.</p>
                            <button className="btn-contact main mx-auto" onClick={() => { setSearchQuery(""); setIsChatOpen(true); }}>
                                <i className="bi bi-chat-dots-fill me-2"></i> Ask ShoppEX AI
                            </button>
                        </div>
                    )}

                    <div className="support-cta">
                        <div className="cta-box">
                            <div className="cta-text">
                                <h2>Still need assistance?</h2>
                                <p>Our support team is available 24/7 to help you with anything you need.</p>
                            </div>
                            <div className="cta-actions">
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=deepanshshakya669@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-contact main"
                                >
                                    <i className="bi bi-envelope-fill me-2"></i> Contact via Email
                                </a>
                                <button className="btn-contact outline" onClick={() => setIsChatOpen(true)}>
                                    <i className="bi bi-chat-dots-fill me-2"></i> Live Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {selectedTopic && (
                <div className="help-modal-overlay">
                    <div className="help-modal-content topic-modal">
                        <div className="modal-header-custom horizontal mb-4">
                            <div className="mail-icon-circle smaller">
                                <i className={`bi ${selectedTopic.icon}`}></i>
                            </div>
                            <div className="modal-title-desc">
                                <h3>{selectedTopic.title}</h3>
                                <p className="text-secondary">{selectedTopic.description}</p>
                            </div>
                        </div>
                        <div className="topic-details-list">
                            {selectedTopic.details.map((detail, i) => (
                                <div key={i} className="topic-detail-item">
                                    <i className="bi bi-check-circle-fill me-3 text-success"></i>
                                    <span>{detail}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn-send-message px-5" onClick={closeTopicDetails}>
                                Got it, thanks!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedFaq && (
                <div className="help-modal-overlay">
                    <div className="help-modal-content faq-detail-modal">
                        <div className="modal-header-custom horizontal mb-4">
                            <div className="mail-icon-circle smaller faq-icon-circle">
                                <i className="bi bi-chat-left-dots-fill"></i>
                            </div>
                            <div className="modal-title-desc">
                                <h3>Quick Answer</h3>
                                <p className="text-secondary">Details regarding your inquiry</p>
                            </div>
                        </div>
                        <div className="faq-detailed-answer">
                            <h4 className="mb-3">{selectedFaq.q}</h4>
                            <div className="answer-card">
                                <p>{selectedFaq.a}</p>
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn-send-message px-5" onClick={() => setSelectedFaq(null)}>
                                Close Answer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`chat-assistant-drawer ${isChatOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <div className="chat-bot-info">
                        <div className="bot-avatar">
                            <i className="bi bi-robot"></i>
                            <span className="status-indicator"></span>
                        </div>
                        <div>
                            <h5>ShoppEX AI</h5>
                            <p>Online Support</p>
                        </div>
                    </div>
                    <div className="chat-header-actions">
                        <button className="clear-chat-btn" onClick={handleClearClick} title="Clear History">
                            <i className="bi bi-trash3"></i>
                        </button>
                        <button className="close-chat" onClick={() => setIsChatOpen(false)}>
                            <i className="bi bi-dash-lg"></i>
                        </button>
                    </div>
                </div>

                <div className="chat-body" id="chat-body">
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-row ${msg.type}`}>
                            {msg.type === 'bot' && (
                                <div className="chat-icon-circle bot">
                                    <i className="bi bi-robot"></i>
                                </div>
                            )}
                            <div className={`chat-bubble ${msg.type}`}>
                                {msg.text}
                            </div>
                            {msg.type === 'user' && (
                                <div className="chat-icon-circle user">
                                    <i className="bi bi-person-fill"></i>
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chat-row bot">
                            <div className="chat-icon-circle bot">
                                <i className="bi bi-robot"></i>
                            </div>
                            <div className="chat-bubble bot typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                </div>

                <form className="chat-footer" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button type="submit">
                        <i className="bi bi-send-fill"></i>
                    </button>
                </form>
            </div>

            {/* Custom Clear Confirmation Modal */}
            {showClearModal && (
                <div className="help-modal-overlay">
                    <div className="help-modal-content clear-chat-modal">
                        <div className="mail-icon-circle smaller danger-icon">
                            <i className="bi bi-trash3-fill"></i>
                        </div>
                        <div className="text-center mb-4">
                            <h3 className="fw-bold mb-2">Clear Chat History?</h3>
                            <p className="modal-desc-text">This action cannot be undone. All your current conversation will be erased.</p>
                        </div>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn-cancel-modal" onClick={() => setShowClearModal(false)}>
                                Cancel
                            </button>
                            <button className="btn-confirm-delete" onClick={confirmClearChat}>
                                Yes, Clear it
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <BackToTop />
        </>
    );
};

export default HelpCenter;
