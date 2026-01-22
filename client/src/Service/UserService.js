import api from "../api/axios";

export const addUser = async (formData) => {
    return await api.post('/admin/register', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export const deleteUser = async (id) => {
    return await api.delete(`/admin/users/${id}`);
}

export const fetchUsers = async () => {
    return await api.get('/admin/users');
}
