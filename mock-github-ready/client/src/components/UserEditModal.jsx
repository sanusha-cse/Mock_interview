import React, { useState } from 'react';
import { Save, User, Mail, Shield, Briefcase, Phone, Award } from 'lucide-react';

export const UserEditModal = ({ user, onClose, onSave }) => {
  if (!user) return null;

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    role: user.role || 'user',
    title: user.title || '',
    targetCompany: user.targetCompany || '',
    experienceLevel: user.experienceLevel || 'Mid-Level',
    phone: user.phone || '',
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
      await onSave(user._id, formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass-modal border-0">
          <div className="modal-header border-bottom border-secondary border-opacity-25 p-4">
            <div>
              <span className="badge bg-info bg-opacity-15 text-info font-mono mb-1">USER MANAGEMENT</span>
              <h4 className="modal-title font-display text-white fw-bold mb-0">Edit User Details</h4>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {error && (
                <div className="alert alert-danger font-mono text-sm mb-3">
                  {error}
                </div>
              )}

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label text-light text-sm fw-medium">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <User size={16} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control glass-input border-start-0"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label text-light text-sm fw-medium">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <Mail size={16} className="text-muted" />
                    </span>
                    <input
                      type="email"
                      className="form-control glass-input border-start-0"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">System Role</label>
                  <select
                    className="form-select glass-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">Normal User (Candidate)</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">Experience Level</label>
                  <select
                    className="form-select glass-select"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                  >
                    <option value="Entry">Entry L3</option>
                    <option value="Mid-Level">Mid-Level L4</option>
                    <option value="Senior L5">Senior L5</option>
                    <option value="Staff L6">Staff L6</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">Professional Title</label>
                  <input
                    type="text"
                    className="form-control glass-input"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Backend Engineer"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-light text-sm fw-medium">Target Company</label>
                  <input
                    type="text"
                    className="form-control glass-input"
                    name="targetCompany"
                    value={formData.targetCompany}
                    onChange={handleChange}
                    placeholder="e.g. Google, Meta"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label text-light text-sm fw-medium">Phone Number</label>
                  <input
                    type="text"
                    className="form-control glass-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
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
                    Save User Details
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
