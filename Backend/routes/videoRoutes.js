// routes/videoRoutes.js
const express = require('express');
const Video = require('../models/Video');
const router = express.Router();

// Get all videos
router.get('/', async (req, res) => {
  try {
    // Retrieve all videos from the database
    const videos = await Video.find();
    res.status(200).json(videos);  // Respond with the list of videos
  } catch (err) {
    console.error('Error retrieving videos:', err);
    res.status(500).json({ message: 'Failed to retrieve videos', error: err.message });
  }
});
router.post('/:videoId/watchTime', async (req, res) => {
  const { videoId } = req.params;
  const { userId, watchTime } = req.body;

  try {
    await UserVideo.updateOne(
      { userId, videoId },
      { $inc: { watchTime } },
      { upsert: true }
    );
    res.status(200).json({ message: 'Watch time updated successfully' });
  } catch (error) {
    console.error('Error updating watch time:', error);
    res.status(500).json({ error: 'Failed to update watch time' });
  }
});


module.exports = router;
