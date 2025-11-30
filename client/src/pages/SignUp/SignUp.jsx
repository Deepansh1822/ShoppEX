import './SignUp.css';
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
        <div className="bg-light d-flex align-items-center justify-content-center vh-100 signup-background" style={{ backgroundImage: `url(${assets.signin_img})` }}>
            <div className="card shadow-lg w-100 signup-card" style={{ maxWidth: '480px' }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title">Sign Up</h1>
                        <p className="card-text text-muted">
                            Create your Account
                        </p>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={onSubmitHandler} autoComplete="off">
                            <div className="form-floating mb-3">
                                <input type="text" name="name" id="name" className="form-control" placeholder="Name" onChange={onChangeHandler} value={data.name} required autoComplete="off" />
                                <label htmlFor="name" className="text-muted">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" name="email" id="email" className="form-control" placeholder="Email" onChange={onChangeHandler} value={data.email} required autoComplete="off" />
                                <label htmlFor="email" className="text-muted">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" name="password" id="password" className="form-control" placeholder="Password" onChange={onChangeHandler} value={data.password} required autoComplete="new-password" />
                                <label htmlFor="password" className="text-muted">Password</label>
                            </div>

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
                                    {loading ? "Loading..." : "Sign Up"}
                                </button>
                            </div>
                            <div className="text-center mt-3">
                                <Link to="/login" className="text-decoration-none">Already registered? Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
