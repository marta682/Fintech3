import { useState } from 'react';
import { apiService, formatApiError } from '../services/api';
import type { FraudDetectionResponse } from '../services/api';

const ChatDemo = () => {
  const defaultExampleText = `Type: Wire Transfer
Amount: 3,200 EUR
Payee: M. Rodriguez
Timestamp: 2025-07-16 14:22:15 PM

From: +34631234560
Content: “Hi mom, i’m alright”
From: +12345678910
Content: “Hi dad, i’m alright”
From: +34655789012
Content: “Don’t forget dinner at 8 tonight!”


From: +34611234567
Content: “NOTICE: Unusual login detected on your CaixaBank account. To avoid suspension, confirm your identity now at: [bit.ly/caixabank-secure]. Action required within 15 minutes.”


From: +34698765432
Content: “Thanks for sending the report. Will review it tomorrow.”
From: +34622334455
Content: “Meeting confirmed for Thursday at 11.”
From: +34688997766
Content: “Your electricity bill of €54.30 has been paid. Thank you!”
From: +34633445566
Content: “Good luck on your presentation today!”
From: +34644556677
Content: “Hey, we’re still on for the weekend, right?”
From: +34655667788
Content: “We have received your package request. Delivery expected Friday.”
From: +34666778899
Content: “Happy birthday! Hope you have a great day!”
From: +34677889900
Content: “Here is your one-time code: 294031”
From: +34688990011
Content: “Your monthly subscription fee of €9.99 has been charged successfully.”
From: +34699001122
Content: “See you at the football game later!”
From: +34610111213
Content: “Mom’s appointment is at 3 pm today.”
From: +34621222324
Content: “Flight confirmed: MAD–LIS, departs Friday at 10:20.”
From: +34632333435
Content: “Don’t forget to bring the documents tomorrow.”
From: +34643444546
Content: “Your Uber is arriving in 2 minutes.”
From: +34654555657
Content: “Class is cancelled today, see you Monday.”
From: +34665666768
Content: “Thanks for the coffee today!”
`;

  const [prompt, setPrompt] = useState(defaultExampleText);
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
          <label htmlFor="prompt">Enter one case scenario to analyze:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter one or more SMS messages or transaction details for fraud detection..."
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