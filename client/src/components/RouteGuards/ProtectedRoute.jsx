import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { auth } = useContext(AppContext);

    if (!auth.token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return element;
};

export default ProtectedRoute;
