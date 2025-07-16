import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}));

// Types
interface LLMRequest {
  prompt: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

interface FraudDetectionRequest {
  message: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

interface FraudDetectionResponse {
  flag: boolean;
  confidence: number;
  analysis: string;
  message: string;
  metadata: {
    model: string;
    tokens_used: number;
    finish_reason: string;
    timestamp: string;
  };
}

interface MoonshotResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'TrustOS Backend API'
  });
});

// LLM API endpoint
app.post('/api/llm', async (req, res) => {
  try {
    const { prompt, model, temperature, max_tokens }: LLMRequest = req.body;

    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid input', 
        message: 'Prompt is required and must be a string' 
      });
    }

    // Check if API key is configured
    if (!process.env.MOONSHOT_API_KEY) {
      return res.status(500).json({ 
        error: 'Configuration error', 
        message: 'API key not configured' 
      });
    }

    console.log('Processing LLM request:', { prompt: prompt.substring(0, 100) + '...' });

    // Make API call to Moonshot
    const response = await fetch(process.env.MOONSHOT_API_URL || 'https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MOONSHOT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || process.env.MOONSHOT_MODEL || 'moonshot-v1-8k',
        messages: [{ role: 'user', content: prompt }],
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 1000
      })
    });

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Moonshot API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'API request failed', 
        message: `Moonshot API returned ${response.status}`,
        details: errorText
      });
    }

    // Parse response
    const data = await response.json() as MoonshotResponse;
    console.log('Moonshot API Response:', {
      tokens_used: data.usage?.total_tokens || 'unknown',
      response_length: data.choices?.[0]?.message?.content?.length || 0
    });

    // Analyze the response
    const analysis = analyzeResponse(data.choices[0].message.content);

    // Return structured response
    res.json({ 
      success: true,
      result: data.choices[0].message.content,
      analysis: analysis,
      metadata: {
        model: model || process.env.MOONSHOT_MODEL || 'moonshot-v1-8k',
        tokens_used: data.usage?.total_tokens || 0,
        finish_reason: data.choices[0].finish_reason,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error in LLM endpoint:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: 'Failed to process LLM request',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Helper function to calculate fraud confidence score
function calculateFraudConfidence(message: string, isFraud: boolean): number {
  const lowerMessage = message.toLowerCase();
  
  // Fraud indicators
  const urgencyKeywords = ['urgent', 'immediate', 'now', 'expires', 'suspend', 'lock'];
  const impersonationKeywords = ['bank', 'santander', 'bbva', 'caixabank', 'microsoft', 'apple', 'google', 'police', 'tax', 'gobierno'];
  const actionKeywords = ['click', 'verify', 'confirm', 'transfer', 'pay', 'buy', 'purchase'];
  const threatKeywords = ['consequences', 'legal', 'seizure', 'frozen', 'closed', 'suspended'];
  
  let score = 0.5; // Base confidence
  
  // Check for various fraud indicators
  urgencyKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 0.1;
  });
  
  impersonationKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 0.1;
  });
  
  actionKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 0.05;
  });
  
  threatKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 0.1;
  });
  
  // Check for suspicious links
  if (lowerMessage.includes('http') || lowerMessage.includes('bit.ly') || lowerMessage.includes('click here')) {
    score += 0.15;
  }
  
  // Adjust score based on fraud detection result
  if (isFraud) {
    score = Math.max(0.7, score);
  } else {
    score = Math.min(0.3, score);
  }
  
  // Ensure score is between 0 and 1
  score = Math.max(0, Math.min(1, score));
  
  // Round to 2 decimal places
  return Math.round(score * 100) / 100;
}

