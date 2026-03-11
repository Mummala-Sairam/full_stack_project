import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import loginIllustration from '../assets/login_illustration.png';
import './Auth.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if there's a redirect path in state
    const redirectPath = location.state?.from || '/';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData.email, formData.password, redirectPath);
    };

    return (
        <main className="auth-page">
            <div className="auth-box glass-card">

                {/* Left Side: Creative Banner */}
                <div className="auth-banner bg-primary">
                    <div className="banner-content">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="banner-title"
                        >
                            Welcome Back to LocalServe
                        </motion.h2>
                        <p className="banner-subtitle">Your trusted partner for home services.</p>

                        <div className="auth-illustrations">
                            {/* Floating Badge 1 */}
                            <motion.div
                                className="floating-badge badge-1 glass"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ShieldCheck className="text-accent" size={24} />
                                <div>
                                    <h4>100% Secure</h4>
                                    <p>Verified Professionals</p>
                                </div>
                            </motion.div>

                            {/* Floating Badge 2 */}
                            <motion.div
                                className="floating-badge badge-2 glass"
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <CheckCircle className="text-warning" size={24} />
                                <div>
                                    <h4>5.0 Rating</h4>
                                    <p>Over 10k+ reviews</p>
                                </div>
                            </motion.div>

                            {/* Image Placeholder - since we can't extract the user's local image, we use an amazing unsplash one */}
                            <motion.img
                                src={loginIllustration}
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
                        <h2>Sign In</h2>
                        <p>Access your account to manage bookings.</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <motion.div className="input-group" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
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

                        <motion.div className="input-group" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <div className="label-row">
                                <label htmlFor="password">Password</label>
                                <a href="#forgot" className="forgot-link">Forgot Password?</a>
                            </div>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
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

                        <motion.button
                            type="submit"
                            className="btn btn-primary btn-full auth-submit-btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        >
                            Sign In <ArrowRight size={18} />
                        </motion.button>
                    </form>

                    <motion.div className="auth-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                        <p>Don't have an account? <Link to="/register" className="auth-link">Create one</Link></p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default Login;
