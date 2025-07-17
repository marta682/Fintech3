import { useState } from 'react';
import { apiService, formatApiError } from '../services/api';
import type { FraudDetectionResponse } from '../services/api';

const ChatDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<FraudDetectionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiService.detectFraud(prompt);
      setResponse(result);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setResponse(null);
    setError(null);
  };

  return (
    <div className="chat-demo">
      <div className="chat-header">
        <h2>Fraud Detection Demo</h2>
        <p>Test the TrustOS fraud detection system</p>
      </div>

      <div className="input-format-suggestion">
        <h3>📋 Input Format Example</h3>
        <div className="format-example">
          <div className="example-header">*INPUT:*</div>
          <div className="example-content">
            <div className="example-line">Type: Wire Transfer</div>
            <div className="example-line">Amount: 3,200 EUR</div>
            <div className="example-line">Payee: M. Rodriguez</div>
            <div className="example-line">Timestamp: 2025-07-16 14:22:15 PM</div>
            <div className="example-line">From: +34631234560</div>
            <div className="example-line">Content: "Hi mom, i'm alright"</div>
            <div className="example-line">From: +12345678910</div>
            <div className="example-line">Content: "Hi dad, i'm alright"</div>
            <div className="example-line">From: +34655789012</div>
            <div className="example-line">Content: "Don't forget dinner at 8 tonight!"</div>
            <div className="example-line fraud-example">From: +34611234567</div>
            <div className="example-line fraud-example">Content: "NOTICE: Unusual login detected on your CaixaBank account. To avoid suspension, confirm your identity now at: [bit.ly/caixabank-secure]. Action required within 15 minutes."</div>
            <div className="example-line">From: +34698765432</div>
            <div className="example-line">Content: "Thanks for sending the report. Will review it tomorrow."</div>
            <div className="example-dots">...</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <div className="form-group">
          <label htmlFor="prompt">Enter a message to analyze:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a SMS message or transaction details for fraud detection..."
            rows={4}
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
          <button type="button" onClick={handleClear} disabled={loading}>
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      {response && (
        <div className="response-container">
          <div className="fraud-result">
            <h3>
              <span className={`fraud-status ${response.flag ? 'fraudulent' : 'safe'}`}>
                {response.flag ? '🚨 FRAUDULENT' : '✅ SAFE'}
              </span>
            </h3>
            <div className="confidence-score">
              <span className="label">Risk Score:</span>
              <span className="value">{response.risk_score}/100</span>
            </div>
          </div>

          <div className="analyzed-message">
            <h4>Analyzed Message</h4>
            <div className="message-content">
              {response.message}
            </div>
          </div>

          {response.fraud_content && (
            <div className="fraudulent-message">
              <h4>🚨 Fraudulent Message Detected</h4>
              <div className="fraud-message-content">
                {response.fraud_content}
              </div>
            </div>
          )}

          <div className="response-metadata">
            <h4>Analysis Details</h4>
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="label">Model:</span>
                <span className="value">{response.metadata.model}</span>
              </div>
              <div className="metadata-item">
                <span className="label">Tokens Used:</span>
                <span className="value">{response.metadata.tokens_used}</span>
              </div>
              <div className="metadata-item">
                <span className="label">Analysis Time:</span>
                <span className="value">
                  {new Date(response.metadata.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDemo; 