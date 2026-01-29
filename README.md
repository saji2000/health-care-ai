# Health Care AI

A simple web app that uses AI to provide health insights based on patient information.

## What It Does

Enter your health info (age, weight, height, symptoms), and the app will:
- Analyze your information
- Use OpenAI to generate a diagnosis
- Suggest remedies and next steps

## Quick Start

### Prerequisites
- Go 1.20+ (for backend)
- Node.js 16+ (for frontend)
- OpenAI API key

### Setup

1. **Backend:**
   ```bash
   cd backend
   echo "OPENAI_API_KEY=your_key_here" > .env
   go run cmd/server/main.go
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser

## Project Structure

- `backend/` — Go HTTP server that handles form submissions and calls OpenAI
- `frontend/` — React app with form and results display
- `ARCHITECTURE.md` — How the app is built and organized

## How It Works

1. Fill out the form with your health details
2. Click submit
3. Backend validates your input and asks OpenAI for a diagnosis
4. Results appear on screen

## Important Notes

- This is an MVP (minimum viable product)
- Data is not stored—each request is independent
- For production use, add authentication, rate limiting, and a database
- See `ARCHITECTURE.md` for technical details
