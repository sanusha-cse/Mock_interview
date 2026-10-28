import { initialUsers, initialBookings } from '../data/seedData.js';

class InMemoryStore {
  constructor() {
    this.reset();
  }

  reset() {
    // Deep clone initial seed data
    this.users = JSON.parse(JSON.stringify(initialUsers));
    this.bookings = JSON.parse(JSON.stringify(initialBookings));
  }

  // --- Users ---
  async findUsers(filter = {}) {
    return this.users.filter(u => {
      for (const [k, v] of Object.entries(filter)) {
        if (u[k] !== v) return false;
      }
      return true;
    });
  }

  async findUserById(id) {
    return this.users.find(u => u._id === id || u.id === id) || null;
  }

  async findUserByEmail(email) {
    if (!email) return null;
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async createUser(userData) {
    const newUser = {
      _id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...userData,
      createdAt: new Date(),
    };
    this.users.unshift(newUser);
    return newUser;
  }

  async updateUser(id, updateData) {
    const idx = this.users.findIndex(u => u._id === id || u.id === id);
    if (idx === -1) return null;
    this.users[idx] = {
      ...this.users[idx],
      ...updateData,
      updatedAt: new Date(),
    };
    return this.users[idx];
  }

  async deleteUser(id) {
    const idx = this.users.findIndex(u => u._id === id || u.id === id);
    if (idx === -1) return null;
    const deleted = this.users.splice(idx, 1)[0];
    // Also remove bookings associated with this user
    this.bookings = this.bookings.filter(b => b.candidateId !== id);
    return deleted;
  }

  // --- Bookings ---
  async findBookings(filter = {}) {
    let result = [...this.bookings];
    if (filter.candidateId) {
      result = result.filter(b => b.candidateId === filter.candidateId);
    }
    if (filter.status && filter.status !== 'All') {
      result = result.filter(b => b.status.toLowerCase() === filter.status.toLowerCase());
    }
    if (filter.interviewTrack) {
      result = result.filter(b => b.interviewTrack === filter.interviewTrack);
    }
    // Sort descending by date/createdAt
    return result.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
  }

  async findBookingById(id) {
    return this.bookings.find(b => b._id === id || b.id === id) || null;
  }

  async createBooking(bookingData) {
    const newBooking = {
      _id: 'bkg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...bookingData,
      status: bookingData.status || 'Confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  async updateBooking(id, updateData) {
    const idx = this.bookings.findIndex(b => b._id === id || b.id === id);
    if (idx === -1) return null;
    this.bookings[idx] = {
      ...this.bookings[idx],
      ...updateData,
      updatedAt: new Date(),
    };
    return this.bookings[idx];
  }

  async deleteBooking(id) {
    const idx = this.bookings.findIndex(b => b._id === id || b.id === id);
    if (idx === -1) return null;
    const deleted = this.bookings.splice(idx, 1)[0];
    return deleted;
  }
}

export const inMemoryStore = new InMemoryStore();
