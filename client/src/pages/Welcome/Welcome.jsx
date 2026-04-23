import './Welcome.pro.css';
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Welcome = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the cinematic entrance after a small delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="welcome-container page-entry-anim" style={{ backgroundImage: `url(${assets.welcomebg})` }}>
            {/* The Final Apex Layers */}
            <div className="scanline"></div>
            <div className="cyber-grid"></div>
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        '--d': `${5 + Math.random() * 10}s`,
                        animationDelay: `${Math.random() * 5}s`
                    }}></div>
                ))}
            </div>

            <div className="neon-corner top-left"></div>
            <div className="neon-corner bottom-right"></div>

            <div className="welcome-header">
                <button className="btn btn-cyber-outline" onClick={() => navigate('/signup')}>Sign Up</button>
                <h3 className="or-class">or</h3>
                <button className="btn btn-cyber-gold" onClick={() => navigate('/login')}>Log In</button>
            </div>

            <div className="welcome-content">
                <img
                    src={assets.welcomelogo}
                    alt="Logo"
                    className={`welcome-logo ${isVisible ? 'visible' : ''}`}
                />
                <div className="text-reveal-container mt-4">
                    <h1 className={`welcome-text revelation-effect ${isVisible ? 'active' : ''}`}>
                        Experience
                    </h1>
                </div>
                <div className="text-reveal-container">
                    <h1 className={`welcome-text revelation-effect delay-1 ${isVisible ? 'active' : ''}`}>
                        Modern Billing
                    </h1>
                </div>
                <p className={`welcome-text-sub fade-up-effect ${isVisible ? 'active' : ''}`}>
                    MANAGEMENT HUB OF THE FUTURE
                </p>
            </div>

            <div className="scroll-module">
                <div className="scroll-line"></div>
                <div className="or-class" style={{ fontSize: '0.7rem' }}>SCROLL</div>
            </div>
        </div>
    )
}

export default Welcome;
