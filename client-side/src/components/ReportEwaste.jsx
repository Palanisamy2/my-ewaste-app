import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotoCapture from "./PhotoCapture";
import "../styles/ReportEwaste.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_API_URL;

const ReportEwaste = () => {
    const [photos, setPhotos] = useState([]);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [latLon, setLatLon] = useState({ lat: null, lon: null });
    const [detectionResults, setDetectionResults] = useState(null);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [predictedLabels, setPredictedLabels] = useState([]);


    const [analysisResults, setAnalysisResults] = useState([]);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // ✅ Auto GPS + reverse geocoding
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatLon({ lat: latitude, lon: longitude });

                    try {
                        const apiKey = 'dd2ecd7c6966473b837d841eaf1d329e';
                        const response = await axios.get(
                            `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`
                        );

                        if (response.data.results.length > 0) {
                            const address = response.data.results[0].formatted || `Lat: ${latitude}, Lon: ${longitude}`;
                            setLocation(address);
                        } else {
                            setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
                        }
                    } catch (err) {
                        console.error("Geocoding error:", err);
                        setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
                    }
                },
                (err) => {
                    console.error("Geolocation error:", err);
                    setError("Unable to retrieve your location.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    };

    useEffect(() => {
        getLocation(); // Auto-fetch location on mount
    }, []);

    const fetchLatLon = async () => {
        setError("");

        if (street && city && state) {
            const address = `${street}, ${city}, ${state}, India`;

            try {
                const apiKey = 'dd2ecd7c6966473b837d841eaf1d329e';
                const response = await axios.get(
                    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`
                );

                if (response.data.results.length > 0) {
                    const result = response.data.results[0];
                    const { lat, lng } = result.geometry;
                    setLatLon({ lat, lon: lng });
                    setLocation(result.formatted || address);
                } else {
                    setError("No location found for the given address.");
                }
            } catch (err) {
                console.error("Address geocoding error:", err);
                setError("Failed to fetch location. Try again.");
            }
        } else {
            setError("Please fill in Street, City, and State.");
        }
    };

    const handleCapture = (imageBlob) => {
        setPhotos((prevPhotos) => [...prevPhotos, imageBlob]);
    };

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos(photos.filter((_, index) => index !== indexToRemove));
    };

    // ✅ Analyze Image (API to detect if it's e-waste)
    const analyzeImage = async(e) =>  {
        
            e.preventDefault();
            setError("");
            setDetectionResults(null);
            setLoading(true);
            console.log("Analyzing image...");
    
            if (!location) {
                setError("Location is required to submit the report.");
                setLoading(false);
                return;
            }
    
            if (photos.length === 0) {
                setError("Please capture at least one photo before submitting.");
                setLoading(false);
                return;
            }
    
            if (!token || !userId) {
                setError("User authentication failed. Please log in again.");
                setLoading(false);
                return;
            }
    
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("location", location);
            formData.append("description", description);
            photos.forEach((photo) => formData.append("images", photo));
            console.log("Form data prepared for analysis:", formData);
    
            try {
                const response = await axios.post(`${apiUrl}/api/reports`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });  

                 toast.success('Image Analyzed successfully!', {
                                position: 'top-center',
                                autoClose: 3000,
                                theme: 'colored'
                            }); 
    
                console.log("Analysis response:", response.data);
                setDetectionResults(response.data.data.images);
                const labels = response.data.data.images.map(img => {
                    if (img.predictions && img.predictions.length > 0) {
                        return img.predictions[0].class;  // take top prediction
                    }
                    return "Unknown";
                });
                setPredictedLabels(labels);
                

        } catch (err) {
            toast.error("Error analyzing image:", {
                            position: 'top-center',
                            autoClose: 3000,
                            theme: 'colored'
                        });
            console.error("Error analyzing image:", err);
            throw new Error("Failed to analyze image.");
        }
        finally {
            setLoading(false);
        }
    };

    // ✅ Handle form submission and image analysis
    const handleSubmit = async (e) => {
        console.log("Submitting report...");
        e.preventDefault();
        setError("");
        
        setLoading(true);

        if (!location) {
            setError("Location is required to submit the report.");
            setLoading(false);
            return;
        }

        if (photos.length === 0) {
            setError("Please capture at least one photo before submitting.");
            setLoading(false);
            return;
        }

        if (!token || !userId) {
            setError("User authentication failed. Please log in again.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("predictions", predictedLabels[0]);
        photos.forEach((photo) => formData.append("images", photo));
        console.log("Form data prepared for report submission:", formData);
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ':', pair[1]);
        }
     
            try {
                const report = await axios.post(`${apiUrl}/api/send/reports`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success('Report sent successfully to the second endpoint.', {
                    position: 'top-center',
                    autoClose: 3000,
                    theme: 'colored'
                }); 
                console.log("Report sent successfully to the second endpoint.");
               console.log(report.data);
               
            setPhotos([]);
            setDescription("");
            setDetectionResults(null);
            } catch (error) {
                toast.error("Error sending report:", {
                    position: 'top-center',
                    autoClose: 3000,
                    theme: 'colored'
                });
                console.error("Error sending report:", error);
            }
          finally {
            setLoading(false);
        }
    };

    return (
        <div className="Report-container">
            <div className="Report-background">
                <div className="Report-form-container">
                    <div className="Report-header">
                        <h1>Report E-Waste</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="Report-location">
                            <h3>📍 Detected Location</h3>
                            <p><strong>Address:</strong> {location || "Detecting location..."}</p>
                            <p><strong>Coordinates:</strong> {latLon.lat}, {latLon.lon}</p>
                        </div>

                        <h3>📌 Or Enter Address Manually</h3>
                        <div className="Report-address-inputs">
                            <input
                                type="text"
                                placeholder="Street Name"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <button type="button" onClick={fetchLatLon}>Fetch Location</button>
                        </div>

                        <PhotoCapture onCapture={handleCapture} />
                        {/* <div className="photos-preview">
                            {photos.map((photo, index) => (
                                <div key={index} className="photo-preview">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="Captured"
                                        className="preview-img"
                                    />
                                    <button type="button" onClick={() => handleRemovePhoto(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div> */}

                        <textarea
                            placeholder="Add a description of the e-waste"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <button className="report-analyze-btn" type="button" onClick={analyzeImage} disabled={loading}>
                            {loading ? "Analyzing..." : "Analyze Images"}
                        </button>

                      
                        {error && <div className="error-message">{error}</div>}
                    </form>
                    {detectionResults && (
                        <div className="Report-detection-results">
                            <h2>E-Waste Detection Results:</h2>
                            {detectionResults.map((result, index) => (
                                <div key={index} className="result-item">
                                    {result.error ? (
                                        <p style={{ color: "red" }}>Error: {result.error}</p>
                                    ) : (
                                        <div
                                            style={{
                                                background:
                                                    Array.isArray(result.predictions) &&
                                                    result.predictions.length > 0 &&
                                                    [
                                                        "Keyboard", "Battery", "Microwave",
                                                        "Mobile", "Mouse", "PCB", "Player",
                                                        "Printer", "Television", "Washing Machine"
                                                    ].includes(result.predictions[0].class)
                                                        ? "#d4edda"
                                                        : "#f8d7da",
                                                padding: "10px",
                                                borderRadius: "8px",
                                                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            <p><strong>Prediction:</strong> {
                                                Array.isArray(result.predictions) && result.predictions.length > 0
                                                    ? [
                                                        "Keyboard", "Battery", "Microwave",
                                                        "Mobile", "Mouse", "PCB", "Player",
                                                        "Printer", "Television", "Washing Machine"
                                                    ].includes(result.predictions[0].class)
                                                        ? "E-Waste"
                                                        : "Non E-Waste"
                                                    : "N/A"
                                            }</p>
                                            <p><strong>Confidence:</strong> {result.confidence || "N/A"}</p>
                                            <p><strong>Detected:</strong> Yes</p>
                                        </div>
                                    )}
                                    <button type="submit" className="report-submit-btn" disabled={loading} onClick={handleSubmit}>
                            {loading ? "Submitting..." : "Submit Report"}
                        </button>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportEwaste;