import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/geeksforgeeks@pccoepune.org", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: `${formData.firstName} ${formData.lastName}`,
          Email: formData.email,
          Phone: formData.phone || "Not provided",
          Subject: formData.subject,
          Message: formData.description,
          _subject: `New Contact Request: ${formData.subject}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          description: ''
        });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page animate-fade-in">
      {/* Header */}
      <section className="contact-header-section">
        <div className="container text-center">
          <span className="badge-green">Get in Touch</span>
          <h1 className="contact-main-title">
            Want to know more about <span className="text-highlight">GeeksforGeeks PCCOE</span>?
          </h1>
          <p className="contact-header-desc">
            Follow us on our official handles to stay up to date with ongoing hackathons,
            workshops, recruitment drives, and student achievements.
          </p>
        </div>
      </section>

      {/* Social Handles & Map Section */}
      <section className="contact-channels-section">
        <div className="container channels-grid">

          {/* Left: Social Cards */}
          <div className="social-cards-wrapper">
            <h2 className="channel-title">Connect on Social Platforms</h2>
            <p className="channel-subtitle">Join thousands of PCCOE students in our active coding groups.</p>

            <div className="social-links-stack">
              <a
                href="https://www.linkedin.com/company/gfgpccoe"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card linkedin-card"
              >
                <div className="channel-icon-circle">
                  <i className="bx bxl-linkedin"></i>
                </div>
                <div className="channel-info">
                  <h3>LinkedIn Community</h3>
                  <p>Follow for professional updates.</p>
                </div>
                <i className="bx bx-link-external channel-arrow"></i>
              </a>

              <a
                href="https://www.instagram.com/gfg_campusbody_pccoe"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card instagram-card"
              >
                <div className="channel-icon-circle">
                  <i className="bx bxl-instagram"></i>
                </div>
                <div className="channel-info">
                  <h3>Instagram @gfg_campusbody_pccoe</h3>
                  <p>Catch daily reels, tech trivia, event countdowns, and behind-the-scenes.</p>
                </div>
                <i className="bx bx-link-external channel-arrow"></i>
              </a>

              <a
                href="https://x.com/gfg_pccoe"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card twitter-card"
              >
                <div className="channel-icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </div>
                <div className="channel-info">
                  <h3>X Space / Twitter</h3>
                  <p>Tech threads, developer announcements, and hackathon highlights.</p>
                </div>
                <i className="bx bx-link-external channel-arrow"></i>
              </a>

              <a
                href="https://www.youtube.com/@PCCOEGeeksforGeeks"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card youtube-card"
              >
                <div className="channel-icon-circle">
                  <i className="bx bxl-youtube"></i>
                </div>
                <div className="channel-info">
                  <h3>YouTube Channel</h3>
                  <p>Watch recorded workshops, hackathon ceremonies, and coding tutorials.</p>
                </div>
                <i className="bx bx-link-external channel-arrow"></i>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="map-wrapper glass-card">
            <div className="map-header">
              <div className="map-header-icon">
                <img src="/direction.png" alt="Direction" />
              </div>
              <div>
                <h3>Our Campus Location</h3>
                <p>PCCOE, Sector 26, Pradhikaran, Nigdi, Akurdi, Pune - 411044</p>
              </div>
            </div>
            <div className="map-frame-container">
              <iframe
                title="PCCOE Pune Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.2730623297127!2d73.7594770751949!3d18.65172878246726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76c8fa205%3A0x1b210131915734fd!2sPCCoE%20-%20Pimpri%20Chinchwad%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container container-narrow">
          <div className="form-card glass-card">
            <div className="form-card-header text-center">
              <span className="badge-green">Direct Message</span>
              <h2 className="form-title">Connect with Us: Your Thoughts Matter!</h2>
              <p className="form-desc">
                Have a question about Hack Matrix, sponsorship opportunities, or any in general query?
                Send us a message and our team will get back to you promptly.
              </p>
            </div>

            {submitted && (
              <div className="success-banner animate-fade-in">
                <i className="bx bx-check-circle"></i>
                <div>
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for writing to GFG PCCOE. Our team will respond to your email within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name <span className="req">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="e.g. Rahul"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name <span className="req">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="e.g. Sharma"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="req">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. rahul.sharma@pccoepune.org"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. +91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject <span className="req">*</span></label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="e.g. Query regarding Hack Matrix 4.0 Round 2"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Message / Description <span className="req">*</span></label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  required
                  placeholder="Type your message, proposal, or question here in detail..."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary form-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <i className="bx bx-loader-alt bx-spin"></i>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <i className="bx bx-send"></i>
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
