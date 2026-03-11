import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CreditCard } from 'lucide-react';
import './WhyChooseUs.css';

const features = [
    {
        icon: ShieldCheck,
        title: 'Verified Professionals',
        desc: 'Every worker undergoes rigorous background checks and basic training.'
    },
    {
        icon: Clock,
        title: 'Instant Booking',
        desc: 'Book a local pro in less than a minute and get instant confirmation.'
    },
    {
        icon: CreditCard,
        title: 'Affordable Pricing',
        desc: 'Transparent and upfront pricing with no hidden charges whatsoever.'
    }
];

const WhyChooseUs = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
    };

    return (
        <section className="section bg-white" id="about">
            <div className="container">
                <motion.h2
                    className="section-title text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Why Choose LocalServe
                </motion.h2>

                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div key={idx} className="feature-card" variants={itemVariants}>
                                <div className="feature-icon-wrapper">
                                    <Icon size={40} className="feature-icon" />
                                    <div className="icon-glow"></div>
                                </div>
                                <h4 className="feature-title">{feature.title}</h4>
                                <p className="feature-desc">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
