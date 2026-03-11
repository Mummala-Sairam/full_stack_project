import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('access_token') || null);
    const navigate = useNavigate();

    const API_URL = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        if (authToken) {
            fetchUserProfile(authToken);
        } else {
            setLoading(false);
        }
    }, [authToken]);

    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get(`${API_URL}/me/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            logout(); // Invalid token handling
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password, redirectPath = null) => {
        try {
            const response = await axios.post(`${API_URL}/token/`, { username: email, password });
            const { access, refresh } = response.data;

            setAuthToken(access);
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            await fetchUserProfile(access);
            toast.success('Login Successful');

            if (redirectPath) {
                navigate(redirectPath);
            }
            return true;
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.detail || 'Invalid credentials');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            await axios.post(`${API_URL}/register/`, { name, email, password });
            toast.success('Registration successful. Please login.');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        toast.success('Logged out successfully');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, authToken }}>
            {children}
        </AuthContext.Provider>
    );
};
