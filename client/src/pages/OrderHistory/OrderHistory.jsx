import './OrderHistory.pro.css';
import { useEffect, useState, useContext } from "react";
import { latestOrders } from "../../Service/OrderService.js";
import { AppContext } from "../../context/AppContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AppContext);
    const isAdmin = auth.role === 'ROLE_ADMIN';

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await latestOrders();
                setOrders(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const formatItems = (items) => {
        return items.map((item) => `${item.name} x ${item.quantity}`).join(', ');
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) {
        return (
            <div className="orders-page-wrapper page-entry-anim">
                <div className="header-container">
                    <div className="header-content">
                        <h2 className="page-title">
                            <i className={`bi ${isAdmin ? 'bi-receipt-cutoff' : 'bi-bag-check-fill'} me-3`}></i>
                            {isAdmin ? "All Transactions" : "My Orders"}
                        </h2>
                        <p className="page-subtitle">{isAdmin ? "Track and manage all customer transactions" : "View and track your personal shopping history"}</p>
                    </div>
                </div>
                <div className="orders-history-container d-flex justify-content-center align-items-center">
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page-wrapper page-entry-anim">
            <div className="header-container">
                <div className="header-content">
                    <h2 className="page-title">
                        <i className={`bi ${isAdmin ? 'bi-receipt-cutoff' : 'bi-bag-check-fill'} me-3`}></i>
                        {isAdmin ? "All Transactions" : "My Orders"}
                    </h2>
                    <p className="page-subtitle">{isAdmin ? "Track and manage all customer transactions" : "View and track your personal shopping history"}</p>
                </div>
            </div>

            <div className="orders-history-container">
                {orders.length === 0 ? (
                    <div className="empty-orders-state text-center py-5">
                        <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
                        <p className="mt-3">No orders found in your history.</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Order Id</th>
                                    {isAdmin && <th>Customer</th>}
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        {isAdmin && (
                                            <td>
                                                <div className="fw-bold">{order.customerName}</div>
                                                <small className="text-muted">{order.phoneNumber}</small>
                                            </td>
                                        )}
                                        <td>{formatItems(order.items)}</td>
                                        <td className="fw-bold">₹{order.grandTotal.toFixed(2)}</td>
                                        <td>{order.paymentMethod}</td>
                                        <td>
                                            <span className={`badge ${order.paymentDetails?.status === "COMPLETED" ? "bg-success" : "bg-warning text-dark"}`}>
                                                {order.paymentDetails?.status || "PENDING"}
                                            </span>
                                        </td>
                                        <td>{formatDate(order.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default OrderHistory;