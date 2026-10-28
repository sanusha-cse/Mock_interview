const API_BASE = '/api';

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) headers['Content-Type'] = 'application/json';
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) {
      // If token expired, clear auth if not already on login
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    const error = new Error(data.message || `Request failed with status ${res.status}`);
    error.status = res.status;
    error.details = data.details;
    throw error;
  }
  return data;
}

export const api = {
  // Auth
  async login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async changePassword(passwords) {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(passwords),
    });
    return handleResponse(res);
  },

  // Bookings
  async getBookings(params = {}) {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.track) query.append('track', params.track);
    if (params.search) query.append('search', params.search);

    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await fetch(`${API_BASE}/bookings${qs}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async getBookingById(id) {
    const res = await fetch(`${API_BASE}/bookings/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async createBooking(bookingData) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookingData),
    });
    return handleResponse(res);
  },

  async updateBooking(id, updateData) {
    const res = await fetch(`${API_BASE}/bookings/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updateData),
    });
    return handleResponse(res);
  },

  async deleteBooking(id) {
    const res = await fetch(`${API_BASE}/bookings/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async getMetadata() {
    const res = await fetch(`${API_BASE}/bookings/metadata`);
    return handleResponse(res);
  },

  // Users (Admin)
  async getUsers(params = {}) {
    const query = new URLSearchParams();
    if (params.role) query.append('role', params.role);
    if (params.search) query.append('search', params.search);

    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await fetch(`${API_BASE}/users${qs}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async createUser(userData) {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  async updateUser(id, userData) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  async deleteUser(id) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Stats & System
  async getPlatformStats() {
    const res = await fetch(`${API_BASE}/stats/overview`);
    return handleResponse(res);
  },

  async resetDatabase() {
    const res = await fetch(`${API_BASE}/stats/reset`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};
