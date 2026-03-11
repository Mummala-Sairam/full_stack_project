import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Clock, CheckCircle, MapPin, IndianRupee } from 'lucide-react';
import './WorkerProfile.css';

const API_URL = 'http://127.0.0.1:8000/api';

const WorkerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorker = async () => {
            try {
                const response = await axios.get(`${API_URL}/workers/${id}/`);
                setWorker(response.data);
            } catch (error) {
                console.error("Error fetching worker details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorker();
    }, [id]);

    if (loading) {
        return <div className="loading-screen">Loading Profile...</div>;
    }

    if (!worker) {
        return <div className="error-screen">Worker not found</div>;
    }

    return (
        <main className="worker-profile-page bg-light">
            <div className="container" style={{ maxWidth: '900px', paddingTop: '100px', paddingBottom: '60px' }}>
                <button onClick={() => navigate(-1)} className="btn btn-outline mb-4">← Back</button>

                <div className="profile-layout grid-2">
                    {/* Left Column: Image and Main Info */}
                    <motion.div
                        className="profile-sidebar glass-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="profile-avatar-container">
                            <img src={worker.avatar} alt={worker.name} className="profile-avatar-large" />
                            {worker.availableNow && <span className="status-indicator online"></span>}
                        </div>

                        <h2 className="profile-name text-center">{worker.name}</h2>
                        <p className="profile-category text-center text-accent">{worker.category} • {worker.experience}</p>

                        <div className="profile-stats">
                            <div className="stat-box">
                                <Star fill="#F59E0B" color="#F59E0B" size={20} />
                                <div>
                                    <span className="stat-val">{worker.rating}</span>
                                    <span className="stat-label">({worker.reviews_count} Reviews)</span>
                                </div>
                            </div>
                            <div className="stat-box">
                                <CheckCircle color="#10B981" size={20} />
                                <div>
                                    <span className="stat-val text-success">Verified</span>
                                    <span className="stat-label">Background Checked</span>
                                </div>
                            </div>
                        </div>

                        <div className="profile-price-banner">
                            <IndianRupee size={20} />
                            <span>{worker.price} / hour</span>
                        </div>

                        <button
                            className="btn btn-primary btn-full mt-4 book-btn"
                            onClick={() => navigate(`/service/${worker.category.toLowerCase().replace(' ', '-')}`)}
                        >
                            Book This Professional
                        </button>
                    </motion.div>

                    {/* Right Column: Bio and Slots */}
                    <motion.div
                        className="profile-details-section"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="glass-card mb-4 details-card">
                            <h3>About {worker.name}</h3>
                            <p className="bio-text">{worker.bio || "This professional has not provided a bio yet, but they are fully verified by LocalServe."}</p>
                        </div>

                        <div className="glass-card details-card">
                            <h3>Working Slots</h3>
                            <p className="text-muted mb-3">Availability for the upcoming schedule</p>

                            {worker.slots && worker.slots.length > 0 ? (
                                <div className="slots-grid">
                                    {worker.slots.map(slot => (
                                        <div key={slot.id} className={`slot-item ${slot.status}`}>
                                            <Clock size={16} />
                                            <span>{slot.time}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No slots listed.</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default WorkerProfile;
