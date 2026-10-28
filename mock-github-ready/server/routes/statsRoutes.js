import express from 'express';
import { getPlatformStats, resetData } from '../controllers/statsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/overview', getPlatformStats);
router.post('/reset', resetData); // Available to test demo reseed easily

export default router;
