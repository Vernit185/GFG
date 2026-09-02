import React from 'react';
import { upcomingEvents, pastHighlights } from '../data/eventsData';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../components/ui/carousel';
import './Events.css';

export default function Events() {
  return (
    <div className="events-page animate-fade-in">
      {/* Hero Section */}
      <section className="events-hero-section">
        <div className="container events-hero-content">
          <h1 className="events-hero-title">Empowering Future Engineers Through <span className="text-highlight">Events</span></h1>
          <p className="events-hero-desc">
            Explore our journey of learning, innovation, and community building at GFG PCCOE.
          </p>
        </div>
        <div className="events-hero-gradient"></div>
      </section>

      {/* Upcoming Events */}
      <section className="events-section">
        <div className="container">
          <h2 className="events-section-title section-title-border">Upcoming Events</h2>
          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card glass-card soft-bloom">
                <div className="event-card-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-desc">{event.description}</p>
                  <div className="event-meta">
                    <i className="bx bx-calendar"></i> {event.date}
                  </div>
                  <div className="event-meta">
                    <i className="bx bx-map"></i> {event.location}
                  </div>
                  <div className="event-meta">
                    <i className="bx bx-code-alt"></i> {event.category}
                  </div>
                </div>
                <button className="btn btn-outline mt-auto">Register Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Gallery (Timeline) */}
      <section className="events-timeline-section">
        <div className="container">
          <h2 className="events-section-title section-title-border">Past Highlights</h2>
          <div className="timeline-container glass-card">
            <div className="timeline-track">
              {pastHighlights.map((highlight) => (
                <div key={highlight.id} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">{highlight.date}</span>
                    <h3 className="timeline-title">
                      {highlight.title}
                    </h3>
                    <Carousel className="events-carousel" opts={{ align: "start" }}>
                      <CarouselContent>
                        {highlight.images.map((img, idx) => (
                          <CarouselItem key={idx} className="event-carousel-slide">
                            <div className="carousel-img-wrapper soft-bloom">
                              <img src={img.src} alt={img.alt} loading="lazy" />
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
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
