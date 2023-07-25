import React, { useState, useRef } from "react";

const CameraComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Camera access denied or not available.");
      console.error("Error accessing the camera:", err);
    }
  };

  const handleTakePicture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    // You can save the image by converting the canvas data to a data URL
    const dataURL = canvas.toDataURL("canvas data to url data");

    // For this example, we'll log the dataURL in the console
    console.log("Captured image data URL:", dataURL);

    // In a real application, you can send the dataURL to the server
    // using APIs to save the image on the server or perform further processing.

    // Note: The dataURL will be a Base64-encoded string representation of the image.
    // You can also convert it to a Blob and use the FormData API to send it to the server.
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <video ref={videoRef} autoPlay />
          <button onClick={handleCameraAccess}>Start Camera</button>
          <button onClick={handleTakePicture}>Take Picture</button>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </>
      )}
    </div>
  );
};

export default CameraComponent;
