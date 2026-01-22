// import './CartItems.css';
import './CartItems.pro.css';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const CartItems = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(AppContext);
    return (
        <div className="p-3 h-100 overflow-y-auto">
            {cartItems.length === 0 ? (
                <p className="empty-cart-msg">
                    Your cart is empty.
                </p>
            ) : (
                <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item mb-3 rounded">
                            <div className="cart-item-row">
                                <h6 className="cart-item-name mb-0">{item.name}</h6>
                                <p className="cart-item-price mb-0">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                            <div className="cart-item-row">
                                <div className="d-flex align-items-center gap-2">
                                    <button className="quantity-btn minus-btn"
                                        onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                                        disabled={item.quantity === 1}>
                                        <i className="bi bi-dash"></i>
                                    </button>
                                    <span className="cart-item-quantity">{item.quantity}</span>
                                    <button className="quantity-btn plus-btn" onClick={() => updateQuantity(item.itemId, item.quantity + 1)}>
                                        <i className="bi bi-plus"></i>
                                    </button>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(item.itemId)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CartItems;