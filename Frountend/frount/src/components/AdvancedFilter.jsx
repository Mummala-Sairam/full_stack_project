import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Star, Tag, ChevronDown } from 'lucide-react';
import './AdvancedFilter.css';

const AdvancedFilter = ({ priceFilter, setPriceFilter, ratingFilter, setRatingFilter, availableNow, setAvailableNow }) => {
    return (
        <div className="filter-bar-container glass">
            <div className="filter-bar-inner">
                <div className="filter-label">
                    <Filter size={18} />
                    <span>Filters</span>
                </div>

                <div className="filter-options">
                    {/* Price Filter */}
                    <div className="filter-group">
                        <div className="filter-icon-wrapper"><Tag size={16} /></div>
                        <select
                            className="premium-select"
                            value={priceFilter}
                            onChange={e => setPriceFilter(e.target.value)}
                        >
                            <option value="all">Any Price Range</option>
                            <option value="200-500">₹200 - ₹500</option>
                            <option value="500-1000">₹500 - ₹1000</option>
                        </select>
                        <ChevronDown size={16} className="select-chevron" />
                    </div>

                    <div className="filter-divider"></div>

                    {/* Rating Filter */}
                    <div className="filter-group">
                        <div className="filter-icon-wrapper text-warning"><Star size={16} /></div>
                        <select
                            className="premium-select"
                            value={ratingFilter}
                            onChange={e => setRatingFilter(e.target.value)}
                        >
                            <option value="all">Any Rating</option>
                            <option value="4+">4★ & Above</option>
                        </select>
                        <ChevronDown size={16} className="select-chevron" />
                    </div>

                    <div className="filter-divider"></div>

                    {/* Toggle Switch */}
                    <div className="filter-toggle-container">
                        <label className="toggle-label">
                            <span className={availableNow ? 'text-primary' : 'text-muted'}>
                                {availableNow ? 'Available Now Only' : 'Show All'}
                            </span>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={availableNow}
                                    onChange={() => setAvailableNow(!availableNow)}
                                    className="toggle-input"
                                />
                                <motion.div
                                    className={`toggle-slider ${availableNow ? 'active' : ''}`}
                                    layout
                                >
                                    <motion.div
                                        className="toggle-knob"
                                        layout
                                    />
                                </motion.div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedFilter;
