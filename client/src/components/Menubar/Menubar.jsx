import './Menubar.css';
import { assets } from "../../assets/assets.js";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const Menubar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthData, auth, user } = useContext(AppContext);
    const { toggleTheme } = useTheme();
    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    }

    const confirmLogout = () => {
        setShowLogoutModal(false);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthData(null, null);
        navigate("/login");
    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    const isAdmin = auth.role === "ROLE_ADMIN";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <a className="navbar-brand" href="#">
                <img src={assets.logo} alt="Logo" height="80" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse p-2" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                        isAdmin && (
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/dashboard') ? 'fw-bold text-warning' : ''}`} to="/dashboard">Dashboard</Link>
                            </li>
                        )
                    }
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/explore') ? 'fw-bold text-warning' : ''}`} to="/explore">Explore</Link>
                    </li>
                    {
                        isAdmin && (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/items') ? 'fw-bold text-warning' : ''}`} to="/items">Manage Items</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/category') ? 'fw-bold text-warning' : ''}`} to="/category">Manage Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/users') ? 'fw-bold text-warning' : ''}`} to="/users">Manage Users</Link>
                                </li>
                            </>
                        )
                    }
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/orders') ? 'fw-bold text-warning' : ''}`} to="/orders">Order History</Link>
                    </li>
                    {
                        isAdmin && (
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/admin-feedback') ? 'fw-bold text-warning' : ''}`} to="/admin-feedback">User's Feedbacks</Link>
                            </li>
                        )
                    }
                    {
                        !isAdmin && (
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/feedback') ? 'fw-bold text-warning' : ''}`} to="/feedback">Feedback</Link>
                            </li>
                        )
                    }
                </ul>
                {/*Add the dropdown for userprofile*/}
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setShowThemeMenu(false)}>
                            <img src={user?.profileImage || assets.profile} alt="" height={32} width={32} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li>
                                <Link to="/profile" className="dropdown-item">
                                    Profile
                                </Link>
                            </li>
                            <li className="position-relative">
                                <a
                                    className="dropdown-item dropdown-toggle"
                                    href="#!"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowThemeMenu(!showThemeMenu);
                                    }}
                                >
                                    Theme
                                </a>
                                <ul className={`dropdown-menu dropdown-submenu ${showThemeMenu ? 'show' : ''}`} style={{ top: '0', right: '100%', marginTop: '-1px' }}>
                                    <li><a className="dropdown-item" href="#!" onClick={() => toggleTheme('light')}>Light Mode</a></li>
                                    <li><a className="dropdown-item" href="#!" onClick={() => toggleTheme('dark')}>Dark Mode</a></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/about" className="dropdown-item">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a href="#!" className="dropdown-item" onClick={handleLogoutClick}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                            <div className="modal-header" style={{ borderBottomColor: 'var(--border-color)' }}>
                                <h5 className="modal-title">Confirm Logout</h5>
                                <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)} aria-label="Close" style={{ filter: 'var(--btn-close-filter)' }}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you really want to logout?</p>
                            </div>
                            <div className="modal-footer" style={{ borderTopColor: 'var(--border-color)' }}>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Menubar;