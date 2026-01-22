import React from 'react';
import './About.pro.css';
import BackToTop from "../../components/BackToTop/BackToTop.jsx";

const About = () => {
    return (
        <div className="about-container page-entry-anim">
            <div className="header-container justify-content-center text-center mb-4">
                <div className="header-content">
                    <h2 className="page-title">
                        <i className="bi bi-info-circle-fill me-3"></i>About Us
                    </h2>
                    <p className="page-subtitle" style={{ color: '#ffc107', fontWeight: '600' }}>
                        Building the future of seamless shopping.
                    </p>
                </div>
            </div>

            <div className="about-content">
                {/* Section 1: About the Application */}
                <section className="about-section">
                    <h2 className="section-title">
                        <i className="bi bi-app-indicator me-3"></i>About the Application
                    </h2>
                    <p style={{ textAlign: 'justify' }}>
                        <strong>ShoppEX</strong> is a modern and user-friendly e-commerce application designed to make online shopping simple, fast, and enjoyable.
                        The app offers a seamless experience where users can explore a wide range of products, compare prices, and shop with confidence.
                        With an intuitive interface, smart navigation, and real-time updates, ShoppEX allows users to find exactly what they need with ease.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        Our goal is to provide convenience, reliability, and great value through a secure and efficient shopping platform.
                        From browsing to checkout and delivery, ShoppEX ensures a smooth and trustworthy user experience.
                        Whether you're searching for daily essentials or trending items, ShoppEX brings everything together in one easy-to-use app.
                    </p>
                    <div className="vision-box">
                        <h5><i className="bi bi-eye-fill me-2"></i>Our Vision</h5>
                        <p className="mb-0">To become the most customer-centric shopping destination, where quality meets convenience.</p>
                    </div>
                </section>

                {/* Section 2: About the Company / Team */}
                <section className="about-section">
                    <h2 className="section-title">
                        <i className="bi bi-person-workspace me-3"></i>Meet the Developer
                    </h2>
                    <div className="team-card">
                        <div className="team-info">
                            <div className="vision-box mt-0 mb-3">
                                <h3 className="mb-1">Deepansh Shakya</h3>
                                <span className="role"><i className="bi bi-mortarboard-fill me-2"></i>Java Developer & Creator</span>
                            </div>
                            <p style={{ textAlign: 'justify' }}>
                                Driven by a passion for technology and user experience, I built this application to solve real-world shopping challenges & extending my development skills.
                                My focus is on creating simple, secure, and scalable solutions that make a difference.
                            </p>
                            <p className="values">
                                <strong><i className="bi bi-heart-fill me-2"></i>Values:</strong> Quality &#9679; Trust &#9679; Innovation
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Contact Information */}
                <section className="about-section">
                    <h2 className="section-title">
                        <i className="bi bi-envelope-at me-3"></i>Get in Touch
                    </h2>
                    <div className="contact-grid">
                        <a href="mailto:deepanshshakya669@gmail.com" className="contact-item text-decoration-none">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" style={{ width: '40px', height: '40px', marginBottom: '10px' }} />
                            <h5 className="mb-0">Email</h5>
                        </a>
                        <a href="https://github.com/Deepansh1822" target="_blank" rel="noopener noreferrer" className="contact-item text-decoration-none">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" alt="GitHub" style={{ width: '40px', height: '40px', marginBottom: '10px' }} />
                            <h5 className="mb-0">GitHub</h5>
                        </a>
                        <a href="https://www.linkedin.com/in/deepansh-shakya-b9092b267" target="_blank" rel="noopener noreferrer" className="contact-item text-decoration-none">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" style={{ width: '40px', height: '40px', marginBottom: '10px' }} />
                            <h5 className="mb-0">LinkedIn</h5>
                        </a>
                    </div>
                </section>

                {/* Section 4: Version & Technical Info */}
                <section className="about-section tech-section">
                    <h2 className="section-title">
                        <i className="bi bi-gear-wide-connected me-3"></i>Technical Details
                    </h2>
                    <div className="tech-info">
                        <div className="tech-row">
                            <span className="tech-label"><i className="bi bi-browser-safari me-2"></i>Front-End</span>
                            <div className="tech-tags justify-content-end flex-wrap">
                                <span className="badge bg-primary">CSS</span>
                                <span className="badge bg-warning text-dark">JavaScript</span>
                                <span className="badge bg-info text-dark">Bootstrap</span>
                                <span className="badge bg-primary">React</span>
                            </div>
                        </div>
                        <div className="tech-row">
                            <span className="tech-label"><i className="bi bi-database-fill-gear me-2"></i>Back-End</span>
                            <div className="tech-tags justify-content-end flex-wrap">
                                <span className="badge bg-success">Spring Boot</span>
                                <span className="badge bg-secondary">Spring Security</span>
                                <span className="badge bg-dark">RESTful Web Services</span>
                                <span className="badge bg-info text-dark">JPA</span>
                                <span className="badge bg-primary">MySQL</span>
                                <span className="badge bg-warning text-dark">Thymeleaf</span>
                            </div>
                        </div>
                        <div className="tech-row">
                            <span className="tech-label"><i className="bi bi-tools me-2"></i>Tools</span>
                            <div className="tech-tags justify-content-end flex-wrap">
                                <span className="badge bg-success">Spring Tool Suite</span>
                                <span className="badge bg-primary">Google Antigravity IDE</span>
                                <span className="badge bg-info text-dark">MySQL Workbench</span>
                                <span className="badge bg-warning text-dark">Postman</span>
                            </div>
                        </div>
                        <div className="tech-row">
                            <span className="tech-label"><i className="bi bi-clouds-fill me-2"></i>Services</span>
                            <div className="tech-tags justify-content-end flex-wrap">
                                <span className="badge bg-primary">Razorpay</span>
                                <span className="badge bg-warning text-dark">Amazon AWS Console</span>
                            </div>
                        </div>
                        <div className="tech-row">
                            <span className="tech-label"><i className="bi bi-patch-check-fill me-2"></i>App Version</span>
                            <span className="tech-value">1.0.0</span>
                        </div>
                        <div className="tech-row">
                            <span className="tech-label"><i className="bi bi-calendar-event-fill me-2"></i>Last Update</span>
                            <span className="tech-value">December 2025</span>
                        </div>
                    </div>
                </section>
            </div>
            <BackToTop />
        </div>
    );
};

export default About;
