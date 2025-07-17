import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            The Future of
            <span className="gradient-text"> Digital Trust</span>
          </h1>
          <p className="hero-subtitle">
            TrustOS provides enterprise-grade security solutions with seamless integration, 
            enabling organizations to operate with confidence in the digital age.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <div className="card-content">
              <div className="security-icon">🔒</div>
              <h3>Secure</h3>
              <p>Bank-grade encryption</p>
            </div>
          </div>
          <div className="floating-card">
            <div className="card-content">
              <div className="security-icon">⚡</div>
              <h3>Fast</h3>
              <p>Lightning-fast processing</p>
            </div>
          </div>
          <div className="floating-card">
            <div className="card-content">
              <div className="security-icon">🛡️</div>
              <h3>Trusted</h3>
              <p>Enterprise-ready platform</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-header">
          <h2>Why Choose TrustOS?</h2>
          <p>Built for the modern enterprise with security at its core</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Advanced Security</h3>
            <p>Multi-layered security architecture with real-time threat detection and response capabilities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Seamless Integration</h3>
            <p>Easy-to-implement APIs and SDKs that integrate with your existing infrastructure.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Analytics</h3>
            <p>Comprehensive dashboards and reporting tools for complete visibility and control.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-header">
          <h2>How does TrustOS work?</h2>
          <p>A simple, powerful approach to enterprise security</p>
        </div>
        
        <div className="workflow-container">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-icon">🔗</div>
              <h3>Connect</h3>
              <p>Integrate TrustOS with your existing systems using our comprehensive APIs and SDKs. Setup takes minutes, not hours.</p>
            </div>
          </div>
          
          <div className="workflow-arrow">
            <div className="arrow-line"></div>
            <div className="arrow-head"></div>
          </div>
          
          <div className="workflow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-icon">🔍</div>
              <h3>Monitor</h3>
              <p>Our AI-powered system continuously monitors your digital infrastructure, detecting threats and anomalies in real-time.</p>
            </div>
          </div>
          
          <div className="workflow-arrow">
            <div className="arrow-line"></div>
            <div className="arrow-head"></div>
          </div>
          
          <div className="workflow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-icon">🛡️</div>
              <h3>Protect</h3>
              <p>Automated response systems neutralize threats instantly while providing detailed analytics and compliance reporting.</p>
            </div>
          </div>
        </div>
        
        <div className="workflow-features">
          <div className="workflow-feature">
            <div className="feature-stat">99.9%</div>
            <div className="feature-label">Uptime Guarantee</div>
          </div>
          <div className="workflow-feature">
            <div className="feature-stat">&lt; 10ms</div>
            <div className="feature-label">Response Time</div>
          </div>
          <div className="workflow-feature">
            <div className="feature-stat">24/7</div>
            <div className="feature-label">AI Monitoring</div>
          </div>
          <div className="workflow-feature">
            <div className="feature-stat">256-bit</div>
            <div className="feature-label">Encryption</div>
          </div>
        </div>
      </section>

      <section className="mission-vision">
        <div className="mv-grid">
          <div className="mv-card">
            <h2>Our Mission</h2>
            <p>Empower banks to protect vulnerable customers from manipulation and exploitation with smarter, proactive fraud defence that builds trust.</p>
          </div>
          <div className="mv-card">
            <h2>Our Vision</h2>
            <p>Enable banks to see beyond transactions, detect psychological scams across channels while maintaining a frictionless customer experience.</p>
          </div>
        </div>
      </section>

      <section className="value-proposition">
        <div className="value-content">
          <div className="value-header">
            <h2>Beyond Traditional Fraud Detection</h2>
            <p>Revolutionizing financial security with AI-powered psychological scam detection</p>
          </div>
          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Advanced Detection</h3>
              <p>APP fraud, social engineering, and impersonation scams detected in real-time</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔄</div>
              <h3>Multi-Channel Orchestration</h3>
              <p>Seamless protection across all customer touchpoints and communication channels</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💰</div>
              <h3>40%+ Cost Reduction</h3>
              <p>Significant fraud cost reduction through proactive prevention and early intervention</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 