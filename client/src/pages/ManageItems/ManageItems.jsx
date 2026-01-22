import { useContext } from 'react';
import './ManageItems.pro.css';
import ItemForm from "../../components/ItemForm/ItemForm.jsx";
import ItemList from "../../components/ItemList/ItemList.jsx";
import { AppContext } from "../../context/AppContext.jsx";

const ManageItems = () => {
    const { itemsData } = useContext(AppContext);

    return (
        <div className="manage-items-wrapper page-entry-anim">
            <div className="header-container">
                <div className="header-content">
                    <h2 className="page-title">
                        <i className="bi bi-boxes me-3"></i>
                        Inventory Control
                        <span className="badge-status online">Live Inventory</span>
                    </h2>
                    <p className="page-subtitle">Granular management of your digital storefront assets</p>
                </div>
            </div>

            <div className="stats-dashboard">
                <div className="stat-card-premium">
                    <div className="stat-icon-box blue">
                        <i className="bi bi-box-seam"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Total SKUs</span>
                        <h4 className="stat-value">{itemsData.length}</h4>
                    </div>
                </div>
                <div className="stat-card-premium">
                    <div className="stat-icon-box green">
                        <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Stock Status</span>
                        <h4 className="stat-value">Available</h4>
                    </div>
                </div>
                <div className="stat-card-premium">
                    <div className="stat-icon-box purple">
                        <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Active Listings</span>
                        <h4 className="stat-value">{itemsData.length}</h4>
                    </div>
                </div>
            </div>

            <div className="items-content-container">
                <div className="left-column">
                    <h3 className="column-title">
                        <i className="bi bi-pencil-square me-2"></i> Catalog Entry
                    </h3>
                    <div className="column-content">
                        <ItemForm />
                    </div>
                </div>
                <div className="right-column">
                    <h3 className="column-title">
                        <i className="bi bi-database-fill-gear me-2"></i> Master List
                    </h3>
                    <div className="column-content">
                        <ItemList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageItems;