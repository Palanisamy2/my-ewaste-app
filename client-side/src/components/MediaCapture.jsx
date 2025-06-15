import React, { useEffect, useRef, useState } from 'react';

const MediaCapture = () => {
    const videoRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Request camera access
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.error('Error accessing camera:', err);
            });
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                error => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const captureImage = () => {
        getLocation(); // Get location when capturing media
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        document.body.appendChild(img); // Append image to the body or a specific div
    };

    return (
        <div>
            <h2>Capture Photo/Video and Get Location</h2>
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <button onClick={captureImage}>Capture</button>
            {location && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default MediaCapture;