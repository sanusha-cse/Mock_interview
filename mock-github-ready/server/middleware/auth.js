import jwt from 'jsonwebtoken';
import { dataService } from '../services/dataService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_mock_interview_jwt_key_2026_xyz987';

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: Access token is missing.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await dataService.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      });
    }

    req.user = {
      _id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      title: user.title,
      avatar: user.avatar,
    };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: Invalid or expired token.',
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role '${req.user?.role || 'guest'}' is not entitled to perform this action. Required: [${roles.join(', ')}]`,
      });
    }
    next();
  };
};
