// import './SignUp.css';
import './SignUp.pro.css';
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import { register } from "../../Service/AuthService.js";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const Signup = () => {
    const navigate = useNavigate();
    const { setAuthData } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER"
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await register(data);
            if (response.status === 200) {
                toast.success("Registration successful");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setAuthData(response.data.token, response.data.role);
                navigate("/explore");
            }
        } catch (error) {
            console.error(error);
            toast.error("Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="signup-split-container page-entry-anim">
            {/* Left Section: Branding & Image */}
            <div className="signup-left-section" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%), url(${assets.signin_img})` }}>
                <div className="signup-branding-content">
                    <img src={assets.welcomelogo} alt="ShoppEX Logo" className="signup-side-logo mb-4" />
                    <div className="branding-divider mb-4"></div>
                    <p className="branding-tagline">JOIN THE FUTURE OF COMMERCE</p>
                </div>
            </div>

            {/* Right Section: Form */}
            <div className="signup-right-section d-flex align-items-center justify-content-center">
                <div className="signup-form-card w-100" style={{ maxWidth: '420px' }}>
                    <Link to="/" className="back-link mb-4 d-inline-block">
                        <i className="bi bi-chevron-left"></i> Back to Home
                    </Link>
                    
                    <div className="form-header mb-5">
                        <h2 className="fw-extra-bold">Create Account</h2>
                        <p className="text-secondary">Get started with our advanced management tools.</p>
                    </div>
                    
                    <form onSubmit={onSubmitHandler} className="custom-form">
                        <div className="input-field mb-3">
                            <label>Full Name</label>
                            <div className="input-wrapper">
                                <i className="bi bi-person field-icon"></i>
                                <input type="text" name="name" id="name" placeholder="Enter your name" onChange={onChangeHandler} value={data.name} required />
                            </div>
                        </div>

                        <div className="input-field mb-3">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <i className="bi bi-envelope-at field-icon"></i>
                                <input type="email" name="email" id="email" placeholder="name@company.com" onChange={onChangeHandler} value={data.email} required />
                            </div>
                        </div>

                        <div className="input-field mb-4">
                            <label>Secure Password</label>
                            <div className="input-wrapper">
                                <i className="bi bi-shield-lock field-icon"></i>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    onChange={onChangeHandler} 
                                    value={data.password} 
                                    required 
                                />
                                <i 
                                    className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} toggle-password`} 
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn mt-4" disabled={loading}>
                            {loading ? (
                                <div className="spinner-border spinner-border-sm" role="status"></div>
                            ) : (
                                <>Create Account <i className="bi bi-person-plus ms-2"></i></>
                            )}
                        </button>

                        <div className="auth-footer text-center mt-4">
                            <span className="text-muted">Already registered?</span>
                            <Link to="/login" className="ms-2 login-link">Sign in instead</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
