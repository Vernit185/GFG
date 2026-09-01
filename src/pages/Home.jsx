import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const carouselSlides = [
    {
      id: 1,
      title: "Felicitation of Mr. Sandeep Jain (Founder & CEO, GeeksforGeeks)",
      subtitle: "Felicitated by Dr. Shitalkumar Rawandale (Dean Industry Institute Interaction, PCCOE)",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
      tag: "Historic Milestone"
    },
    {
      id: 2,
      title: "Hack Matrix 4.0: 24-Hour Offline Hackathon",
      subtitle: "Over 380+ innovators collaborating on high-impact tech solutions under ARTIMAS 2026",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
      tag: "Flagship Hackathon"
    },
    {
      id: 3,
      title: "Hands-on Data Structures & Algorithms Bootcamp",
      subtitle: "Mentoring 500+ students on advanced problem-solving, graph algorithms, and DP",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
      tag: "Coding Bootcamp"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <div className="home-page animate-fade-in">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-green badge-glow">
              <i className="bx bx-terminal"></i>
              <span>Official Student Chapter</span>
            </div>

            <h1 className="hero-title">
              GeeksforGeeks Campus Body <span className="text-highlight">PCCOE</span>
            </h1>

            <h2 className="hero-subtitle">
              Sculpting Tomorrow's Coders!
            </h2>

            <p className="hero-description">
              We are a vibrant community of budding programmers and technology enthusiasts from
              <strong> Pimpri Chinchwad College of Engineering (PCCOE)</strong>. We bridge the gap between
              classroom learning and industry excellence through competitive coding, specialized bootcamps,
              and flagship hackathons.
            </p>

            <div className="hero-actions">
              <Link to="/hackmatrix" className="btn btn-primary">
                <i className="bx bx-code-block"></i>
                <span>Explore Hack Matrix 4.0</span>
              </Link>
              <Link to="/about" className="btn btn-secondary">
                <i className="bx bx-compass"></i>
                <span>Our Domains</span>
              </Link>
            </div>

            {/* Quick Micro Stats */}
            <div className="hero-quick-stats">
              <div className="stat-item">
                <span className="stat-number">1500+</span>
                <span className="stat-label">Active Geeks</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Tech Events</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">₹75K+</span>
                <span className="stat-label">Prizes Awarded</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Interactive Terminal Graphic */}
          <div className="hero-visual">
            <div className="code-window glass-card">
              <div className="code-window-header">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="window-title">gfg_pccoe_core.cpp</div>
                <div className="window-badge">v4.0.26</div>
              </div>

              <div className="code-window-body">
                <pre>
                  <code>
                    <span className="code-keyword">#include</span> <span className="code-string">&lt;iostream&gt;</span>{'\n'}
                    <span className="code-keyword">#include</span> <span className="code-string">&lt;community/pccoe&gt;</span>{'\n'}
                    {'\n'}
                    <span className="code-type">class</span> <span className="code-class">GeeksPCCOE</span> {'{'}{'\n'}
                    <span className="code-keyword">public</span>:{'\n'}
                    {'  '}<span className="code-type">void</span> <span className="code-func">sculptCoders</span>() {'{'}{'\n'}
                    {'    '}<span className="code-type">std::vector</span>&lt;<span className="code-type">std::string</span>&gt; domains = {'{'}{'\n'}
                    {'      '}<span className="code-string">"Competitive Coding"</span>,{'\n'}
                    {'      '}<span className="code-string">"Hack Matrix 4.0"</span>,{'\n'}
                    {'      '}<span className="code-string">"Technical Bootcamps"</span>,{'\n'}
                    {'      '}<span className="code-string">"Industry Mentorship"</span>{'\n'}
                    {'    '}{'}'};{'\n'}
                    {'    '}<span className="code-keyword">for</span> (<span className="code-type">auto</span>& domain : domains) {'{'}{'\n'}
                    {'      '}<span className="code-func">empowerStudents</span>(domain);{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'  '}{'}'}{'\n'}
                    {'}'};
                  </code>
                </pre>
              </div>

              {/* Floating Highlight Badges */}
              <div className="floating-badge badge-top-right">
                <i className="bx bx-check-double text-green"></i>
                <span>All Test Cases Passed!</span>
              </div>
              <div className="floating-badge badge-bottom-left">
                <i className="bx bx-trophy text-yellow"></i>
                <span>Hack Matrix 4.0 Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Photo Carousel */}
      <section className="carousel-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge-green">Moments of Pride</span>
            <h2 className="section-heading">Featured Highlights & Felicitation</h2>
            <p className="section-subheading">
              Memorable milestones that define the spirit of innovation at GeeksforGeeks PCCOE.
            </p>
          </div>

          <div className="carousel-container glass-card">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselSlides.map((slide) => (
                <div key={slide.id} className="carousel-slide">
                  <div className="slide-image-wrapper">
                    <img src={slide.image} alt={slide.title} className="slide-image" />
                    <div className="slide-overlay"></div>
                  </div>
                  <div className="slide-caption">
                    <span className="slide-tag">{slide.tag}</span>
                    <h3 className="slide-title">{slide.title}</h3>
                    <p className="slide-desc">{slide.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button className="carousel-btn prev-btn" onClick={prevSlide} aria-label="Previous Slide">
              <i className="bx bx-chevron-left"></i>
            </button>
            <button className="carousel-btn next-btn" onClick={nextSlide} aria-label="Next Slide">
              <i className="bx bx-chevron-right"></i>
            </button>

            {/* Carousel Dots */}
            <div className="carousel-dots">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  className={`dot-indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dark Announcement Container */}
      <section className="announcement-section">
        <div className="container">
          <div className="announcement-banner">
            <div className="announcement-glow-circle"></div>
            <div className="announcement-content">
              <div className="announcement-tag">
                <span className="pulse-dot"></span>
                <span>INNOVATION IN MOTION</span>
              </div>
              <h2 className="announcement-title">
                What's Next in Tech? Empowering Minds, Igniting Innovation!
              </h2>
              <p className="announcement-desc">
                From algorithmic masteries to AI-powered project sprints, discover how our campus body
                is shaping future engineering leaders.
              </p>
              <div className="announcement-cta">
                <Link to="/hackmatrix" className="btn btn-primary">
                  <span>Explore Hack Matrix 4.0</span>
                  <i className="bx bx-right-arrow-alt"></i>
                </Link>
                <Link to="/gallery" className="btn btn-outline-light">
                  <span>View Event Gallery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What is GeeksforGeeks Campus Body? */}
      <section className="about-overview-section">
        <div className="container">
          <div className="about-overview-grid">
            <div className="about-overview-left">
              <div className="badge-green">
                <i className="bx bx-layer"></i>
                <span>About Our Community</span>
              </div>
              <h2 className="about-title">
                What is <span className="text-highlight">GeeksforGeeks</span> Campus Body?
              </h2>

              <div className="about-text-blocks">
                <div className="about-text-card">
                  <div className="about-card-icon">
                    <i className="bx bx-code-curly"></i>
                  </div>
                  <div className="about-card-text">
                    <h4>Cultivating Technical Excellence</h4>
                    <p>
                      The GeeksforGeeks Campus Body at PCCOE is a premier student-led technical chapter
                      dedicated to advancing programming acumen, computer science fundamentals, and
                      algorithmic problem solving across all engineering disciplines.
                    </p>
                  </div>
                </div>

                <div className="about-text-card">
                  <div className="about-card-icon">
                    <i className="bx bx-network-chart"></i>
                  </div>
                  <div className="about-card-text">
                    <h4>Collaborative Learning & Industry Connect</h4>
                    <p>
                      We conduct continuous coding leagues, full-stack & AI workshops, hackathons, and
                      expert talks by leading software professionals to ensure students are ready to excel
                      in technical interviews, competitive programming, and real-world software development.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-cta-row">
                <Link to="/about" className="btn btn-primary">
                  <span>Learn More About Our Domains</span>
                  <i className="bx bx-right-arrow-alt"></i>
                </Link>
              </div>
            </div>

            {/* Right side Illustration / Feature Grid */}
            <div className="about-overview-right">
              <div className="pillars-grid">
                <div className="pillar-card">
                  <div className="pillar-icon bg-green-light">
                    <i className="bx bx-laptop"></i>
                  </div>
                  <h3>Competitive Programming</h3>
                  <p>Weekly LeetCode and GFG contest reviews, algorithmic strategies, and time complexity mastery.</p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon bg-blue-light">
                    <i className="bx bx-rocket"></i>
                  </div>
                  <h3>Flagship Hackathons</h3>
                  <p>Hack Matrix 4.0 brings together 380+ participants to engineer production-ready prototypes.</p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon bg-purple-light">
                    <i className="bx bx-chalkboard"></i>
                  </div>
                  <h3>Workshops & Training</h3>
                  <p>Hands-on sessions on Web Development, AI/ML, Cloud Infrastructure, and Git collaboration.</p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon bg-amber-light">
                    <i className="bx bx-user-voice"></i>
                  </div>
                  <h3>Community & Outreach</h3>
                  <p>School outreach drives, peer coding circles, and mock interview preparations with alumni.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
