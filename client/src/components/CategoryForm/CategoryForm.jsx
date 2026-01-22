import { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import toast from "react-hot-toast";
import { addCategory } from "../../Service/CategoryService.js";
import { AppContext } from "../../context/AppContext.jsx";

// Helper to determine text contrast
const isBrightColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 155;
}

const CategoryForm = () => {
    const { setCategories, categories } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error("Select image for category");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        formData.append("file", image);
        try {
            const response = await addCategory(formData);
            if (response.status === 201) {
                setCategories([...categories, response.data]);
                toast.success("Category added");
                setData({
                    name: "",
                    description: "",
                    bgColor: "#2c2c2c",
                });
                setImage(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("Error adding category");
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
                                    placeholder="Category Name"
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    rows="5"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    placeholder="Write content here.."
                                    onChange={onChangeHandler}
                                    value={data.description}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Background Color</label>
                                <div className="d-flex align-items-center">
                                    <label htmlFor="bgcolor" style={{
                                        cursor: 'pointer',
                                        width: '100%',
                                        height: '45px',
                                        backgroundColor: 'var(--accent-primary)',
                                        borderRadius: '8px',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ffffff',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease'
                                    }}
                                        className="color-picker-label shadow-sm"
                                    >
                                        <span style={{
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: data.bgColor,
                                            borderRadius: '50%',
                                            border: '2px solid rgba(255,255,255,0.8)',
                                            marginRight: '10px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}></span>
                                        {data.bgColor.toUpperCase()}
                                        <i className="bi bi-pencil-square ms-2 opacity-75"></i>
                                    </label>
                                    <input type="color"
                                        name="bgColor"
                                        id="bgcolor"
                                        onChange={onChangeHandler}
                                        value={data.bgColor}
                                        style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                                    />
                                </div>
                                <div className="form-text mt-2 small text-muted-custom">
                                    <i className="bi bi-info-circle me-1"></i> Click the button to choose a theme color
                                </div>
                            </div>
                            <button type="submit"
                                disabled={loading}
                                className="btn btn-warning w-100">{loading ? "Loading..." : "Save"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm;