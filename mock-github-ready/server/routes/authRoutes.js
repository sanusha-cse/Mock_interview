import express from 'express';
import {
  register,
  login,
  getMe,
  changePassword,
  logout,
} from '../controllers/authController.js';
import {
  validateRegister,
  validateLogin,
  validatePasswordChange,
} from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.post('/change-password', protect, validatePasswordChange, changePassword);

export default router;
