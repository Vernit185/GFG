import React, { useEffect, useRef, useState } from 'react';
import movingHandsVideo from '../assets/moving_hands.mp4';
import './MovingHandsVideo.css';

export default function MovingHandsVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Proximity threshold in pixels
    const PROXIMITY_THRESHOLD = 280;

    const handlePointerMove = (e) => {
      if (!containerRef.current || !videoRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate distance to bounding box
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < PROXIMITY_THRESHOLD) {
        setIsNear(true);
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      } else {
        setIsNear(false);
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsNear(true);
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsNear(false);
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`moving-hands-wrapper ${isNear ? 'is-active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
    >
      <video
        ref={videoRef}
        src={movingHandsVideo}
        muted
        loop
        playsInline
        preload="auto"
        className="moving-hands-media"
      />
    </div>
  );
}
