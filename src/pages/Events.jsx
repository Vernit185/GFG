import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { upcomingEvents, pastHighlights as defaultHighlights } from '../data/eventsData';
import { useCloudinaryEvents } from '../hooks/useCloudinary';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../components/ui/carousel';
import './Events.css';

export default function Events() {
  const { highlights } = useCloudinaryEvents(defaultHighlights);
  const [lightboxData, setLightboxData] = useState(null);

  React.useEffect(() => {
    if (lightboxData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxData]);

  const openLightbox = (highlight, startIndex) => {
    setLightboxData({ highlight, startIndex });
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  // Render the lightbox directly into the body to prevent CSS transform conflicts
  const renderLightbox = () => {
    if (!lightboxData) return null;
    return createPortal(
      <div className="lightbox-overlay" onClick={closeLightbox}>
        <button className="lightbox-close" onClick={closeLightbox}>
          <i className="bx bx-x"></i>
        </button>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <Carousel
            opts={{ startIndex: lightboxData.startIndex, loop: true }}
            className="lightbox-carousel"
          >
            <CarouselContent>
              {lightboxData.highlight.images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <img src={img.src} alt={img.alt} className="lightbox-img" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="lightbox-controls-bar">
              <CarouselPrevious className="lightbox-nav-btn" />
              <CarouselNext className="lightbox-nav-btn" />
            </div>
          </Carousel>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="events-page animate-fade-in">
      {renderLightbox()}

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
              {highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className={`timeline-item ${highlight.images && highlight.images.length > 0 ? 'has-carousel' : 'no-carousel'}`}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">{highlight.date}</span>
                    <h3 className="timeline-title">
                      {highlight.title}
                    </h3>
                    {highlight.images && highlight.images.length > 0 && (
                      <Carousel className="events-carousel" opts={{ align: "start" }}>
                        <CarouselContent>
                          {highlight.images.map((img, idx) => (
                            <CarouselItem key={idx} className="event-carousel-slide">
                              <div
                                className="carousel-img-wrapper soft-bloom"
                                onClick={() => openLightbox(highlight, idx)}
                                style={{ cursor: 'pointer' }}
                              >
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
                    )}
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
