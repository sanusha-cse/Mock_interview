// Validation helpers
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email.trim());
};

export const checkPasswordStrength = (password) => {
  const errors = [];
  if (!password || typeof password !== 'string') {
    return { valid: false, errors: ['Password is required'] };
  }
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must include at least one uppercase letter (A-Z)');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must include at least one lowercase letter (a-z)');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must include at least one number (0-9)');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must include at least one special character (!@#$%^&*...)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Full Name is required.' });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' });
  }

  const pwdCheck = checkPasswordStrength(password);
  if (!pwdCheck.valid) {
    return res.status(400).json({
      success: false,
      message: pwdCheck.errors[0],
      details: pwdCheck.errors,
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required.' });
  }

  next();
};

export const validatePasswordChange = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).json({ success: false, message: 'Current password is required.' });
  }

  const pwdCheck = checkPasswordStrength(newPassword);
  if (!pwdCheck.valid) {
    return res.status(400).json({
      success: false,
      message: pwdCheck.errors[0],
      details: pwdCheck.errors,
    });
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({
      success: false,
      message: 'New password must be different from current password.',
    });
  }

  next();
};
