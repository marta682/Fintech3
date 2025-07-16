# TrustOS Backend API

A Node.js/Express backend server for the TrustOS webapp that provides LLM integration with Moonshot AI.

## Features

- 🤖 **LLM Integration**: Connect to Moonshot AI API for chat completions
- 📊 **Response Analysis**: Automatic sentiment analysis and topic extraction
- 🔒 **Security**: CORS protection and input validation
- 🏥 **Health Monitoring**: Health check endpoint
- 📝 **TypeScript**: Full TypeScript support with proper types
- 🔄 **Hot Reload**: Development server with automatic restart

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory:
```bash
# TrustOS Backend Configuration
NODE_ENV=development
PORT=3000

# Moonshot API Configuration
MOONSHOT_API_KEY=your_moonshot_api_key_here
MOONSHOT_API_URL=https://api.moonshot.cn/v1/chat/completions
MOONSHOT_MODEL=moonshot-v1-8k

# CORS Configuration
FRONTEND_URL=http://localhost:5174

# Security
JWT_SECRET=your_jwt_secret_here
```

### 3. Add Your API Key
Replace `your_moonshot_api_key_here` with your actual Moonshot API key.

## Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "TrustOS Backend API"
}
```

### LLM Chat Completion
```http
POST /api/llm
Content-Type: application/json

{
  "prompt": "What is digital trust?",
  "model": "moonshot-v1-8k",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**Response:**
```json
{
  "success": true,
  "result": "Digital trust refers to...",
  "analysis": {
    "word_count": 150,
    "sentiment": "positive",
    "topics": ["security", "trust", "technology"],
    "confidence": 0.85
  },
  "metadata": {
    "model": "moonshot-v1-8k",
    "tokens_used": 200,
    "finish_reason": "stop",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## Response Analysis

The API automatically analyzes LLM responses and provides:

- **Word Count**: Number of words in the response
- **Sentiment**: Positive, negative, or neutral sentiment
- **Topics**: Extracted relevant topics from the response
- **Confidence**: Confidence score based on response quality

## Error Handling

The API includes comprehensive error handling:

- **400**: Invalid input (missing or invalid prompt)
- **401**: Authentication errors (invalid API key)
- **500**: Server errors (API failures, configuration issues)
- **404**: Route not found

## Security Features

- CORS protection for frontend integration
- Input validation and sanitization
- Environment variable protection
- Error message sanitization
- Request logging for monitoring

## Integration with Frontend

The backend is designed to work with the TrustOS React frontend. Make sure both servers are running:

- Frontend: `http://localhost:5174`
- Backend: `http://localhost:3000`

## Project Structure

```
backend/
├── src/
│   └── server.ts          # Main server file
├── dist/                  # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
├── .env                   # Environment variables
└── README.md
```

## Development Notes

- The server uses ES modules (`"type": "module"`)
- TypeScript is configured for modern Node.js
- Hot reload is enabled in development mode
- All API responses include proper error handling 