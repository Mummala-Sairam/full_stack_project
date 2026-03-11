import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ServicesGrid.css';

const ServicesGrid = ({ title, services }) => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
    };

    const handleServiceClick = (serviceName) => {
        // Simple URL slug generator for demo
        const slug = serviceName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/service/${slug}`);
    };

    return (
        <section className="section bg-white" id="services">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    {title}
                </motion.h2>

                <motion.div
                    className="services-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {services.map(service => {
                        const Icon = service.icon; // might be undefined now but we check in JSX if we use it
                        return (
                            <motion.div key={service.id} className="service-card" variants={itemVariants}>
                                <div className="service-card-inner">
                                    <div className="service-image-wrapper">
                                        <img src={service.image} alt={service.name} className="service-image" loading="lazy" />
                                        <div className="service-image-overlay"></div>
                                    </div>
                                    <div className="service-info">
                                        <h3>{service.name}</h3>
                                        <p className="service-desc">{service.desc}</p>

                                        <div className="service-meta">
                                            <div className="service-rating">
                                                <Star size={16} className="star-icon" fill="currentColor" />
                                                <span>4.8</span>
                                            </div>
                                            <div className="service-availability">
                                                <Clock size={14} />
                                                <span>{service.nextSlot}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        className="btn btn-primary btn-full shimmer-btn"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleServiceClick(service.name)}
                                    >
                                        <span>Book Now</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesGrid;
