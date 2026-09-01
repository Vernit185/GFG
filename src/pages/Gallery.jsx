import React, { useState } from 'react';
import { galleryPhotos } from '../data/galleryData';
import './Gallery.css';

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Special Events', 'Hackathons', 'Workshops', 'Competitions', 'Seminars', 'Community'];

  const filteredPhotos = galleryPhotos.filter((photo) => {
    if (activeCategory === 'All') return true;
    return photo.category === activeCategory;
  });

  return (
    <div className="gallery-page animate-fade-in">
      {/* Header Section */}
      <section className="gallery-header-section">
        <div className="container text-center">
          <span className="badge-green">Memories & Milestones</span>
          <h1 className="gallery-main-title">
            A Visual Symphony: Dive into the <span className="text-highlight">Captivating World</span> of Our Gallery!
          </h1>
          <p className="gallery-header-desc">
            Explore glimpses of our high-octane 24-hour hackathons, algorithmic bootcamps, felicitation 
            ceremonies, and the electric energy of the GFG PCCOE community.
          </p>

          {/* Category Filter */}
          <div className="gallery-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-grid">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="gallery-card glass-card"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="gallery-image-wrapper">
                  <img src={photo.image} alt={photo.title} className="gallery-photo" loading="lazy" />
                  <div className="gallery-card-overlay">
                    <span className="gallery-zoom-icon">
                      <i className="bx bx-expand-alt"></i>
                    </span>
                  </div>
                  <span className="gallery-badge">{photo.category}</span>
                </div>

                <div className="gallery-card-content">
                  <div className="gallery-date">
                    <i className="bx bx-calendar"></i>
                    <span>{photo.date}</span>
                  </div>
                  <h3 className="gallery-title">{photo.title}</h3>
                  <p className="gallery-desc">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="lightbox-backdrop" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedPhoto(null)} aria-label="Close modal">
              <i className="bx bx-x"></i>
            </button>
            <div className="lightbox-image-box">
              <img src={selectedPhoto.image} alt={selectedPhoto.title} />
            </div>
            <div className="lightbox-info">
              <span className="badge-green">{selectedPhoto.category}</span>
              <span className="lightbox-date">{selectedPhoto.date}</span>
              <h2>{selectedPhoto.title}</h2>
              <p>{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
