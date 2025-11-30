import api from "../api/axios";

export const fetchDashboardData = async () => {
    return await api.get("/dashboard");
}
