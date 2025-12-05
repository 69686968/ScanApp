import React from 'react';
import './ScannerOverlay.css';

export function ScannerOverlay({ scanning }) {
    if (!scanning) return null;

    return (
        <div className="scanner-overlay">
            <div className="scanner-line"></div>
            <div className="scanner-text">Analyzing Content...</div>
        </div>
    );
}
