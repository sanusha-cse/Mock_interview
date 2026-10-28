import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Shield, Layers, ArrowRight, AlertCircle, Cpu } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await login(email, password);
      if (res.user?.role === 'admin') {
        navigate('/admin/operations');
      } else {
        navigate(from === '/' ? '/dashboard' : from);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemo = async (role) => {
    setError('');
    setSubmitting(true);
    try {
      if (role === 'admin') {
        setEmail('admin@mockinterview.pro');
        setPassword('Admin@12345');
        await login('admin@mockinterview.pro', 'Admin@12345');
        navigate('/admin/operations');
      } else {
        setEmail('candidate@mockinterview.pro');
        setPassword('Candidate@12345');
        await login('candidate@mockinterview.pro', 'Candidate@12345');
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
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
                <h2 className="font-display fw-bold text-white mb-1">Welcome Back</h2>
                <p className="text-muted small">Sign in to your MockPro session portal</p>
              </div>

              {/* 1-Click Quick Demo Bar */}
              <div className="p-3 rounded-3 mb-4" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className="text-muted font-mono text-xs text-uppercase mb-2 text-center">
                  ⚡ 1-Click Client Evaluation Credentials
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={() => handleQuickDemo('admin')}
                      className="btn btn-sm btn-tech-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-1 font-mono text-xs"
                      disabled={submitting}
                    >
                      <Shield size={14} className="text-warning" />
                      <span>Admin Demo</span>
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={() => handleQuickDemo('candidate')}
                      className="btn btn-sm btn-tech-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-1 font-mono text-xs"
                      disabled={submitting}
                    >
                      <Layers size={14} className="text-info" />
                      <span>Candidate Demo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger font-mono text-sm d-flex align-items-center gap-2 mb-4" role="alert">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <div>{error}</div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-light text-sm fw-medium">Work or Personal Email</label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <Mail size={16} className="text-muted" />
                    </span>
                    <input
                      type="email"
                      className="form-control glass-input border-start-0"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label text-light text-sm fw-medium mb-0">Password</label>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      className="form-control glass-input border-start-0 font-mono"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
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
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      <span>Sign In to Dashboard</span>
                    </>
                  )}
                </button>
              </form>

              {/* Register Footer */}
              <div className="text-center pt-3 border-top border-secondary border-opacity-25">
                <span className="text-muted small">Don't have an account yet? </span>
                <Link to="/register" className="text-info text-decoration-none small fw-semibold">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
