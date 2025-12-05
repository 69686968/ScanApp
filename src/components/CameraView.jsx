import React, { useRef, useEffect, useState } from 'react';
import './CameraView.css';

export function CameraView({ onRef }) {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (onRef) onRef(videoRef);

        let stream = null;

        async function setupCamera() {
            // Check if MediaDevices API is available (often undefined in insecure contexts like HTTP)
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setError("Camera access requires a secure connection (HTTPS). This app may not work on mobile via HTTP.");
                return;
            }

            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setError(null);
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError(`Camera Error: ${err.message || 'Permission denied'}`);
            }
        }

        setupCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [onRef]);

    return (
        <div className="camera-container">
            {error ? (
                <div className="camera-error" style={{ color: 'white', padding: '20px', textAlign: 'center', zIndex: 100 }}>
                    <p>{error}</p>
                    <p style={{ fontSize: '0.8em', marginTop: '10px', opacity: 0.7 }}>Try opening this on localhost or enable Insecure Origins.</p>
                </div>
            ) : (
                <video
                    ref={videoRef}
                    className="camera-video"
                    autoPlay
                    playsInline
                    muted
                />
            )}
        </div>
    );
}
