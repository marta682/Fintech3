import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to TrustOS</h1>
        <p>Revolutionizing Trust in Digital Systems</p>
      </section>

      <section className="product-description">
        <h2>Product Description</h2>
        <p>TrustOS is a cutting-edge platform that enables secure and transparent digital operations. Our system provides enterprise-grade security solutions with seamless integration capabilities.</p>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>To create a more secure and trustworthy digital ecosystem by providing innovative solutions that empower organizations to operate with confidence and integrity.</p>
      </section>

      <section className="vision">
        <h2>Our Vision</h2>
        <p>To become the global standard for digital trust and security, enabling a future where organizations can focus on growth while we handle their security needs.</p>
      </section>
    </div>
  );
};

export default Home; 