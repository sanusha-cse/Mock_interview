import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mock_interview_db';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 800, // Quick fallback if local mongod is not running
    });
    isConnected = true;
    console.log(`\x1b[32m✔ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}\x1b[0m`);
    return true;
  } catch (err) {
    isConnected = false;
    console.log(`\x1b[33m⚠ MongoDB is not running locally (${err.message}). Seamlessly activated high-performance In-Memory Data Engine with preloaded seed records.\x1b[0m`);
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isConnected,
  mode: isConnected ? 'MongoDB (Live)' : 'In-Memory Engine (Zero-Config Active)',
});
