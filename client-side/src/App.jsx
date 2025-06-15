import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import ReportEwaste from './components/ReportEwaste';
import Login from './components/Login';
import Home from './components/Home';
import Rewards from './components/Rewards';
import Profile from './components/Profile';
import MediaCapture from './components/MediaCapture'; // Import the new component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import FancyNavbar from './components/FancyNavbar';

const App = () => {
    return (
        <Router>
         <ToastContainer />
            {/* <nav className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Sign Up</Link></li>
                    <li><Link to="/report">Report E-Waste</Link></li>
                    <li><Link to="/rewards">Rewards</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                  
                </ul>
            </nav> */}
            <FancyNavbar />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/report" element={<ReportEwaste />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* <Route path="/media-capture" element={<MediaCapture />} /> New route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;