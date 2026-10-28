import React, { useState } from 'react';
import { Save, X, Calendar, Clock, Link2, Building, ShieldCheck } from 'lucide-react';

export const BookingEditModal = ({ booking, onClose, onSave, interviewers = [] }) => {
  if (!booking) return null;

  const [formData, setFormData] = useState({
    status: booking.status || 'Confirmed',
    date: booking.date || '',
    timeSlot: booking.timeSlot || '',
    targetCompany: booking.targetCompany || '',
    difficulty: booking.difficulty || 'Senior L5',
    meetingLink: booking.meetingLink || '',
    interviewerName: booking.interviewer?.name || '',
    adminNotes: booking.adminNotes || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        status: formData.status,
        date: formData.date,
        timeSlot: formData.timeSlot,
        targetCompany: formData.targetCompany,
        difficulty: formData.difficulty,
        meetingLink: formData.meetingLink,
        adminNotes: formData.adminNotes,
      };

      // Match interviewer if updated
      if (formData.interviewerName && interviewers.length > 0) {
        const found = interviewers.find(i => i.name === formData.interviewerName);
        if (found) {
          payload.interviewer = {
            name: found.name,
            title: found.title,
            company: found.company,
            avatar: found.avatar,
          };
        }
      }

      await onSave(booking._id, payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update booking');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content glass-modal border-0">
          <div className="modal-header border-bottom border-secondary border-opacity-25 p-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-warning bg-opacity-15 text-warning font-mono">ADMIN OPERATION</span>
                <span className="text-muted font-mono" style={{ fontSize: '0.8rem' }}>Record #{booking._id?.slice(-6)}</span>
              </div>
              <h4 className="modal-title font-display text-white fw-bold mb-0">
                Update Mock Booking: {booking.candidateName}
              </h4>
              <p className="text-muted small mb-0">{booking.interviewTrack}</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {error && (
                <div className="alert alert-danger font-mono text-sm mb-4" role="alert">
                  {error}
                </div>
              )}

              <div className="row g-3">
                {/* Status Selection */}
                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">Booking Status</label>
                  <select
                    className="form-select glass-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Confirmed">Confirmed (Approved)</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Completed">Completed (Evaluated)</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Target Company */}
                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">Target Company</label>
                  <input
                    type="text"
                    className="form-control glass-input"
                    name="targetCompany"
                    value={formData.targetCompany}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date */}
                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">Session Date</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <Calendar size={16} className="text-muted" />
                    </span>
                    <input
                      type="date"
                      className="form-control glass-input border-start-0"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Time Slot */}
                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">Time Slot</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <Clock size={16} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control glass-input border-start-0"
                      name="timeSlot"
                      value={formData.timeSlot}
                      placeholder="e.g. 02:00 PM - 03:00 PM EST"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Interviewer Assigned */}
                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">Assigned Interviewer</label>
                  <select
                    className="form-select glass-select"
                    name="interviewerName"
                    value={formData.interviewerName}
                    onChange={handleChange}
                  >
                    <option value="">Choose Interviewer...</option>
                    {interviewers.map((i, idx) => (
                      <option key={idx} value={i.name}>
                        {i.name} ({i.company} - {i.specialty})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level / Difficulty */}
                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">Difficulty Level</label>
                  <select
                    className="form-select glass-select"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    <option value="Entry L3">Entry L3 (Associate)</option>
                    <option value="Standard L4">Standard L4 (Mid-Level)</option>
                    <option value="Senior L5">Senior L5 (Senior SWE)</option>
                    <option value="Staff L6">Staff L6 (Staff Architect)</option>
                  </select>
                </div>

                {/* Meeting Link */}
                <div className="col-12">
                  <label className="form-label text-light text-sm fw-medium">Meeting Room URL</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <Link2 size={16} className="text-info" />
                    </span>
                    <input
                      type="url"
                      className="form-control glass-input border-start-0 font-mono text-sm"
                      name="meetingLink"
                      value={formData.meetingLink}
                      placeholder="https://meet.mockinterview.pro/..."
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Admin Internal Notes */}
                <div className="col-12">
                  <label className="form-label text-light text-sm fw-medium">Admin & Scheduling Notes</label>
                  <textarea
                    className="form-control glass-input"
                    rows="2"
                    name="adminNotes"
                    value={formData.adminNotes}
                    placeholder="Internal notes or interviewer briefing remarks..."
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top border-secondary border-opacity-25 p-3">
              <button type="button" className="btn btn-tech-secondary px-4" onClick={onClose} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className="btn btn-tech-primary px-4" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
