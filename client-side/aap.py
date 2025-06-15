# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from geopy.geocoders import Nominatim

# app = Flask(__name__)
# CORS(app)

# @app.route("/api/geocode", methods=["POST"])
# def geocode():
#     data = request.get_json()
#     street = data.get("street")
#     city = data.get("city")
#     state = data.get("state")

#     if not street or not city or not state:
#         return jsonify(success=False, error="Missing address parts."), 400

#     full_address = f"{street}, {city}, {state}"

#     try:
#         geolocator = Nominatim(user_agent="e-waste-app")
#         location = geolocator.geocode(full_address)

#         if location:
#             return jsonify(
#                 success=True,
#                 latitude=location.latitude,
#                 longitude=location.longitude,
#                 full_address=location.address
#             )
#         else:
#             return jsonify(success=False, error="Location not found"), 404

#     except Exception as e:
#         return jsonify(success=False, error=str(e)), 500

# if __name__ == "__main__":
#     app.run(port=5000,debug=True)


import React, { useState, useEffect } from "react";
import PhotoCapture from "./PhotoCapture";
import axios from "axios";
import "../styles/ReportEwaste.css";

const ReportEwaste = () => {
    const [photos, setPhotos] = useState([]);
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
const [street, setStreet] = useState("");
const [stateName, setStateName] = useState("");

    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [detectionResults, setDetectionResults] = useState(null);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Latitude: ", latitude);
                    console.log("Longitude: ", longitude);
    
                    try {
                        const response = await fetch(
                            https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=en
                        );
                        const data = await response.json();
                        if (data && data.display_name) {
                            setLocation(data.display_name);
                        } else {
                            setLocation(Latitude: ${latitude}, Longitude: ${longitude});
                        }
                    } catch (error) {
                        console.error("Reverse geocoding failed:", error);
                        setLocation(Latitude: ${latitude}, Longitude: ${longitude});
                    }
                },
                () => {
                    setError("Unable to retrieve your location.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const getLocationFromInput = async () => {
        setError("");
        if (!city || !street || !stateName) {
            setError("Please enter street, city, and state.");
            return;
        }
        console.log("getiing location")
    
        const query = encodeURIComponent(${street}, ${city}, ${stateName});
        console.log("query " + query);
        try {
            console.log("enter try block")
            const response = await fetch(
                https://nominatim.openstreetmap.org/search?format=json&q=${query}
            );
            const data = await response.json();
            console.log("data : " + data.json());
    
            if (data.length > 0) {
                const { lat, lon } = data[0];
                const reverseResponse = await fetch(
                    https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1
                );
                const reverseData = await reverseResponse.json();
                setLocation(reverseData.display_name || Latitude: ${lat}, Longitude: ${lon});
                console.log("Location :" + location)
            } else {
                setError("Could not find the location. Please check the input.");
            }
        } catch (err) {
            console.error("Error fetching location:", err);
            setError("Failed to fetch location. Please try again.");
        }
    };
    
    

    useEffect(() => {
        getLocationFromInput();
    }, []);

    const getLocationFromServer = async () => {
        setError("");
        if (!city || !street || !stateName) {
            setError("Please enter street, city, and state.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/geocode", {

                
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ street, city, state: stateName }),
            });
            console.log("constion error");
    
            const data = await response.json();
    
            if (data.success) {
                setLocation(data.full_address);
            } else {
                setError(data.error || "Failed to fetch location.");
            }
        } catch (error) {
            setError("Server error. Please try again later.");
            console.error("Backend error:", error);
        }
    };
    

    const handleCapture = (imageBlob) => {
        setPhotos((prevPhotos) => [...prevPhotos, imageBlob]);
    };

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos(photos.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setDetectionResults(null);
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
        photos.forEach((photo) => formData.append("images", photo));

        try {
            const response = await axios.post("http://localhost:5000/api/reports", formData, {
                headers: {
                    Authorization: Bearer ${token},
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Report submitted successfully!");
            setDetectionResults(response.data.data.images);

            // Send report to another endpoint
            try {
                await axios.post("http://localhost:5000/api/send/reports", formData, {
                    headers: {
                        Authorization: Bearer ${token},
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                console.error("Error sending report:", error);
            }

            setPhotos([]);
            setDescription("");
        } catch (err) {
            console.error("Report submission failed:", err);
            alert(Report submission failed: ${err.message});
        } finally {
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
                        {/* <div className="Report-location">
                            <h3>Location:</h3>
                            <p>{location || "Fetching location..."}</p>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                        </div> */}

                        <div className="Report-manual-location">
    <h3>Enter Location Manually:</h3>
    <input
        type="text"
        placeholder="Street"
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
        value={stateName}
        onChange={(e) => setStateName(e.target.value)}
    />
   <button type="button" onClick={getLocationFromServer}>
    Get Location from Server
</button>

</div>


                        <div className="Report-description">
                            <h3>Description:</h3>
                            <textarea
                                placeholder="Describe the e-waste..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="report-btns">
                            <PhotoCapture onCapture={handleCapture} />
                            <button
                                className="report-submit-btn"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Report"}
                            </button>
                        </div>
                    </form>

                    {photos.length > 0 && (
                        <div className="Report-captured-photos">
                            <h2>Captured Photos:</h2>
                            {photos.map((photo, index) => (
                                <div key={index} style={{ display: "inline-block", margin: "10px" }}>
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt={Captured ${index}}
                                        width={100}
                                        height={100}
                                        style={{ objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <button
                                        onClick={() => handleRemovePhoto(index)}
                                        style={{
                                            display: "block",
                                            marginTop: "5px",
                                            color: "red",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

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