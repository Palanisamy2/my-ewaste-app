const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require('./config/database');

const port = process.env.PORT || 5000;

// ✅ Regex to match all Vercel preview URLs for this project
const vercelPreviewRegex = /^https:\/\/my-ewaste-.*-palanisamy2s-projects\.vercel\.app$/;

// ✅ CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or non-browser requests

    // Allow local dev
    if (origin === "http://localhost:5173") return callback(null, true);

    // Allow main production frontend
    if (origin === "https://my-ewaste-app.vercel.app") return callback(null, true);

    // Allow all Vercel preview deployments
    if (vercelPreviewRegex.test(origin)) return callback(null, true);

    // Block anything else
    return callback(new Error(`CORS policy: access denied for origin ${origin}`), false);
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

// DATABASE_URL=postgres://postgres:Palani20047@localhost:5432/ewaste_project
// JWT_SECRET=your_secret_key
// ROBOFLOW_API_KEY = hNHDoYp9FbsbdGof9vsY
// FRONTEND_URL=http://localhost:5173
// PORT=5000

db.query('SELECT NOW()')
  .then(res => console.log('DB time:', res.rows[0]))
  .catch(err => console.error('DB connection failed:', err));


app.listen(port, () => console.log(`Server running on port ${port}`));
