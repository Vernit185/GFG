import React from 'react';
import { teamTiers } from '../data/teamData';
import './Team.css';

export default function Team() {
  return (
    <div className="team-page animate-fade-in">
      {/* Team Header */}
      <section className="team-header-section">
        <div className="container text-center">
          <h1 className="team-main-title">
            Meet Our Team of <span className="text-highlight">Creators</span>, Designers & Problem Solvers!
          </h1>
          <p className="team-quote">
            "The Minds Behind GFG PCCOE"
          </p>
          <p className="team-header-desc">
            A dedicated squad of student leaders steering technical revolutions, organizing hackathons,
            mentoring juniors, and elevating the coding culture at PCCOE.
          </p>
        </div>
      </section>

      {/* Team Hierarchy Section */}
      <section className="team-grid-section">
        <div className="container">
          <div className="team-section-heading-wrapper text-center">
            <h2 className="team-section-title">Our Team</h2>
          </div>

          <div className="team-hierarchy-container">
            {teamTiers.map((tier) => (
              <div key={tier.tier} className={`team-tier-row tier-${tier.tier}`}>
                {tier.members.map((member) => (
                  <div key={member.id} className="team-card glass-card">
                    <div className="team-card-image-box">
                      <img src={member.image} alt={member.name} className="team-photo" />
                      <div className="team-photo-overlay">
                        <div className="team-avatar-initials" style={{ background: member.avatarBg }}>
                          {member.initials}
                        </div>
                      </div>
                    </div>

                    <div className="team-card-info text-center">
                      <h3 className="team-name">{member.name}</h3>
                      <p className="team-role">{member.role}</p>

                      <div className="team-social-links">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="team-social-icon linkedin"
                          title="LinkedIn"
                        >
                          <i className="bx bxl-linkedin"></i>
                        </a>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="team-social-icon github"
                          title="GitHub"
                        >
                          <i className="bx bxl-github"></i>
                        </a>
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="team-social-icon instagram"
                          title="Instagram"
                        >
                          <i className="bx bxl-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
