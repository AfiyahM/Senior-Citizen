//Backend\models\UserProfile.js
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  _id: String,
  username: { type: String, required: true },
  totalWatchTime: { type: Map, of:Number},
  badges: { type: [String], default: [] },
  quizScores: [
    {
      videoId: { type: String, required: true },
      score: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('userProfile', userProfileSchema);
