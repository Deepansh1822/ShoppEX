import api from "../api/axios";

export const createRazorpayOrder = async (data) => {
    return await api.post(`/payments/create-order`, data);
}

export const verifyPayment = async (paymentData) => {
    return await api.post('/payments/verify', paymentData);
}