import { dataService } from '../services/dataService.js';

export const getPlatformStats = async (req, res) => {
  try {
    const stats = await dataService.getStats();
    res.json({
      success: true,
      stats,
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve stats.' });
  }
};

export const resetData = async (req, res) => {
  try {
    const result = await dataService.resetToDefaults();
    res.json({
      success: true,
      message: 'Demo database has been restored to default verified records.',
      ...result,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to reset database.' });
  }
};
