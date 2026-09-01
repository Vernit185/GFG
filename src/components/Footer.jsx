import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-root">
      {/* Centered Back to Top Button */}
      <div className="back-to-top-container">
        <button
          className={`back-to-top-btn ${showTopBtn ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <i className="bx bx-chevron-up"></i>
          <span>Back to Top</span>
        </button>
      </div>

      <div className="footer-main">
        <div className="container footer-grid">
          {/* Column 1: Contact Info */}
          <div className="footer-col footer-contact">
            <div className="footer-brand-header">
              <div className="footer-logo-box">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" rx="20" fill="#2F9E44"/>
                  <path d="M35 32 C22 32 20 68 35 68 C45 68 49 59 49 50 L35 50 M65 32 C52 32 50 68 65 68 C75 68 79 59 79 50 L65 50" stroke="#ffffff" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="footer-title">Contact Us</h3>
            </div>
            <p className="footer-lead-text">
              Have queries, collaboration ideas, or want to join as a student member? Feel free to reach out to us!
            </p>
            <ul className="footer-contact-list">
              <li>
                <i className="bx bx-envelope"></i>
                <a href="mailto:geeksforgeeks@pccoepune.org">geeksforgeeks@pccoepune.org</a>
              </li>
              <li>
                <i className="bx bx-phone"></i>
                <a href="tel:+919359933080">+91 9359933080</a>
              </li>
              <li>
                <i className="bx bx-map"></i>
                <span>PCCOE, Sector 26, Pradhikaran, Nigdi, Akurdi, Pune - 411044</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-nav-list">
              <li>
                <Link to="/"><i className="bx bx-chevron-right"></i> Home</Link>
              </li>
              <li>
                <Link to="/about"><i className="bx bx-chevron-right"></i> About Us</Link>
              </li>
              <li>
                <Link to="/team"><i className="bx bx-chevron-right"></i> Our Team</Link>
              </li>
              <li>
                <Link to="/gallery"><i className="bx bx-chevron-right"></i> Event Gallery</Link>
              </li>
              <li>
                <Link to="/contact"><i className="bx bx-chevron-right"></i> Contact</Link>
              </li>
              <li>
                <Link to="/hackmatrix" className="footer-highlight-link">
                  <i className="bx bx-code-block"></i> Hack Matrix 4.0
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us & Social */}
          <div className="footer-col footer-social">
            <h3 className="footer-title">Follow Us</h3>
            <p className="footer-social-desc">
              Stay updated with our latest hackathons, coding contests, technical workshops, and campus recruitments.
            </p>
            <div className="social-pill-group">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill linkedin" title="LinkedIn">
                <i className="bx bxl-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-pill instagram" title="Instagram">
                <i className="bx bxl-instagram"></i>
                <span>Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-pill twitter" title="Twitter / X">
                <i className="bx bxl-twitter"></i>
                <span>Twitter</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-pill youtube" title="YouTube">
                <i className="bx bxl-youtube"></i>
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Banner */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-content">
          <p>Copyright © 2026 GeeksforGeeks PCCOE Student Chapter. All Rights Reserved.</p>
          <p className="footer-tag">Crafted with passion by GFG PCCOE Tech Team</p>
        </div>
      </div>
    </footer>
  );
}
