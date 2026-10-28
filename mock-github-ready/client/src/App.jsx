import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { GlassmorphismShowcasePage } from './pages/GlassmorphismShowcasePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { BookInterviewPage } from './pages/BookInterviewPage';
import { ProfileSecurityPage } from './pages/ProfileSecurityPage';
import { AdminOperationsPage } from './pages/AdminOperationsPage';
import { AdminUserManagementPage } from './pages/AdminUserManagementPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/glassmorphism" element={<GlassmorphismShowcasePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Normal User (Candidate) & Authenticated Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book"
                element={
                  <ProtectedRoute>
                    <BookInterviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileSecurityPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin-Only Protected Routes */}
              <Route
                path="/admin/operations"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminOperationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminUserManagementPage />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
