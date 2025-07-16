# TrustOS Full-Stack Application

A modern fintech webapp with LLM integration, built with React frontend and Node.js backend.

## 🏗️ Project Structure

```
Fintech3/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Node.js + Express backend
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Moonshot API key (for LLM integration)

### 1. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```bash
MOONSHOT_API_KEY=your_moonshot_api_key_here
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5174
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Run Both Servers

**Option A: Two Terminals (Recommended)**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

**Option B: Background Process**
```bash
# Start backend in background
cd backend && npm run dev &

# Start frontend
cd frontend && npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

## ✨ Features

### Frontend
- 🎨 Modern responsive design with dark/light mode
- 📱 Mobile-first responsive layout
- 🔄 React Router navigation
- 🎯 Interactive demo page with LLM chat
- 🌈 Beautiful gradient backgrounds

### Backend
- 🤖 LLM integration with Moonshot AI
- 📊 Automatic response analysis
- 🔒 CORS protection and security
- 📝 TypeScript with full type safety
- 🏥 Health monitoring endpoints

## 🧪 Testing the LLM Integration

1. Make sure both servers are running
2. Visit http://localhost:5174/demo
3. Scroll down to "LLM Chat Demo"
4. Enter a prompt about digital trust or security
5. View the AI response with analysis

## 📦 Deployment

### Frontend (Vercel)
The frontend is configured for Vercel deployment with `vercel.json`.

### Backend (Railway/Heroku)
The backend can be deployed to any Node.js hosting platform.

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev    # Development server
npm run build  # Production build
```

### Backend Development
```bash
cd backend
npm run dev    # Development server with hot reload
npm run build  # TypeScript compilation
npm start      # Production server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.