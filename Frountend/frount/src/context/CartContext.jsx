import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('localserve_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('localserve_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        // Check if item slot is already in cart for the same worker and date
        const exists = cartItems.find(
            c => c.worker.id === item.worker.id && c.date === item.date && c.slot === item.slot
        );

        if (exists) {
            toast.error("This slot is already in your cart.");
            return;
        }

        setCartItems(prev => [...prev, { ...item, id: Date.now().toString() }]);
        toast.success(`${item.serviceName} added to cart!`);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
        toast.success("Item removed from cart.");
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
