import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const PublicRoute = ({ element }) => {
    const { auth } = useContext(AppContext);

    if (auth.token) {
        return <Navigate to="/dashboard" replace />;
    }
    return element;
};

export default PublicRoute;
