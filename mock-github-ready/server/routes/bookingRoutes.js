import express from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getMetadata,
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/metadata', getMetadata);

// Protected routes
router.use(protect);

router.get('/', getBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);

// Admin-only consolidated operations: Update and Delete records
router.put('/:id', authorize('admin'), updateBooking);
router.delete('/:id', authorize('admin'), deleteBooking);

export default router;
