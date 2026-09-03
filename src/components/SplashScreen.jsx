import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out after 1.8s
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, 1800);

    // Completely unmount after transition (2.4s)
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash-overlay ${fadingOut ? 'splash-fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo-wrapper">
          <img src="/logo-small - Copy.png" alt="GeeksforGeeks PCCOE" className="splash-logo-img" />
        </div>
        <div className="splash-brand-text">
          <h1 className="splash-title">GeeksforGeeks</h1>
          <p className="splash-subtitle">Campus Body • PCCOE</p>
        </div>
        <div className="splash-progress-bar">
          <div className="splash-progress-fill"></div>
        </div>
      </div>
    </div>
  );
}
