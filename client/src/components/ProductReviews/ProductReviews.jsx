
import React, { useState, useEffect } from 'react';
// import './ProductReviews.css';
import './ProductReviews.pro.css';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const ProductReviews = ({ itemId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false); // Init false to show empty/dummy state initially
    const [newReview, setNewReview] = useState({
        reviewerName: '',
        rating: 5,
        comment: ''
    });
    const [imageFile, setImageFile] = useState(null);

    // Dummy reviews for demonstration if backend fetch fails or is empty
    const dummyReviews = [
        {
            id: 1,
            reviewerName: "John Doe",
            rating: 5,
            comment: "Excellent product! delivered on time and quality is amazing.",
            createdAt: new Date().toISOString(),
            imageUrl: null
        },
        {
            id: 2,
            reviewerName: "Jane Smith",
            rating: 4,
            comment: "Good value for money. Slightly different color than expected but still nice.",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            imageUrl: null
        }
    ];

    useEffect(() => {
        fetchReviews();
    }, [itemId]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            // Use the centralized api instance which handles baseURL and auth
            const response = await api.get(`/items/${itemId}/reviews`);
            if (response.data && response.data.length > 0) {
                setReviews(response.data);
            } else {
                setReviews([]); // Or keep dummy? Let's show empty if real backend returns empty.
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            // Fallback to dummy reviews for visual check
            setReviews(dummyReviews);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prev => ({ ...prev, [name]: value }));
    };

    const fileInputRef = React.useRef(null);

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const reviewJson = JSON.stringify({
            ...newReview,
            itemId: itemId
        });
        formData.append('review', reviewJson);
        if (imageFile) {
            formData.append('file', imageFile);
        }

        try {
            await api.post('/reviews', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Review submitted successfully!");
            setNewReview({ reviewerName: '', rating: 5, comment: '' });
            setImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
            // Fallback for demo: add to local state
            const fallbackReview = {
                id: Date.now(),
                reviewerName: newReview.reviewerName,
                rating: parseInt(newReview.rating),
                comment: newReview.comment,
                createdAt: new Date().toISOString(),
                imageUrl: imageFile ? URL.createObjectURL(imageFile) : null
            };
            setReviews([fallbackReview, ...reviews]);
            toast.success("Review submitted (Demo Mode)");
            setNewReview({ reviewerName: '', rating: 5, comment: '' });
            setImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const [showAllReviews, setShowAllReviews] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 5);

    return (
        <div className="reviews-container mt-5">
            <h3 className="section-heading">
                <i className="bi bi-chat-square-text-fill me-3"></i>Product Reviews
            </h3>

            {/* Add Review Form */}
            <div className="add-review-section mb-5">
                <h4>Write a Review</h4>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Your Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="reviewerName"
                                value={newReview.reviewerName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Rating</label>
                            <select
                                className="form-select"
                                name="rating"
                                value={newReview.rating}
                                onChange={handleInputChange}
                            >
                                <option value="5">5 - Excellent</option>
                                <option value="4">4 - Very Good</option>
                                <option value="3">3 - Good</option>
                                <option value="2">2 - Fair</option>
                                <option value="1">1 - Poor</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Your Review</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            name="comment"
                            value={newReview.comment}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Add Image (Optional)</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
            </div>

            {/* Reviews List */}
            <div className="reviews-list">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    reviews.length === 0 ? (
                        <div className="empty-review-state text-center py-5">
                            <i className="bi bi-chat-square-dots mb-3" style={{ fontSize: '2.5rem', display: 'block', opacity: 0.3 }}></i>
                            <p className="text-muted">No reviews yet. Be the first to review this product!</p>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" style={{ width: '15%' }}>Reviewer</th>
                                            <th scope="col" style={{ width: '10%' }}>Rating</th>
                                            <th scope="col" style={{ width: '45%' }}>Comment</th>
                                            <th scope="col" style={{ width: '15%' }}>Image</th>
                                            <th scope="col" style={{ width: '15%' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedReviews.map((review) => (
                                            <tr key={review.id || Math.random()} onClick={() => setSelectedReview(review)} style={{ cursor: 'pointer' }}>
                                                <td>
                                                    <div className="fw-bold">{review.reviewerName}</div>
                                                </td>
                                                <td>
                                                    <div className="text-warning">
                                                        {'★'.repeat(review.rating)}
                                                        <span className="text-muted">{'★'.repeat(5 - review.rating)}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-wrap-cust">{review.comment.length > 60 ? review.comment.substring(0, 60) + '...' : review.comment}</p>
                                                </td>
                                                <td>
                                                    {review.imageUrl ? (
                                                        <img
                                                            src={review.imageUrl}
                                                            alt="Review"
                                                            className="review-img-thumb"
                                                        />
                                                    ) : (
                                                        <span className="text-muted small">No Image</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <small className="text-muted">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </small>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {!showAllReviews && reviews.length > 5 && (
                                <div className="text-center mt-5">
                                    <button className="see-more-reviews-btn" onClick={() => setShowAllReviews(true)}>
                                        See All Reviews <i className="bi bi-chevron-down ms-2"></i>
                                    </button>
                                </div>
                            )}

                            {showAllReviews && reviews.length > 5 && (
                                <div className="text-center mt-5">
                                    <button className="see-more-reviews-btn show-less" onClick={() => setShowAllReviews(false)}>
                                        Show Less <i className="bi bi-chevron-up ms-2"></i>
                                    </button>
                                </div>
                            )}
                        </>
                    )
                )}
            </div >

            {/* Review Detail Modal */}
            {selectedReview && (
                <div className="review-modal-overlay" onClick={() => setSelectedReview(null)}>
                    <div className="review-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedReview(null)}>
                            <i className="bi bi-x-lg"></i>
                        </button>

                        <div className="modal-header-custom">
                            <div className="reviewer-info">
                                <div className="reviewer-avatar">
                                    {selectedReview.reviewerName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="m-0">{selectedReview.reviewerName}</h4>
                                    <small className="text-muted">{new Date(selectedReview.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                                </div>
                            </div>
                            <div className="modal-rating">
                                <span className="rating-number">{selectedReview.rating}.0</span>
                                <div className="text-warning">
                                    {'★'.repeat(selectedReview.rating)}
                                    <span className="text-muted" style={{ opacity: 0.3 }}>{'★'.repeat(5 - selectedReview.rating)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-body-custom">
                            <div className="review-text-section">
                                <h5>Review Comment</h5>
                                <p>{selectedReview.comment}</p>
                            </div>

                            {selectedReview.imageUrl && (
                                <div className="review-image-section-modal">
                                    <h5>Attached Image</h5>
                                    <img src={selectedReview.imageUrl} alt="Review" className="modal-review-image" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default ProductReviews;
