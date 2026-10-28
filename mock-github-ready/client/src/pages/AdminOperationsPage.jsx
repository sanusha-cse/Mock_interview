import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { ScorecardModal } from '../components/ScorecardModal';
import { BookingEditModal } from '../components/BookingEditModal';
import {
  Shield,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  RotateCcw,
  Plus,
  Calendar,
  AlertTriangle,
  User,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminOperationsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [trackFilter, setTrackFilter] = useState('All');

  // Modals state
  const [selectedScorecardBooking, setSelectedScorecardBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [deletingBooking, setDeletingBooking] = useState(null);
  const [interviewers, setInterviewers] = useState([]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.getBookings({
        search,
        status: statusFilter,
        track: trackFilter,
      });
      setBookings(res.bookings || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchMetadata = async () => {
    try {
      const res = await api.getMetadata();
      if (res.interviewers) setInterviewers(res.interviewers);
    } catch (err) {
      console.warn('Metadata error', err);
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [search, statusFilter, trackFilter]);

  const handleUpdateSave = async (id, payload) => {
    try {
      const res = await api.updateBooking(id, payload);
      setNotification(`✔ Record #${id.slice(-6)} successfully updated!`);
      setTimeout(() => setNotification(''), 4000);
      fetchBookings();
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBooking) return;
    try {
      await api.deleteBooking(deletingBooking._id);
      setNotification(`🗑 Booking #${deletingBooking._id.slice(-6)} was removed.`);
      setTimeout(() => setNotification(''), 4000);
      setDeletingBooking(null);
      fetchBookings();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleResetData = async () => {
    if (window.confirm('Reset all mock bookings and users to initial verified test records?')) {
      try {
        await api.resetDatabase();
        setNotification('🌱 Database restored to default seed records.');
        setTimeout(() => setNotification(''), 4000);
        fetchBookings();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Metrics calculation
  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
  const pending = bookings.filter((b) => b.status === 'Pending').length;
  const completed = bookings.filter((b) => b.status === 'Completed').length;
  const cancelled = bookings.filter((b) => b.status === 'Cancelled').length;

  return (
    <div className="py-4 py-lg-5">
      <div className="container-fluid px-lg-4">
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-warning bg-opacity-20 text-warning font-mono">ADMINISTRATOR COMMAND</span>
              <span className="text-muted font-mono small">• Consolidated Records Console</span>
            </div>
            <h1 className="h2 font-display text-white fw-bold mb-0">Consolidated Operations Page</h1>
            <p className="text-muted small mb-0">
              Complete administrative authority: Display all records, update schedules/interviewers, and delete bookings.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={handleResetData}
              className="btn btn-sm btn-tech-secondary d-flex align-items-center gap-1.5"
              title="Reset data to clean demo state"
            >
              <RotateCcw size={15} />
              <span>Reset Demo Seed</span>
            </button>
            <Link to="/book" className="btn btn-sm btn-tech-primary d-flex align-items-center gap-1.5">
              <Plus size={16} />
              <span>Provision Booking</span>
            </Link>
          </div>
        </div>

        {/* Real-time Notification Banner */}
        {notification && (
          <div className="alert alert-success font-mono text-sm d-flex align-items-center gap-2 mb-4" role="alert">
            <CheckCircle size={16} />
            <div>{notification}</div>
          </div>
        )}

        {/* Metrics Summary Strip */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3 col-xl">
            <div className="glass-panel p-3">
              <div className="text-muted font-mono text-xs text-uppercase mb-1">Total Records</div>
              <div className="h3 font-display fw-bold text-white mb-0">{total}</div>
            </div>
          </div>
          <div className="col-6 col-md-3 col-xl">
            <div className="glass-panel p-3">
              <div className="text-success font-mono text-xs text-uppercase mb-1">Confirmed</div>
              <div className="h3 font-display fw-bold text-success mb-0">{confirmed}</div>
            </div>
          </div>
          <div className="col-6 col-md-3 col-xl">
            <div className="glass-panel p-3">
              <div className="text-warning font-mono text-xs text-uppercase mb-1">Pending</div>
              <div className="h3 font-display fw-bold text-warning mb-0">{pending}</div>
            </div>
          </div>
          <div className="col-6 col-md-3 col-xl">
            <div className="glass-panel p-3">
              <div className="text-info font-mono text-xs text-uppercase mb-1">Completed</div>
              <div className="h3 font-display fw-bold text-info mb-0">{completed}</div>
            </div>
          </div>
          <div className="col-6 col-md-3 col-xl">
            <div className="glass-panel p-3">
              <div className="text-danger font-mono text-xs text-uppercase mb-1">Cancelled</div>
              <div className="h3 font-display fw-bold text-danger mb-0">{cancelled}</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel p-3 mb-4">
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text glass-input border-end-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control glass-input border-start-0"
                  placeholder="Search candidate, email, track, or interviewer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="col-md-3 col-sm-6">
              <select
                className="form-select glass-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses ({total})</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending Review</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Track Filter */}
            <div className="col-md-4 col-sm-6">
              <select
                className="form-select glass-select"
                value={trackFilter}
                onChange={(e) => setTrackFilter(e.target.value)}
              >
                <option value="All">All Tracks</option>
                <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                <option value="System Design & Architecture">System Design & Architecture</option>
                <option value="Full Stack Web (MERN)">Full Stack Web (MERN)</option>
                <option value="Frontend Engineering">Frontend Engineering</option>
                <option value="Machine Learning & AI">Machine Learning & AI</option>
              </select>
            </div>
          </div>
        </div>

        {/* Consolidated Records Table (Display Functionality) */}
        <div className="glass-panel p-0 overflow-hidden shadow-lg mb-4">
          <div className="table-responsive">
            <table className="glass-table mb-0">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Track & Difficulty</th>
                  <th>Target Company</th>
                  <th>Schedule Slot</th>
                  <th>Interviewer</th>
                  <th>Status</th>
                  <th className="text-end">Operations</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted font-mono">
                      <div className="spinner-border spinner-border-sm text-info me-2"></div>
                      Loading consolidated mock records...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No records matched current search / filter criteria.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id}>
                      {/* Candidate */}
                      <td>
                        <div className="d-flex align-items-center gap-2.5">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white font-mono fw-bold"
                            style={{
                              width: 36,
                              height: 36,
                              background: 'linear-gradient(135deg, #00f2fe 0%, #7928ca 100%)',
                              fontSize: '0.8rem',
                            }}
                          >
                            {booking.candidateName ? booking.candidateName.charAt(0) : 'U'}
                          </div>
                          <div>
                            <div className="fw-semibold text-white">{booking.candidateName}</div>
                            <div className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                              {booking.candidateEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Track */}
                      <td>
                        <div className="text-white fw-medium text-sm">{booking.interviewTrack}</div>
                        <span className="badge bg-white bg-opacity-5 text-secondary font-mono" style={{ fontSize: '0.65rem' }}>
                          {booking.difficulty || 'Senior L5'}
                        </span>
                      </td>

                      {/* Target Company */}
                      <td>
                        <span className="badge bg-info bg-opacity-15 text-info font-mono">
                          {booking.targetCompany}
                        </span>
                      </td>

                      {/* Date & Slot */}
                      <td>
                        <div className="text-white text-sm d-flex align-items-center gap-1.5">
                          <Calendar size={13} className="text-muted" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                          {booking.timeSlot}
                        </div>
                      </td>

                      {/* Interviewer */}
                      <td>
                        {booking.interviewer ? (
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={booking.interviewer.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'}
                              alt={booking.interviewer.name}
                              className="rounded-circle"
                              style={{ width: 26, height: 26, objectFit: 'cover' }}
                            />
                            <div>
                              <div className="text-white text-xs fw-semibold">{booking.interviewer.name}</div>
                              <div className="text-muted font-mono" style={{ fontSize: '0.68rem' }}>
                                {booking.interviewer.company}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted font-mono small">Unassigned</span>
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <StatusBadge status={booking.status} />
                      </td>

                      {/* Operations Actions */}
                      <td className="text-end">
                        <div className="d-inline-flex align-items-center gap-1.5">
                          {/* View Scorecard if present */}
                          {booking.scorecard && (
                            <button
                              onClick={() => setSelectedScorecardBooking(booking)}
                              className="btn btn-sm btn-tech-secondary p-1.5 text-warning"
                              title="View Scorecard & Evaluation"
                            >
                              <Eye size={15} />
                            </button>
                          )}

                          {/* Update Functionality (Prompt requirement) */}
                          <button
                            onClick={() => setEditingBooking(booking)}
                            className="btn btn-sm btn-tech-secondary p-1.5 text-info"
                            title="Update Booking Record"
                          >
                            <Edit3 size={15} />
                          </button>

                          {/* Delete Functionality (Prompt requirement) */}
                          <button
                            onClick={() => setDeletingBooking(booking)}
                            className="btn btn-sm btn-tech-secondary p-1.5 text-danger"
                            title="Delete / Cancel Booking"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deletingBooking && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content glass-modal border-0 p-3">
                <div className="modal-body text-center p-4">
                  <div className="d-inline-flex p-3 rounded-circle bg-danger bg-opacity-15 text-danger mb-3">
                    <AlertTriangle size={36} />
                  </div>
                  <h4 className="font-display text-white fw-bold mb-2">Delete Mock Booking?</h4>
                  <p className="text-muted text-sm mb-4">
                    Are you sure you want to delete the booking for <strong>{deletingBooking.candidateName}</strong> (
                    {deletingBooking.interviewTrack} on {deletingBooking.date})? This action cannot be undone.
                  </p>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      type="button"
                      className="btn btn-tech-secondary px-4"
                      onClick={() => setDeletingBooking(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger px-4"
                      onClick={handleDeleteConfirm}
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scorecard Modal */}
        {selectedScorecardBooking && (
          <ScorecardModal
            booking={selectedScorecardBooking}
            onClose={() => setSelectedScorecardBooking(null)}
          />
        )}

        {/* Edit Modal (Update functionality) */}
        {editingBooking && (
          <BookingEditModal
            booking={editingBooking}
            interviewers={interviewers}
            onClose={() => setEditingBooking(null)}
            onSave={handleUpdateSave}
          />
        )}
      </div>
    </div>
  );
};
