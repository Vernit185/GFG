import React from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { galleryPhotos } from '../data/galleryData';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page animate-fade-in">
      {/* 1. Hero Section (Centered Layout) */}
      <section className="hero-section">
        <div className="container hero-centered-container">
          {/* Chapter Official Logo */}
          <div className="hero-logo-wrapper">
            <img src="/GFG-logo.png" alt="GeeksforGeeks Logo" className="hero-main-logo gfg-logo" />
            <span className="hero-logo-cross">X</span>
            <img src="/PCCOE-logo.png" alt="PCCOE Logo" className="hero-main-logo pccoe-logo" />
          </div>

          <h1 className="hero-title">
            <span className="text-highlight">GeeksforGeeks</span> Campus Body PCCOE
          </h1>

          <h2 className="hero-subtitle">
            Sculpting Tomorrow's Coders!
          </h2>

          <p className="hero-description">
            We are the official programming community at <strong>Pimpri Chinchwad College of Engineering (PCCOE)</strong>.
            Our goal is to help students build real-world skills through competitive coding, hands-on bootcamps, and hackathons
            that bridge the gap between academics and industry.
          </p>

          <div className="hero-actions">
            <Link to="/hackmatrix" className="btn btn-secondary">
              <i className="bx bx-code-block"></i>
              <span>Explore Our Events</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Photo Carousel (Enlarged Section) */}
      <section className="carousel-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge-green">Moments of Pride</span>
            <h2 className="section-heading">Featured Highlights & Felicitation</h2>
            <p className="section-subheading">
              Memorable milestones that define the spirit of innovation at GeeksforGeeks PCCOE.
            </p>
          </div>

          <div style={{ maxWidth: '1240px', margin: '2.5rem auto 0' }}>
            <Carousel
              opts={{
                align: 'start',
                loop: true
              }}
              plugins={[
                Autoplay({
                  delay: 3500,
                  stopOnInteraction: true
                })
              ]}
              className="w-full"
            >
              <CarouselContent>
                {galleryPhotos.map((photo) => (
                  <CarouselItem key={photo.id}>
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '16 / 9',
                        maxHeight: '640px',
                        width: '100%',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-xl)',
                        border: '1px solid var(--border-light)',
                        background: '#0f172a'
                      }}
                    >
                      <img
                        src={photo.image}
                        alt={photo.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(10, 15, 30, 0.9) 0%, rgba(10, 15, 30, 0.3) 50%, transparent 100%)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          padding: '3rem'
                        }}
                      >
                        <span
                          className="badge-green"
                          style={{
                            color: '#4ade80',
                            marginBottom: '0.6rem',
                            display: 'inline-block'
                          }}
                        >
                          {photo.category} • {photo.date}
                        </span>
                        <h3
                          style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: '#ffffff',
                            marginBottom: '0.6rem',
                            letterSpacing: '-0.01em'
                          }}
                        >
                          {photo.title}
                        </h3>
                        <p
                          style={{
                            color: '#cbd5e1',
                            fontSize: '1.1rem',
                            maxWidth: '850px',
                            lineHeight: 1.6,
                            margin: 0
                          }}
                        >
                          {photo.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="carousel-controls-bar">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* 3. What is GeeksforGeeks Campus Body? (Minimalist Official Layout) */}
      <section className="about-minimal-section">
        <div className="container">
          <div className="about-minimal-grid">
            <div className="about-minimal-content">
              <h2 className="about-minimal-title">
                What is GeeksforGeeks Campus Body?
              </h2>

              <div className="about-minimal-text">
                <p>
                  Our community seeks to cultivate a culture of constant learning, creativity, and cooperation among students who are passionate about coding, algorithms, and technology. We equip our members to flourish in the ever-changing digital scene through seminars, hackathons, coding challenges, and knowledge-sharing events.
                </p>

                <p>
                  Through interactive workshops, insightful webinars, hackathons, and coding competitions, we empower student to not just write code, but to craft elegant solutions that make a tangible impact. By connecting classroom knowledge with real-world applications, we prepare everyone to excel in the ever-evolving technological landscape.
                </p>
              </div>
            </div>

            <div className="about-minimal-visual">
              <img
                src="/about-illustration.png"
                alt="About GeeksforGeeks Campus Body"
                className="about-minimal-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
