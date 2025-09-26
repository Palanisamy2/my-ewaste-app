import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import '../styles/Profile.css';
const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [storereport, setStoreReport] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const CO2_MAP = {
    battery: 0.4,
    keyboard: 0.3,
    microwave: 3.2,
    mobile: 0.5,
    mouse: 0.2,
    pcb: 1.5,
    player: 1.0,
    printer: 1.2,
    television: 3.5,
    washingmachine: 5.0,
  };
  

  const getReports = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/reports/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setStoreReport(response.data);
      console.log("Reports fetched successfully:", response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    const total = storereport.reduce((acc, report) => {
      const prediction = report.prediction?.toLowerCase();
      const saved = CO2_MAP[prediction] || 0;
      return acc + saved;
    }, 0);
    setTotalCO2(total.toFixed(2)); // rounding to 2 decimal places
  }, [storereport]);

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="profile-card"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <motion.div
          className="profile-top"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.img
            src="https://i.pravatar.cc/150?u=profile"
            alt="Profile"
            className="profile-pic"
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
          <div className="profile-details">
            <p><strong>Name:</strong> {storereport[0]?.username}</p>
            <p><strong>Email:</strong> {storereport[0]?.email}</p>
            <p><strong>Phone:</strong> {storereport[0]?.phone}</p>
            <p><strong>Location:</strong> {storereport[0]?.user_location}</p>
          </div>
        </motion.div>

        <hr />

        <motion.div
          className="stats-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p>🗑️ <strong>Reports Submitted:</strong> {storereport.length}</p>
          <p>✅ <strong>Pickups Completed:</strong> {storereport.length}</p>
          <p>⏳ <strong>Pending:</strong> 0</p>
        </motion.div>

        <hr />

        <motion.div
          className="co2-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p>🌍 <strong>Total Saved:</strong> {totalCO2} kg CO₂</p>
        </motion.div>

        <hr />

        <motion.div
          className="profile-buttons"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {['Edit Profile', 'Change Password', 'Submit New Report', 'Logout'].map((btn) => (
            <motion.button
              key={btn}
              className={`profile-btn ${btn === 'Logout' ? 'logout' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {btn}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
