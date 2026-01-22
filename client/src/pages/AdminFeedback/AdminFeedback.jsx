import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import './AdminFeedback.pro.css';
import { toast } from 'react-hot-toast';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await api.get('/feedback');
            setFeedbacks(response.data);
            if (response.data.length > 0) {
                setSelectedFeedback(response.data[0]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch feedback");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-feedback-page-wrapper page-entry-anim">
            <div className="header-container">
                <div className="header-content">
                    <h2 className="page-title">
                        <i className="bi bi-megaphone-fill me-3"></i>Customer Feedback Dashboard
                    </h2>
                    <p className="page-subtitle">Review and analyze user experiences and suggestions</p>
                </div>
            </div>

            <div className="feedback-main-content">
                <div className="feedback-list-column">
                    <h3 className="column-title"><i className="bi bi-chat-left-text me-2"></i>User Submissions</h3>
                    <div className="feedback-scroll-area">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            feedbacks.length === 0 ? (
                                <div className="empty-state text-center py-5">
                                    <i className="bi bi-chat-left-dots mb-3" style={{ fontSize: '2rem', display: 'block' }}></i>
                                    <p className="mb-0">No feedback available.</p>
                                </div>
                            ) : (
                                feedbacks.map((feedback) => (
                                    <div
                                        key={feedback.id}
                                        className={`feedback-list-item ${selectedFeedback?.id === feedback.id ? 'active' : ''}`}
                                        onClick={() => setSelectedFeedback(feedback)}
                                    >
                                        <h6>{feedback.email}</h6>
                                        <small>{new Date(feedback.createdAt).toLocaleDateString()} {new Date(feedback.createdAt).toLocaleTimeString()}</small>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                </div>

                <div className="feedback-details-column">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        selectedFeedback ? (
                            <div className="feedback-scroll-area">
                                <div className="feedback-detail-header">
                                    <h3 className="column-title">
                                        <i className="bi bi-file-earmark-person me-2"></i>User Submission
                                    </h3>
                                    <p className="mb-0"><strong>User:</strong> {selectedFeedback.email}</p>
                                    <small>Submitted on: {new Date(selectedFeedback.createdAt).toLocaleString()}</small>
                                </div>

                                <div className="feedback-detail-section">
                                    <h6>Ratings</h6>
                                    <div className="rating-row">
                                        <span className="rating-label">Satisfaction</span>
                                        <span className="rating-value">{selectedFeedback.q1}</span>
                                    </div>
                                    <div className="rating-row">
                                        <span className="rating-label">Navigation Ease</span>
                                        <span className="rating-value">{selectedFeedback.q2}</span>
                                    </div>
                                    <div className="rating-row">
                                        <span className="rating-label">Performance</span>
                                        <span className="rating-value">{selectedFeedback.q3}</span>
                                    </div>
                                    <div className="rating-row">
                                        <span className="rating-label">Recommendation</span>
                                        <span className="rating-value">{selectedFeedback.q4}</span>
                                    </div>
                                </div>

                                {selectedFeedback.comments && (
                                    <div className="feedback-detail-section">
                                        <h6>Additional Comments</h6>
                                        <p className="mb-0">{selectedFeedback.comments}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="empty-state-detail d-flex flex-column justify-content-center align-items-center h-100">
                                <i className="bi bi-cursor-fill mb-3 text-muted" style={{ fontSize: '2.5rem', opacity: 0.5 }}></i>
                                <p className="text-muted text-center">Select a feedback from the list to view its complete details</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminFeedback;
