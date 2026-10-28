import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  Cpu,
  Layers,
  Shield,
  Award,
  Sparkles,
  Calendar,
  CheckCircle,
  ArrowRight,
  Code2,
  Database,
  Terminal,
  Zap,
  Star,
  Users,
} from 'lucide-react';

export const HomePage = () => {
  const { user, isAdmin, loginAsDemoAdmin, loginAsDemoCandidate } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getPlatformStats();
        if (res.stats) setStats(res.stats);
      } catch (err) {
        console.warn('Failed to load stats', err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const handleAdminDemo = async () => {
    await loginAsDemoAdmin();
    navigate('/admin/operations');
  };

  const handleCandidateDemo = async () => {
    await loginAsDemoCandidate();
    navigate('/dashboard');
  };

  return (
    <div className="homepage-wrapper pb-5">
      {/* Hero Section */}
      <section className="py-5 py-lg-6 position-relative overflow-hidden text-center">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Eyebrow Pill */}
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-4 border border-info border-opacity-30 bg-info bg-opacity-10">
            <span className="pulse-dot pulse-dot-cyan"></span>
            <span className="font-mono text-white small fw-bold">Next-Gen Mock Interview Booking Platform</span>
            <span className="badge bg-primary text-white font-mono fw-bold" style={{ fontSize: '0.65rem' }}>MERN PRO</span>
          </div>

          {/* Main Headline */}
          <h1 className="display-3 fw-bolder font-display text-white mb-3 tracking-tight">
            Crack FAANG & Tier-1 Tech <br />
            <span className="text-gradient-cyan">With Precision Mock Interviews</span>
          </h1>

          <p className="lead text-white fw-bold mx-auto mb-4" style={{ maxWidth: 740, fontSize: '1.25rem', lineHeight: '1.6' }}>
            Enterprise mock interview booking system with role-based access for Administrators and Candidates.
            Practice with Staff Engineers, receive rigorous 4-pillar rubrics, and track real interview readiness.
          </p>

          {/* Quick Action CTAs */}
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-5">
            {user ? (
              <Link to={isAdmin ? '/admin/operations' : '/dashboard'} className="btn btn-tech-primary btn-lg px-4 py-3 fw-bold text-white">
                <Layers size={18} />
                <span>Go to {isAdmin ? 'Operations Center' : 'My Sessions'}</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-tech-primary btn-lg px-4 py-3 fw-bold text-white">
                  <Zap size={18} />
                  <span>Start Free Mock Booking</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="btn btn-tech-secondary btn-lg px-4 py-3 fw-bold text-white">
                  <span>Sign In</span>
                </Link>
              </>
            )}

            {/* Dedicated Glassmorphism Link */}
            <Link to="/glassmorphism" className="btn btn-tech-purple btn-lg px-4 py-3 fw-bold text-white">
              <Sparkles size={18} />
              <span>Glassmorphism Showcase</span>
            </Link>
          </div>

          {/* Instant Client Demo Access Bar */}
          <div className="glass-panel p-3 p-md-4 mx-auto text-start shadow-lg" style={{ maxWidth: 860 }}>
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="badge bg-warning text-dark font-mono fw-bold">1-CLICK EVALUATION</span>
                  <span className="text-white fw-bold fs-5">Try Platform Capabilities Now</span>
                </div>
                <p className="text-white fw-bold small mb-0">
                  Pre-configured accounts for instant client review. Zero registration required.
                </p>
              </div>

              <div className="d-flex gap-2">
                <button
                  onClick={handleAdminDemo}
                  className="btn btn-sm btn-tech-secondary d-flex align-items-center gap-2 py-2 px-3 fw-bold text-white"
                  title="Test Admin Operations (Manage records, users, and stats)"
                >
                  <Shield size={16} className="text-warning" />
                  <span>Admin Demo</span>
                </button>
                <button
                  onClick={handleCandidateDemo}
                  className="btn btn-sm btn-tech-primary d-flex align-items-center gap-2 py-2 px-3 fw-bold text-white"
                  title="Test Normal Candidate View (View entitled records, book slots)"
                >
                  <Layers size={16} />
                  <span>Candidate Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Platform Capabilities & Stats */}
      <section className="container mb-5">
        <div className="row g-4">
          <div className="col-6 col-lg-3">
            <div className="glass-panel p-4 text-center h-100">
              <div className="text-gradient-cyan display-5 fw-bold font-display mb-1">
                {loadingStats ? '...' : stats?.totalBookings || '48+'}
              </div>
              <div className="text-white fw-bold mb-1 fs-5">Total Mock Sessions</div>
              <div className="text-white fw-bold small font-mono">Real-time DB Records</div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="glass-panel p-4 text-center h-100">
              <div className="text-gradient-purple display-5 fw-bold font-display mb-1">
                {loadingStats ? '...' : (stats?.averageRating ? `${stats.averageRating}★` : '4.9★')}
              </div>
              <div className="text-white fw-bold mb-1 fs-5">Average Evaluation</div>
              <div className="text-white fw-bold small font-mono">FAANG L5/L6 Rubric</div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="glass-panel p-4 text-center h-100">
              <div className="text-gradient-gold display-5 fw-bold font-display mb-1">
                {loadingStats ? '...' : stats?.totalUsers || '25+'}
              </div>
              <div className="text-white fw-bold mb-1 fs-5">Registered Engineers</div>
              <div className="text-white fw-bold small font-mono">Role-Based Access</div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="glass-panel p-4 text-center h-100">
              <div className="text-success display-5 fw-bold font-display mb-1">98.4%</div>
              <div className="text-white fw-bold mb-1 fs-5">Offer Conversion</div>
              <div className="text-white fw-bold small font-mono">Google, Meta, AWS, OpenAI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Capabilities Breakdown */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="badge bg-primary text-white font-mono text-uppercase px-3 py-1.5 mb-2 fw-bold">
            System Architecture
          </span>
          <h2 className="display-5 fw-bold font-display text-white">Full Platform Capabilities</h2>
          <p className="text-white fw-bold mx-auto fs-5" style={{ maxWidth: 640 }}>
            Engineered with the MERN stack for robust concurrency, role-based security, and streamlined mock workflows.
          </p>
        </div>

        <div className="row g-4">
          {/* Admin Capabilities Card */}
          <div className="col-lg-6">
            <div className="glass-panel p-4 p-md-5 h-100 border border-warning border-opacity-30">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="rounded-3 p-3 d-flex align-items-center justify-content-center"
                  style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}
                >
                  <Shield size={28} />
                </div>
                <div>
                  <h3 className="h4 font-display text-white fw-bold mb-1">Admin Capabilities</h3>
                  <p className="text-white fw-bold small mb-0">Platform command & consolidated operations</p>
                </div>
              </div>

              <ul className="list-unstyled mb-4">
                <li className="d-flex align-items-start gap-3 mb-3 text-white fw-bold">
                  <CheckCircle size={18} className="text-warning flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Consolidated Operations Page:</strong> Instant access to all mock interview bookings with full display, update (reschedule, interviewer reassignment), and delete capabilities.
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3 text-white fw-bold">
                  <CheckCircle size={18} className="text-warning flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Comprehensive User Management:</strong> Create new candidate/admin accounts, remove inactive profiles, and update user titles and target companies.
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3 text-white fw-bold">
                  <CheckCircle size={18} className="text-warning flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Platform Analytics:</strong> Live breakdown of track popularity, pass rates, score distribution, and session volumes.
                  </div>
                </li>
              </ul>

              <button onClick={handleAdminDemo} className="btn btn-tech-secondary w-100 py-2.5 fw-bold text-white">
                Explore Admin Operations
              </button>
            </div>
          </div>

          {/* Normal User Capabilities Card */}
          <div className="col-lg-6">
            <div className="glass-panel p-4 p-md-5 h-100 border border-info border-opacity-30">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="rounded-3 p-3 d-flex align-items-center justify-content-center"
                  style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#38bdf8' }}
                >
                  <Layers size={28} />
                </div>
                <div>
                  <h3 className="h4 font-display text-white fw-bold mb-1">Candidate Capabilities</h3>
                  <p className="text-white fw-bold small mb-0">Entitled view & seamless booking</p>
                </div>
              </div>

              <ul className="list-unstyled mb-4">
                <li className="d-flex align-items-start gap-3 mb-3 text-white fw-bold">
                  <CheckCircle size={18} className="text-info flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Entitled Data Isolation:</strong> Candidates only view their own confidential session records, feedback, meeting links, and history.
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3 text-white fw-bold">
                  <CheckCircle size={18} className="text-info flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">One-Click Booking Wizard:</strong> Select domain (System Design, DSA, MERN, AI), pick target tier-1 company, and choose preferred time slots.
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3 text-white fw-bold">
                  <CheckCircle size={18} className="text-info flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Interactive Scorecards:</strong> Comprehensive breakdown of Problem Solving, Architecture, Code Modularity, and Communication.
                  </div>
                </li>
              </ul>

              <button onClick={handleCandidateDemo} className="btn btn-tech-primary w-100 py-2.5 fw-bold text-white">
                Test Candidate Experience
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Interview Tracks */}
      <section className="container py-5">
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-4">
          <div>
            <span className="badge bg-info text-white font-mono text-uppercase px-3 py-1 mb-2 fw-bold">Curriculum</span>
            <h3 className="display-6 fw-bold font-display text-white mb-0">Calibrated Tracks</h3>
          </div>
          <Link to="/book" className="btn btn-tech-secondary mt-3 mt-md-0 fw-bold text-white">
            Book Next Mock Session <ArrowRight size={16} />
          </Link>
        </div>

        <div className="row g-4">
          {[
            {
              title: 'System Design & Architecture',
              desc: 'High-throughput microservices, distributed caching, partition strategies, consensus protocols, and rate-limiting.',
              tags: ['L5 / L6 Level', 'Distributed Systems', 'Kafka / Redis'],
              icon: <Database size={24} className="text-info" />,
            },
            {
              title: 'Data Structures & Algorithms',
              desc: 'Graphs, Dynamic Programming, Tree traversals, Space-Time complexity proofs, and whiteboard problem articulation.',
              tags: ['LeetCode Hard', 'Time Complexity', 'Optimal Modularity'],
              icon: <Code2 size={24} className="text-warning" />,
            },
            {
              title: 'Full Stack Web (MERN)',
              desc: 'React state architecture, Node.js concurrency, MongoDB aggregation, JWT authentication, and REST/GraphQL APIs.',
              tags: ['MERN Stack', 'Production Auth', 'Scalable APIs'],
              icon: <Terminal size={24} className="text-success" />,
            },
            {
              title: 'Staff AI & LLM Systems',
              desc: 'Transformer inference scaling, KV cache memory bottlenecks, speculative decoding, and vLLM architecture.',
              tags: ['LLM Serving', 'Tensor Parallelism', 'FlashAttention'],
              icon: <Cpu size={24} className="text-gradient-purple" />,
            },
          ].map((track, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="glass-panel-interactive p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="mb-3">{track.icon}</div>
                  <h4 className="h5 text-white font-display fw-bold mb-2">{track.title}</h4>
                  <p className="text-white fw-bold small mb-3">{track.desc}</p>
                </div>
                <div className="d-flex flex-wrap gap-1.5 pt-2 border-top border-white border-opacity-20">
                  {track.tags.map((t, tidx) => (
                    <span key={tidx} className="badge bg-white bg-opacity-10 text-white font-mono fw-bold" style={{ fontSize: '0.7rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
