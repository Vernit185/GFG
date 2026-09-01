import React, { useState } from 'react';
import { teamMembers } from '../data/teamData';
import './Team.css';

export default function Team() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Leadership', 'Technical', 'Creative & Marketing'];

  const filteredMembers = teamMembers.filter((member) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Leadership') return member.role.includes('President');
    if (activeFilter === 'Technical') return member.role.includes('Technical');
    if (activeFilter === 'Creative & Marketing') {
      return member.role.includes('Design') || member.role.includes('Content') || member.role.includes('Marketing') || member.role.includes('Social');
    }
    return true;
  });

  return (
    <div className="team-page animate-fade-in">
      {/* Team Header */}
      <section className="team-header-section">
        <div className="container text-center">
          <span className="badge-green">The Minds Behind GFG PCCOE</span>
          <h1 className="team-main-title">
            Meet Our Team of <span className="text-highlight">Creators</span>, Designers & Problem Solvers!
          </h1>
          <p className="team-quote">
            "Geeks by heart! Geeks by brain..."
          </p>
          <p className="team-header-desc">
            A dedicated squad of student leaders steering technical revolutions, organizing hackathons, 
            mentoring juniors, and elevating the coding culture at PCCOE.
          </p>

          {/* Category Filter Pills */}
          <div className="team-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="team-grid-section">
        <div className="container">
          <div className="team-grid">
            {filteredMembers.map((member) => (
              <div key={member.id} className="team-card glass-card">
                <div className="team-card-image-box">
                  <img src={member.image} alt={member.name} className="team-photo" />
                  <div className="team-photo-overlay">
                    <div className="team-avatar-initials" style={{ background: member.avatarBg }}>
                      {member.initials}
                    </div>
                  </div>
                </div>

                <div className="team-card-info">
                  <span className="team-role-badge">{member.role}</span>
                  <h3 className="team-name">{member.name}</h3>
                  <span className="team-dept">{member.department}</span>
                  <p className="team-tagline">"{member.tagline}"</p>

                  <div className="team-social-links">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-social-icon linkedin" title="LinkedIn">
                      <i className="bx bxl-linkedin"></i>
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="team-social-icon github" title="GitHub">
                      <i className="bx bxl-github"></i>
                    </a>
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="team-social-icon instagram" title="Instagram">
                      <i className="bx bxl-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
