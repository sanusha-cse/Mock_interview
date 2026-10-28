import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  CalendarCheck,
  Calendar,
  Clock,
  Building,
  Award,
  Link2,
  FileText,
  UserCheck,
  Zap,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const BookInterviewPage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [tracks] = useState([
    'System Design & Architecture',
    'Data Structures & Algorithms',
    'Full Stack Web (MERN)',
    'Frontend Engineering',
    'Machine Learning & AI',
    'Engineering Management & Behavioral',
  ]);

  const [companies] = useState([
    'Google',
    'Meta',
    'Amazon',
    'Netflix',
    'Apple',
    'OpenAI',
    'Stripe',
    'Uber',
    'Microsoft',
  ]);

  const [timeSlots] = useState([
    '09:00 AM - 10:00 AM EST',
    '11:00 AM - 12:00 PM EST',
    '02:00 PM - 03:00 PM EST',
    '04:00 PM - 05:00 PM EST',
    '07:00 PM - 08:00 PM EST',
  ]);

  const [interviewers, setInterviewers] = useState([]);

  // Tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    interviewTrack: 'System Design & Architecture',
    targetCompany: user?.targetCompany || 'Google',
    difficulty: user?.experienceLevel || 'Senior L5',
    date: defaultDate,
    timeSlot: '02:00 PM - 03:00 PM EST',
    interviewerName: '',
    resumeUrl: '',
    candidateNotes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successBooking, setSuccessBooking] = useState(null);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const res = await api.getMetadata();
        if (res.interviewers) {
          setInterviewers(res.interviewers);
          if (res.interviewers.length > 0) {
            setFormData((prev) => ({ ...prev, interviewerName: res.interviewers[0].name }));
          }
        }
      } catch (err) {
        console.warn('Metadata fetch error', err);
      }
    };
    loadMetadata();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await api.createBooking(formData);
      setSuccessBooking(res.booking);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#7928ca', '#10b981', '#f59e0b'],
        });
      } catch (cErr) {}

      setTimeout(() => {
        if (isAdmin) {
          navigate('/admin/operations');
        } else {
          navigate('/dashboard');
        }
      }, 2500);
    } catch (err) {
      setError(err.message || 'Failed to reserve mock session');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-4 py-lg-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="glass-panel p-4 p-md-5 shadow-lg border border-secondary border-opacity-25">
              {/* Header */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-primary bg-opacity-20 text-info font-mono">RESERVATION ENGINE</span>
                  <span className="text-muted font-mono small">Step 1 of 1 • Instant Confirmation</span>
                </div>
                <h1 className="h3 font-display text-white fw-bold mb-1">Book a Calibrated Mock Interview</h1>
                <p className="text-muted small mb-0">
                  Select your target domain and schedule your session with a verified Staff Engineer.
                </p>
              </div>

              {/* Success Banner */}
              {successBooking && (
                <div className="alert alert-success font-mono p-4 mb-4" role="alert">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <CheckCircle size={20} className="text-success" />
                    <h5 className="mb-0 text-white fw-bold">Mock Interview Reserved!</h5>
                  </div>
                  <p className="small mb-2">
                    Session booked for <strong>{successBooking.date}</strong> at <strong>{successBooking.timeSlot}</strong>.
                    Redirecting to your dashboard...
                  </p>
                </div>
              )}

              {/* Error Banner */}
              {error && (
                <div className="alert alert-danger font-mono text-sm d-flex align-items-center gap-2 mb-4" role="alert">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Track Selection */}
                  <div className="col-md-6">
                    <label className="form-label text-light text-sm fw-medium">Interview Track *</label>
                    <select
                      className="form-select glass-select"
                      name="interviewTrack"
                      value={formData.interviewTrack}
                      onChange={handleChange}
                      required
                    >
                      {tracks.map((t, idx) => (
                        <option key={idx} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Target Company */}
                  <div className="col-md-6">
                    <label className="form-label text-light text-sm fw-medium">Target Company *</label>
                    <select
                      className="form-select glass-select"
                      name="targetCompany"
                      value={formData.targetCompany}
                      onChange={handleChange}
                      required
                    >
                      {companies.map((c, idx) => (
                        <option key={idx} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div className="col-md-6">
                    <label className="form-label text-light text-sm fw-medium">Seniority / Difficulty Level</label>
                    <select
                      className="form-select glass-select"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                    >
                      <option value="Entry L3">Entry L3 (Junior SWE / Associate)</option>
                      <option value="Standard L4">Standard L4 (Mid-Level Engineer)</option>
                      <option value="Senior L5">Senior L5 (Senior SWE / Tech Lead)</option>
                      <option value="Staff L6">Staff L6 (Principal / Architect)</option>
                    </select>
                  </div>

                  {/* Assigned Interviewer */}
                  <div className="col-md-6">
                    <label className="form-label text-light text-sm fw-medium">Preferred Evaluator</label>
                    <select
                      className="form-select glass-select"
                      name="interviewerName"
                      value={formData.interviewerName}
                      onChange={handleChange}
                    >
                      {interviewers.map((i, idx) => (
                        <option key={idx} value={i.name}>
                          {i.name} ({i.company} - {i.specialty})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Picker */}
                  <div className="col-md-6">
                    <label className="form-label text-light text-sm fw-medium">Session Date *</label>
                    <div className="input-group">
                      <span className="input-group-text glass-input border-end-0">
                        <Calendar size={16} className="text-muted" />
                      </span>
                      <input
                        type="date"
                        className="form-control glass-input border-start-0"
                        name="date"
                        value={formData.date}
                        min={defaultDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Time Slot Picker */}
                  <div className="col-md-6">
                    <label className="form-label text-light text-sm fw-medium">Preferred Time Slot *</label>
                    <div className="input-group">
                      <span className="input-group-text glass-input border-end-0">
                        <Clock size={16} className="text-muted" />
                      </span>
                      <select
                        className="form-select glass-select border-start-0"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        required
                      >
                        {timeSlots.map((ts, idx) => (
                          <option key={idx} value={ts}>
                            {ts}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Resume / Portfolio Link */}
                  <div className="col-12">
                    <label className="form-label text-light text-sm fw-medium">Resume or Portfolio Link (Optional)</label>
                    <div className="input-group">
                      <span className="input-group-text glass-input border-end-0">
                        <Link2 size={16} className="text-muted" />
                      </span>
                      <input
                        type="url"
                        className="form-control glass-input border-start-0 font-mono text-sm"
                        name="resumeUrl"
                        placeholder="https://drive.google.com/... or GitHub link"
                        value={formData.resumeUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Candidate Specific Notes */}
                  <div className="col-12">
                    <label className="form-label text-light text-sm fw-medium">
                      What specific areas would you like the interviewer to stress-test?
                    </label>
                    <textarea
                      className="form-control glass-input"
                      rows="3"
                      name="candidateNotes"
                      placeholder="e.g., Focus on distributed transactions, cache invalidation, and answering under tight 45-minute constraints..."
                      value={formData.candidateNotes}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
                  <div className="text-muted font-mono text-xs">
                    ⚡ Instant Room URL & Calendar Invite generated upon reservation
                  </div>

                  <button
                    type="submit"
                    className="btn btn-tech-primary px-4 py-2.5 d-flex align-items-center gap-2"
                    disabled={submitting || successBooking !== null}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>
                        <span>Reserving Slot...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={18} />
                        <span>Confirm & Reserve Session</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
