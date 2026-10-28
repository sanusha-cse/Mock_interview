import bcrypt from 'bcryptjs';
import { dataService } from '../services/dataService.js';
import { isValidEmail, checkPasswordStrength } from '../middleware/validate.js';

export const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;
    let users = await dataService.findUsers(role ? { role } : {});

    if (search) {
      const q = search.toLowerCase();
      users = users.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.targetCompany && u.targetCompany.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch users.' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await dataService.findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve user.' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, title, targetCompany, experienceLevel, phone } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Valid email is required.' });
    }

    const existing = await dataService.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, message: 'A user with this email already exists.' });
    }

    const defaultPwd = password || 'TempPass@2026';
    const pwdCheck = checkPasswordStrength(defaultPwd);
    if (!pwdCheck.valid) {
      return res.status(400).json({ success: false, message: pwdCheck.errors[0] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPwd, salt);

    const newUser = await dataService.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user',
      title: title || (role === 'admin' ? 'Platform Administrator' : 'Candidate'),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      targetCompany: targetCompany || 'FAANG',
      experienceLevel: experienceLevel || 'Mid-Level',
      phone: phone || '',
    });

    res.status(201).json({
      success: true,
      message: `User '${newUser.name}' created successfully with role: ${newUser.role}.`,
      user: newUser,
    });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ success: false, message: 'Failed to create user.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, title, targetCompany, experienceLevel, phone } = req.body;

    const existing = await dataService.findUserById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Check if new email conflicts with another user
    if (email && email.toLowerCase() !== existing.email.toLowerCase()) {
      if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
      }
      const duplicate = await dataService.findUserByEmail(email);
      if (duplicate && (duplicate._id || duplicate.id) !== id) {
        return res.status(409).json({ success: false, message: 'Email is already used by another user.' });
      }
    }

    const updatePayload = {};
    if (name) updatePayload.name = name.trim();
    if (email) updatePayload.email = email.trim().toLowerCase();
    if (role && ['admin', 'user'].includes(role)) updatePayload.role = role;
    if (title !== undefined) updatePayload.title = title;
    if (targetCompany !== undefined) updatePayload.targetCompany = targetCompany;
    if (experienceLevel !== undefined) updatePayload.experienceLevel = experienceLevel;
    if (phone !== undefined) updatePayload.phone = phone;

    const updated = await dataService.updateUser(id, updatePayload);

    res.json({
      success: true,
      message: 'User details updated successfully.',
      user: updated,
    });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ success: false, message: 'Failed to update user.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Safety: Admin cannot delete themselves while logged in
    if (req.user._id === id || req.user.id === id) {
      return res.status(400).json({
        success: false,
        message: 'Security policy: You cannot delete your own active administrator account.',
      });
    }

    const user = await dataService.findUserById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    await dataService.deleteUser(id);

    res.json({
      success: true,
      message: `User '${user.name}' and all associated bookings were permanently removed.`,
    });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete user.' });
  }
};
