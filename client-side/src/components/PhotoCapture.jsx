// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import '../styles/PhotoCapture.css';

// const PhotoCapture = ({ onCapture }) => {
//     const webcamRef = useRef(null);
//     const [capturedImage, setCapturedImage] = useState(null);
//     const [isCameraOpen, setIsCameraOpen] = useState(false); // State to control camera visibility

//     const capture = () => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         setCapturedImage(imageSrc);
//         onCapture(imageSrc); // Pass the captured image to the parent component
//         setIsCameraOpen(false); // Close the camera after capturing
//     };

//     return (
//         <div className='PhotoCapture-container'>
//             {isCameraOpen ? (
//                 <>
//                     <Webcam
//                         audio={false}
//                         ref={webcamRef}
//                         screenshotFormat="image/jpeg"
//                         // width={550}
//                         className='Webcam-container'
//                     />
//                     <div className='Webcam-overlay'>
//                         <button className='Webcam-overlay-btn' onClick={capture}>Capture Photo</button>
//                         <button className='Webcam-overlay-btn' onClick={() => setIsCameraOpen(false)}>Close Camera</button>
//                     </div>
//                     {capturedImage && (
//                         <div>
//                             <h2>Captured Image:</h2>
//                             <img src={capturedImage} alt="Captured" />
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
//             )}
//         </div>
//     );
// };

// export default PhotoCapture;


import React, { useRef, useState } from "react";
import "../styles/PhotoCapture.css"; // Import your CSS file for styling

const PhotoCapture = ({ onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    // Start webcam
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    };

    // Capture image from webcam
    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to Blob
        canvas.toBlob((blob) => {
            if (blob) {
                const imageUrl = URL.createObjectURL(blob);
                setCapturedImage(imageUrl);
                onCapture(blob); // Pass Blob to parent
            }
        }, "image/jpeg");
    };

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCapturedImage(imageUrl);
            onCapture(file); // Pass file (Blob) to parent
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline width="700" height="200"></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
           
            <button  className="start-camera" onClick={startCamera}>Start Camera</button>
            <button onClick={capturePhoto} className="capture-camera">Capture Photo</button>
         
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            {capturedImage && <img src={capturedImage} alt="Captured" width={100} />}
        </div>
    );
};

export default PhotoCapture;
