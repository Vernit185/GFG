import React, { useState, useEffect } from 'react';
import gfgEmblem from '../assets/gfg-emblem.png';
import './GfgIntroLanding.css';

export default function GfgIntroLanding({ onComplete }) {
  // Stages: 'spinning' (0-1.3s) -> 'reveal' (1.3-2.2s) -> 'opening' (2.2-3.0s) -> 'done'
  const [stage, setStage] = useState('spinning');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Stage 1 -> 2: Spin for 1.3s then stop and reveal PCCOE
    const spinTimer = setTimeout(() => {
      setStage('reveal');
    }, 1300);

    // Stage 2 -> 3: Reveal PCCOE for 0.9s then start window opening at 2.2s
    const openTimer = setTimeout(() => {
      setStage('opening');
    }, 2200);

    // Stage 3 -> Done: Total intro takes exactly 3.0s, window slides open automatically
    const finishTimer = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(spinTimer);
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  // Subtle interactive 3D parallax on mouse move
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 35;
    const y = (e.clientY - innerHeight / 2) / 35;
    setMousePos({ x, y });
  };

  if (stage === 'done') return null;

  return (
    <div
      className={`gfg-intro-overlay stage-${stage}`}
      onMouseMove={handleMouseMove}
    >
      {/* Black cyber space background with ambient particles & glowing grid */}
      <div className="cyber-space-bg">
        <div className="cyber-grid"></div>
        <div className="ambient-glow-core"></div>
        <div className="cyber-particles">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 100}%`,
                animationDelay: `${(i * 0.2) % 2}s`,
                animationDuration: `${2.5 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Left & Right Window Entry Panels (Window Style Opening) */}
      <div className="window-panel window-panel-left">
        <div className="window-glass-glare"></div>
        <div className="window-tech-lines">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div className="window-panel window-panel-right">
        <div className="window-glass-glare"></div>
        <div className="window-tech-lines">
          <span></span><span></span><span></span>
        </div>
      </div>

      {/* Center 3D Logo Stage */}
      <div
        className="intro-center-stage"
        style={{
          transform: `perspective(1200px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
        }}
      >
        {/* Intense Glowing Green Shadow Layer */}
        <div className="logo-glow-shadow"></div>
        <div className="logo-pulse-ring"></div>

        {/* 3D GFG Logo Emblem */}
        <div className={`logo-3d-wrapper ${stage}`}>
          {/* Multi-layered 3D GFG Card */}
          <div className="logo-3d-card">
            {/* Front Face */}
            <div className="logo-card-face logo-face-front">
              <img src={gfgEmblem} alt="GeeksforGeeks 3D Emblem" className="intro-gfg-logo-img" />
              <div className="glass-reflection"></div>
            </div>

            {/* Back Face */}
            <div className="logo-card-face logo-face-back">
              <img src={gfgEmblem} alt="GeeksforGeeks 3D Emblem" className="intro-gfg-logo-img" />
            </div>
          </div>
        </div>

        {/* Brand Text Section with "PCCOE" Emergence */}
        <div className="intro-text-wrapper">
          <div className="intro-gfg-title">
            <span className="text-green-glow">GEEKS</span>FOR<span className="text-green-glow">GEEKS</span>
          </div>

          {/* PCCOE Word that appears when GFG stops spinning */}
          <div className={`pccoe-reveal-container ${stage === 'reveal' || stage === 'opening' ? 'show-pccoe' : ''}`}>
            <div className="pccoe-line-glow"></div>
            <h1 className="pccoe-title">PCCOE</h1>
            <div className="pccoe-subtitle">STUDENT CHAPTER • PIMPRI CHINCHWAD</div>
          </div>
        </div>

        {/* Cyber status indicator */}
        <div className="cyber-status-badge">
          <span className="status-dot"></span>
          <span>
            {stage === 'spinning' && 'INITIALIZING 3D ENGINE...'}
            {stage === 'reveal' && 'AFFILIATED: PCCOE CAMPUS BODY'}
            {stage === 'opening' && 'ENTERING PORTAL...'}
          </span>
        </div>
      </div>
    </div>
  );
}
