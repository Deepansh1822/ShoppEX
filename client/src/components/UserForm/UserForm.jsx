import { useState } from "react";
import { addUser } from "../../Service/UserService.js";
import { assets } from "../../assets/assets.js";
import toast from "react-hot-toast";

const UserForm = ({ setUsers }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER"
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("user", JSON.stringify(data));
        if (image) {
            formData.append("file", image);
        }

        try {
            const response = await addUser(formData);
            setUsers((prevUsers) => [...prevUsers, response.data]);
            toast.success("User Added");
            setData({
                name: "",
                email: "",
                password: "",
                role: "ROLE_USER",
            })
            setImage(false);
        } catch (e) {
            console.error(e);
            toast.error("Error adding user");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-3 d-flex justify-content-center">
                                <label htmlFor="image" className="form-label" style={{ cursor: 'pointer' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '3px solid var(--border-color)',
                                        boxShadow: 'var(--card-shadow)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'var(--bg-secondary)'
                                    }}>
                                        <img
                                            src={image ? URL.createObjectURL(image) : assets.upload}
                                            alt=""
                                            style={{
                                                width: image ? '100%' : '40px',
                                                height: image ? '100%' : '40px',
                                                objectFit: image ? 'cover' : 'contain',
                                                opacity: image ? 1 : 0.5
                                            }}
                                        />
                                    </div>
                                    <div className="text-center mt-2 small text-muted upload-text">Upload Photo</div>
                                </label>
                                <input type="file" name="image" id="image" className='form-control' hidden onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Jhon Doe"
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="yourname@example.com"
                                    onChange={onChangeHandler}
                                    value={data.email}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="**************"
                                    onChange={onChangeHandler}
                                    value={data.password}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                                {loading ? "Loading..." : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm;