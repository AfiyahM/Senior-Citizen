//Backend\models\UserVideo.js
const mongoose = require('mongoose');

const userVideoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  watchTime: { type: Number, default: 0 },
});

module.exports = mongoose.model('userVideo', userVideoSchema);
