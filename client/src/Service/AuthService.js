import api from "../api/axios";

export const login = async (data) => {
    return await api.post("/login", data);
}

export const register = async (data) => {
    return await api.post("/register", data);
}

export const getProfile = () => {
    return api.get("/profile");
}

export const uploadProfileImage = (formData) => {
    return api.post("/profile/image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const updateProfile = (userData) => {
    return api.put("/profile", userData);
}
