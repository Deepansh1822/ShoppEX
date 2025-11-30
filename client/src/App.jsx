import Menubar from "./components/Menubar/Menubar.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ProtectedRoute from "./components/RouteGuards/ProtectedRoute.jsx";
import PublicRoute from "./components/RouteGuards/PublicRoute.jsx";
import { ROLES } from "./constants/roles.js";

import Welcome from "./pages/Welcome/Welcome.jsx";
import Signup from "./pages/SignUp/Signup.jsx";
import Feedback from "./pages/Feedback/Feedback.jsx";
import AdminFeedback from "./pages/AdminFeedback/AdminFeedback.jsx";
import About from "./pages/About/About.jsx";
import Profile from "./pages/Profile/Profile.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";

const App = () => {
    const location = useLocation();

    return (
        <ThemeProvider>
            <div>
                {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && <Menubar />}
                <Toaster />
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/explore" element={<Explore />} />
                    {/*Admin only routes*/}
                    <Route path="/category" element={<ManageCategory />} />
                    <Route path="/users" element={<ManageUsers />} />
                    <Route path="/items" element={<ManageItems />} />

                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/admin-feedback" element={<AdminFeedback />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />

                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;