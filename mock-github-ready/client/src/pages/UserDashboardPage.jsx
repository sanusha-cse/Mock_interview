import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { ScorecardModal } from '../components/ScorecardModal';
import {
  Layers,
  Calendar,
  Clock,
  ExternalLink,
  Award,
  Video,
  ShieldCheck,
  Plus,
  Star,
  FileText,
  Building,
} from 'lucide-react';

export const UserDashboardPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScorecardBooking, setSelectedScorecardBooking] = useState(null);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        setLoading(true);
        const res = await api.getBookings();
        setBookings(res.bookings || []);
      } catch (err) {
        console.warn('Failed to load candidate bookings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  const upcoming = bookings.filter((b) => b.status === 'Confirmed');
  const completed = bookings.filter((b) => b.status === 'Completed');
  const pending = bookings.filter((b) => b.status === 'Pending');

  return (
    <div className="py-4 py-lg-5">
      <div className="container-fluid px-lg-4">
        {/* Candidate Profile Bar */}
        <div className="glass-panel p-4 mb-4 shadow-lg border border-secondary border-opacity-25">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80'}
                alt={user?.name}
                className="rounded-circle"
                style={{ width: 56, height: 56, objectFit: 'cover', border: '2px solid rgba(0, 242, 254, 0.4)' }}
              />
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h2 className="h4 font-display text-white fw-bold mb-0">Welcome, {user?.name}</h2>
                  <span className="badge-role-user">Candidate Portal</span>
                </div>
                <div className="d-flex flex-wrap gap-2 text-muted small font-mono">
                  <span>Target: <strong className="text-info">{user?.targetCompany || 'Google / Meta'}</strong></span>
                  <span>• Level: <strong className="text-light">{user?.experienceLevel || 'Senior L5'}</strong></span>
                </div>
              </div>
            </div>

            <Link to="/book" className="btn btn-tech-primary d-flex align-items-center gap-2 py-2 px-3.5">
              <Plus size={18} />
              <span>Book Mock Session</span>
            </Link>
          </div>
        </div>

        {/* Entitlement Security Notice (Explicit user requirement) */}
        <div className="p-3 rounded-3 mb-4 d-flex align-items-center gap-2" style={{ background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
          <ShieldCheck size={18} className="text-info flex-shrink-0" />
          <div className="text-light text-xs font-mono">
            <strong>Entitled Data Isolation Active:</strong> As a Normal User, you have view-only access exclusively to your personal interview bookings and scorecards. Administrative operations are isolated.
          </div>
        </div>

        {/* Stats Strip */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="glass-panel p-3.5">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted font-mono text-xs text-uppercase mb-1">Upcoming Confirmed</div>
                  <div className="h3 font-display fw-bold text-success mb-0">{upcoming.length}</div>
                </div>
                <div className="p-2.5 rounded-3 bg-success bg-opacity-15 text-success">
                  <Calendar size={22} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-panel p-3.5">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted font-mono text-xs text-uppercase mb-1">Evaluated / Completed</div>
                  <div className="h3 font-display fw-bold text-info mb-0">{completed.length}</div>
                </div>
                <div className="p-2.5 rounded-3 bg-info bg-opacity-15 text-info">
                  <Award size={22} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-panel p-3.5">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted font-mono text-xs text-uppercase mb-1">Pending Approval</div>
                  <div className="h3 font-display fw-bold text-warning mb-0">{pending.length}</div>
                </div>
                <div className="p-2.5 rounded-3 bg-warning bg-opacity-15 text-warning">
                  <Clock size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Sessions List (View-Only Entitlement) */}
        <div className="glass-panel p-4 shadow-lg mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="h5 font-display text-white fw-bold mb-0">My Entitled Mock Sessions</h3>
              <p className="text-muted small mb-0">View-only access to your active and completed mock bookings</p>
            </div>
            <span className="badge bg-secondary font-mono">{bookings.length} Records</span>
          </div>

          {loading ? (
            <div className="text-center py-5 text-muted font-mono">
              <div className="spinner-border spinner-border-sm text-info me-2"></div>
              Loading your confidential sessions...
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-5">
              <div className="text-muted mb-3 font-mono">You haven't booked any mock interview sessions yet.</div>
              <Link to="/book" className="btn btn-tech-primary">
                Book Your First Diagnostic Mock
              </Link>
            </div>
          ) : (
            <div className="row g-3">
              {bookings.map((booking) => (
                <div className="col-lg-6" key={booking._id}>
                  <div className="glass-panel-interactive p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                      {/* Top Badges */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-info bg-opacity-15 text-info font-mono">
                            {booking.targetCompany}
                          </span>
                          <span className="badge bg-white bg-opacity-5 text-secondary font-mono" style={{ fontSize: '0.68rem' }}>
                            {booking.difficulty || 'Senior L5'}
                          </span>
                        </div>
                        <StatusBadge status={booking.status} />
                      </div>

                      {/* Track Title */}
                      <h4 className="h5 text-white font-display fw-bold mb-2">
                        {booking.interviewTrack}
                      </h4>

                      {/* Schedule info */}
                      <div className="d-flex flex-wrap gap-3 text-muted text-xs font-mono mb-3">
                        <span className="d-flex align-items-center gap-1.5 text-light">
                          <Calendar size={14} className="text-info" /> {booking.date}
                        </span>
                        <span className="d-flex align-items-center gap-1.5 text-light">
                          <Clock size={14} className="text-warning" /> {booking.timeSlot}
                        </span>
                      </div>

                      {/* Interviewer */}
                      {booking.interviewer && (
                        <div className="p-2.5 rounded-3 mb-3 d-flex align-items-center gap-2.5" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                          <img
                            src={booking.interviewer.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'}
                            alt={booking.interviewer.name}
                            className="rounded-circle"
                            style={{ width: 34, height: 34, objectFit: 'cover' }}
                          />
                          <div>
                            <div className="text-white text-xs fw-semibold">{booking.interviewer.name}</div>
                            <div className="text-muted font-mono" style={{ fontSize: '0.68rem' }}>
                              {booking.interviewer.title} • {booking.interviewer.company}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Notes if provided */}
                      {booking.candidateNotes && (
                        <p className="text-muted small mb-3 fst-italic">
                          "{booking.candidateNotes}"
                        </p>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
                      {booking.scorecard ? (
                        <button
                          onClick={() => setSelectedScorecardBooking(booking)}
                          className="btn btn-sm btn-tech-secondary d-flex align-items-center gap-1.5 text-warning font-mono"
                        >
                          <Star size={14} fill="#f59e0b" />
                          <span>View Evaluation Scorecard ({booking.scorecard.overallRating?.toFixed(1) || '4.8'}★)</span>
                        </button>
                      ) : (
                        <span className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                          Evaluation pending post-session
                        </span>
                      )}

                      {booking.status === 'Confirmed' && booking.meetingLink && (
                        <a
                          href={booking.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-tech-primary d-flex align-items-center gap-1.5"
                        >
                          <Video size={14} />
                          <span>Enter Meeting Room</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scorecard Modal */}
        {selectedScorecardBooking && (
          <ScorecardModal
            booking={selectedScorecardBooking}
            onClose={() => setSelectedScorecardBooking(null)}
          />
        )}
      </div>
    </div>
  );
};
