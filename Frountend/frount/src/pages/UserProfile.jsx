import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, ShieldCheck, MapPin, Calendar, Edit3, Settings } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        return <div className="loading-screen">Loading Profile...</div>;
    }

    const { first_name, email } = user;
    const displayName = first_name || "LocalServe User";
    const avatarUrl = `https://ui-avatars.com/api/?name=${displayName}&background=1E3A8A&color=fff&size=128`;

    return (
        <main className="user-profile-page bg-light section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    className="profile-header text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2>My Profile</h2>
                    <p className="text-muted">Manage your personal information and preferences.</p>
                </motion.div>

                <div className="profile-content">
                    {/* Top Card: Primary Details */}
                    <motion.div
                        className="profile-main-card glass-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="profile-banner bg-primary"></div>
                        <div className="profile-avatar-wrapper">
                            <img src={avatarUrl} alt="User Avatar" className="profile-avatar-lg" />
                            <button className="edit-avatar-btn">
                                <Edit3 size={16} />
                            </button>
                        </div>

                        <div className="profile-info text-center">
                            <h3>{displayName}</h3>
                            <div className="profile-badges">
                                <span className="badge-verified"><ShieldCheck size={14} /> Verified Customer</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="profile-grid">
                        {/* Left Side: Personal Info */}
                        <motion.div
                            className="profile-section glass-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="section-header">
                                <h4>Personal Information</h4>
                                <button className="btn-icon"><Edit3 size={18} className="text-muted" /></button>
                            </div>

                            <div className="info-list">
                                <div className="info-item">
                                    <User className="info-icon text-accent" />
                                    <div>
                                        <div className="info-label">Full Name</div>
                                        <div className="info-val">{displayName}</div>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <Mail className="info-icon text-accent" />
                                    <div>
                                        <div className="info-label">Email Address</div>
                                        <div className="info-val">{email}</div>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <MapPin className="info-icon text-accent" />
                                    <div>
                                        <div className="info-label">Default City</div>
                                        <div className="info-val">Hyderabad, TS</div>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <Calendar className="info-icon text-accent" />
                                    <div>
                                        <div className="info-label">Member Since</div>
                                        <div className="info-val">February 2026</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: Settings & Actions */}
                        <motion.div
                            className="profile-section glass-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="section-header">
                                <h4>Account Preferences</h4>
                                <Settings size={18} className="text-muted" />
                            </div>

                            <ul className="settings-list">
                                <li className="settings-item">
                                    <div>
                                        <h5>Email Notifications</h5>
                                        <p className="text-muted">Receive updates about bookings</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider round"></span>
                                    </label>
                                </li>
                                <li className="settings-item">
                                    <div>
                                        <h5>Two-Factor Auth</h5>
                                        <p className="text-muted">Enhance account security</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </li>
                            </ul>

                            <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '1.5rem 0' }} />

                            <div className="account-actions">
                                <button className="btn btn-outline btn-full mb-3" onClick={() => alert('Password reset link sent!')}>
                                    Change Password
                                </button>
                                <button className="btn btn-danger btn-full" onClick={logout}>
                                    Log Out
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserProfile;
