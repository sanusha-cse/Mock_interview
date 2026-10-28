import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Terminal, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-top py-4 text-muted" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-md-5 d-flex align-items-center gap-2">
            <Cpu size={18} className="text-info" />
            <span className="fw-semibold text-white">MockPro Enterprise</span>
            <span className="text-secondary font-mono" style={{ fontSize: '0.75rem' }}>
              • MERN Stack Architecture
            </span>
          </div>

          <div className="col-md-4 text-md-center">
            <span className="badge rounded-pill px-3 py-1.5" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <span className="pulse-dot pulse-dot-green me-1.5"></span>
              All Mock Engines Operational
            </span>
          </div>

          <div className="col-md-3 text-md-end font-mono" style={{ fontSize: '0.78rem' }}>
            <span className="text-muted">Built for High-Growth Tech Teams</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
