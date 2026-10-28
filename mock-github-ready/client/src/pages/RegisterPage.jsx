import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, Check, X, AlertCircle, Building, Award, Cpu } from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    targetCompany: 'Google',
    experienceLevel: 'Senior L5',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Password rules checklist
  const password = formData.password;
  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(rules).filter(Boolean).length;
  const isPasswordValid = score === 5;

  const getStrengthLabel = () => {
    if (!password) return { text: 'None', color: '#64748b', percent: 0 };
    if (score <= 2) return { text: 'Weak', color: '#ef4444', percent: 35 };
    if (score <= 4) return { text: 'Good', color: '#f59e0b', percent: 75 };
    return { text: 'Strong (Meets Security Standard)', color: '#10b981', percent: 100 };
  };

  const strength = getStrengthLabel();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email format (e.g. user@domain.com).');
      return;
    }

    if (!isPasswordValid) {
      setError('Please meet all password strength requirements before proceeding.');
      return;
    }

    setSubmitting(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-6">
            <div className="glass-panel p-4 p-md-5 shadow-lg border border-secondary border-opacity-25">
              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: 48,
                    height: 48,
                    background: 'linear-gradient(135deg, #00f2fe 0%, #7928ca 100%)',
                    boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
                  }}
                >
                  <Cpu size={26} className="text-white" />
                </div>
                <h2 className="font-display fw-bold text-white mb-1">Create Candidate Account</h2>
                <p className="text-muted small">Join elite engineers preparing for top-tier tech rounds</p>
              </div>

              {error && (
                <div className="alert alert-danger font-mono text-sm d-flex align-items-center gap-2 mb-4" role="alert">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label text-light text-sm fw-medium">Full Name *</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <User size={16} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control glass-input border-start-0"
                      name="name"
                      placeholder="e.g. Maya Lin"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email with validation */}
                <div className="mb-3">
                  <label className="form-label text-light text-sm fw-medium">Email Address *</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <Mail size={16} className="text-muted" />
                    </span>
                    <input
                      type="email"
                      className="form-control glass-input border-start-0"
                      name="email"
                      placeholder="maya.lin@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Target Company & Level */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label text-light text-sm fw-medium">Target Company</label>
                    <select
                      className="form-select glass-select"
                      name="targetCompany"
                      value={formData.targetCompany}
                      onChange={handleChange}
                    >
                      <option value="Google">Google</option>
                      <option value="Meta">Meta</option>
                      <option value="Amazon">Amazon</option>
                      <option value="Netflix">Netflix</option>
                      <option value="Apple">Apple</option>
                      <option value="OpenAI">OpenAI</option>
                      <option value="Stripe">Stripe</option>
                      <option value="Other Tier-1">Other Tier-1</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label text-light text-sm fw-medium">Target Level</label>
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
                </div>

                {/* Password with Strength Meter */}
                <div className="mb-3">
                  <label className="form-label text-light text-sm fw-medium">Password *</label>
                  <div className="input-group mb-2">
                    <span className="input-group-text glass-input border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      className="form-control glass-input border-start-0 font-mono"
                      name="password"
                      placeholder="Minimum 8 characters with upper, digit, symbol"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Visual Strength Progress Bar */}
                  {formData.password && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between text-xs font-mono mb-1">
                        <span className="text-muted">Password Strength:</span>
                        <span style={{ color: strength.color, fontWeight: 600 }}>{strength.text}</span>
                      </div>
                      <div className="progress" style={{ height: 4, background: 'rgba(255, 255, 255, 0.1)' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${strength.percent}%`,
                            backgroundColor: strength.color,
                            transition: 'all 0.3s ease',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Checklist Validation Pills */}
                  <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div className="text-muted font-mono text-xs text-uppercase mb-2">
                      Validation Checklist
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

                <button
                  type="submit"
                  className="btn btn-tech-primary w-100 py-2.5 mb-3 d-flex align-items-center justify-content-center gap-2"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1"></span>
                      Registering Account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      <span>Complete Registration</span>
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-3 border-top border-secondary border-opacity-25">
                <span className="text-muted small">Already have an account? </span>
                <Link to="/login" className="text-info text-decoration-none small fw-semibold">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
