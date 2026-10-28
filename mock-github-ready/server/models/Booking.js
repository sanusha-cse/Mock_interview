import mongoose from 'mongoose';

const scorecardSchema = new mongoose.Schema({
  problemSolving: { type: Number, min: 1, max: 10 },
  systemArchitecture: { type: Number, min: 1, max: 10 },
  codingProficiency: { type: Number, min: 1, max: 10 },
  communication: { type: Number, min: 1, max: 10 },
  overallRating: { type: Number, min: 1, max: 5 },
  hireRecommendation: {
    type: String,
    enum: ['Strong Hire', 'Hire', 'Lean Hire', 'No Hire'],
  },
  strengths: [String],
  areasOfImprovement: [String],
  interviewerSummary: String,
});

const bookingSchema = new mongoose.Schema(
  {
    candidateId: {
      type: String,
      required: true,
      ref: 'User',
    },
    candidateName: {
      type: String,
      required: true,
    },
    candidateEmail: {
      type: String,
      required: true,
    },
    interviewTrack: {
      type: String,
      required: true,
    },
    targetCompany: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      default: 'Senior L5',
    },
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    interviewer: {
      name: { type: String, default: 'FAANG Veteran Interviewer' },
      title: { type: String, default: 'Senior Staff Engineer' },
      company: { type: String, default: 'Google / Meta / AWS' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    },
    meetingLink: {
      type: String,
      default: 'https://meet.mockinterview.pro/room-default',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Confirmed',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    candidateNotes: {
      type: String,
      default: '',
    },
    scorecard: {
      type: scorecardSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
