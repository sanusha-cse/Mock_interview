import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import { seedMongoIfEmpty } from './services/dataService.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/stats', statsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Mock Interview Booking System (MERN)',
    timestamp: new Date().toISOString(),
    database: getDBStatus(),
  });
});

// Global 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Initialize server
const startServer = async () => {
  await connectDB();
  await seedMongoIfEmpty();

  app.listen(PORT, () => {
    console.log(`\x1b[35m===================================================\x1b[0m`);
    console.log(`\x1b[36m⚡ Mock Interview Booking API Server running on port ${PORT}\x1b[0m`);
    console.log(`\x1b[32m✔ Health Check: http://localhost:${PORT}/api/health\x1b[0m`);
    console.log(`\x1b[35m===================================================\x1b[0m`);
  });
};

startServer();
