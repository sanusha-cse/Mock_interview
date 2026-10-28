import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { UserEditModal } from '../components/UserEditModal';
import { AddUserModal } from '../components/AddUserModal';
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Shield,
  User,
  Search,
  CheckCircle,
  AlertCircle,
  Building,
  Phone,
  Mail,
} from 'lucide-react';

export const AdminUserManagementPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  // Modals
  const [editingUser, setEditingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.getUsers({ search, role: roleFilter });
      setUsers(res.users || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter]);

  const handleAddUser = async (userData) => {
    try {
      const res = await api.createUser(userData);
      setNotification(`✔ User '${res.user.name}' provisioned successfully!`);
      setTimeout(() => setNotification(''), 4000);
      fetchUsers();
    } catch (err) {
      alert(`Failed to add user: ${err.message}`);
    }
  };

  const handleUpdateUser = async (id, updateData) => {
    try {
      const res = await api.updateUser(id, updateData);
      setNotification(`✔ User '${res.user.name}' updated successfully!`);
      setTimeout(() => setNotification(''), 4000);
      fetchUsers();
    } catch (err) {
      alert(`Failed to update user: ${err.message}`);
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    try {
      await api.deleteUser(deletingUser._id);
      setNotification(`🗑 User '${deletingUser.name}' was removed.`);
      setTimeout(() => setNotification(''), 4000);
      setDeletingUser(null);
      fetchUsers();
    } catch (err) {
      alert(`Failed to delete user: ${err.message}`);
    }
  };

  return (
    <div className="py-4 py-lg-5">
      <div className="container-fluid px-lg-4">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-info bg-opacity-20 text-info font-mono">SECURITY DIRECTORY</span>
              <span className="text-muted font-mono small">• Identity & Access Management</span>
            </div>
            <h1 className="h2 font-display text-white fw-bold mb-0">User Management Console</h1>
            <p className="text-muted small mb-0">
              Add new platform users, modify existing credentials and roles, and manage candidate permissions.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-tech-primary d-flex align-items-center gap-2"
          >
            <UserPlus size={18} />
            <span>Add New User</span>
          </button>
        </div>

        {/* Notifications */}
        {notification && (
          <div className="alert alert-success font-mono text-sm d-flex align-items-center gap-2 mb-4" role="alert">
            <CheckCircle size={16} />
            <div>{notification}</div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger font-mono text-sm d-flex align-items-center gap-2 mb-4" role="alert">
            <AlertCircle size={16} />
            <div>{error}</div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="glass-panel p-3 mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text glass-input border-end-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control glass-input border-start-0"
                  placeholder="Search user by name, email, target company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select glass-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="user">Normal Users (Candidates)</option>
                <option value="admin">Administrators</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-panel p-0 overflow-hidden shadow-lg mb-4">
          <div className="table-responsive">
            <table className="glass-table mb-0">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>System Role</th>
                  <th>Target Company</th>
                  <th>Experience Level</th>
                  <th>Contact Info</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted font-mono">
                      <div className="spinner-border spinner-border-sm text-info me-2"></div>
                      Loading directory accounts...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No users matched your query.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const isSelf = currentUser?._id === u._id;
                    return (
                      <tr key={u._id}>
                        <td>
                          <div className="d-flex align-items-center gap-2.5">
                            <img
                              src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'}
                              alt={u.name}
                              className="rounded-circle"
                              style={{ width: 38, height: 38, objectFit: 'cover' }}
                            />
                            <div>
                              <div className="text-white fw-semibold d-flex align-items-center gap-1.5">
                                <span>{u.name}</span>
                                {isSelf && (
                                  <span className="badge bg-secondary font-mono" style={{ fontSize: '0.62rem' }}>
                                    YOU
                                  </span>
                                )}
                              </div>
                              <div className="text-muted font-mono" style={{ fontSize: '0.72rem' }}>
                                {u.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className={u.role === 'admin' ? 'badge-role-admin' : 'badge-role-user'}>
                            {u.role === 'admin' ? 'Administrator' : 'Normal User (Candidate)'}
                          </span>
                        </td>

                        <td>
                          <span className="text-white text-sm fw-medium">{u.targetCompany || 'General Tech'}</span>
                          <div className="text-muted small">{u.title || 'SWE Aspirant'}</div>
                        </td>

                        <td>
                          <span className="badge bg-white bg-opacity-5 text-light font-mono">
                            {u.experienceLevel || 'Mid-Level'}
                          </span>
                        </td>

                        <td>
                          <div className="text-muted small font-mono">{u.phone || 'Not provided'}</div>
                        </td>

                        <td className="text-end">
                          <div className="d-inline-flex align-items-center gap-1.5">
                            {/* Update User Details (Prompt requirement) */}
                            <button
                              onClick={() => setEditingUser(u)}
                              className="btn btn-sm btn-tech-secondary p-1.5 text-info"
                              title="Update User Details"
                            >
                              <Edit size={15} />
                            </button>

                            {/* Remove User (Prompt requirement) */}
                            <button
                              onClick={() => setDeletingUser(u)}
                              className="btn btn-sm btn-tech-secondary p-1.5 text-danger"
                              title={isSelf ? 'Cannot remove self' : 'Remove User Account'}
                              disabled={isSelf}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deletingUser && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content glass-modal border-0 p-3">
                <div className="modal-body text-center p-4">
                  <div className="d-inline-flex p-3 rounded-circle bg-danger bg-opacity-15 text-danger mb-3">
                    <Trash2 size={36} />
                  </div>
                  <h4 className="font-display text-white fw-bold mb-2">Remove User Account?</h4>
                  <p className="text-muted text-sm mb-4">
                    Are you sure you want to permanently delete <strong>{deletingUser.name}</strong> ({deletingUser.email})?
                    All associated mock interview bookings will also be purged.
                  </p>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      type="button"
                      className="btn btn-tech-secondary px-4"
                      onClick={() => setDeletingUser(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger px-4"
                      onClick={handleDeleteUser}
                    >
                      Confirm Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <AddUserModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddUser}
          />
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <UserEditModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSave={handleUpdateUser}
          />
        )}
      </div>
    </div>
  );
};
