import './Profile.css';
import { assets } from "../../assets/assets.js";
import { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { uploadProfileImage, updateProfile } from "../../Service/AuthService.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const Profile = () => {
    const { user, fetchUserProfile, setAuthData } = useContext(AppContext);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: ""
            });
        }
    }, [user]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await uploadProfileImage(formData);
                if (response.status === 200) {
                    toast.success("Profile image updated successfully");
                    fetchUserProfile(); // Refresh profile data
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Failed to upload image");
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            name: user.name || "",
            email: user.email || "",
            password: ""
        });
    };

    const handleSaveClick = async () => {
        try {
            const response = await updateProfile(formData);
            if (response.status === 200) {
                const updatedUser = response.data;
                const emailChanged = user.email !== updatedUser.email;
                const passwordChanged = formData.password.length > 0;

                if (emailChanged || passwordChanged) {
                    toast.success("Profile updated. Please login again.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    setAuthData(null, null);
                    navigate("/login");
                } else {
                    toast.success("Profile updated successfully");
                    setIsEditing(false);
                    fetchUserProfile();
                }
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        }
    };



    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-image-container" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                        <img src={user.profileImage || assets.profile} alt="Profile" className="profile-image" />
                        <div className="image-overlay">
                            <span>Change</span>
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                    {isEditing ? (
                        <input
                            type="text"
                            className="form-control text-center mb-2"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                        />
                    ) : (
                        <h2 className="profile-name">{user.name}</h2>
                    )}
                    <p className="profile-role">{user.role.replace('ROLE_', '')}</p>
                </div>
                <br></br>

                <div className="profile-details">
                    <div className="detail-item">
                        <label>Email Address</label>
                        {isEditing ? (
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter Email"
                            />
                        ) : (
                            <div className="detail-value">{user.email}</div>
                        )}
                    </div>

                    <div className="detail-item">
                        <label>Password</label>
                        {isEditing ? (
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="New Password"
                            />
                        ) : (
                            <div className="detail-value password-hidden">
                                <i className="bi bi-lock-fill me-2"></i>
                                Hidden due to security measures
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    {isEditing ? (
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSaveClick}>Save Changes</button>
                        </div>
                    ) : (
                        <button className="btn btn-outline-primary" onClick={handleEditClick}>
                            <i className="bi bi-pencil-square me-2"></i>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
