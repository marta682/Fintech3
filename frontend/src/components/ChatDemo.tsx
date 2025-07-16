import React, { useState } from 'react';
import { apiService, formatApiError } from '../services/api';
import type { LLMResponse } from '../services/api';

const ChatDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<LLMResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiService.chatWithAnalysis(prompt);
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
        <h2>LLM Chat Demo</h2>
        <p>Test the TrustOS LLM integration</p>
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <div className="form-group">
          <label htmlFor="prompt">Enter your prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about digital trust, security, or any topic..."
            rows={4}
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? 'Sending...' : 'Send'}
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
          <div className="response-content">
            <h3>Response</h3>
            <div className="response-text">
              {response.result}
            </div>
          </div>

          <div className="response-analysis">
            <h4>Analysis</h4>
            <div className="analysis-grid">
              <div className="analysis-item">
                <span className="label">Word Count:</span>
                <span className="value">{response.analysis.word_count}</span>
              </div>
              <div className="analysis-item">
                <span className="label">Sentiment:</span>
                <span className={`value sentiment-${response.analysis.sentiment}`}>
                  {response.analysis.sentiment}
                </span>
              </div>
              <div className="analysis-item">
                <span className="label">Confidence:</span>
                <span className="value">{(response.analysis.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="analysis-item">
                <span className="label">Topics:</span>
                <span className="value">
                  {response.analysis.topics.length > 0 
                    ? response.analysis.topics.join(', ') 
                    : 'None detected'}
                </span>
              </div>
            </div>
          </div>

          <div className="response-metadata">
            <h4>Metadata</h4>
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
                <span className="label">Finish Reason:</span>
                <span className="value">{response.metadata.finish_reason}</span>
              </div>
              <div className="metadata-item">
                <span className="label">Timestamp:</span>
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