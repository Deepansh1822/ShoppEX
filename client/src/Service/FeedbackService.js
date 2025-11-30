import api from "../api/axios";

export const submitFeedback = async (feedback) => {
    return await api.post("/feedback", feedback);
}
