const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const cors = require("cors");
const path = require("path");
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

// ✅ Enable CORS for frontend communication
const allowedOrigins = [
  "https://my-ewaste-app.vercel.app",
  "http://localhost:5173"  // for local dev
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


// Middleware to parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads (store files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
const authRoutes = require("./routes/auth.routes");
const authReport = require("./routes/report.routes");

app.use("/api/auth", authRoutes);
app.use("/api/send", authReport);
app.use("/api/reports/profile", authReport);

// API route to handle image uploads
app.post("/api/reports", upload.array("images"), async (req, res) => {
  try {
    const { userId, location, description } = req.body;
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

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

          fs.unlinkSync(imagePath);
          return response.data;
        } catch (error) {
          console.error("Roboflow API Error:", error.message);
          return { error: "Detection failed" };
        }
      })
    );

    res.json({
      message: "Report submitted successfully",
      data: { userId, location, description, images: detectionResults },
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Serve frontend build files last
// app.use(express.static(path.join(__dirname, "../../client-side/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../client-side/dist/index.html"));
// });

app.listen(port, () => console.log(`Server running on port ${port}`));
