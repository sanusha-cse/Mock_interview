import bcrypt from 'bcryptjs';
import { dataService } from '../services/dataService.js';
import { generateToken } from '../middleware/auth.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, targetCompany, experienceLevel } = req.body;

    const existingUser = await dataService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please log in.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await dataService.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: 'user', // Default role
      title: 'Interview Candidate',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      targetCompany: targetCompany || 'FAANG / Tier-1 Tech',
      experienceLevel: experienceLevel || 'Mid-Level',
    });

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to MockInterview.pro.',
      token,
      user: newUser,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await dataService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify credentials.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify credentials.',
      });
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await dataService.findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve profile.' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await dataService.findUserById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'The current password you provided is incorrect.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await dataService.updateUserPassword(user._id || user.id, hashedPassword);

    res.json({
      success: true,
      message: 'Password changed successfully! You can now use your new password.',
    });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ success: false, message: 'Server error while updating password.' });
  }
};

export const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
};
