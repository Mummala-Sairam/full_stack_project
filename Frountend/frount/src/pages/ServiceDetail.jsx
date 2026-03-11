import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, Clock, CheckCircle, IndianRupee, X, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './ServiceDetail.css';

// Image Map for different services
const SERVICE_IMAGES = {
    'electrician': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1920&auto=format&fit=crop',
    'plumber': 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1920&auto=format&fit=crop',
    'carpenter': 'https://images.unsplash.com/photo-1622323758369-026ccefcf615?q=80&w=1920&auto=format&fit=crop',
    'painter': 'https://images.unsplash.com/photo-1604164448130-d1df213c64eb?q=80&w=1920&auto=format&fit=crop',
    'civil-contractor': 'https://images.unsplash.com/photo-1504307651254-35680f35aa29?q=80&w=1920&auto=format&fit=crop',
    'mason': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop',
    'ac-technician': 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1920&auto=format&fit=crop',
    'washing-machine': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1920&auto=format&fit=crop',
    'tv-technician': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1920&auto=format&fit=crop',
    'geyser-technician': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1920&auto=format&fit=crop',
    'house-cleaning': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1920&auto=format&fit=crop',
    'cctv-installation': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1920&auto=format&fit=crop',
};

const DUMMY_WORKERS = [
    {
        id: 1,
        name: 'Ramesh Kumar',
        experience: '8 Years',
        rating: 4.8,
        jobs: 320,
        price: 350,
        avatar: 'https://ui-avatars.com/api/?name=Ramesh+Kumar&background=1E3A8A&color=fff',
        slots: ['9:00 AM - 10:00 AM', '11:00 AM - 12:00 PM', '2:00 PM - 3:00 PM']
    },
    {
        id: 2,
        name: 'Syed Ali',
        experience: '5 Years',
        rating: 4.6,
        jobs: 145,
        price: 300,
        avatar: 'https://ui-avatars.com/api/?name=Syed+Ali&background=10B981&color=fff',
        slots: ['10:00 AM - 11:00 AM', '4:00 PM - 5:00 PM']
    },
    {
        id: 3,
        name: 'Venkat Rao',
        experience: '12 Years',
        rating: 4.9,
        jobs: 890,
        price: 450,
        avatar: 'https://ui-avatars.com/api/?name=Venkat+Rao&background=F59E0B&color=fff',
        slots: ['8:00 AM - 9:00 AM', '1:00 PM - 2:00 PM', '5:00 PM - 6:00 PM']
    }
];

const ServiceDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);

    const serviceKey = slug ? slug.toLowerCase() : 'electrician';
    const serviceName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "Electrician";

    // Dynamic Data Generation based on slug
    const SERVICE_DATA = {
        title: `${serviceName} Services`,
        tagline: `Expert ${serviceName.toLowerCase()} solutions for your home`,
        rating: 4.8,
        reviews: 1240,
        workersCount: 24,
        image: SERVICE_IMAGES[serviceKey] || SERVICE_IMAGES['electrician'],
        overview: `Our certified professionals provide safe, reliable, and prompt ${serviceName.toLowerCase()} services. We handle everything with the utmost professionalism to ensure your satisfaction.`,
        includes: [
            "Complete diagnosis of issues",
            "Safe repairs using standard equipment",
            "Post-service cleanup",
            "30-day service guarantee"
        ],
        pricing: {
            hourly: 350,
            halfDay: 1200,
            fullDay: 2200
        }
    };

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [workersData, setWorkersData] = useState([]);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/workers/');
                const allWorkers = response.data;
                // Try to filter by exact category match, if none exist show all workers for demo purposes
                const filtered = allWorkers.filter(w => w.category.toLowerCase() === serviceName.toLowerCase());
                setWorkersData(filtered.length > 0 ? filtered : allWorkers);
            } catch (error) {
                console.error("Failed to fetch workers for service details", error);
            }
        };
        fetchWorkers();
    }, [serviceName]);

    // Get today's date formatted as YYYY-MM-DD for min date in picker
    const today = new Date().toISOString().split('T')[0];

    // Toast State
    const [showToast, setShowToast] = useState(false);

    const openBookingModal = (worker) => {
        if (!user) {
            setIsLoginRequiredModalOpen(true);
            return;
        }
        setSelectedWorker(worker);
        setSelectedSlot(null);
        setIsModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedWorker(null);
            setSelectedSlot(null);
            setSelectedDate('');
        }, 300); // Wait for exit animation
    };

    const handleAddToCart = () => {
        if (!selectedWorker || !selectedSlot || !selectedDate) return;

        addToCart({
            serviceKey,
            serviceName,
            worker: selectedWorker,
            date: selectedDate,
            slot: selectedSlot.time || selectedSlot,
            price: SERVICE_DATA.pricing.hourly // Base hourly rate
        });

        closeBookingModal();
    };

    return (
        <main className="service-detail-page bg-light">

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="booking-toast glass"
                    >
                        <CheckCircle className="toast-icon text-accent" size={24} />
                        <div>
                            <h4>Booking Confirmed!</h4>
                            <p>Your slot has been successfully booked.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header Section */}
            <section className="service-header">
                <div className="header-image" style={{ backgroundImage: `url(${SERVICE_DATA.image})` }}>
                    <div className="header-overlay"></div>
                </div>
                <div className="container header-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <button onClick={() => navigate('/')} className="back-btn glass">← Back to Services</button>
                        <h1 className="service-title">{serviceName}</h1>
                        <p className="service-tagline">{SERVICE_DATA.tagline}</p>

                        <div className="service-header-meta">
                            <div className="meta-badge glass">
                                <Star fill="#F59E0B" color="#F59E0B" size={18} />
                                <span>{SERVICE_DATA.rating} ({SERVICE_DATA.reviews} Reviews)</span>
                            </div>
                            <div className="meta-badge glass">
                                <ShieldCheck color="#10B981" size={18} />
                                <span>{SERVICE_DATA.workersCount} Available Professionals</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Overview & Pricing Section */}
            <section className="service-overview section">
                <div className="container">
                    <div className="overview-grid">

                        {/* Left Side: Description */}
                        <div className="overview-content">
                            <h2>About This Service</h2>
                            <p className="description-text">{SERVICE_DATA.overview}</p>

                            <h3 className="section-subtitle">What's Included</h3>
                            <ul className="included-list">
                                {SERVICE_DATA.includes.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <CheckCircle className="list-icon" size={20} />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Side: Pricing Card */}
                        <div className="pricing-sidebar">
                            <div className="pricing-card glass-card">
                                <h3>Transparent Pricing</h3>
                                <div className="price-tier">
                                    <div className="tier-header">
                                        <span className="tier-name">Hourly Rate</span>
                                        <span className="tier-price">
                                            <IndianRupee size={18} />{SERVICE_DATA.pricing.hourly}
                                        </span>
                                    </div>
                                    <p>Ideal for minor fixes and quick jobs.</p>
                                </div>

                                <div className="price-tier featured">
                                    <div className="tier-header">
                                        <span className="tier-name">Half-Day (4 Hrs)</span>
                                        <span className="tier-price">
                                            <IndianRupee size={18} />{SERVICE_DATA.pricing.halfDay}
                                        </span>
                                    </div>
                                    <p>Perfect for multiple small installations.</p>
                                </div>

                                <div className="price-tier">
                                    <div className="tier-header">
                                        <span className="tier-name">Full-Day (8 Hrs)</span>
                                        <span className="tier-price">
                                            <IndianRupee size={18} />{SERVICE_DATA.pricing.fullDay}
                                        </span>
                                    </div>
                                    <p>Best for major renovations and large projects.</p>
                                </div>

                                <div className="pricing-note">
                                    <p>✓ No hidden charges</p>
                                    <p>✓ GST included in final invoice</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Available Professionals Section */}
            <section className="available-professionals section pt-0" id="professionals">
                <div className="container">
                    <h2 className="section-title">Available Professionals</h2>

                    <div className="workers-grid">
                        {workersData.map((worker) => (
                            <motion.div
                                key={worker.id}
                                className="worker-card glass-card"
                                whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                            >
                                <div className="worker-card-header">
                                    <img src={worker.avatar} alt={worker.name} className="worker-avatar" />
                                    <div>
                                        <h4 className="worker-name">{worker.name}</h4>
                                        <p className="worker-exp">{worker.experience} Experience</p>
                                    </div>
                                </div>

                                <div className="worker-stats">
                                    <div className="stat">
                                        <Star size={14} className="text-warning" fill="currentColor" />
                                        <span>{worker.rating} Rating</span>
                                    </div>
                                    <div className="stat separator">•</div>
                                    <div className="stat">
                                        <ShieldCheck size={14} className="text-accent" />
                                        <span>{worker.jobs || worker.reviews_count} Jobs Done</span>
                                    </div>
                                </div>

                                <div className="worker-price">
                                    <span>Starting from</span>
                                    <span className="price-val">₹{worker.price}</span>
                                </div>

                                <button
                                    className="btn btn-outline book-slot-btn" style={{ marginBottom: '0.5rem' }}
                                    onClick={() => navigate(`/professional/${worker.id}`)}
                                >
                                    View Profile
                                </button>
                                <button
                                    className="btn btn-primary btn-full book-slot-btn"
                                    onClick={() => openBookingModal(worker)}
                                    disabled={!worker.availableNow && (!worker.slots || worker.slots.length === 0)}
                                >
                                    {(worker.slots && worker.slots.length > 0) || worker.availableNow ? 'Book a Slot' : 'Fully Booked'}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Modal */}
            <AnimatePresence>
                {isModalOpen && selectedWorker && (
                    <div className="modal-overlay">
                        <motion.div
                            className="modal-content glass"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        >
                            <button className="modal-close" onClick={closeBookingModal}>
                                <X size={24} />
                            </button>

                            <div className="modal-header">
                                <h3>Book an Appointment</h3>
                                <p className="text-muted">with <strong>{selectedWorker.name}</strong> for {serviceName}</p>
                            </div>

                            <div className="modal-date-section" style={{ marginBottom: '1.5rem' }}>
                                <h4>Step 1: Select Date</h4>
                                <input
                                    type="date"
                                    className="date-picker-input"
                                    min={today}
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        setSelectedSlot(null); // Reset slot if date changes
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '10px 15px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        marginTop: '0.5rem',
                                        outline: 'none',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            {selectedDate && (
                                <motion.div
                                    className="modal-slots-section"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    <h4>Step 2: Select Time Slot</h4>
                                    {selectedWorker.slots && selectedWorker.slots.length > 0 ? (
                                        <div className="slots-grid-modal">
                                            <AnimatePresence mode="popLayout">
                                                {selectedWorker.slots.filter(s => s.status === 'available').map((slotObj) => (
                                                    <motion.button
                                                        key={slotObj.id || slotObj.time}
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                                        className={`slot-chip ${selectedSlot === slotObj ? 'selected' : ''}`}
                                                        onClick={() => setSelectedSlot(slotObj)}
                                                    >
                                                        <Clock size={14} />
                                                        {slotObj.time}
                                                    </motion.button>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <p className="no-slots-msg">Sorry, this professional is fully booked for this date.</p>
                                    )}
                                </motion.div>
                            )}

                            <motion.button
                                className="btn btn-accent btn-full confirm-btn"
                                disabled={!selectedSlot || !selectedDate}
                                initial={{ opacity: 0.6 }}
                                animate={{ opacity: (selectedSlot && selectedDate) ? 1 : 0.6 }}
                                onClick={handleAddToCart}
                                style={{ marginTop: '1.5rem' }}
                            >
                                Add to Cart
                            </motion.button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Login Required Modal */}
            <AnimatePresence>
                {isLoginRequiredModalOpen && (
                    <div className="modal-overlay" style={{ backdropFilter: 'blur(4px)' }}>
                        <motion.div
                            className="modal-content glass login-required-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{ textAlign: 'center', maxWidth: '400px' }}
                        >
                            <button className="modal-close" onClick={() => setIsLoginRequiredModalOpen(false)}>
                                <X size={24} />
                            </button>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                                style={{ margin: '0 auto 1.5rem', width: 'fit-content' }}
                            >
                                <AlertCircle size={64} className="text-warning" />
                            </motion.div>
                            <h3 style={{ marginBottom: '1rem' }}>Login Required</h3>
                            <p className="text-muted" style={{ marginBottom: '2rem' }}>
                                Please login to continue booking this service.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                                <button
                                    className="btn btn-primary btn-full"
                                    onClick={() => navigate('/login', { state: { from: location.pathname } })}
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-outline btn-full"
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </main>
    );
};

export default ServiceDetail;
