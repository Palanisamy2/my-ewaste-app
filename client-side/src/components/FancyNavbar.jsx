// components/FancyNavbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home, LogIn, UserPlus, FileEdit, Gift, User, Search
} from 'lucide-react';
import '../styles/FancyNavbar.css';

const FancyNavbar = () => {
    return (
        <nav className="fancy-navbar">
            <div className="logo">eWasteCare</div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" className="nav-link">
                        <Home size={18} className="icon" /> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" className="nav-link">
                        <LogIn size={18} className="icon" /> Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register" className="nav-link">
                        <UserPlus size={18} className="icon" /> Sign Up
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/report" className="nav-link">
                        <FileEdit size={18} className="icon" /> Report
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/rewards" className="nav-link">
                        <Gift size={18} className="icon" /> Rewards
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className="nav-link">
                        <User size={18} className="icon" /> Profile
                    </NavLink>
                </li>
                <li className="search-bar">
                    <Search size={16} className="search-icon" />
                    <input type="search" placeholder="Search..." />
                </li>
            </ul>
        </nav>
    );
};

export default FancyNavbar;
