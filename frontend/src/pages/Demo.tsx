import React from 'react';
import ChatDemo from '../components/ChatDemo';

const Demo = () => {
  return (
    <div className="demo-page">
      <div className="page-header">
        <h1>Interactive Demo</h1>
        <p>Experience TrustOS in action with our live demonstration</p>
      </div>
      
      <div className="demo-container">
        <div className="demo-column">
          <div className="demo-header">
            <h2>Security Dashboard</h2>
            <span className="status-badge">Live</span>
          </div>
          <div className="demo-content">
            <div className="demo-placeholder">
              <div className="placeholder-icon">📊</div>
              <h3>Real-time Monitoring</h3>
              <p>Interactive security dashboard coming soon</p>
              <div className="demo-stats">
                <div className="stat">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
                <div className="stat">
                  <span className="stat-number">256</span>
                  <span className="stat-label">Encryption</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-column">
          <div className="demo-header">
            <h2>API Integration</h2>
            <span className="status-badge">Preview</span>
          </div>
          <div className="demo-content">
            <div className="demo-placeholder">
              <div className="placeholder-icon">⚡</div>
              <h3>Live API Testing</h3>
              <p>Test our APIs with real-time responses</p>
              <div className="code-preview">
                <div className="code-line">
                  <span className="code-keyword">const</span> trustos = <span className="code-keyword">new</span> TrustOS();
                </div>
                <div className="code-line">
                  <span className="code-keyword">await</span> trustos.authenticate(token);
                </div>
                <div className="code-line">
                  <span className="code-comment">// Ready to secure your app</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-actions">
        <button className="btn btn-primary">Request Full Demo</button>
        <button className="btn btn-secondary">Download SDK</button>
      </div>

      <ChatDemo />
    </div>
  );
};

export default Demo; 