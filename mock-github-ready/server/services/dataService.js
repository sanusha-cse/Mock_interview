import { getDBStatus } from '../config/db.js';
import { inMemoryStore } from '../store/inMemoryStore.js';
import { UserModel } from '../models/User.js';
import { BookingModel } from '../models/Booking.js';
import { initialUsers, initialBookings } from '../data/seedData.js';

// Seed MongoDB if connected and empty
export const seedMongoIfEmpty = async () => {
  if (!getDBStatus().connected) return;
  try {
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding MongoDB with initial mock interview records...');
      await UserModel.insertMany(initialUsers);
      await BookingModel.insertMany(initialBookings);
      console.log('✔ MongoDB seeded successfully!');
    }
  } catch (err) {
    console.warn('MongoDB seed warning:', err.message);
  }
};

export const dataService = {
  // --- USERS ---
  async findUsers(filter = {}) {
    if (getDBStatus().connected) {
      const q = {};
      if (filter.role) q.role = filter.role;
      return await UserModel.find(q).select('-password').sort({ createdAt: -1 }).lean();
    }
    const users = await inMemoryStore.findUsers(filter);
    return users.map(({ password, ...rest }) => rest);
  },

  async findUserById(id) {
    if (getDBStatus().connected) {
      return await UserModel.findById(id).lean();
    }
    return await inMemoryStore.findUserById(id);
  },

  async findUserByEmail(email) {
    if (getDBStatus().connected) {
      return await UserModel.findOne({ email: email.toLowerCase() }).lean();
    }
    return await inMemoryStore.findUserByEmail(email);
  },

  async createUser(userData) {
    if (getDBStatus().connected) {
      const created = await UserModel.create(userData);
      const obj = created.toObject();
      delete obj.password;
      return obj;
    }
    const created = await inMemoryStore.createUser(userData);
    const { password, ...rest } = created;
    return rest;
  },

  async updateUser(id, updateData) {
    if (getDBStatus().connected) {
      return await UserModel.findByIdAndUpdate(id, { $set: updateData }, { new: true })
        .select('-password')
        .lean();
    }
    const updated = await inMemoryStore.updateUser(id, updateData);
    if (!updated) return null;
    const { password, ...rest } = updated;
    return rest;
  },

  async updateUserPassword(id, hashedPassword) {
    if (getDBStatus().connected) {
      return await UserModel.findByIdAndUpdate(id, { $set: { password: hashedPassword } }, { new: true });
    }
    return await inMemoryStore.updateUser(id, { password: hashedPassword });
  },

  async deleteUser(id) {
    if (getDBStatus().connected) {
      await BookingModel.deleteMany({ candidateId: id });
      return await UserModel.findByIdAndDelete(id).lean();
    }
    return await inMemoryStore.deleteUser(id);
  },

  // --- BOOKINGS ---
  async findBookings(filter = {}) {
    if (getDBStatus().connected) {
      const q = {};
      if (filter.candidateId) q.candidateId = filter.candidateId;
      if (filter.status && filter.status !== 'All') q.status = filter.status;
      if (filter.interviewTrack) q.interviewTrack = filter.interviewTrack;
      return await BookingModel.find(q).sort({ createdAt: -1 }).lean();
    }
    return await inMemoryStore.findBookings(filter);
  },

  async findBookingById(id) {
    if (getDBStatus().connected) {
      return await BookingModel.findById(id).lean();
    }
    return await inMemoryStore.findBookingById(id);
  },

  async createBooking(bookingData) {
    if (getDBStatus().connected) {
      const created = await BookingModel.create(bookingData);
      return created.toObject();
    }
    return await inMemoryStore.createBooking(bookingData);
  },

  async updateBooking(id, updateData) {
    if (getDBStatus().connected) {
      return await BookingModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();
    }
    return await inMemoryStore.updateBooking(id, updateData);
  },

  async deleteBooking(id) {
    if (getDBStatus().connected) {
      return await BookingModel.findByIdAndDelete(id).lean();
    }
    return await inMemoryStore.deleteBooking(id);
  },

  // --- STATS ---
  async getStats() {
    const users = await this.findUsers();
    const bookings = await this.findBookings();

    const totalBookings = bookings.length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length;

    const tracksCount = {};
    bookings.forEach(b => {
      tracksCount[b.interviewTrack] = (tracksCount[b.interviewTrack] || 0) + 1;
    });

    const averageScore = bookings
      .filter(b => b.scorecard?.overallRating)
      .reduce((acc, b, _, arr) => acc + b.scorecard.overallRating / arr.length, 0);

    return {
      totalUsers: users.length,
      normalUsersCount: users.filter(u => u.role === 'user').length,
      adminsCount: users.filter(u => u.role === 'admin').length,
      totalBookings,
      completed,
      confirmed,
      pending,
      cancelled,
      tracksCount,
      averageRating: averageScore ? Number(averageScore.toFixed(1)) : 4.8,
      storageEngine: getDBStatus().mode,
    };
  },

  // --- RESET/RESEED ---
  async resetToDefaults() {
    inMemoryStore.reset();
    if (getDBStatus().connected) {
      await UserModel.deleteMany({});
      await BookingModel.deleteMany({});
      await UserModel.insertMany(initialUsers);
      await BookingModel.insertMany(initialBookings);
    }
    return { success: true, message: 'Database reset and reseeded with default records.' };
  }
};
