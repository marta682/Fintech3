// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Types for API requests and responses
export interface LLMRequest {
  prompt: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface FraudDetectionRequest {
  message: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface FraudDetectionResponse {
  success: boolean;
  flag: boolean;
  confidence: number;
  analysis: string;
  message: string;
  fraud_content: string | null;
  metadata: {
    model: string;
    tokens_used: number;
    finish_reason: string;
    timestamp: string;
  };
}

export interface LLMResponse {
  success: boolean;
  result: string;
  analysis: {
    word_count: number;
    sentiment: string;
    topics: string[];
    confidence: number;
  };
  metadata: {
    model: string;
    tokens_used: number;
    finish_reason: string;
    timestamp: string;
  };
}

export interface ApiError {
  error: string;
  message: string;
  details?: string;
}

// API service class
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; service: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`);
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Send LLM request
  async sendLLMRequest(request: LLMRequest): Promise<LLMResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/llm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        const error = data as ApiError;
        throw new Error(error.message || `API request failed: ${response.status}`);
      }

      return data as LLMResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to send LLM request');
    }
  }

  // Convenience method for simple chat
  async chat(prompt: string): Promise<string> {
    const response = await this.sendLLMRequest({ prompt });
    return response.result;
  }

  // Convenience method for analyzed chat
  async chatWithAnalysis(prompt: string): Promise<LLMResponse> {
    return await this.sendLLMRequest({ prompt });
  }

  // Fraud detection method
  async detectFraud(message: string): Promise<FraudDetectionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/fraud-detection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        const error = data as ApiError;
        throw new Error(error.message || `API request failed: ${response.status}`);
      }

      return data as FraudDetectionResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to detect fraud');
    }
  }
}

// Export a default instance
export const apiService = new ApiService();

// Helper functions
export const isApiError = (data: any): data is ApiError => {
  return data && typeof data.error === 'string' && typeof data.message === 'string';
};

export const formatApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}; 