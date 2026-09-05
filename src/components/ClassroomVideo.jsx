import React, { useEffect, useRef, useState } from 'react';
import { aboutAssets } from '../data/aboutData';
import './ClassroomVideo.css';

export default function ClassroomVideo({ cardRef, src, alt = 'Domain visual' }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isNear, setIsNear] = useState(false);

  const isImage = typeof src === 'string' && (
    src.match(/\.(gif|webp|png|jpe?g)($|\?)/i) || 
    src.includes('/image/upload/')
  );

  useEffect(() => {
    if (isImage) return;
    const video = videoRef.current;
    if (!video) return;

    // Ensure it starts paused on the first frame
    video.pause();

    const PROXIMITY_THRESHOLD = 260;

    const playVideo = () => {
      setIsNear(true);
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    };

    const pauseVideo = () => {
      setIsNear(false);
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };

    let ticking = false;
    let latestE = null;
    let rafId = null;

    const checkProximity = (clientX, clientY) => {
      const cardEl = cardRef?.current;
      const videoEl = containerRef.current;
      if (!videoRef.current) return;

      let nearCard = false;
      if (cardEl) {
        const rect = cardEl.getBoundingClientRect();
        const dx = Math.max(rect.left - clientX, 0, clientX - rect.right);
        const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom);
        if (Math.sqrt(dx * dx + dy * dy) < PROXIMITY_THRESHOLD) {
          nearCard = true;
        }
      }

      let nearVideo = false;
      if (videoEl) {
        const rect = videoEl.getBoundingClientRect();
        const dx = Math.max(rect.left - clientX, 0, clientX - rect.right);
        const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom);
        if (Math.sqrt(dx * dx + dy * dy) < PROXIMITY_THRESHOLD) {
          nearVideo = true;
        }
      }

      if (nearCard || nearVideo) {
        playVideo();
      } else {
        pauseVideo();
      }
    };

    const handlePointerMove = (e) => {
      latestE = { clientX: e.clientX, clientY: e.clientY };
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          if (latestE) {
            checkProximity(latestE.clientX, latestE.clientY);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Direct card hover support
    const cardEl = cardRef?.current;
    if (cardEl) {
      cardEl.addEventListener('mouseenter', playVideo);
      cardEl.addEventListener('mouseleave', pauseVideo);
    }

    // Touch / scroll support via IntersectionObserver
    let observer = null;
    const videoEl = containerRef.current;
    if ('IntersectionObserver' in window && videoEl) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // On touch/mobile devices where pointermove isn't continuous
          if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              playVideo();
            } else {
              pauseVideo();
            }
          }
        });
      }, { threshold: [0, 0.5, 1] });
      observer.observe(videoEl);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (cardEl) {
        cardEl.removeEventListener('mouseenter', playVideo);
        cardEl.removeEventListener('mouseleave', pauseVideo);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [cardRef, isImage, src]);

  const handleMouseEnter = () => {
    setIsNear(true);
    if (!isImage && videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsNear(false);
    if (!isImage && videoRef.current && !videoRef.current.paused) {
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
      {isImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="classroom-video-media"
        />
      ) : (
        <video
          ref={videoRef}
          src={src || aboutAssets?.classroomVideo || 'https://res.cloudinary.com/dvkwaq6y/video/upload/v1788506283/clsroom.mp4'}
          muted
          loop
          playsInline
          preload="auto"
          className="classroom-video-media"
        />
      )}
    </div>
  );
}
