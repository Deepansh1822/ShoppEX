// import './Item.css';
import './Item.pro.css';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Item = ({ itemName, itemPrice, itemImage, itemId }) => {
    const { addToCart } = useContext(AppContext);
    const navigate = useNavigate();
    const handleAddToCart = () => {
        addToCart({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            itemId: itemId
        });
    }
    return (
        <div className="item-card-container">
            <div className="item-content-left">
                <img src={itemImage} alt={itemName} className="item-image" />
                <div className="item-details">
                    <h6 className="item-name">{itemName}</h6>
                    <p className="item-price">₹{itemPrice}</p>
                </div>
            </div>

            <div className="item-actions">
                <i className="bi bi-cart-plus cart-icon" onClick={handleAddToCart}></i>
                <button className="btn btn-success btn-sm view-btn" onClick={() => navigate(`/item/${itemId}`)}>
                    View
                </button>
            </div>
        </div>
    )
}

export default Item;