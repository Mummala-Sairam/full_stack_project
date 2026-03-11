import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Menu, X, Settings, LogOut, Calendar, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    const navLinks = ['Home', 'Services', 'About', 'Contact'];

    return (
        <nav className="navbar glass">
            <div className="navbar-container">
                {/* Left: Logo */}
                <a href="/" className="navbar-logo">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="logo-icon"
                    >
                        <div className="logo-shape">LS</div>
                    </motion.div>
                    <span className="logo-text">LocalServe</span>
                </a>

                {/* Center: Desktop Nav Links */}
                <div className="navbar-links">
                    <a href="/" className="nav-link">Home<span className="nav-link-underline"></span></a>
                    <a href="/#services" className="nav-link">Services<span className="nav-link-underline"></span></a>
                    <a href="/#professionals" className="nav-link">Professionals<span className="nav-link-underline"></span></a>
                </div>

                {/* Right: Actions */}
                <div className="navbar-actions">
                    {/* Animated Search Icon */}
                    <div className={`nav-search-container ${isSearchExpanded ? 'expanded' : ''}`}>
                        <AnimatePresence>
                            {isSearchExpanded && (
                                <motion.input
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 200, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    type="text"
                                    placeholder="Search services..."
                                    className="nav-search-input"
                                    autoFocus
                                    onBlur={() => setIsSearchExpanded(false)}
                                />
                            )}
                        </AnimatePresence>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                            className="icon-btn"
                        >
                            <Search size={20} />
                        </motion.button>
                    </div>

                    {/* Cart Icon (Only if logged in) */}
                    {user && (
                        <Link to="/cart" className="icon-btn cart-btn">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <ShoppingCart size={20} />
                                {cartItems.length > 0 && (
                                    <span className="cart-badge">{cartItems.length}</span>
                                )}
                            </motion.div>
                        </Link>
                    )}

                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="icon-btn notification-btn">
                        <Bell size={20} />
                        <span className="notification-dot"></span>
                    </motion.button>

                    {/* Profile Dropdown */}
                    <div className="profile-menu-container">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="profile-btn"
                        >
                            {user ? (
                                <img src={`https://ui-avatars.com/api/?name=${user.first_name || 'User'}&background=1E3A8A&color=fff`} alt="Profile" className="avatar-img" />
                            ) : (
                                <div className="avatar-placeholder"><User size={20} /></div>
                            )}
                        </motion.button>

                        <AnimatePresence>
                            {isProfileDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="profile-dropdown glass"
                                >
                                    {user ? (
                                        <>
                                            <div className="dropdown-header">
                                                <p className="user-name">{user.first_name}</p>
                                                <p className="user-email">{user.email}</p>
                                            </div>
                                            <hr className="dropdown-divider" />
                                            <Link to="/bookings" className="dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}><Calendar size={16} /> My Bookings</Link>
                                            <Link to="/cart" className="dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}><ShoppingCart size={16} /> My Cart</Link>
                                            <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}><User size={16} /> Profile</Link>
                                            <hr className="dropdown-divider" />
                                            <button className="dropdown-item text-danger" onClick={() => { logout(); setIsProfileDropdownOpen(false); }}><LogOut size={16} /> Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login" className="btn btn-primary dropdown-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }} onClick={() => setIsProfileDropdownOpen(false)}>Login</Link>
                                            <Link to="/register" className="btn btn-outline dropdown-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }} onClick={() => setIsProfileDropdownOpen(false)}>Register</Link>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mobile-menu glass"
                    >
                        {navLinks.map((link) => (
                            <a key={link} href={`#${link.toLowerCase()}`} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                {link}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
