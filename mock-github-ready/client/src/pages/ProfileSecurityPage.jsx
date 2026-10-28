import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  KeyRound,
  Lock,
  CheckCircle,
  AlertCircle,
  Shield,
  User,
  Mail,
  Check,
  X,
} from 'lucide-react';

export const ProfileSecurityPage = () => {
  const { user, changePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Password rules
  const rules = {
    length: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    digit: /[0-9]/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };
  const isStrengthValid = Object.values(rules).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword) {
      setError('Please provide your current password.');
      return;
    }

    if (!isStrengthValid) {
      setError('New password must satisfy all strength requirements.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from your existing password.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await changePassword({ currentPassword, newPassword });
      setSuccess(res.message || 'Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-4 py-lg-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* User Profile Card */}
            <div className="glass-panel p-4 mb-4 shadow-lg border border-secondary border-opacity-25">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80'}
                  alt={user?.name}
                  className="rounded-circle"
                  style={{ width: 64, height: 64, objectFit: 'cover', border: '2px solid rgba(0, 242, 254, 0.4)' }}
                />
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h2 className="h4 font-display text-white fw-bold mb-0">{user?.name}</h2>
                    <span className={user?.role === 'admin' ? 'badge-role-admin' : 'badge-role-user'}>
                      {user?.role === 'admin' ? 'Administrator' : 'Normal Candidate'}
                    </span>
                  </div>
                  <div className="text-muted font-mono text-xs">{user?.email}</div>
                  <div className="text-light small mt-1 font-mono">
                    Target: {user?.targetCompany || 'General Tech'} • Level: {user?.experienceLevel || 'Mid-Level'}
                  </div>
                </div>
              </div>
            </div>

            {/* Password Change Form (Prompt Requirement) */}
            <div className="glass-panel p-4 p-md-5 shadow-lg border border-secondary border-opacity-25">
              <div className="d-flex align-items-center gap-2 mb-1">
                <KeyRound size={20} className="text-warning" />
                <h3 className="h4 font-display text-white fw-bold mb-0">Password Security & Credentials</h3>
              </div>
              <p className="text-muted small mb-4">
                Update your account password. All users can change their password at any time.
              </p>

              {success && (
                <div className="alert alert-success font-mono text-sm d-flex align-items-center gap-2 mb-4" role="alert">
                  <CheckCircle size={16} className="text-success" />
                  <div>{success}</div>
                </div>
              )}

              {error && (
                <div className="alert alert-danger font-mono text-sm d-flex align-items-center gap-2 mb-4" role="alert">
                  <AlertCircle size={16} className="text-danger" />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Current Password */}
                <div className="mb-3">
                  <label className="form-label text-light text-sm fw-medium">Current Password *</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      className="form-control glass-input border-start-0 font-mono"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="mb-3">
                  <label className="form-label text-light text-sm fw-medium">New Password *</label>
                  <div className="input-group mb-2">
                    <span className="input-group-text glass-input border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      className="form-control glass-input border-start-0 font-mono"
                      placeholder="Must be 8+ chars with uppercase, digit, symbol"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Checklist */}
                  <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div className="text-muted font-mono text-xs text-uppercase mb-2">
                      New Password Requirements
                    </div>
                    <div className="row g-2 text-xs">
                      <div className={`col-6 d-flex align-items-center gap-1.5 ${rules.length ? 'text-success' : 'text-muted'}`}>
                        {rules.length ? <Check size={14} /> : <X size={14} />} 8+ Characters
                      </div>
                      <div className={`col-6 d-flex align-items-center gap-1.5 ${rules.upper ? 'text-success' : 'text-muted'}`}>
                        {rules.upper ? <Check size={14} /> : <X size={14} />} Uppercase (A-Z)
                      </div>
                      <div className={`col-6 d-flex align-items-center gap-1.5 ${rules.lower ? 'text-success' : 'text-muted'}`}>
                        {rules.lower ? <Check size={14} /> : <X size={14} />} Lowercase (a-z)
                      </div>
                      <div className={`col-6 d-flex align-items-center gap-1.5 ${rules.digit ? 'text-success' : 'text-muted'}`}>
                        {rules.digit ? <Check size={14} /> : <X size={14} />} Number (0-9)
                      </div>
                      <div className={`col-12 d-flex align-items-center gap-1.5 ${rules.special ? 'text-success' : 'text-muted'}`}>
                        {rules.special ? <Check size={14} /> : <X size={14} />} Special Character (!@#$%^&*)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="mb-4">
                  <label className="form-label text-light text-sm fw-medium">Confirm New Password *</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      className="form-control glass-input border-start-0 font-mono"
                      placeholder="Re-type your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-tech-primary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <KeyRound size={16} />
                      Update Password
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
