const db = require('../config/database');

// Create a new report
const path = require('path');
const fs = require('fs');
const { console } = require('inspector');

// Example: Multer config is saving file to local 'uploads/' directory

// Inside your report creation route:
exports.createReport = async (req, res) => {
  const { userId, location, description, predictions } = req.body;
  const files = req.files;

  console.log("Received Data:", userId, location, description,predictions, files);

  try {
    // Extract filenames only
 

    const query = `
      INSERT INTO reports (userid, location, description, images, prediction)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [userId, location, description, files, predictions]; // Only filenames

    await db.query(query, values);

    res.status(201).json({ message: 'Report saved successfully' });
  } catch (err) {
    console.error("Error inserting report:", err);
    res.status(500).json({ error: 'Failed to save report' });
  }
};


// Get all reports
exports.getAllReports = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM reports');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
};

exports.getPredictionReports = async (req, res) => {
  try {
      console.log("Entered getPredictionReports");
      console.log("Fetching reports for user:", req.params.userId);
      
      const result = await db.query(
          `SELECT 
              reports.userid, 
              reports.id, 
              reports.prediction, 
              reports.location,
              users.username, 
              users.password, 
              users.email, 
              users.phone, 
              users.location AS user_location
           FROM 
              reports
           INNER JOIN 
              users ON reports.userid = users.id
           WHERE 
              reports.userid = $1`,
          [req.params.userId]
      );

      res.status(200).json(result.rows);
  } catch (error) {
      console.error('Error fetching prediction reports:', error);
      res.status(500).json({ error: 'Failed to retrieve reports' });
  }
};
