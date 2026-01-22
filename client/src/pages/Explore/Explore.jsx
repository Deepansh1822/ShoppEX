// import './Explore.css';
import './Explore.pro.css';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory.jsx";
import DisplayItems from "../../components/DisplayItems/DisplayItems.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const Explore = () => {
    const { categories } = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    return (
        <div className="explore-container page-entry-anim">
            <div className="explore-header d-flex justify-content-between align-items-center">
                <div className="header-content">
                    <h2 className="mb-0">
                        <i className="bi bi-compass-fill me-3"></i>Explore Shopping
                    </h2>
                    <p className="explore-subtitle">Browse our curated collection of premium products</p>
                </div>
                <button className="custom-cart-btn shadow-sm" onClick={() => navigate('/cart')}>
                    <i className="bi bi-cart me-2"></i> Go to Cart
                </button>
            </div>
            <div className="content-column">
                <h3 className="section-title">
                    <i className="bi bi-grid-3x3-gap me-2"></i> Browse Categories
                </h3>
                <div className="first-row">
                    <DisplayCategory
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories} />
                </div>
                <hr className="horizontal-line" />
                <div className="second-row">
                    <DisplayItems selectedCategory={selectedCategory} />
                </div>
            </div>
            <Footer />
            <BackToTop />
        </div>
    )
}

export default Explore;