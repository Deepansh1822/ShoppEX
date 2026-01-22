import './ManageUsers.pro.css';
import UserForm from "../../components/UserForm/UserForm.jsx";
import UsersList from "../../components/UsersList/UsersList.jsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchUsers } from "../../Service/UserService.js";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Unable to fetch users");
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    const adminCount = users.filter(u => u.role === 'ROLE_ADMIN').length;

    return (
        <div className="manage-users-wrapper page-entry-anim">
            <div className="header-container">
                <div className="header-content">
                    <h2 className="page-title">
                        <i className="bi bi-person-workspace me-3"></i>
                        IAM Console
                        <span className="badge-status security">SECURE</span>
                    </h2>
                    <p className="page-subtitle">Centralized identity and access management for system operators</p>
                </div>
            </div>

            <div className="stats-dashboard">
                <div className="stat-card-premium">
                    <div className="stat-icon-box blue">
                        <i className="bi bi-people-fill"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Total Identities</span>
                        <h4 className="stat-value">{users.length}</h4>
                    </div>
                </div>
                <div className="stat-card-premium">
                    <div className="stat-icon-box purple">
                        <i className="bi bi-shield-lock-fill"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Privileged Users</span>
                        <h4 className="stat-value">{adminCount}</h4>
                    </div>
                </div>
                <div className="stat-card-premium">
                    <div className="stat-icon-box green">
                        <i className="bi bi-activity"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">System Access</span>
                        <h4 className="stat-value">Active</h4>
                    </div>
                    <div className="stat-indicator pulse"></div>
                </div>
            </div>

            <div className="users-content-container">
                <div className="left-column">
                    <h3 className="column-title">
                        <i className="bi bi-person-plus-fill me-2"></i> Identity Provisioning
                    </h3>
                    <div className="column-content">
                        <UserForm setUsers={setUsers} />
                    </div>
                </div>
                <div className="right-column">
                    <h3 className="column-title">
                        <i className="bi bi-fingerprint me-2"></i> User Registry
                    </h3>
                    <div className="column-content">
                        <UsersList users={users} setUsers={setUsers} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageUsers;