import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, Clock, ArrowRight, ShoppingCart, CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <main className="cart-page bg-light section">
            <div className="container">
                <motion.div
                    className="cart-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2>Your Service Cart</h2>
                    <p>Review your selected services before confirming the booking.</p>
                </motion.div>

                {cartItems.length === 0 ? (
                    <motion.div
                        className="empty-cart glass-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <ShoppingCart size={64} className="text-muted" />
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven't added any services yet.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/#services')}>
                            Browse Services
                        </button>
                    </motion.div>
                ) : (
                    <div className="cart-layout">
                        {/* Left Side: Cart Items */}
                        <div className="cart-items-container">
                            <AnimatePresence>
                                {cartItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        className="cart-item glass-card"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="cart-item-info">
                                            <div className="worker-meta">
                                                <img src={item.worker.avatar} alt={item.worker.name} className="cart-avatar" />
                                                <div>
                                                    <h4>{item.serviceName}</h4>
                                                    <p className="text-muted">by {item.worker.name}</p>
                                                </div>
                                            </div>
                                            <div className="booking-meta">
                                                <span className="meta-pill"><Calendar size={14} /> {item.date}</span>
                                                <span className="meta-pill"><Clock size={14} /> {item.slot}</span>
                                            </div>
                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="item-price">₹{item.price}</div>
                                            <button
                                                className="icon-btn text-danger bg-danger-light"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Right Side: Summary */}
                        <motion.div
                            className="cart-summary glass-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3>Booking Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>₹{calculateTotal()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Platform Fee</span>
                                <span>₹49</span>
                            </div>
                            <hr className="summary-divider" />
                            <div className="summary-row total">
                                <span>Total Amount</span>
                                <span>₹{calculateTotal() + 49}</span>
                            </div>

                            <button
                                className="btn btn-primary btn-full checkout-btn"
                                onClick={() => setIsConfirmModalOpen(true)}
                            >
                                Confirm Booking <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {isConfirmModalOpen && (
                    <div className="modal-overlay">
                        <motion.div
                            className="modal-content glass"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{ textAlign: 'center' }}
                        >
                            {isSuccess ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring' }}
                                    style={{ padding: '2rem' }}
                                >
                                    <CheckCircle size={80} className="text-accent" style={{ margin: '0 auto 1.5rem' }} />
                                    <h2>Booking Confirmed!</h2>
                                    <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Your services have been successfully scheduled.</p>
                                    <p>Redirecting to your bookings...</p>
                                </motion.div>
                            ) : (
                                <>
                                    <button className="modal-close" onClick={() => setIsConfirmModalOpen(false)}>
                                        <X size={24} />
                                    </button>
                                    <div className="modal-header">
                                        <h3>Final Confirmation</h3>
                                        <p className="text-muted">You are about to book {cartItems.length} service(s) for a total of ₹{calculateTotal() + 49}.</p>
                                    </div>
                                    <p style={{ margin: '1.5rem 0' }}>Are you sure you want to proceed and finalize this booking?</p>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        <button className="btn btn-outline btn-full" onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
                                        <button
                                            className="btn btn-primary btn-full"
                                            onClick={() => {
                                                setIsSuccess(true);
                                                setTimeout(() => {
                                                    clearCart();
                                                    navigate('/bookings');
                                                }, 2500);
                                            }}
                                        >
                                            Yes, Book Now
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </main>
    );
};

export default Cart;
