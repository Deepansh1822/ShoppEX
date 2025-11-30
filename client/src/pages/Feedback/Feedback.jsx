import './Feedback.css';
import { useState } from "react";
import { submitFeedback } from "../../Service/FeedbackService.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        comments: ""
    });

    const questions = [
        {
            id: "q1",
            text: "1. How satisfied are you with your overall shopping experience?",
            options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"]
        },
        {
            id: "q2",
            text: "2. How easy was it to navigate and find products in the app?",
            options: ["Very easy", "Easy", "Somewhat difficult", "Very difficult"]
        },
        {
            id: "q3",
            text: "3. How would you rate the app’s performance (speed, loading, responsiveness)?",
            options: ["Excellent", "Good", "Average", "Poor"]
        },
        {
            id: "q4",
            text: "4. How likely are you to recommend this shopping app to others?",
            options: ["Very likely", "Likely", "Unlikely", "Very unlikely"]
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitFeedback(data);
            toast.success("Thank you for your feedback!");
            navigate("/explore");
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit feedback");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="feedback-container">
            <div className="feedback-card">
                <h2>We Value Your Feedback</h2>
                <p className="text-center mb-4" style={{ color: '#ffc107' }}>Your feedback helps us improve our services for you.</p>
                <form onSubmit={handleSubmit}>
                    {questions.map((q) => (
                        <div key={q.id} className="question-block">
                            <p className="question-text">{q.text}</p>
                            <div className="options-grid">
                                {q.options.map((option) => (
                                    <label key={option} className="option-label">
                                        <input
                                            type="radio"
                                            name={q.id}
                                            value={option}
                                            checked={data[q.id] === option}
                                            onChange={handleChange}
                                            className="option-input form-check-input"
                                            required
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="mb-4">
                        <label htmlFor="comments" className="form-label fw-bold">Any suggestions for improvement?</label>
                        <textarea
                            id="comments"
                            name="comments"
                            className="form-control"
                            rows="4"
                            value={data.comments}
                            onChange={handleChange}
                            placeholder="Tell us what we can do better..."
                        ></textarea>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Feedback"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Feedback;
