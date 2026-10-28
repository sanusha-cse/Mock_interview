import React from 'react';
import { Award, CheckCircle, AlertTriangle, Star, X, UserCheck, FileText } from 'lucide-react';

export const ScorecardModal = ({ booking, onClose }) => {
  if (!booking || !booking.scorecard) return null;
  const { scorecard, candidateName, interviewTrack, targetCompany, date, interviewer } = booking;

  const getRecommendationBadge = (rec) => {
    switch (rec) {
      case 'Strong Hire':
        return <span className="badge bg-success bg-opacity-25 text-success border border-success px-3 py-2 fs-6">🏆 Strong Hire</span>;
      case 'Hire':
        return <span className="badge bg-primary bg-opacity-25 text-primary border border-primary px-3 py-2 fs-6">✔ Hire</span>;
      case 'Lean Hire':
        return <span className="badge bg-warning bg-opacity-25 text-warning border border-warning px-3 py-2 fs-6">⚠ Lean Hire</span>;
      default:
        return <span className="badge bg-danger bg-opacity-25 text-danger border border-danger px-3 py-2 fs-6">✖ No Hire</span>;
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content glass-modal border-0">
          {/* Header */}
          <div className="modal-header border-bottom border-secondary border-opacity-25 p-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-info bg-opacity-15 text-info font-mono">{targetCompany}</span>
                <span className="text-muted font-mono" style={{ fontSize: '0.8rem' }}>{date}</span>
              </div>
              <h4 className="modal-title font-display text-white fw-bold mb-0">
                Evaluation Scorecard: {candidateName}
              </h4>
              <p className="text-muted small mb-0">{interviewTrack}</p>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {/* Top Score Banner */}
            <div className="glass-panel p-4 mb-4" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
              <div className="row align-items-center g-3">
                <div className="col-md-6 text-center text-md-start">
                  <div className="text-muted text-uppercase font-mono small mb-1">Overall Interview Score</div>
                  <div className="d-flex align-items-baseline gap-2 justify-content-center justify-content-md-start">
                    <span className="display-5 fw-bold text-gradient-gold font-display">
                      {scorecard.overallRating?.toFixed(1) || '4.8'}
                    </span>
                    <span className="text-muted fs-4">/ 5.0</span>
                    <div className="d-flex text-warning ms-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={18} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <div className="text-muted text-uppercase font-mono small mb-1">Decision Committee Outcome</div>
                  {getRecommendationBadge(scorecard.hireRecommendation || 'Strong Hire')}
                </div>
              </div>
            </div>

            {/* Rubric Matrix */}
            <h5 className="text-white font-display mb-3 d-flex align-items-center gap-2">
              <Award size={18} className="text-info" />
              Evaluation Matrix
            </h5>
            <div className="row g-3 mb-4">
              {[
                { label: 'Problem Solving & Algorithms', val: scorecard.problemSolving || 9, color: '#38bdf8' },
                { label: 'System Design & Architecture', val: scorecard.systemArchitecture || 8, color: '#a855f7' },
                { label: 'Coding Proficiency & Modularity', val: scorecard.codingProficiency || 9, color: '#34d399' },
                { label: 'Technical Communication & Clarity', val: scorecard.communication || 9, color: '#f59e0b' },
              ].map((item, idx) => (
                <div className="col-md-6" key={idx}>
                  <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)' }}>
                    <div className="d-flex justify-content-between text-sm mb-1">
                      <span className="text-light">{item.label}</span>
                      <span className="fw-bold font-mono text-white">{item.val} / 10</span>
                    </div>
                    <div className="progress" style={{ height: 6, background: 'rgba(255, 255, 255, 0.08)' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${item.val * 10}%`,
                          backgroundColor: item.color,
                          boxShadow: `0 0 10px ${item.color}`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interviewer Feedback */}
            <div className="mb-4">
              <h6 className="text-white text-uppercase font-mono small mb-2 d-flex align-items-center gap-2">
                <FileText size={16} className="text-warning" />
                Interviewer Narrative
              </h6>
              <div className="p-3 rounded-3 font-sans text-light lh-base" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)' }}>
                "{scorecard.interviewerSummary || 'Candidate demonstrated deep foundational knowledge and clear structural reasoning under tight problem constraints.'}"
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 rounded-3 h-100" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <h6 className="text-success text-uppercase font-mono small mb-2 d-flex align-items-center gap-1.5">
                    <CheckCircle size={15} /> Observed Strengths
                  </h6>
                  <ul className="list-unstyled mb-0 text-sm text-light ps-1">
                    {scorecard.strengths?.map((s, i) => (
                      <li key={i} className="mb-1.5 d-flex align-items-start gap-2">
                        <span className="text-success">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 rounded-3 h-100" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <h6 className="text-warning text-uppercase font-mono small mb-2 d-flex align-items-center gap-1.5">
                    <AlertTriangle size={15} /> Actionable Improvements
                  </h6>
                  <ul className="list-unstyled mb-0 text-sm text-light ps-1">
                    {scorecard.areasOfImprovement?.map((a, i) => (
                      <li key={i} className="mb-1.5 d-flex align-items-start gap-2">
                        <span className="text-warning">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Evaluator Card */}
            {interviewer && (
              <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center gap-3">
                <img
                  src={interviewer.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'}
                  alt={interviewer.name}
                  className="rounded-circle"
                  style={{ width: 44, height: 44, objectFit: 'cover' }}
                />
                <div>
                  <div className="fw-semibold text-white">{interviewer.name}</div>
                  <div className="text-muted small">{interviewer.title} • {interviewer.company}</div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer border-top border-secondary border-opacity-25 p-3">
            <button type="button" className="btn btn-tech-secondary px-4" onClick={onClose}>
              Close Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
