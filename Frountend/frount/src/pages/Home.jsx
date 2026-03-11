import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star } from 'lucide-react';

import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import AdvancedFilter from '../components/AdvancedFilter';
import WhyChooseUs from '../components/WhyChooseUs';

const CATEGORIES = [
    { id: 1, name: 'Electrician', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop', desc: 'Wiring, repairs & installations', nextSlot: 'Today, 2:00 PM' },
    { id: 2, name: 'Plumber', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=400&auto=format&fit=crop', desc: 'Pipes, leaks & fittings', nextSlot: 'Tomorrow, 10:00 AM' },
    { id: 3, name: 'Carpenter', image: 'https://images.unsplash.com/photo-1622323758369-026ccefcf615?q=80&w=400&auto=format&fit=crop', desc: 'Furniture, doors & repairs', nextSlot: 'Available Now' },
    { id: 4, name: 'Painter', image: 'https://images.unsplash.com/photo-1604164448130-d1df213c64eb?q=80&w=400&auto=format&fit=crop', desc: 'Interior & exterior painting', nextSlot: 'Tomorrow, 9:00 AM' },
    { id: 5, name: 'Civil Contractor', image: 'https://images.unsplash.com/photo-1504307651254-35680f35aa29?q=80&w=400&auto=format&fit=crop', desc: 'Complete renovations & builds', nextSlot: 'Next Week' },
    { id: 6, name: 'Mason', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop', desc: 'Brickwork, plastering & tiling', nextSlot: 'Today, 4:00 PM' },
    { id: 7, name: 'AC Technician', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=400&auto=format&fit=crop', desc: 'Service, repair & installation', nextSlot: 'Available Now' },
    { id: 8, name: 'Washing Machine', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=400&auto=format&fit=crop', desc: 'Repair & maintenance', nextSlot: 'Today, 5:00 PM' },
    { id: 9, name: 'TV Technician', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=400&auto=format&fit=crop', desc: 'Mounting & repair services', nextSlot: 'Tomorrow, 2:00 PM' },
    { id: 10, name: 'Geyser Technician', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop', desc: 'Installation & service', nextSlot: 'Today, 1:00 PM' },
    { id: 11, name: 'House Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop', desc: 'Deep cleaning services', nextSlot: 'Available Now' },
    { id: 12, name: 'CCTV Installation', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format&fit=crop', desc: 'Security setups & wiring', nextSlot: 'Tomorrow, 11:00 AM' },
];

const Home = () => {
    const [location] = useState('Sarojinidevi');
    const navigate = useNavigate();
    const [prosData, setProsData] = useState([]);

    useEffect(() => {
        const fetchPros = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/workers/');
                setProsData(response.data);
            } catch (error) {
                console.error("Failed to fetch professionals", error);
            }
        };
        fetchPros();
    }, []);

    // Filters
    const [priceFilter, setPriceFilter] = useState('all');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [availableNow, setAvailableNow] = useState(false);

    // Computed Pros (filtered)
    const filteredPros = useMemo(() => {
        return prosData.filter(pro => {
            if (availableNow && !pro.availableNow) return false;
            if (ratingFilter === '4+' && pro.rating < 4) return false;
            if (priceFilter === '200-500' && (pro.price < 200 || pro.price > 500)) return false;
            if (priceFilter === '500-1000' && (pro.price < 500 || pro.price > 1000)) return false;
            return true;
        });
    }, [availableNow, ratingFilter, priceFilter, prosData]);

    const handleBookingClick = (proId) => {
        navigate(`/professional/${proId}`);
    };

    return (
        <main>
            <Hero />
            <ServicesGrid title="Explore Our Services" services={CATEGORIES} />

            <section className="section bg-light" id="professionals">
                <div className="container" style={{ position: 'relative' }}>
                    <h2 className="section-title text-center">Top Rated Professionals in {location}</h2>

                    <AdvancedFilter
                        priceFilter={priceFilter}
                        setPriceFilter={setPriceFilter}
                        ratingFilter={ratingFilter}
                        setRatingFilter={setRatingFilter}
                        availableNow={availableNow}
                        setAvailableNow={setAvailableNow}
                    />

                    <div className="pros-grid">
                        {filteredPros.length === 0 ? (
                            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: 'var(--text-muted)' }}>
                                No professionals found matching your criteria.
                            </div>
                        ) : (
                            filteredPros.map(pro => (
                                <div key={pro.id} className="pro-card">
                                    <div className="pro-header">
                                        <img src={pro.avatar} alt={pro.name} className="pro-avatar" />
                                        <div className="pro-details">
                                            <h4>{pro.name}</h4>
                                            <p className="pro-exp">{pro.category} • {pro.experience}</p>
                                            <div className="pro-rating">
                                                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                                                {pro.rating} ({pro.reviews} reviews)
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pro-slots" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div className="slot-title" style={{ marginBottom: 0 }}>
                                            Starting at ₹{pro.price}
                                        </div>
                                        <button className="btn btn-accent book-action" onClick={() => handleBookingClick(pro.id)}>
                                            View Profile & Book
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <div className="locality-banner-wrapper">
                <div className="container">
                    <div className="locality-banner">
                        <h2>Proudly Serving {location} and Nearby Areas</h2>
                        <p>Trusted by over 5,000+ satisfied households in your neighborhood.</p>
                        <div className="wave-bg"></div>
                    </div>
                </div>
            </div>

            <WhyChooseUs />
        </main>
    );
};

export default Home;
