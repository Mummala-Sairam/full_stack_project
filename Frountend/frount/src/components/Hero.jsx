import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('Sarojinidevi');
    const [isSuggestBoxOpen, setIsSuggestBoxOpen] = useState(false);
    const navigate = useNavigate();

    const locations = ['Sarojinidevi', 'Jubilee Hills', 'Banjara Hills', 'Madhapur', 'Kondapur'];

    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        // Basic routing logic: convert search query to slug
        let slug = searchQuery.trim().toLowerCase().replace(/\s+/g, '-');
        // Handle common variations
        if (slug.includes('ac')) slug = 'ac-technician';
        if (slug.includes('clean')) slug = 'house-cleaning';
        if (slug.includes('tv')) slug = 'tv-technician';
        if (slug.includes('paint')) slug = 'painter';

        navigate(`/service/${slug}`);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setIsSuggestBoxOpen(false);
        let slug = suggestion.toLowerCase().replace(/\s+/g, '-');
        navigate(`/service/${slug}`);
    };

    return (
        <section className="hero-section">
            {/* Background with Parallax/Gradient Overlay */}
            <div className="hero-bg-image"></div>
            <div className="hero-gradient-overlay"></div>

            <div className="container hero-content-wrapper">
                {/* Animated Content */}
                <motion.div
                    className="hero-text-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="hero-headline">
                        Welcome to <span className="text-gradient">LocalServe</span>
                    </h1>
                    <p className="hero-subheading">
                        Book Trusted Local Professionals Instantly.
                    </p>
                </motion.div>

                {/* Smart Search Module */}
                <motion.div
                    className="smart-search-module glass"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <div className="search-layout">

                        {/* Location Dropdown */}
                        <div className="search-field search-location">
                            <MapPin size={20} className="field-icon" />
                            <div className="field-input-wrapper">
                                <label>Location</label>
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="location-select"
                                >
                                    {locations.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="divider"></div>

                        {/* Keyword Search */}
                        <div className="search-field search-query relative">
                            <Search size={20} className="field-icon" />
                            <div className="field-input-wrapper">
                                <label>What do you need help with?</label>
                                <input
                                    type="text"
                                    placeholder="e.g. AC Repair, Cleaning, Electrician"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setIsSuggestBoxOpen(e.target.value.length > 0);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSearch();
                                    }}
                                    onBlur={() => setTimeout(() => setIsSuggestBoxOpen(false), 200)}
                                    className="query-input"
                                />
                            </div>

                            {/* Suggestions Dropdown */}
                            {isSuggestBoxOpen && (
                                <div className="search-suggestions glass">
                                    <div className="suggestion-item" onMouseDown={() => handleSuggestionClick(searchQuery || 'electrician')}>
                                        <Search size={16} /> <span className="suggestion-text">Search for "{searchQuery}"</span>
                                    </div>
                                    <div className="suggestion-item" onMouseDown={() => handleSuggestionClick('ac-technician')}>
                                        <Search size={16} /> <span className="suggestion-text">AC Repair & Service</span>
                                    </div>
                                    <div className="suggestion-item" onMouseDown={() => handleSuggestionClick('house-cleaning')}>
                                        <Search size={16} /> <span className="suggestion-text">Home Cleaning</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="search-btn"
                            onClick={handleSearch}
                        >
                            Search
                        </motion.button>
                    </div>

                    <div className="popular-searches">
                        Popular:
                        <span onClick={() => handleSuggestionClick('plumber')} style={{ cursor: 'pointer' }}>Plumbers</span>,
                        <span onClick={() => handleSuggestionClick('painter')} style={{ cursor: 'pointer' }}>Painters</span>,
                        <span onClick={() => handleSuggestionClick('carpenter')} style={{ cursor: 'pointer' }}>Carpenters</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
