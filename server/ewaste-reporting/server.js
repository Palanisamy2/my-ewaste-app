const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const cors = require("cors");
const path = require("path");
const app = express();

const __dirname = path.resolve();
// Serve frontend build files
app.use(express.static(path.join(__dirname, "../../client-side/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client-side/dist/index.html"));
});

const port = process.env.PORT || 5000;

// Middleware to parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend communication
app.use(cors());

// Multer setup for file uploads (store files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const authRoutes = require("./routes/auth.routes");
const authReport = require("./routes/report.routes");

app.use("/api/auth",authRoutes);
app.use("/api/send",authReport);
app.use("/api/reports/profile", authReport);


// API route to handle image uploads and reports
app.post("/api/reports", upload.array("images"), async (req, res) => {
  try {
    const { userId, location, description } = req.body;
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    console.log("Report Received:", {
      userId,
      location,
      description,
      imageCount: images.length,
    });

    // Process each image for e-waste detection
    const detectionResults = await Promise.all(
      images.map(async (image) => {
        const imagePath = `uploads/${Date.now()}-${image.originalname}`;
        fs.writeFileSync(imagePath, image.buffer);

        const formData = new FormData();
        formData.append("file", fs.createReadStream(imagePath));

        try {
          const response = await axios.post(
            "https://detect.roboflow.com/ewaste-detection-2kxmr/1?api_key=hNHDoYp9FbsbdGof9vsY",
            formData,
            { headers: { ...formData.getHeaders() } }
          );

          fs.unlinkSync(imagePath); // Delete file after sending
          return response.data;
        } catch (error) {
          console.error("Roboflow API Error:", error.message);
          return { error: "Detection failed" };
        }
      })
    );

    // Send response back to frontend
    res.json({
      message: "Report submitted successfully",
      data: { userId, location, description, images: detectionResults },
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
