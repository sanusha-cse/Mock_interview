import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Layers,
  CalendarCheck,
  Users,
  Shield,
  KeyRound,
  LogOut,
  LogIn,
  UserPlus,
  Compass,
  Cpu,
  ChevronDown,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAdmin, logout, loginAsDemoAdmin, loginAsDemoCandidate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg glass-nav py-2 py-lg-3">
      <div className="container-fluid px-lg-4">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-white text-decoration-none">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #00f2fe 0%, #7928ca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(0, 242, 254, 0.45)',
            }}
          >
            <Cpu size={22} className="text-white" />
          </div>
          <div className="d-flex flex-column">
            <span className="fw-bold fs-5 font-display tracking-tight text-white lh-1">
              Mock<span className="text-gradient-cyan">Pro</span>
            </span>
            <span className="text-muted font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}>
              INTERVIEW OS
            </span>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 text-light"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle navigation"
          style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 8, padding: '6px 10px' }}
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        {/* Collapsible Content */}
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarContent">
          {/* Main Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 gap-lg-1">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link px-3 py-2 rounded-3 text-sm d-flex align-items-center gap-2 ${
                  isActive('/') ? 'text-white fw-semibold bg-white bg-opacity-10' : 'text-light text-opacity-75'
                }`}
                onClick={() => setIsNavOpen(false)}
              >
                <Compass size={16} className="text-info" />
                Platform
              </Link>
            </li>

            {/* Glassmorphism Showcase Link (Client Requirement) */}
            <li className="nav-item">
              <Link
                to="/glassmorphism"
                className={`nav-link px-3 py-2 rounded-3 text-sm d-flex align-items-center gap-2 ${
                  isActive('/glassmorphism')
                    ? 'text-white fw-semibold bg-white bg-opacity-10'
                    : 'text-light text-opacity-75'
                }`}
                onClick={() => setIsNavOpen(false)}
              >
                <Sparkles size={16} className="text-gradient-purple" style={{ color: '#ec4899' }} />
                <span>Glassmorphism UI</span>
                <span
                  className="badge font-mono"
                  style={{
                    fontSize: '0.65rem',
                    background: 'rgba(236, 72, 153, 0.2)',
                    color: '#f472b6',
                    border: '1px solid rgba(236, 72, 153, 0.4)',
                  }}
                >
                  NEW
                </span>
              </Link>
            </li>

            {/* Authenticated Links */}
            {user && (
              <>
                {/* Normal User Specific */}
                {!isAdmin && (
                  <li className="nav-item">
                    <Link
                      to="/dashboard"
                      className={`nav-link px-3 py-2 rounded-3 text-sm d-flex align-items-center gap-2 ${
                        isActive('/dashboard') ? 'text-white fw-semibold bg-white bg-opacity-10' : 'text-light text-opacity-75'
                      }`}
                      onClick={() => setIsNavOpen(false)}
                    >
                      <Layers size={16} className="text-primary" />
                      My Sessions
                    </Link>
                  </li>
                )}

                {/* Admin Specific */}
                {isAdmin && (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/admin/operations"
                        className={`nav-link px-3 py-2 rounded-3 text-sm d-flex align-items-center gap-2 ${
                          isActive('/admin/operations')
                            ? 'text-white fw-semibold bg-white bg-opacity-10'
                            : 'text-light text-opacity-75'
                        }`}
                        onClick={() => setIsNavOpen(false)}
                      >
                        <Shield size={16} className="text-warning" />
                        Operations Center
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/admin/users"
                        className={`nav-link px-3 py-2 rounded-3 text-sm d-flex align-items-center gap-2 ${
                          isActive('/admin/users')
                            ? 'text-white fw-semibold bg-white bg-opacity-10'
                            : 'text-light text-opacity-75'
                        }`}
                        onClick={() => setIsNavOpen(false)}
                      >
                        <Users size={16} className="text-info" />
                        User Management
                      </Link>
                    </li>
                  </>
                )}

                {/* Book Session for All Authenticated Users */}
                <li className="nav-item">
                  <Link
                    to="/book"
                    className={`nav-link px-3 py-2 rounded-3 text-sm d-flex align-items-center gap-2 ${
                      isActive('/book') ? 'text-white fw-semibold bg-white bg-opacity-10' : 'text-light text-opacity-75'
                    }`}
                    onClick={() => setIsNavOpen(false)}
                  >
                    <CalendarCheck size={16} className="text-success" />
                    Book Mock
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right Section: Auth State / Quick Switcher */}
          <div className="d-flex align-items-center gap-2 flex-wrap mt-3 mt-lg-0">
            {/* Quick Demo Switcher */}
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-tech-secondary dropdown-toggle py-1 px-2.5 font-mono text-xs d-flex align-items-center gap-1.5"
                data-bs-toggle="dropdown"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ fontSize: '0.78rem' }}
              >
                <i className="bi bi-lightning-charge-fill text-warning"></i>
                <span>Demo Switcher</span>
                <ChevronDown size={13} />
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-2 mt-2 glass-modal shadow-lg ${
                  dropdownOpen ? 'show' : ''
                }`}
                style={{ minWidth: 240, border: '1px solid rgba(255, 255, 255, 0.15)' }}
              >
                <li>
                  <h6 className="dropdown-header text-muted font-mono text-xs text-uppercase mb-1">
                    Instant Demo Login
                  </h6>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2 text-white d-flex align-items-center gap-2 text-sm"
                    onClick={async () => {
                      setDropdownOpen(false);
                      await loginAsDemoAdmin();
                      navigate('/admin/operations');
                    }}
                    style={{ background: 'transparent' }}
                  >
                    <div
                      className="rounded p-1 d-flex align-items-center justify-content-center"
                      style={{ background: 'rgba(121, 40, 202, 0.3)' }}
                    >
                      <Shield size={15} className="text-warning" />
                    </div>
                    <div>
                      <div className="fw-semibold text-white">Lead Admin</div>
                      <div className="text-muted font-mono" style={{ fontSize: '0.7rem' }}>
                        admin@mockinterview.pro
                      </div>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2 text-white d-flex align-items-center gap-2 text-sm"
                    onClick={async () => {
                      setDropdownOpen(false);
                      await loginAsDemoCandidate();
                      navigate('/dashboard');
                    }}
                    style={{ background: 'transparent' }}
                  >
                    <div
                      className="rounded p-1 d-flex align-items-center justify-content-center"
                      style={{ background: 'rgba(0, 242, 254, 0.2)' }}
                    >
                      <Layers size={15} className="text-info" />
                    </div>
                    <div>
                      <div className="fw-semibold text-white">Normal Candidate</div>
                      <div className="text-muted font-mono" style={{ fontSize: '0.7rem' }}>
                        candidate@mockinterview.pro
                      </div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            {/* User Profile or Login/Register */}
            {user ? (
              <div className="d-flex align-items-center gap-2 ms-lg-2">
                <Link
                  to="/profile"
                  className="btn btn-sm btn-tech-secondary d-flex align-items-center gap-2 text-decoration-none py-1.5"
                  title="Profile & Password Security"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'}
                    alt={user.name}
                    className="rounded-circle"
                    style={{ width: 24, height: 24, objectFit: 'cover' }}
                  />
                  <span className="text-white text-sm d-none d-md-inline">{user.name.split(' ')[0]}</span>
                  <span className={isAdmin ? 'badge-role-admin' : 'badge-role-user'}>
                    {isAdmin ? 'Admin' : 'Candidate'}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 py-1.5 px-2.5 rounded-3"
                  title="Log Out"
                >
                  <LogOut size={15} />
                  <span className="d-none d-md-inline text-xs">Logout</span>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2 ms-lg-2">
                <Link to="/login" className="btn btn-sm btn-tech-secondary">
                  <LogIn size={15} />
                  Login
                </Link>
                <Link to="/register" className="btn btn-sm btn-tech-primary">
                  <UserPlus size={15} />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
