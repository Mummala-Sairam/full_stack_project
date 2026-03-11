import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle, Star } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import registerIllustration from '../assets/register_illustration.png';
import './Auth.css'; // Shared CSS for Login/Register

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const success = await register(formData.fullName, formData.email, formData.password);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-box glass-card register-box">

                {/* Left Side: Creative Banner */}
                <div className="auth-banner bg-primary">
                    <div className="banner-content">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="banner-title"
                        >
                            Join LocalServe Today
                        </motion.h2>
                        <p className="banner-subtitle">Unlock access to top-rated home service professionals in your area.</p>

                        <div className="auth-illustrations">
                            {/* Floating Badge 1 */}
                            <motion.div
                                className="floating-badge badge-1 glass"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Star className="text-warning" fill="#F59E0B" size={24} />
                                <div>
                                    <h4>Top Quality</h4>
                                    <p>Satisfaction Guaranteed</p>
                                </div>
                            </motion.div>

                            {/* Floating Badge 2 */}
                            <motion.div
                                className="floating-badge badge-2 glass"
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <ShieldCheck className="text-accent" size={24} />
                                <div>
                                    <h4>Verified Pros</h4>
                                    <p>Background checked</p>
                                </div>
                            </motion.div>

                            {/* Image Placeholder - using a different amazing unsplash worker image */}
                            <motion.img
                                src={registerIllustration}
                                alt="Worker Illustration"
                                className="auth-banner-img"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="auth-form-container">
                    <motion.div
                        className="auth-header"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2>Create Account</h2>
                        <p>Join LocalServe to book the best professionals</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="auth-form">

                        <motion.div className="input-group" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <label htmlFor="fullName">Full Name</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={20} />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div className="input-group" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={20} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div className="input-group" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div className="input-group" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Repeat your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="btn btn-primary btn-full auth-submit-btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        >
                            Create Account <ArrowRight size={18} />
                        </motion.button>
                    </form>

                    <motion.div className="auth-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                        <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default Register;
