import { dataService } from '../services/dataService.js';
import { verifiedInterviewers } from '../data/seedData.js';

export const getBookings = async (req, res) => {
  try {
    const { status, track, search } = req.query;
    const filter = {};

    // Role-based entitlement: Normal users ONLY see their own records
    if (req.user.role !== 'admin') {
      filter.candidateId = req.user._id || req.user.id;
    }

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (track && track !== 'All') {
      filter.interviewTrack = track;
    }

    let bookings = await dataService.findBookings(filter);

    // Optional search across candidate, track, interviewer, company
    if (search) {
      const q = search.toLowerCase();
      bookings = bookings.filter(
        b =>
          b.candidateName?.toLowerCase().includes(q) ||
          b.candidateEmail?.toLowerCase().includes(q) ||
          b.interviewTrack?.toLowerCase().includes(q) ||
          b.targetCompany?.toLowerCase().includes(q) ||
          b.interviewer?.name?.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: bookings.length,
      userRole: req.user.role,
      bookings,
    });
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve bookings.' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await dataService.findBookingById(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Interview booking not found.' });
    }

    // Role-based entitlement verification:
    if (req.user.role !== 'admin' && booking.candidateId !== (req.user._id || req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not entitled to view this booking record.',
      });
    }

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve booking.' });
  }
};

export const createBooking = async (req, res) => {
  try {
    const {
      interviewTrack,
      targetCompany,
      difficulty,
      date,
      timeSlot,
      resumeUrl,
      candidateNotes,
      interviewerName,
    } = req.body;

    if (!interviewTrack || !targetCompany || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Interview track, target company, date, and time slot are required.',
      });
    }

    // Pick interviewer from verified pool or default
    let selectedInterviewer = verifiedInterviewers[0];
    if (interviewerName) {
      const found = verifiedInterviewers.find(i => i.name.toLowerCase() === interviewerName.toLowerCase());
      if (found) selectedInterviewer = found;
    } else {
      // Pick based on track
      if (interviewTrack.includes('Frontend')) {
        selectedInterviewer = verifiedInterviewers[2];
      } else if (interviewTrack.includes('AI') || interviewTrack.includes('Machine Learning')) {
        selectedInterviewer = verifiedInterviewers[3];
      } else if (interviewTrack.includes('Algorithms') || interviewTrack.includes('Behavioral')) {
        selectedInterviewer = verifiedInterviewers[1];
      } else {
        selectedInterviewer = verifiedInterviewers[0];
      }
    }

    const roomId = 'room-' + Math.random().toString(36).substring(2, 9);

    const bookingPayload = {
      candidateId: req.user._id || req.user.id,
      candidateName: req.user.name,
      candidateEmail: req.user.email,
      interviewTrack,
      targetCompany,
      difficulty: difficulty || 'Senior L5',
      date,
      timeSlot,
      interviewer: {
        name: selectedInterviewer.name,
        title: selectedInterviewer.title,
        company: selectedInterviewer.company,
        avatar: selectedInterviewer.avatar,
      },
      meetingLink: `https://meet.mockinterview.pro/${roomId}`,
      status: 'Confirmed',
      resumeUrl: resumeUrl || '',
      candidateNotes: candidateNotes || '',
      scorecard: null,
    };

    const newBooking = await dataService.createBooking(bookingPayload);

    res.status(201).json({
      success: true,
      message: `Mock interview booked successfully for ${date} (${timeSlot})!`,
      booking: newBooking,
    });
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ success: false, message: 'Failed to create booking.' });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await dataService.findBookingById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    // Admin Consolidated Operations: Update functionality
    const {
      status,
      date,
      timeSlot,
      interviewTrack,
      targetCompany,
      difficulty,
      meetingLink,
      interviewer,
      scorecard,
      adminNotes,
    } = req.body;

    const updatePayload = {};
    if (status) updatePayload.status = status;
    if (date) updatePayload.date = date;
    if (timeSlot) updatePayload.timeSlot = timeSlot;
    if (interviewTrack) updatePayload.interviewTrack = interviewTrack;
    if (targetCompany) updatePayload.targetCompany = targetCompany;
    if (difficulty) updatePayload.difficulty = difficulty;
    if (meetingLink) updatePayload.meetingLink = meetingLink;
    if (interviewer) updatePayload.interviewer = interviewer;
    if (scorecard !== undefined) updatePayload.scorecard = scorecard;
    if (adminNotes !== undefined) updatePayload.adminNotes = adminNotes;

    const updated = await dataService.updateBooking(id, updatePayload);

    res.json({
      success: true,
      message: `Booking #${id.slice(-6)} updated successfully.`,
      booking: updated,
    });
  } catch (err) {
    console.error('Update booking error:', err);
    res.status(500).json({ success: false, message: 'Failed to update booking.' });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await dataService.findBookingById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    await dataService.deleteBooking(id);

    res.json({
      success: true,
      message: `Booking record #${id.slice(-6)} (${existing.interviewTrack}) was successfully deleted.`,
    });
  } catch (err) {
    console.error('Delete booking error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete booking.' });
  }
};

export const getMetadata = (req, res) => {
  res.json({
    success: true,
    interviewers: verifiedInterviewers,
  });
};
