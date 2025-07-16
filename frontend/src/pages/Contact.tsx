import React, { useState } from 'react';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('contact');

  const faqs = [
    {
      question: "What is TrustOS?",
      answer: "TrustOS is a comprehensive digital security platform that helps organizations maintain and verify trust in their digital operations through advanced encryption, real-time monitoring, and seamless integration capabilities."
    },
    {
      question: "How can I get started?",
      answer: "Getting started is simple! Contact our sales team to schedule a personalized demo, or download our SDK to begin integration immediately. We offer comprehensive onboarding support."
    },
    {
      question: "What support options are available?",
      answer: "We provide 24/7 technical support, dedicated account managers for enterprise clients, comprehensive documentation, and a developer community forum."
    },
    {
      question: "Is TrustOS compliant with industry standards?",
      answer: "Yes, TrustOS is fully compliant with SOC 2, ISO 27001, GDPR, and other major security and privacy standards. We undergo regular third-party audits."
    },
    {
      question: "What pricing plans are available?",
      answer: "We offer flexible pricing plans for startups, growing businesses, and enterprises. Contact us for a custom quote based on your specific needs and usage requirements."
    }
  ];

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Get in Touch</h1>
        <p>Ready to secure your digital future? We're here to help.</p>
      </div>

      <div className="contact-tabs">
        <button 
          className={`tab ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Info
        </button>
        <button 
          className={`tab ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
      </div>

      {activeTab === 'contact' && (
        <div className="contact-content">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <span className="contact-note">Available 24/7</span>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Email</h3>
              <p>contact@trustos.com</p>
              <span className="contact-note">Response within 2 hours</span>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Address</h3>
              <p>123 Tech Street<br/>Silicon Valley, CA 94025</p>
              <span className="contact-note">Headquarters</span>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" placeholder="Your company" />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell us about your security needs..." rows={5}></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="faq-content">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact; 