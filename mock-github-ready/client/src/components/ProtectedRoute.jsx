import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
        <div className="spinner-border text-info mb-3" role="status"></div>
        <p className="text-muted font-mono text-sm">Authenticating session privileges...</p>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return (
      <div className="container py-5 my-5">
        <div className="glass-panel p-5 text-center mx-auto" style={{ maxWidth: 560 }}>
          <div className="d-inline-flex p-3 rounded-circle bg-danger bg-opacity-10 text-danger mb-3">
            <ShieldAlert size={44} />
          </div>
          <h3 className="text-white font-display mb-2">Access Denied: Admin Rights Required</h3>
          <p className="text-muted mb-4">
            You are logged in as a <strong>Normal User ({user.email})</strong>. This operations terminal is reserved
            for platform administrators. Normal users have view-only access to their entitled mock bookings.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Navigate to="/dashboard" replace />
          </div>
        </div>
      </div>
    );
  }

  return children;
};
