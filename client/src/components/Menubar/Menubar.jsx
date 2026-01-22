import './Navbar.pro.css';
import { assets } from "../../assets/assets.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const Menubar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthData, auth, user } = useContext(AppContext);
    const { theme, toggleTheme } = useTheme();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

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

    const handleThemeToggle = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Keep dropdown open
        toggleTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const isAdmin = auth.role === "ROLE_ADMIN";

    return (
        <>
            <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <Link className="sidebar-brand" to={isAdmin ? "/dashboard" : "/explore"}>
                        <div className="stationary-box">
                            <img src="/images/favicon.png" alt="Logo" className="logo-img" />
                        </div>
                        <span className="brand-text">ShoppEX</span>
                    </Link>
                    <button
                        className="sidebar-toggle"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-label="Toggle Sidebar"
                    >
                        <i className={`bi bi-chevron-${isExpanded ? 'left' : 'right'}`}></i>
                    </button>
                </div>

                <div className="sidebar-content">
                    <ul className="sidebar-nav">
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} to="/dashboard">
                                    <div className="stationary-box">
                                        <i className="bi bi-speedometer2"></i>
                                    </div>
                                    <span className="link-text">Dashboard</span>
                                </Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/explore') ? 'active' : ''}`} to="/explore">
                                <div className="stationary-box">
                                    <i className="bi bi-compass"></i>
                                </div>
                                <span className="link-text">Explore</span>
                            </Link>
                        </li>
                        {isAdmin && (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/items') ? 'active' : ''}`} to="/items">
                                        <div className="stationary-box">
                                            <i className="bi bi-box-seam"></i>
                                        </div>
                                        <span className="link-text">Manage Items</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/category') ? 'active' : ''}`} to="/category">
                                        <div className="stationary-box">
                                            <i className="bi bi-tags"></i>
                                        </div>
                                        <span className="link-text">Manage Categories</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/users') ? 'active' : ''}`} to="/users">
                                        <div className="stationary-box">
                                            <i className="bi bi-people"></i>
                                        </div>
                                        <span className="link-text">Manage Users</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/orders') ? 'active' : ''}`} to="/orders">
                                <div className="stationary-box">
                                    <i className="bi bi-clock-history"></i>
                                </div>
                                <span className="link-text">Orders</span>
                            </Link>
                        </li>
                        {isAdmin ? (
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/admin-feedback') ? 'active' : ''}`} to="/admin-feedback">
                                    <div className="stationary-box">
                                        <i className="bi bi-chat-left-text"></i>
                                    </div>
                                    <span className="link-text">Feedbacks</span>
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/feedback') ? 'active' : ''}`} to="/feedback">
                                    <div className="stationary-box">
                                        <i className="bi bi-chat-left-dots"></i>
                                    </div>
                                    <span className="link-text">Feedback</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="sidebar-theme-section" onClick={handleThemeToggle} title="Toggle Theme">
                    <div className="stationary-box">
                        <i className={`bi bi-${theme === 'dark' ? 'moon-stars-fill' : 'sun-fill'}`}></i>
                    </div>
                    <span className="link-text">Appearance</span>
                    <div className={`theme-toggle-switch ms-auto me-3 ${theme === 'dark' ? 'active' : ''}`}>
                        <div className="toggle-thumb"></div>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <div className="user-section dropup">
                        <div className="user-info dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                            <div className="stationary-box">
                                <img src={user?.profileImage || assets.profile} alt="Profile" className="user-avatar" />
                            </div>
                            <div className="user-details">
                                <span className="user-name">{user?.name || 'User'}</span>
                                <span className="user-role">{auth.role?.replace('ROLE_', '')}</span>
                            </div>
                        </div>
                        <ul className="dropdown-menu shadow-lg" aria-labelledby="userDropdown">
                            <li><Link to="/profile" className="dropdown-item"><i className="bi bi-person me-2"></i>Profile</Link></li>
                            <li><Link to="/help" className="dropdown-item"><i className="bi bi-question-circle me-2"></i>Help Center</Link></li>
                            <li><Link to="/about" className="dropdown-item"><i className="bi bi-info-circle me-2"></i>About Us</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item text-danger" onClick={handleLogoutClick}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Premium Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="logout-modal-overlay">
                    <div className="logout-modal-content">
                        <div className="logout-icon-wrapper">
                            <i className="bi bi-box-arrow-right"></i>
                        </div>
                        <h3>Oh no! Leaving?</h3>
                        <p>Are you sure you want to logout? You'll need to login again to access your premium shopping experience.</p>
                        <div className="logout-modal-actions">
                            <button className="logout-btn-cancel" onClick={() => setShowLogoutModal(false)}>
                                Stay logged in
                            </button>
                            <button className="logout-btn-confirm" onClick={confirmLogout}>
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Menubar;