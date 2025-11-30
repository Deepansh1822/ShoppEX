import './Login.css';
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
            // console.log("LOGIN RESPONSE:", response.data);
            // console.log("TOKEN:", response.data.token);
            console.log("FORM SUBMITTED");
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
        <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background" style={{ backgroundImage: `url(${assets.login_img})` }}>
            <div className="card shadow-lg w-100 login-card" style={{ maxWidth: '480px' }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title">Login</h1>
                        <p className="card-text text-muted">
                            Login below to Access your Account
                        </p>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={onSubmitHandler} autoComplete="off">
                            <div className="form-floating mb-4">
                                <input type="text" name="email" id="email" placeholder="Enter Email" className="form-control" onChange={onChangeHandler} value={data.email} autoComplete="off" />
                                <label htmlFor="email" className="text-muted">
                                    Email
                                </label>
                            </div>
                            <div className="form-floating mb-4">
                                <input type="password" name="password" id="password" placeholder="**********" className="form-control" onChange={onChangeHandler} value={data.password} autoComplete="new-password" />
                                <label htmlFor="password" className="text-muted">
                                    Password
                                </label>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
                                    {loading ? "Loading..." : "Login"}
                                </button>
                            </div>
                            <div className="text-center mt-3">
                                <Link to="/signup" className="text-decoration-none">If not registered? Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;