import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Zap, MapPin, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="footer-gradient"></div>

            <div className="container relative z-10">
                <div className="footer-grid">

                    {/* Brand Col */}
                    <div className="footer-col brand-col">
                        <motion.div
                            className="footer-brand"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="logo-shape">LS</div>
                            <span className="logo-text-footer">LocalServe</span>
                        </motion.div>
                        <p className="footer-desc">
                            Your trusted local service booking platform. Quality home services, on demand.
                            Bridging the gap between skilled professionals and your everyday needs.
                        </p>
                        <div className="social-links">
                            <motion.a whileHover={{ y: -5, scale: 1.1 }} className="social-icon"><Facebook size={20} /></motion.a>
                            <motion.a whileHover={{ y: -5, scale: 1.1 }} className="social-icon"><Twitter size={20} /></motion.a>
                            <motion.a whileHover={{ y: -5, scale: 1.1 }} className="social-icon"><Instagram size={20} /></motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#services">Our Services</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#careers">Careers</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Top Services</h4>
                        <ul className="footer-links">
                            <li><a href="#electrician">Electricians</a></li>
                            <li><a href="#plumbing">Plumbers</a></li>
                            <li><a href="#carpentry">Carpenters</a></li>
                            <li><a href="#cleaning">Home Cleaning</a></li>
                            <li><a href="#painting">Painters</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Contact Us</h4>
                        <ul className="contact-info">
                            <li>
                                <MapPin size={18} className="contact-icon" />
                                <span>123 Service Avenue, Tech Park Building, Sarojinidevi, 500001</span>
                            </li>
                            <li>
                                <Phone size={18} className="contact-icon" />
                                <span>+91 1800 123 4567</span>
                            </li>
                            <li>
                                <Mail size={18} className="contact-icon" />
                                <span>support@localserve.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} LocalServe. All rights reserved.</p>
                    <div className="legal-links">
                        <a href="#privacy">Privacy Policy</a>
                        <span className="dot-separator">•</span>
                        <a href="#terms">Terms of Service</a>
                        <span className="dot-separator">•</span>
                        <a href="#workers">Worker Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
