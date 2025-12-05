import React, { useState, useRef } from 'react';
import { CameraView } from './components/CameraView';
import { ScannerOverlay } from './components/ScannerOverlay';
import { ResultsCard } from './components/ResultsCard';
import './App.css';

function App() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);
  const videoRef = useRef(null);

  const handleScan = () => {
    if (scanning) return;
    setScanning(true);
    setResults(null);

    // Mock scanning delay
    setTimeout(() => {
      setScanning(false);
      // Mock Data
      setResults({
        ingredients: [
          { name: 'Water' },
          { name: 'Sugar' },
          { name: 'Citric Acid' },
          { name: 'Natural Flavors' },
          { name: 'Red 40', warning: 'Artificial Color' },
          { name: 'High Fructose Corn Syrup', warning: 'High Sugar' }
        ]
      });
    }, 2500);
  };

  const handleCloseResults = () => {
    setResults(null);
  };

  return (
    <div className="app-container">
      <CameraView onRef={(ref) => (videoRef.current = ref.current)} />

      <ScannerOverlay scanning={scanning} />

      <div className={`controls ${results ? 'hidden' : ''}`}>
        <div className="scan-button-wrapper">
          <button
            className={`scan-button ${scanning ? 'active' : ''}`}
            onClick={handleScan}
            disabled={scanning}
          >
            <div className="scan-inner" />
          </button>
        </div>
        <div className="controls-text">
          {scanning ? 'Scanning...' : 'Tap to Scan'}
        </div>
      </div>

      <ResultsCard results={results} onClose={handleCloseResults} />
    </div>
  );
}

export default App;
