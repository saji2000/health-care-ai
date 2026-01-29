# Health Care AI, Technical Overview

## Architecture

The app has two tiers: a Go backend and a React frontend.

**Backend (Go + Chi):** Simple HTTP server with packages for handlers, models, and services. Chi is a lightweight router that works well with Go's standard library.

**Frontend (React + Vite):** Fast development with built-in proxy for the backend. A single form and result display—no complex state management needed yet.

**No database:** Requests aren't stored. This can be added later without changing the current code.

## Data Flow

1. User submits form with health info
2. Frontend sends POST request to backend `/api/diagnose`
3. Backend validates input, calls OpenAI API, and returns diagnosis + remedies
4. Frontend displays the result

## Error Handling

- Backend validates all fields before calling OpenAI
- OpenAI API errors are returned to the frontend as 500 errors
- Frontend shows error messages to the user and prevents duplicate submissions

## Security

- OpenAI API key is stored in `.env` (not in version control)
- Server only listens on localhost
- CORS is set to allow only localhost
- No authentication yet (OK for local dev, needs to be added for deployment)

## Future Improvements

- Add a database to store requests
- Add rate limiting to prevent abuse
- Add authentication for production
- Containerize with Docker
- Add unit and integration tests
