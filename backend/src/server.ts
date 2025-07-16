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