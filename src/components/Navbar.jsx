import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import gfgEmblem from '../assets/gfg-emblem.png';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <NavLink to="/" className="navbar-brand">
          <div className="brand-logo-wrapper">
            <img src={gfgEmblem} alt="GeeksforGeeks PCCOE Logo" className="gfg-navbar-logo" />
          </div>
          <div className="brand-text">
            <span className="brand-title">GeeksforGeeks</span>
            <span className="brand-subtitle">Campus Body - PCCOE</span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu-desktop">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
            HOME
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            ABOUT
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            TEAM
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            GALLERY
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            CONTACT
          </NavLink>
          <NavLink to="/hackmatrix" className={({ isActive }) => `nav-item nav-badge-item ${isActive ? 'active' : ''}`}>
            <span className="badge-glow-dot"></span>
            HACK MATRIX
          </NavLink>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`hamburger-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <NavLink to="/" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} end>
            <i className="bx bx-home-alt"></i> HOME
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bx bx-info-circle"></i> ABOUT
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bx bx-group"></i> TEAM
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bx bx-images"></i> GALLERY
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bx bx-envelope"></i> CONTACT
          </NavLink>
          <NavLink to="/hackmatrix" className={({ isActive }) => `mobile-nav-item mobile-badge ${isActive ? 'active' : ''}`}>
            <i className="bx bx-code-block"></i> HACK MATRIX 4.0
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
