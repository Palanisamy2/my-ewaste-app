const express = require('express');
const reportController = require('../controllers/report.controller');
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
// Multer setup for file uploads (store files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
require("dotenv").config();

const router = express.Router();

router.post("/detect-ewaste", async (req, res) => {
    console.log("Entered detect e-waste");

    const { image } = req.body; // Get base64 image from request

    if (!image) {
        return res.status(400).json({ error: "No image provided" });
    }

    try {
        const requestData = { image };

        const response = await axios.post(
            `https://detect.roboflow.com/ewaste-detection-2kxmr/1?api_key=${process.env.ROBOFLOW_API_KEY}`,
            requestData,
            { headers: { "Content-Type": "application/json" } }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error detecting e-waste:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to detect e-waste" });
    }
});


router.post('/reports', upload.array("images"),(req, res, next) => {
    console.log("Received request for /api/reports");
    next();
}, reportController.createReport);

router.get('/reports', reportController.getAllReports);
router.get('/:userId',reportController.getPredictionReports);

module.exports = router;