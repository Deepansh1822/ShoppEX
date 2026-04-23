// import './Login.css';
import './Login.pro.css';
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { login } from "../../Service/AuthService.js";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";

const Login = () => {
    const { setAuthData } = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
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
            const response = await login(data);
            if (response.status === 200) {
                toast.success("Login successfull");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setAuthData(response.data.token, response.data.role);
                if (response.data.role === 'ROLE_ADMIN') {
                    navigate("/dashboard");
                } else {
                    navigate("/explore");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Email/Password Invalid");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-split-container page-entry-anim">
            {/* Left Section: Branding & Image */}
            <div className="login-left-section" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%), url(${assets.login_img})` }}>
                <div className="login-branding-content">
                    <img src={assets.welcomelogo} alt="ShoppEX Logo" className="login-side-logo mb-4" />
                    <div className="branding-divider mb-4"></div>
                    <p className="branding-tagline">MASTER YOUR BUSINESS WITH PRECISION</p>
                </div>
            </div>

            {/* Right Section: Form */}
            <div className="login-right-section d-flex align-items-center justify-content-center">
                <div className="login-form-card w-100" style={{ maxWidth: '420px' }}>
                    <Link to="/" className="back-link mb-4 d-inline-block">
                        <i className="bi bi-chevron-left"></i> Back to Home
                    </Link>
                    
                    <div className="form-header mb-5">
                        <h2 className="fw-extra-bold">Login to Account</h2>
                        <p className="text-secondary">Enter your credentials to access the management hub.</p>
                    </div>
                    
                    <form onSubmit={onSubmitHandler} className="custom-form">
                        <div className="input-field mb-4">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <i className="bi bi-envelope-at field-icon"></i>
                                <input type="email" name="email" id="email" placeholder="admin@shoppex.com" onChange={onChangeHandler} value={data.email} required />
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
                                <>Access Dashboard <i className="bi bi-arrow-right ms-2"></i></>
                            )}
                        </button>

                        <div className="auth-footer text-center mt-5">
                            <span className="text-muted">New to the platform?</span>
                            <Link to="/signup" className="ms-2 signup-link">Create an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;