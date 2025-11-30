import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminFeedback.css';
import { toast } from 'react-hot-toast';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/v1.0/feedback', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFeedbacks(response.data);
            if (response.data.length > 0) {
                setSelectedFeedback(response.data[0]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch feedback");
        }
    };

    return (
        <div className="feedback-container">
            <div className="feedback-list-column">
                <h4 className="mb-3" style={{ color: 'var(--text-primary)' }}>User's Feedbacks</h4>
                {feedbacks.length === 0 ? (
                    <p className="" style={{ color: 'var(--text-primary)' }}>No feedback available.</p>
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
                )}
            </div>

            <div className="feedback-details-column">
                {selectedFeedback ? (
                    <>
                        <div className="feedback-detail-header">
                            <h2>Feedback Details</h2>
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
                    </>
                ) : (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <p className="text-muted">Select a feedback to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFeedback;
