import { useContext } from 'react';
import './ManageCategory.pro.css';
import CategoryForm from "../../components/CategoryForm/CategoryForm.jsx";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";
import { AppContext } from "../../context/AppContext.jsx";

const ManageCategory = () => {
    const { categories } = useContext(AppContext);

    return (
        <div className="manage-category-wrapper page-entry-anim">
            <div className="header-container">
                <div className="header-content">
                    <h2 className="page-title">
                        <i className="bi bi-collection-fill me-3"></i>
                        Management Hub
                        <span className="badge-status">Admin Mode</span>
                    </h2>
                    <p className="page-subtitle">Configure and oversee your product taxonomy with precision</p>
                </div>
            </div>

            <div className="stats-dashboard">
                <div className="stat-card-premium">
                    <div className="stat-icon-box purple">
                        <i className="bi bi-tags"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Total Collections</span>
                        <h4 className="stat-value">{categories.length}</h4>
                    </div>
                    <div className="stat-chart-mini">
                        <div className="bar" style={{ height: '40%' }}></div>
                        <div className="bar" style={{ height: '70%' }}></div>
                        <div className="bar" style={{ height: '55%' }}></div>
                        <div className="bar" style={{ height: '90%' }}></div>
                    </div>
                </div>
                <div className="stat-card-premium">
                    <div className="stat-icon-box gold">
                        <i className="bi bi-lightning-charge"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">System Health</span>
                        <h4 className="stat-value">Optimal</h4>
                    </div>
                    <div className="stat-indicator pulse"></div>
                </div>
                <div className="stat-card-premium">
                    <div className="stat-icon-box blue">
                        <i className="bi bi-calendar-check"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Last Updated</span>
                        <h4 className="stat-value">Just Now</h4>
                    </div>
                </div>
            </div>

            <div className="category-content-container">
                <div className="left-column">
                    <h3 className="column-title">
                        <i className="bi bi-plus-circle-dotted me-2"></i> Register New Category
                    </h3>
                    <div className="column-content">
                        <CategoryForm />
                    </div>
                </div>
                <div className="right-column">
                    <h3 className="column-title">
                        <i className="bi bi-list-stars me-2"></i> Active Database
                    </h3>
                    <div className="column-content">
                        <CategoryList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCategory;