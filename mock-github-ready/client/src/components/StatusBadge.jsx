import React from 'react';
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return (
        <span className="badge-status badge-status-confirmed">
          <CheckCircle2 size={13} className="text-emerald-400" />
          Confirmed
        </span>
      );
    case 'pending':
      return (
        <span className="badge-status badge-status-pending">
          <Clock size={13} className="text-amber-400" />
          Pending
        </span>
      );
    case 'completed':
      return (
        <span className="badge-status badge-status-completed">
          <CheckCircle2 size={13} className="text-cyan-400" />
          Completed
        </span>
      );
    case 'cancelled':
      return (
        <span className="badge-status badge-status-cancelled">
          <XCircle size={13} className="text-rose-400" />
          Cancelled
        </span>
      );
    default:
      return (
        <span className="badge-status badge-status-pending">
          <AlertCircle size={13} />
          {status || 'Unknown'}
        </span>
      );
  }
};
