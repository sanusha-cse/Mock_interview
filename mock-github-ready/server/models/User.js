import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    title: {
      type: String,
      default: 'Interview Candidate',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    phone: {
      type: String,
      default: '',
    },
    targetCompany: {
      type: String,
      default: 'Tech Industry',
    },
    experienceLevel: {
      type: String,
      enum: ['Entry', 'Mid-Level', 'Senior L5', 'Staff L6', 'Principal'],
      default: 'Mid-Level',
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
