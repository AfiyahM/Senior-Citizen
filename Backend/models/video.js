//Backend\models\Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoId: { type: String, required: true },  // YouTube video ID
  category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('video', videoSchema);
