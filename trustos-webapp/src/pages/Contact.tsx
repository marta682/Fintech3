import React from 'react';

const Contact = () => {
  const faqs = [
    {
      question: "What is TrustOS?",
      answer: "TrustOS is a comprehensive digital security platform that helps organizations maintain and verify trust in their digital operations."
    },
    {
      question: "How can I get started?",
      answer: "Contact our sales team through the form below or call us directly to schedule a demo."
    },
    {
      question: "What support options are available?",
      answer: "We offer 24/7 technical support, dedicated account managers, and comprehensive documentation."
    }
  ];

  return (
    <div className="contact-page">
      <section className="contact-info">
        <h1>Contact Us</h1>
        <div className="contact-details">
          <p>Phone: +1 (555) 123-4567</p>
          <p>Email: contact@trustos.com</p>
          <p>Address: 123 Tech Street, Silicon Valley, CA 94025</p>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact; 