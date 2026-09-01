import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  const domains = [
    {
      id: 1,
      title: "Programming & Coding Competition",
      icon: "bx-code-alt",
      badge: "Domain 01",
      colorTheme: "#2f9e44",
      description: "Nurturing problem-solving instincts, speed debugging, and algorithmic efficiency through continuous competitive programming contests and coding leagues.",
      activities: [
        "Weekly GFG & LeetCode contest problem solving and editorial discussions",
        "Inter-departmental coding leagues and speed debugging championships",
        "DSA mastery bootcamps covering Graphs, DP, Trees, and Complexity Analysis",
        "Preparation tracks for ICPC, Google Summer of Code, and coding interviews"
      ]
    },
    {
      id: 2,
      title: "Technical Workshops & Training",
      icon: "bx-laptop",
      badge: "Domain 02",
      colorTheme: "#2563eb",
      description: "Delivering immersive hands-on workshops on modern frameworks, emerging tech stacks, AI/ML tools, and cloud infrastructure to make students industry-ready.",
      activities: [
        "Full-Stack Web Development bootcamps (React, Node.js, Next.js, PostgreSQL)",
        "Applied Machine Learning & Generative AI workshops with PyTorch & HuggingFace",
        "Cloud Computing, Docker containerization, and CI/CD pipelines",
        "Version control masterclasses: Git, GitHub collaboration, and open-source workflows"
      ]
    },
    {
      id: 3,
      title: "Industry Interaction & Guest Lectures",
      icon: "bx-briefcase-alt-2",
      badge: "Domain 03",
      colorTheme: "#7c3aed",
      description: "Connecting students directly with senior software architects, engineering managers, and alumni from leading tech giants for career blueprints and tech insights.",
      activities: [
        "Keynote seminars with industry leaders from top product companies",
        "System design and high-scale architecture teardowns",
        "One-on-one resume reviews and mock technical interview panels",
        "Career guidance sessions on internships, off-campus placements, and higher studies"
      ]
    },
    {
      id: 4,
      title: "Technical Outreach & Community Engagement",
      icon: "bx-globe",
      badge: "Domain 04",
      colorTheme: "#ea580c",
      description: "Extending the power of computer science education beyond campus through social initiatives, school coding bootcamps, and collaborative open-source sprints.",
      activities: [
        "Coding literacy outreach programs for local school students and beginners",
        "Open-source hackathons and contribution drives during Hacktoberfest",
        "Peer-to-peer mentoring circles across first-year to final-year students",
        "Organizing PCCOE's flagship hackathon Hack Matrix 4.0 under ARTIMAS"
      ]
    }
  ];

  return (
    <div className="about-page animate-fade-in">
      {/* Page Header */}
      <section className="about-header-section">
        <div className="container text-center">
          <span className="badge-green">Who We Are</span>
          <h1 className="about-main-title">
            About <span className="text-highlight">GeeksforGeeks</span> PCCOE
          </h1>
          <p className="about-header-desc">
            Empowering the next generation of engineers, builders, and problem solvers at 
            Pimpri Chinchwad College of Engineering with state-of-the-art technical exposure.
          </p>
        </div>
      </section>

      {/* Main 2-Column Section */}
      <section className="about-content-section">
        <div className="container about-layout-grid">
          
          {/* Left Column: Sticky Vision & Mission Card */}
          <div className="about-sticky-column">
            <div className="vision-mission-card glass-card">
              <div className="card-top-indicator"></div>
              
              <div className="vm-block">
                <div className="vm-header">
                  <div className="vm-icon bg-green-light">
                    <i className="bx bx-show-alt"></i>
                  </div>
                  <h3>Our Vision</h3>
                </div>
                <p className="vm-text">
                  "To be the leading student community for mastering computer science fundamentals, 
                  igniting curiosity, and cultivating world-class software engineers and tech entrepreneurs."
                </p>
              </div>

              <div className="vm-divider"></div>

              <div className="vm-block">
                <div className="vm-header">
                  <div className="vm-icon bg-purple-light">
                    <i className="bx bx-target-lock"></i>
                  </div>
                  <h3>Our Mission</h3>
                </div>
                <p className="vm-text">
                  "Empower geeks worldwide to excel in their technical skills through high-quality 
                  workshops, collaborative coding, industry mentorship, and inclusive innovation."
                </p>
              </div>

              <div className="vm-highlights">
                <div className="highlight-pill">
                  <i className="bx bx-check-circle"></i>
                  <span>1500+ Active Members</span>
                </div>
                <div className="highlight-pill">
                  <i className="bx bx-check-circle"></i>
                  <span>50+ Coding Sprints</span>
                </div>
                <div className="highlight-pill">
                  <i className="bx bx-check-circle"></i>
                  <span>Flagship Hack Matrix 4.0</span>
                </div>
              </div>

              <div className="vm-action">
                <Link to="/team" className="btn btn-primary w-full">
                  <i className="bx bx-group"></i>
                  <span>Meet The Core Team</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Domains Showcase */}
          <div className="about-domains-column">
            <div className="domains-heading-wrapper">
              <span className="badge-green">Core Verticals</span>
              <h2 className="domains-section-title">OUR DOMAINS</h2>
              <p className="domains-section-subtitle">
                Our campus body operates across four specialized pillars, each committed to 
                driving distinct aspects of student skill growth and technical mastery.
              </p>
            </div>

            <div className="domains-cards-list">
              {domains.map((domain) => (
                <div key={domain.id} className="domain-card glass-card">
                  <div className="domain-card-header">
                    <div className="domain-icon-box" style={{ background: `${domain.colorTheme}15`, color: domain.colorTheme }}>
                      <i className={`bx ${domain.icon}`}></i>
                    </div>
                    <div className="domain-header-meta">
                      <span className="domain-badge" style={{ color: domain.colorTheme, borderColor: `${domain.colorTheme}40`, background: `${domain.colorTheme}10` }}>
                        {domain.badge}
                      </span>
                      <h3 className="domain-title">{domain.title}</h3>
                    </div>
                  </div>

                  <p className="domain-description">
                    {domain.description}
                  </p>

                  <div className="domain-activities">
                    <h4 className="activities-heading">Key Initiatives & Sprints:</h4>
                    <ul className="activities-list">
                      {domain.activities.map((act, idx) => (
                        <li key={idx}>
                          <i className="bx bx-check" style={{ color: domain.colorTheme }}></i>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
