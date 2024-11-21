const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Add feedback
router.post('/:userId/feedback', async (req, res) => {
  const { videoId, userId, feedbackText } = req.body;
  const feedback = new Feedback({ videoId, userId, feedbackText });
  try {
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error saving feedback', error: error.message });
  }
});

router.get('/:videoId', async (req, res) => {
  try {
    const feedbackList = await Feedback.find({ videoId: req.params.videoId });
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback', error: error.message });
  }
});

module.exports = router;
