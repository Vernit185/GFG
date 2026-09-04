import React, { useEffect, useRef, useState } from 'react';
import './ClassroomVideo.css';

export default function ClassroomVideo({ cardRef }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure it starts paused on the first frame (static)
    video.pause();

    const PROXIMITY_THRESHOLD = 200;

    const handlePointerMove = (e) => {
      const cardEl = cardRef?.current;
      const videoEl = containerRef.current;
      if (!videoRef.current) return;

      let nearCard = false;
      if (cardEl) {
        const rect = cardEl.getBoundingClientRect();
        const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
        const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
        if (Math.sqrt(dx * dx + dy * dy) < PROXIMITY_THRESHOLD) {
          nearCard = true;
        }
      }

      let nearVideo = false;
      if (videoEl) {
        const rect = videoEl.getBoundingClientRect();
        const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
        const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
        if (Math.sqrt(dx * dx + dy * dy) < PROXIMITY_THRESHOLD) {
          nearVideo = true;
        }
      }

      const shouldPlay = nearCard || nearVideo;

      if (shouldPlay) {
        setIsNear(true);
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => { });
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
  }, [cardRef]);

  const handleMouseEnter = () => {
    setIsNear(true);
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => { });
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
      className={`classroom-video-wrapper ${isNear ? 'is-active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
    >
      <video
        ref={videoRef}
        src="/clsroom.mp4"
        muted
        loop
        playsInline
        preload="auto"
        className="classroom-video-media"
      />
    </div>
  );
}