// Fraud detection endpoint
app.post('/api/fraud-detection', async (req, res) => {
  try {
    const { message, model, temperature, max_tokens }: FraudDetectionRequest = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid input', 
        message: 'Message is required and must be a string' 
      });
    }

    // Check if API key is configured
    if (!process.env.MOONSHOT_API_KEY) {
      return res.status(500).json({ 
        error: 'Configuration error', 
        message: 'API key not configured' 
      });
    }

    console.log('Processing fraud detection request:', { message: message.substring(0, 100) + '...' });

    // Create system prompt for fraud detection
    const systemPrompt = `You are a highly advanced AI assistant specializing in detecting financial fraud, with a deep understanding of social engineering tactics. Your task is to analyze a comprehensive description of a user's recent activity, which includes both transaction details and related communications. Based on the entire context, you must determine if the transaction is likely part of a scam. Your primary focus is on identifying patterns of coercion, impersonation, urgency, phishing, and unusual behavior. A transaction is not suspicious just because it's large or to a new person; it becomes suspicious because of the events surrounding it.

The input will contain structured data with the following sections:
•⁠  ⁠*Transaction Details*: Including type (Wire Transfer, Card Payment, Cash Withdrawal, etc.), amount, payee information, and timestamp
•⁠  ⁠*Recent Communications*: SMS messages received within the last 10 minutes, including sender information and message content

Analyze the provided input and determine the correlation between communications and transactions. You must return your output strictly in the following JSON format, with no other text or explanation. DO NOT SHOW YOUR THINKING PROCESS!

json
{
  "flag": <true_or_false>
}

-----

### Success Criteria & Core Principles:

Look for Urgency and Threats: Phrases like "your account will be locked," "immediate action required," or "legal consequences."

Look for Impersonation: Claims of being from the bank, a government agency (tax office, police), a lottery, or tech support.

Look for Suspicious Links & Requests: Requests to click links to "verify" an account, or direct requests to transfer money to a "safe account" or to buy gift cards.

Look for Contextual Correlation: A suspicious communication followed immediately by a relevant financial action is the biggest red flag. The timing and sequence of events are critical.

-----

### Examples - Smishing (Fraudulent SMS with Malicious Links):

*Positive Cases (Fraud Detected):*

*INPUT:*

Type: Wire Transfer
Amount: 3,200 EUR
Payee: M. Rodriguez (New Payee)
Timestamp: 2025-07-16 14:22:15 PM

Channel: SMS
From: +34611234567
Content: "URGENT: Banco Santander Security Alert. Suspicious activity detected on your account. Click here immediately to verify and secure your account: [bit.ly/santander-verify] Your account will be suspended in 30 minutes if not verified."

*OUTPUT:*
json
{
  "flag": true
}

*INPUT:*

Type: Cash Withdrawal
Amount: 1,850 EUR
Timestamp: 2025-07-16 11:45:30 AM

Channel: SMS
From: +34912345678
Content: "Final notice from Agencia Tributaria. Your tax debt of 1,850 EUR must be paid today to avoid legal action. Click here for immediate payment: [bit.ly/tax-payment-urgent] Failure to pay will result in asset seizure."

*OUTPUT:*
json
{
  "flag": true
}

*INPUT:*

Type: Online Transfer
Amount: 750 EUR
Payee: Tech Solutions Ltd (New Payee)
Timestamp: 2025-07-16 16:08:42 PM

Channel: SMS
From: +447123456789
Content: "Microsoft Security: Your computer has been compromised. Remote access needed to fix critical security breach. Pay for emergency tech support here: [bit.ly/ms-support] Act now to prevent data loss."

*OUTPUT:*
json
{
  "flag": true
}

*Negative Cases (Legitimate Transactions):*

*INPUT:*

Type: Card Payment
Amount: 89.99 EUR
Payee: Amazon.es
Timestamp: 2025-07-16 10:20:10 AM

Channel: SMS
From: Amazon
Content: "Your Amazon order #ES-12345 has been processed. Track your package here: [amazon.es/track/ES-12345] Estimated delivery: July 18, 2025."

*OUTPUT:*
json
{
  "flag": false
}

*INPUT:*

Type: Direct Debit
Amount: 65.50 EUR
Payee: Endesa Energía
Timestamp: 2025-07-16 09:15:00 AM

Channel: SMS
From: Endesa
Content: "Your electricity bill for July 2025 has been automatically charged. View your invoice here: [endesa.com/invoice/July2025] Thank you for your payment."

*OUTPUT:*
json
{
  "flag": false
}

*INPUT:*

Type: Card Payment
Amount: 127.35 EUR
Payee: Mercadona
Timestamp: 2025-07-16 18:30:22 PM

Channel: SMS
From: Mercadona
Content: "Thank you for shopping with us! You've earned 12 points today. Check your rewards balance: [mercadona.es/rewards] Points expire in 12 months."

*OUTPUT:*
json
{
  "flag": false
}

Now, analyze the following input and provide your JSON output.`;

    // Make API call to Moonshot for fraud detection
    const response = await fetch(process.env.MOONSHOT_API_URL || 'https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MOONSHOT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || process.env.MOONSHOT_MODEL || 'moonshot-v1-8k',
        messages: [{
          role: 'system',
          content: systemPrompt
        }, {
          role: 'user',
          content: message
        }],
        temperature: temperature || 0.1,
        max_tokens: max_tokens || 500
      })
    });

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Moonshot API error for fraud detection:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'API request failed', 
        message: `Moonshot API returned ${response.status}`,
        details: errorText
      });
    }

    // Parse response
    const data = await response.json() as MoonshotResponse;
    console.log('Moonshot API Fraud Detection Response:', {
      tokens_used: data.usage?.total_tokens || 'unknown',
      response_length: data.choices?.[0]?.message?.content?.length || 0
    });

    // Extract the LLM response
    const content = data.choices[0].message.content;
    
    // Parse the JSON response from LLM
    let fraudResult;
    try {
      fraudResult = JSON.parse(content);
    } catch (parseError) {
      // If JSON parsing fails, try to extract flag from the response
      const flagMatch = content.match(/"flag":\s*(true|false)/);
      if (flagMatch) {
        fraudResult = { flag: flagMatch[1] === 'true' };
      } else {
        throw new Error('Could not parse fraud detection result');
      }
    }

    // Calculate confidence score (simple heuristic based on message characteristics)
    const confidenceScore = calculateFraudConfidence(message, fraudResult.flag);

    // Return structured response
    res.json({ 
      success: true,
      flag: fraudResult.flag,
      confidence: confidenceScore,
      analysis: fraudResult.flag ? 'Fraudulent' : 'Safe',
      message: message,
      metadata: {
        model: model || process.env.MOONSHOT_MODEL || 'moonshot-v1-8k',
        tokens_used: data.usage?.total_tokens || 0,
        finish_reason: data.choices[0].finish_reason,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error in fraud detection endpoint:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: 'Failed to process fraud detection request',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Response analysis function
function analyzeResponse(content: string): {
  word_count: number;
  sentiment: string;
  topics: string[];
  confidence: number;
} {
  const wordCount = content.split(/\s+/).length;
  
  // Simple sentiment analysis
  const positiveWords = ['good', 'great', 'excellent', 'positive', 'success', 'secure', 'trust', 'reliable'];
  const negativeWords = ['bad', 'terrible', 'negative', 'fail', 'insecure', 'vulnerable', 'risk'];
  
  const lowerContent = content.toLowerCase();
  const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;
  
  let sentiment = 'neutral';
  if (positiveCount > negativeCount) sentiment = 'positive';
  else if (negativeCount > positiveCount) sentiment = 'negative';
  
  // Extract potential topics (simple keyword extraction)
  const topics = ['security', 'trust', 'technology', 'data', 'privacy']
    .filter(topic => lowerContent.includes(topic));
  
  // Calculate confidence based on response length and structure
  const confidence = Math.min(0.9, Math.max(0.1, wordCount / 100));
  
  return {
    word_count: wordCount,
    sentiment,
    topics,
    confidence: Math.round(confidence * 100) / 100
  };
}

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: 'Something went wrong' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not found', 
    message: `Route ${req.originalUrl} not found` 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TrustOS Backend API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 LLM endpoint: http://localhost:${PORT}/api/llm`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 