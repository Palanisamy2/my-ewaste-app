// Full Login Page with CSS and Functionality

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, {
                username,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('email', response.data.email);

            toast.success('Login successful!', {
                position: 'top-center',
                autoClose: 3000,
                theme: 'colored'
            });

            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed! Please check your credentials.', {
                position: 'top-center',
                autoClose: 3000,
                theme: 'colored'
            });
        }
    };

    return (
        <div className='login-background'>
            <div className="l-container">
                <div className='login-container'>
                    <h2>May I know who you are?</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className={`password-icon ${showPassword ? 'show' : ''}`}
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                    <button className='login-btn' onClick={handleLogin}>Login</button>
                    <p style={{ marginTop: '1rem', color: '#666' }}>
                        Don't have any account? <a href="/register" style={{ color: '#667eea', fontWeight: 'bold' }}>Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
