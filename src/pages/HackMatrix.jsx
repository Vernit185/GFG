import React, { useState } from 'react';
import { hackmatrixData } from '../data/hackmatrixData';
import './HackMatrix.css';

export default function HackMatrix() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredResults = hackmatrixData.results.filter(
    (item) =>
      item.team.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.track.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.college.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="hackmatrix-page animate-fade-in">
      {/* 1. HackMatrix Hero Section */}
      <section className="hm-hero-section">
        <div className="hm-hero-glow"></div>
        <div className="container hm-hero-content text-center">
          <div className="hm-edition-badge">
            <span className="hm-pulse-dot"></span>
            <span>ARTIMAS 2026 PRESENTS</span>
          </div>

          <h1 className="hm-hero-title">
            <span className="glitch-text">HACK MATRIX</span> <span className="text-emerald">4.0</span>
          </h1>

          <p className="hm-hero-tagline">
            {hackmatrixData.tagline}
          </p>

          <p className="hm-hero-dates">
            <i className="bx bx-calendar-event"></i> {hackmatrixData.dates} &nbsp;|&nbsp; <i className="bx bx-map-pin"></i> {hackmatrixData.venue}
          </p>

          <div className="hm-hero-buttons">
            <button className="btn btn-emerald" onClick={() => setShowResultsModal(true)}>
              <i className="bx bx-trophy"></i>
              <span>View Round-2 Results</span>
            </button>
            <a href="#tracks" className="btn btn-glass-dark">
              <i className="bx bx-layer"></i>
              <span>Explore Tracks</span>
            </a>
          </div>

          {/* Key Stats Bar */}
          <div className="hm-stats-grid">
            {hackmatrixData.stats.map((stat, idx) => (
              <div key={idx} className="hm-stat-card">
                <div className="hm-stat-icon">
                  <i className={`bx ${stat.icon}`}></i>
                </div>
                <div className="hm-stat-details">
                  <span className="hm-stat-val">{stat.value}</span>
                  <span className="hm-stat-lbl">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. What is Hack Matrix Section */}
      <section className="hm-about-section">
        <div className="container">
          <div className="hm-about-card glass-card-dark">
            <div className="hm-about-grid">
              <div className="hm-about-left">
                <span className="badge-emerald">Flagship Offline Hackathon</span>
                <h2 className="hm-section-title">What is Hack Matrix 4.0?</h2>
                <p className="hm-about-text">
                  HackMatrix 4.0 is Pimpri Chinchwad College of Engineering's premier 
                  <strong> 24-Hour Offline Hackathon</strong> organized under ARTIMAS 2026 by the GeeksforGeeks PCCOE Chapter.
                </p>
                <p className="hm-about-text">
                  Over a non-stop 24-hour sprint, talented minds from across engineering colleges 
                  brainstorm, code, design, and pitch functional software and hardware MVPs before a 
                  distinguished jury of industry tech leads, startup founders, and mentors.
                </p>
                <div className="hm-perks-list">
                  <div className="hm-perk-item">
                    <i className="bx bx-check-shield text-emerald"></i>
                    <span>Free meals, snacks, & midnight red-bull</span>
                  </div>
                  <div className="hm-perk-item">
                    <i className="bx bx-check-shield text-emerald"></i>
                    <span>₹75,000+ in cash prizes & official goodies</span>
                  </div>
                  <div className="hm-perk-item">
                    <i className="bx bx-check-shield text-emerald"></i>
                    <span>Direct mentorship from senior software engineers</span>
                  </div>
                </div>
              </div>

              <div className="hm-about-right">
                <div className="hm-banner-graphic">
                  <div className="hm-graphic-code">
                    <div className="hm-graphic-top">
                      <span></span><span></span><span></span>
                    </div>
                    <pre>
                      <code>
{`// HackMatrix 4.0 Pipeline
const hackathon = {
  duration: '24 Hours',
  status: 'COMPLETED',
  prizes: '₹75,000+',
  vibes: '100% Electric',
  deploy: () => winPrize()
};`}
                      </code>
                    </pre>
                  </div>
                  <div className="hm-floating-chip">
                    <i className="bx bx-badge-check text-emerald"></i>
                    <span>Jury Evaluation Passed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Development Tracks */}
      <section id="tracks" className="hm-tracks-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge-emerald">Innovation Themes</span>
            <h2 className="hm-section-title text-light">Development Tracks</h2>
            <p className="hm-section-subtitle">
              Choose your arena and build impactful software/hardware prototypes solving critical modern challenges.
            </p>
          </div>

          <div className="hm-tracks-grid">
            {hackmatrixData.tracks.map((track) => (
              <div key={track.id} className="hm-track-card">
                <div className="hm-track-icon-wrap" style={{ background: `${track.color}20`, color: track.color }}>
                  <i className={`bx ${track.icon}`}></i>
                </div>
                <h3 className="hm-track-title">{track.title}</h3>
                <p className="hm-track-desc">{track.description}</p>
                <div className="hm-track-badge" style={{ color: track.color, borderColor: `${track.color}50` }}>
                  <span>Open for all stacks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sponsors & Partners */}
      <section className="hm-sponsors-section">
        <div className="container text-center">
          <span className="badge-emerald">Proud Collaborators</span>
          <h2 className="hm-section-title text-light">Our Sponsors & Partners</h2>
          <p className="hm-section-subtitle">
            Supported by top enterprises, industry leaders, and ecosystem enablers.
          </p>

          <div className="hm-sponsors-grid">
            {hackmatrixData.sponsors.map((sp, idx) => (
              <div key={idx} className="hm-sponsor-card" style={{ background: sp.bg }}>
                <span className="hm-sponsor-tier">{sp.tier}</span>
                <h3 className="hm-sponsor-name">{sp.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="hm-faqs-section">
        <div className="container container-narrow">
          <div className="section-header text-center">
            <span className="badge-emerald">Got Questions?</span>
            <h2 className="hm-section-title text-light">Frequently Asked Questions</h2>
            <p className="hm-section-subtitle">
              Everything you need to know about participation, rules, logistics, and judging.
            </p>
          </div>

          <div className="hm-faqs-list">
            {hackmatrixData.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`hm-faq-item ${openFaq === idx ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="hm-faq-question">
                  <span>{faq.question}</span>
                  <i className={`bx ${openFaq === idx ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                </div>
                {openFaq === idx && (
                  <div className="hm-faq-answer animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Modal */}
      {showResultsModal && (
        <div className="lightbox-backdrop" onClick={() => setShowResultsModal(false)}>
          <div className="results-modal glass-card-dark" onClick={(e) => e.stopPropagation()}>
            <div className="results-modal-header">
              <div className="results-header-title">
                <i className="bx bx-trophy text-emerald"></i>
                <h2>Hack Matrix 4.0 — Round 2 Final Results</h2>
              </div>
              <button className="lightbox-close-btn" onClick={() => setShowResultsModal(false)}>
                <i className="bx bx-x"></i>
              </button>
            </div>

            <div className="results-modal-body">
              <div className="results-search-box">
                <i className="bx bx-search"></i>
                <input
                  type="text"
                  placeholder="Search by team, track, or college..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>

              <div className="results-table-wrapper">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Rank / Position</th>
                      <th>Team Name</th>
                      <th>Track</th>
                      <th>Institution</th>
                      <th>Prize / Recognition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((res, i) => (
                      <tr key={i} className={i === 0 ? 'top-winner' : ''}>
                        <td>
                          <span className="rank-tag">{res.rank}</span>
                        </td>
                        <td className="team-col"><strong>{res.team}</strong></td>
                        <td>{res.track}</td>
                        <td>{res.college}</td>
                        <td className="prize-col">{res.prize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
