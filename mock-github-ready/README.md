# Mock Interview Booking System

A full-stack mock interview booking app with a React/Vite client and an Express API. The server uses MongoDB when available and falls back to its in-memory seed data when MongoDB is unavailable.

## Prerequisites

- Node.js 22.12 or later (npm is included with Node.js). The Vite version in this project requires a recent Node.js release.
- MongoDB local or MongoDB Atlas is optional. Without a connection, the server uses in-memory seed data; changes will not persist after restarting the server.

## Setup

From the repository root, install both applications:

```bash
npm run install:all
```

Create the server environment file:

**Windows PowerShell**

```powershell
Copy-Item server/.env.example server/.env
```

**macOS/Linux**

```bash
cp server/.env.example server/.env
```

Edit `server/.env` if you want to use MongoDB. Keep this real `.env` file private. `MONGODB_URI` defaults to a local MongoDB URL, and the in-memory fallback works if MongoDB is not running. Set `JWT_SECRET` to a long, private random value before using the app beyond local evaluation.

## Run the app

From the repository root:

```bash
npm run dev
```

The Vite client is at <http://localhost:5173>. The API listens on port 5000; check <http://localhost:5000/api/health> for server status and database mode. The client proxies `/api` requests to the local API.

Alternatively, start the backend and frontend in separate terminals from the repository root:

```bash
npm run dev:server
```

```bash
npm run dev:client
```

## Fresh clone check

```bash
git clone <YOUR_REPOSITORY_URL>
cd <repository-folder>
npm run install:all
```

Then copy `server/.env.example` to `server/.env` using the command for your operating system above, and run `npm run dev`. Confirm the UI opens at port 5173 and `/api/health` reports the API online. If MongoDB is configured, confirm the health response reports a live MongoDB connection; otherwise the app should report its in-memory mode.

