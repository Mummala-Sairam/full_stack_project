import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, XCircle, CheckCircle, Clock3 } from 'lucide-react';
import toast from 'react-hot-toast';
import './MyBookings.css';

// Mock bookings data
const INITIAL_BOOKINGS = [
    {
        id: 'BKN-8234',
        serviceName: 'Electrician',
        worker: { name: 'Ramesh Kumar', avatar: 'https://ui-avatars.com/api/?name=Ramesh+Kumar&background=1E3A8A&color=fff' },
        date: '2026-03-01',
        slot: '9:00 AM - 10:00 AM',
        price: 350,
        status: 'upcoming'
    },
    {
        id: 'BKN-1442',
        serviceName: 'Plumber',
        worker: { name: 'Syed Ali', avatar: 'https://ui-avatars.com/api/?name=Syed+Ali&background=10B981&color=fff' },
        date: '2026-02-15',
        slot: '2:00 PM - 3:00 PM',
        price: 400,
        status: 'completed'
    },
    {
        id: 'BKN-9921',
        serviceName: 'House Cleaning',
        worker: { name: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=F59E0B&color=fff' },
        date: '2026-02-10',
        slot: '10:00 AM - 1:00 PM',
        price: 1200,
        status: 'cancelled'
    }
];

const MyBookings = () => {
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const [activeTab, setActiveTab] = useState('upcoming');

    const handleCancel = (id) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
            toast.success("Booking cancelled successfully.");
        }
    };

    const StatusBadge = ({ status }) => {
        switch (status) {
            case 'upcoming': return <span className="status-badge upcoming"><Clock3 size={14} /> Upcoming</span>;
            case 'completed': return <span className="status-badge completed"><CheckCircle size={14} /> Completed</span>;
            case 'cancelled': return <span className="status-badge cancelled"><XCircle size={14} /> Cancelled</span>;
            default: return null;
        }
    };

    const filteredBookings = bookings.filter(b => b.status === activeTab);

    return (
        <main className="bookings-page section bg-light">
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    className="bookings-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2>My Bookings</h2>
                    <p className="text-muted">Manage your upcoming and past service appointments.</p>
                </motion.div>

                <div className="bookings-tabs">
                    <button className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming</button>
                    <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>Completed</button>
                    <button className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('cancelled')}>Cancelled</button>
                </div>

                <div className="bookings-list">
                    <AnimatePresence mode="popLayout">
                        {filteredBookings.length === 0 ? (
                            <motion.div
                                className="empty-bookings glass-card"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            >
                                <Calendar size={48} className="text-muted" style={{ marginBottom: '1rem' }} />
                                <h3>No {activeTab} bookings</h3>
                                <p className="text-muted">You don't have any {activeTab} services at the moment.</p>
                            </motion.div>
                        ) : (
                            filteredBookings.map((booking, idx) => (
                                <motion.div
                                    key={booking.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="booking-card glass-card"
                                >
                                    <div className="booking-card-header">
                                        <div className="booking-id text-muted">Booking #{booking.id}</div>
                                        <StatusBadge status={booking.status} />
                                    </div>

                                    <div className="booking-card-body">
                                        <img src={booking.worker.avatar} alt="worker" className="booking-avatar" />
                                        <div className="booking-info">
                                            <h4>{booking.serviceName}</h4>
                                            <p className="text-muted">Professional: {booking.worker.name}</p>
                                        </div>
                                        <div className="booking-price">
                                            ₹{booking.price}
                                        </div>
                                    </div>

                                    <div className="booking-card-footer">
                                        <div className="booking-datetime">
                                            <span><Calendar size={16} /> {booking.date}</span>
                                            <span><Clock size={16} /> {booking.slot}</span>
                                        </div>

                                        {booking.status === 'upcoming' && (
                                            <button
                                                className="btn btn-outline text-danger cancel-btn"
                                                onClick={() => handleCancel(booking.id)}
                                            >
                                                Cancel Service
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
};

export default MyBookings;
