//Backend\routes\userRoutes.js
const express = require('express'); // Import express
const UserProfile = require('../models/UserProfile');
const Feedback = require('../models/Feedback');
const User = require('../models/User.js');
const authMiddleware = require('../authMiddleware.js');

const router = express.Router();

// Public route to get a user profile by ID
router.get('/:userId/profile', async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ _id: req.params.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error); // Log errors
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route to get authenticated user's profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error); // Log errors
    res.status(500).json({ message: 'Server error' });
  }
});

// Update watch time for a specific user
router.post('/:userId/watchTime', authMiddleware, async (req, res) => {
  const { videoId, timeWatched } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.watchTime.set(videoId, (user.watchTime.get(videoId) || 0) + timeWatched);
    await user.save();
    res.json({ message: 'Watch time updated', watchTime: user.watchTime });
  } catch (error) {
    console.error('Error updating watch time:', error); // Log errors
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit feedback
router.post('/:userId/feedback', async (req, res) => {
  const { videoId, feedbackText } = req.body;

  try {
    const feedback = new Feedback({ userId: req.params.userId, videoId, feedbackText });
    await feedback.save();
    res.json({ message: 'Feedback submitted' });
  } catch (error) {
    console.error('Error submitting feedback:', error); // Log errors
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
