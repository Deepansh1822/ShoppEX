import './Welcome.css';
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Welcome = () => {
    const navigate = useNavigate();
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [showLogo, setShowLogo] = useState(false);

    const fullText1 = "Hello Mate,";
    const fullText2 = "Welcome to";

    useEffect(() => {
        let i = 0;
        let j = 0;
        const typeText1 = () => {
            if (i < fullText1.length) {
                setText1(fullText1.substring(0, i + 1));
                i++;
                setTimeout(typeText1, 100);
            } else {
                setTimeout(typeText2, 500); // Pause before second text
            }
        };

        const typeText2 = () => {
            if (j < fullText2.length) {
                setText2(fullText2.substring(0, j + 1));
                j++;
                setTimeout(typeText2, 100);
            } else {
                setShowLogo(true);
            }
        };

        typeText1();
    }, []);

    return (
        <div className="welcome-container" style={{ backgroundImage: `url(${assets.welcomebg})` }}>
            <div className="welcome-header">
                <button className="btn btn-outline-light me-2" onClick={() => navigate('/signup')}>Sign Up</button>
                <h3 className="or-class">or</h3>
                <button className="btn btn-warning" onClick={() => navigate('/login')}>Log In</button>
            </div>
            <div className="welcome-content">
                <h1 className="welcome-text" style={{ minHeight: '3rem' }}>{text1}</h1>
                <div className="welcome-sub-content">
                    <h1 className="welcome-text" style={{ minHeight: '3rem' }}>{text2}</h1>
                    <img
                        src={assets.welcomelogo}
                        alt="Logo"
                        className={`welcome-logo ${showLogo ? 'visible' : ''}`}
                    />
                </div>
            </div>
        </div>
    )
}

export default Welcome;
