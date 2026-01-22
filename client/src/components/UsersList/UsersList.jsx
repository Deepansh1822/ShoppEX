import { useState } from "react";
import { deleteUser } from "../../Service/UserService.js";
import toast from "react-hot-toast";

const UsersList = ({ users, setUsers, loading }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteByUserId = async (id) => {
        try {
            await deleteUser(id);
            setUsers(prevUsers => prevUsers.filter(user => user.userId !== id));
            toast.success("User deleted");
        } catch (e) {
            console.error(e);
            toast.error("Unable to deleting user");
        }
    }


    return (
        <div className="users-list-container">
            <div className="row pe-2">
                <div className="input-group mb-3">
                    <input type="text"
                        name="keyword"
                        id="keyword"
                        placeholder="Search by keyword"
                        className="form-control"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search text-dark"></i>
                    </span>
                </div>
            </div>
            <div className="row g-3 pe-2">
                {
                    loading ? (
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        filteredUsers.length === 0 ? (
                            <div className="col-12 text-center py-5 empty-users-fallback">
                                <i className="bi bi-people-fill opacity-25" style={{ fontSize: '3rem', display: 'block' }}></i>
                                <p className="text-muted mt-3">No matching users found in the directory.</p>
                            </div>
                        ) : (
                            filteredUsers.map((user, index) => (
                                <div key={index} className="col-12">
                                    <div className="card p-3 user-card" style={{ maxWidth: '100%' }}>
                                        <div className="d-flex align-items-center">
                                            <div className="me-3">
                                                <img
                                                    src={user.profileImage || "https://ui-avatars.com/api/?name=" + user.name + "&background=random"}
                                                    alt={user.name}
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                        border: '2px solid var(--border-color)'
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="mb-1">{user.name}</h5>
                                                <p className="mb-0">{user.email}</p>
                                            </div>
                                            <div>
                                                <button className="btn btn-danger btn-sm btn-circle" onClick={() => deleteByUserId(user.userId)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    )
                }
            </div>
        </div>
    )
}

export default UsersList;