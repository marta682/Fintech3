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
          <h2>Our Innovative Approach</h2>
          <p>Your invisible shield against digital fraud</p>
        </div>
        
        <div className="workflow-diagram">
          <img 
            src="/flow.png" 
            alt="TrustOS Fraud Detection Flow - How it works: User initiates transaction → Bank processes request → TrustOS intercepts contextual signals, enriches data with external sources, generates trust score, and flags suspicious activity → Bank responds based on TrustOS insights → User is protected"
            className="flow-diagram"
          />
        </div>
      </section>

      <section className="mission-vision">
        <div className="mv-grid">
          <div className="mv-card">
            <div className="mv-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>Empower banks to protect vulnerable customers from manipulation and exploitation with smarter, proactive fraud defence that builds trust.</p>
          </div>
          <div className="mv-card">
            <div className="mv-icon">👁️</div>
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