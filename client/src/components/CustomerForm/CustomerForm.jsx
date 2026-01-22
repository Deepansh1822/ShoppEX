// import './CustomerForm.css';
import './CustomerForm.pro.css';

const CustomerForm = ({ customerName, mobileNumber, setMobileNumber, setCustomerName }) => {
    return (
        <div className="customer-form-container">
            <div className="input-group-custom">
                <label htmlFor="customerName">
                    <i className="bi bi-person-fill me-2"></i>Customer Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    placeholder="Enter customer name"
                    onChange={(e) => setCustomerName(e.target.value)}
                    value={customerName}
                    required
                />
            </div>
            <div className="input-group-custom">
                <label htmlFor="mobileNumber">
                    <i className="bi bi-telephone-fill me-2"></i>Mobile Number
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="mobileNumber"
                    placeholder="Enter mobile number"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    value={mobileNumber}
                    required
                />
            </div>
        </div>
    );
};

export default CustomerForm;