import React, { useState } from 'react';
import { apiService, formatApiError } from '../services/api';
import type { FraudDetectionResponse } from '../services/api';

const ChatDemo: React.FC = () => {
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
              <span className="label">Confidence Score:</span>
              <span className="value">{(response.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div className="analyzed-message">
            <h4>Analyzed Message</h4>
            <div className="message-content">
              {response.message}
            </div>
          </div>

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