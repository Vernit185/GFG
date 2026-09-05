import React, { useRef } from 'react';
import ClassroomVideo from '../components/ClassroomVideo';
import { aboutAssets } from '../data/aboutData';
import './About.css';

export default function About() {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container text-center">
          <span className="badge-green">Who We Are</span>
          <h1 className="about-main-title">
            About <span className="text-highlight">GeeksforGeeks</span> PCCOE
          </h1>
          <p className="about-hero-desc">
            Empowering the next generation of engineers, builders, and problem solvers at Pimpri Chinchwad College of Engineering with state-of-the-art technical exposure.
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="sidebar">
          <div className="sidebar-bar"></div>
          <div className="sidebar-body">
            <div className="pillar">
              <h3>Our Vision</h3>
              <blockquote>"To be the leading student community for mastering computer science fundamentals, igniting curiosity, and cultivating world-class software engineers and tech entrepreneurs."</blockquote>
            </div>
            <div className="pillar">
              <h3>Our Mission</h3>
              <blockquote>"Empower geeks worldwide to excel in their technical skills through high-quality workshops, collaborative coding, industry mentorship, and inclusive innovation."</blockquote>
            </div>
          </div>
        </div>

        <div className="domains-head">
          <h2>Our Domains</h2>
          <p>Our campus body operates across four specialized pillars, each committed to driving distinct aspects of student skill growth and technical mastery.</p>
        </div>

        <div className="chain">
          {/* Domain 1 */}
          <div className="link right">
            <div className="video-slot classroom-slot">
              <ClassroomVideo 
                cardRef={card1Ref} 
                src={aboutAssets?.domainGifs?.one || aboutAssets?.movingHandsVideo} 
                alt="Programming & Coding Competition" 
              />
            </div>
            <div className="node">1</div>
            <article className="card" ref={card1Ref}>
              <h3>Programming &amp; Coding Competition</h3>
              <p>Nurturing problem-solving instincts, speed debugging, and algorithmic efficiency through continuous competitive programming contests and coding leagues.</p>
              <p className="sprints-label">Key Initiatives &amp; Sprints:</p>
              <ul>
                <li>Weekly GFG &amp; LeetCode contest problem solving and editorial discussions</li>
                <li>Inter-departmental coding leagues and speed debugging championships</li>
                <li>DSA mastery bootcamps covering Graphs, DP, Trees, and Complexity Analysis</li>
                <li>Preparation tracks for ICPC, Google Summer of Code, and coding interviews</li>
              </ul>
            </article>
          </div>

          {/* Domain 2 */}
          <div className="link left">
            <article className="card" ref={card2Ref}>
              <h3>Technical Workshops &amp; Training</h3>
              <p>Delivering immersive hands-on workshops on modern frameworks, emerging tech stacks, AI/ML tools, and cloud infrastructure to make students industry-ready.</p>
              <p className="sprints-label">Key Initiatives &amp; Sprints:</p>
              <ul>
                <li>Full-Stack Web Development bootcamps (React, Node.js, Next.js, PostgreSQL)</li>
                <li>Applied Machine Learning &amp; Generative AI workshops with PyTorch &amp; HuggingFace</li>
                <li>Cloud Computing, Docker containerization, and CI/CD pipelines</li>
                <li>Version control masterclass: Git, GitHub collaboration, and open source workflows</li>
              </ul>
            </article>
            <div className="node">2</div>
            <div className="video-slot classroom-slot">
              <ClassroomVideo 
                cardRef={card2Ref} 
                src={aboutAssets?.domainGifs?.two || aboutAssets?.classroomVideo} 
                alt="Technical Workshops & Training" 
              />
            </div>
          </div>

          {/* Domain 3 */}
          <div className="link right">
            <div className="video-slot classroom-slot">
              <ClassroomVideo 
                cardRef={card3Ref} 
                src={aboutAssets?.domainGifs?.three} 
                alt="Industry Interaction & Guest Lectures" 
              />
            </div>
            <div className="node">3</div>
            <article className="card" ref={card3Ref}>
              <h3>Industry Interaction &amp; Guest Lectures</h3>
              <p>Connecting students directly with senior software architects, engineering managers, and alumni from leading tech giants for career blueprints and tech insights.</p>
              <p className="sprints-label">Key Initiatives &amp; Sprints:</p>
              <ul>
                <li>Keynote seminars with industry leaders from top product companies</li>
                <li>System design and high-scale architecture teardowns</li>
                <li>One-on-one resume reviews and mock technical interview panels</li>
                <li>Career guidance sessions on internships, off-campus placements, and higher studies</li>
              </ul>
            </article>
          </div>

          {/* Domain 4 */}
          <div className="link left">
            <article className="card" ref={card4Ref}>
              <h3>Technical Outreach &amp; Community Engagement</h3>
              <p>Extending the power of computer science education beyond campus through social initiatives, school coding bootcamps, and collaborative open-source sprints.</p>
              <p className="sprints-label">Key Initiatives &amp; Sprints:</p>
              <ul>
                <li>Coding literacy outreach programs for local school students and beginners</li>
                <li>Open-source hackathons and contribution drives during Hacktoberfest</li>
                <li>Peer-to-peer mentoring circles across first-year to final-year students</li>
                <li>Organizing PCCOE's flagship hackathon Hack Matrix 4.0 under ARTIMAS</li>
              </ul>
            </article>
            <div className="node">4</div>
            <div className="video-slot classroom-slot">
              <ClassroomVideo 
                cardRef={card4Ref} 
                src={aboutAssets?.domainGifs?.four} 
                alt="Technical Outreach & Community Engagement" 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
