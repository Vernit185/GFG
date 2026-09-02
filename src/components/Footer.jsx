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
    <>
      {/* Floating Back to Top Button (Detached from footer) */}
      <button
        className={`floating-back-to-top ${showTopBtn ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <i className="bx bx-up-arrow-alt"></i>
      </button>

      <footer className="footer-root">
        <div className="footer-main">
        <div className="container footer-grid">
          {/* Column 1: Organization Branding */}
          <div className="footer-col footer-brand-col">
            <div className="footer-brand-header">
              <img src="/logo-small.png" alt="GeeksforGeeks PCCOE" className="footer-logo-img" />
              <div className="footer-brand-title-wrap">
                <span className="footer-brand-name">GeeksforGeeks</span>
                <span className="footer-brand-sub">Campus Body • PCCOE</span>
              </div>
            </div>
            <p className="footer-lead-text">
              Official student chapter at Pimpri Chinchwad College of Engineering (PCCOE), Pune. Dedicated to fostering excellence in algorithmic mastery, competitive programming, and emerging technological domains.
            </p>
            <div className="footer-org-meta">
              <div className="footer-meta-item">
                <i className="bx bx-map"></i>
                <span>Sector 26, Pradhikaran, Nigdi, Akurdi, Pune - 411044</span>
              </div>
              <div className="footer-meta-item">
                <i className="bx bx-envelope"></i>
                <a href="mailto:geeksforgeeks@pccoepune.org">geeksforgeeks@pccoepune.org</a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-links-col">
            <h4 className="footer-col-heading">Navigation</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/"><i className="bx bx-chevron-right"></i> Home</Link>
              </li>
              <li>
                <Link to="/about"><i className="bx bx-chevron-right"></i> About Us</Link>
              </li>
              <li>
                <Link to="/team"><i className="bx bx-chevron-right"></i> Core Team</Link>
              </li>
              <li>
                <Link to="/events"><i className="bx bx-chevron-right"></i> Events</Link>
              </li>
              <li>
                <Link to="/contact"><i className="bx bx-chevron-right"></i> Contact Us</Link>
              </li>
              <li>
                <Link to="/hackmatrix" className="external-portal-link">
                  <i className="bx bx-code-block"></i> Hack Matrix 5.0
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Connect */}
          <div className="footer-col footer-social-col">
            <h4 className="footer-col-heading">Connect With Us</h4>
            <p className="footer-social-desc">
              Join our network to receive verified updates on hackathons, campus events, and coding competitions.
            </p>
            <div className="footer-social-grid">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="LinkedIn">
                <i className="bx bxl-linkedin"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Instagram">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Twitter / X">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="YouTube">
                <i className="bx bxl-youtube"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="GitHub">
                <i className="bx bxl-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Banner */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-content">
          <p className="footer-copy">
            © {new Date().getFullYear()} GeeksforGeeks Campus Body — PCCOE. All Rights Reserved.
          </p>
          <div className="footer-legal-links">
            <Link to="/about">About Chapter</Link>
            <span className="footer-divider">•</span>
            <Link to="/contact">Support</Link>
            <span className="footer-divider">•</span>
            <a href="https://www.pccoepune.com" target="_blank" rel="noopener noreferrer">PCCOE Official</a>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
