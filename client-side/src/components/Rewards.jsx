import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/Rewards.css';

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

const Rewards = () => {
  const [reports, setReports] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchReports = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setReports(response.data);

      // Calculate total CO2 saved
      let total = 0;
      response.data.forEach((report) => {
        const prediction = report.prediction?.toLowerCase();
        if (CO2_MAP[prediction]) {
          total += CO2_MAP[prediction];
        }
      });

      setTotalCO2(total.toFixed(2)); // rounding to 2 decimal places
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const earnedRewards = [];

  if (reports.length >= 3) {
    earnedRewards.push({
      id: 1,
      title: 'Bronze Badge',
      description: 'Submitted 3+ reports',
      icon: '🥉'
    });
  }

  if (totalCO2 >= 5) {
    earnedRewards.push({
      id: 2,
      title: 'Silver Saver',
      description: `Saved ${totalCO2} kg CO₂`,
      icon: '🥈'
    });
  }

  if (reports.length >= 10) {
    earnedRewards.push({
      id: 3,
      title: 'Eco Hero',
      description: '10+ Pickups Completed',
      icon: '🏆'
    });
  }

  return (
    <motion.div 
      className="reward-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="reward-background"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
      >
        <div className="reward-form-container">
          <h2>Your Rewards</h2>
          <p>See the milestones you’ve achieved by reporting and reducing e-waste 💚</p>

          <div className="reward-grid">
            {earnedRewards.length > 0 ? (
              earnedRewards.map((reward, index) => (
                <motion.div 
                  className="reward-card"
                  key={reward.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.2 }}
                >
                  <div className="reward-icon">{reward.icon}</div>
                  <h3>{reward.title}</h3>
                  <p>{reward.description}</p>
                </motion.div>
              ))
            ) : (
              <p>No rewards yet. Keep reporting to earn badges! 💪</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Rewards;
