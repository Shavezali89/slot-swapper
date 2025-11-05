# SlotSwapper

A Small, production-minded implementation of the ServiceHive SDE challenge: a peer-to-peer time-slot swapping app.

## What you get
- Backend: Node.js + Express + SQLite (Sequelize ORM)
  - JWT auth (`/api/auth`)
  - Events CRUD (`/api/events`)
  - Swap logic and endpoints (`/api/swappable-slots`, `/api/swap-request`, `/api/swap-response/:id`, `/api/requests`)
- Frontend: React (Vite) simple UI to demo flows: login/signup, dashboard, marketplace, incoming/outgoing requests.
- Seed script with sample users: `alice@example.com` / `alice123` and `bob@example.com` / `bob123`.
- Simple instructions to run locally and deploy.

## How to run locally (quick)
1. Backend:
   ```bash
   cd backend
   npm install
   npm run seed    # creates database + sample users/events
   npm start
   ```
   Backend runs on port 4000.

2. Frontend (in separate terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on port 3000. Visit http://localhost:3000

## Notes for reviewers / design choices
- SQLite chosen for zero-config demo — fast to spin up, good for tests and code review.
- Swap logic uses DB transaction and row locks to ensure safe owner swap and prevent race conditions.
- API uses standard REST and JWT Bearer tokens for auth. Token lifetime 7 days (configurable via env var).
- The app favors clarity and correctness over bells-and-whistles — UI is intentionally simple and professional.

## Deploy tips
- Backend can be deployed to Render/Heroku by setting `NODE_ENV=production` and optionally `DATABASE_URL` (switch to Postgres).
- Frontend can be deployed on Vercel; set the frontend environment variable `REACT_APP_API_URL` to your backend URL.

## Files included
- backend/ (server + models + seed)
- frontend/ (vite + react)
- README.md

