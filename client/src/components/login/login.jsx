import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',  
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        try {
            const response = await axios.post('http://localhost:9000/auth/login', formData);
            

            toast.success('Login successful!');
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error.response.data); // Log the error response
            toast.error('Login failed. Please check your credentials.');
        }
    };

    const globalStyle = {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
    };

    const containerStyle = {
        background: 'linear-gradient(to right, #4a5568, #1a202c)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
    };

    const cardStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        padding: '32px',
        width: '400px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)', // Increased shadow for depth
        backdropFilter: 'blur(10px)', // Blurred background for modern look
    };

    const titleStyle = {
        fontSize: '2.5rem', // Increased title size
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#ffff00',
        textAlign: 'center',
    };

    const inputStyle = {
        width: '90%',
        padding: '12px',
        marginBottom: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        transition: 'border-color 0.3s', // Smooth transition for focus
    };

    const buttonStyle = {
        backgroundColor: '#4a5568',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'block', // Set display to block
        margin: '0 auto', // Center the button horizontally
        width: '90%',
        fontSize: '16px',
        transition: 'background-color 0.3s, transform 0.3s', // Button hover effects
    };

    return (
        <>
            <style>
                {`
                    body, html {
                        ${Object.entries(globalStyle)
                            .map(([key, value]) => `${key}: ${value};`)
                            .join(' ')}
                    }

                    input:focus {
                        border-color: #ffff00; /* Change border color on focus */
                        outline: none; /* Remove outline */
                    }

                    button:hover {
                        background-color: #3f4c55; /* Darker shade on hover */
                        transform: scale(1.05); /* Scale up on hover */
                    }
                `}
            </style>
            <ToastContainer />
            <div style={containerStyle}>
                <motion.div
                    style={cardStyle}
                    initial={{ opacity: 0, scale: 0.8 }} // Initial scale and opacity
                    animate={{ opacity: 1, scale: 1 }} // Animate to full scale and opacity
                    transition={{ duration: 0.5 }} // Transition duration
                >
                    <h1 style={titleStyle}>Login</h1>
                    <form onSubmit={handleSubmit}> {/* Attach handleSubmit to form submission */}
                        <div style={{ marginBottom: '16px' }}>
                            <FaUser size={20} color="#ffff00" />
                            <input
                                type="text"
                                name="username" // Add name attribute for input
                                placeholder="Username"
                                style={inputStyle}
                                value={formData.username} // Controlled input
                                onChange={handleChange} // Update input on change
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <FaLock size={20} color="#ffff00" />
                            <input
                                type="password"
                                name="password" // Add name attribute for input
                                placeholder="Password"
                                style={inputStyle}
                                value={formData.password} // Controlled input
                                onChange={handleChange} // Update input on change
                                required
                            />
                        </div>
                        <motion.button
                            type="submit"
                            style={buttonStyle}
                            whileHover={{ scale: 1.05 }} // Scale effect on hover
                            whileTap={{ scale: 0.95 }} // Scale effect on tap
                        >
                            Login
                        </motion.button>
                    </form>
                    <p style={{ textAlign: 'center', color: 'white' }}>
                        Don't have an account? <Link to="/signup" style={{ color: '#ffff00' }}>Sign Up</Link>
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default LoginPage;
